import type { Exam, Question } from "@/types";
import type {
  AssessmentAttempt,
  AssessmentConfig,
  AssessmentMode,
  AssessmentResult,
  QuestionAttempt,
} from "@/types/assessment";
import { computeResult } from "./engine";
import { readSession } from "@/lib/api/auth";

const ATTEMPT_KEY = (id: string) => `nursora:attempt:${id}`;
const ATTEMPT_INDEX = (userId: string) => `nursora:attempts:${userId}`;
const RESULT_KEY = (attemptId: string) => `nursora:result:${attemptId}`;
const RESULTS_INDEX = (userId: string) => `nursora:results:${userId}`;

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — degrade gracefully */
  }
}

function currentUserId(): string {
  const session = readSession();
  return session?.user?.id ?? "demo-user";
}

function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function createAttempt(
  assessmentId: string,
  mode: AssessmentMode,
  config: AssessmentConfig,
  questionIds: string[]
): AssessmentAttempt {
  const userId = currentUserId();
  const now = new Date();
  const startedAt = now.toISOString();
  const durationMs = config.durationMinutes * 60 * 1000;
  const expiresAt = new Date(now.getTime() + durationMs).toISOString();
  const id = genId("att");

  const attempt: AssessmentAttempt = {
    id,
    userId,
    assessmentId,
    mode,
    status: "in_progress",
    startedAt,
    expiresAt,
    durationMinutes: config.durationMinutes,
    config,
    questionIds,
    answers: {},
    questionCount: questionIds.length,
    createdAt: startedAt,
    updatedAt: startedAt,
  };

  for (const qid of questionIds) {
    attempt.answers[qid] = {
      questionId: qid,
      selectedOptionId: null,
      isCorrect: false,
      timeSpentSeconds: 0,
      hintsUsed: 0,
      flagged: false,
      answeredAt: null,
      questionOrder: questionIds.indexOf(qid),
      changedAnswer: false,
    };
  }

  safeSet(ATTEMPT_KEY(id), attempt);
  const index = safeGet<string[]>(ATTEMPT_INDEX(userId)) ?? [];
  safeSet(ATTEMPT_INDEX(userId), [id, ...index].slice(0, 50));
  return attempt;
}

export function getAttempt(id: string): AssessmentAttempt | null {
  return safeGet<AssessmentAttempt>(ATTEMPT_KEY(id));
}

export function saveAttempt(attempt: AssessmentAttempt): void {
  safeSet(ATTEMPT_KEY(attempt.id), {
    ...attempt,
    updatedAt: new Date().toISOString(),
  });
}

/** Persists a single answer (this is the autosave call). */
export function saveAnswer(
  attemptId: string,
  questionId: string,
  patch: Partial<QuestionAttempt>
): AssessmentAttempt | null {
  const attempt = getAttempt(attemptId);
  if (!attempt) return null;
  const prev = attempt.answers[questionId];
  if (!prev) return null;

  const selectedChanged =
    patch.selectedOptionId !== undefined &&
    patch.selectedOptionId !== prev.selectedOptionId;

  attempt.answers[questionId] = {
    ...prev,
    ...patch,
    changedAnswer: prev.changedAnswer || selectedChanged,
    answeredAt:
      patch.selectedOptionId !== null
        ? prev.answeredAt ?? new Date().toISOString()
        : prev.answeredAt,
  };
  saveAttempt(attempt);
  return attempt;
}

/**
 * Remaining time in seconds, derived from the stored `expiresAt`.
 *
 * This is computed from an absolute server-style timestamp rather than a
 * frontend countdown, so refreshes, tab closes, and reconnects cannot extend
 * the time. With a real backend, `expiresAt` is owned server-side and this
 * function becomes a read of the authoritative value.
 */
export function getRemainingSeconds(attempt: AssessmentAttempt): number {
  const ms = new Date(attempt.expiresAt).getTime() - Date.now();
  return Math.max(0, Math.round(ms / 1000));
}

export function isExpired(attempt: AssessmentAttempt): boolean {
  return getRemainingSeconds(attempt) <= 0;
}

/**
 * Finalizes the attempt: computes the result authoritatively via the engine,
 * marks the attempt completed, and persists both the result and a row in the
 * user's analytics history.
 *
 * NOTE: In production the score is computed on the server from the submitted
 * answers; this client implementation reuses the same pure `computeResult`
 * so the logic is identical and testable.
 */
export function submitAttempt(
  attempt: AssessmentAttempt,
  questions: Question[],
  exam: Pick<Exam, "id" | "title">
): AssessmentResult {
  const answeredCount = attempt.questionIds.filter(
    (qid) => attempt.answers[qid]?.selectedOptionId !== null
  ).length;
  const total = attempt.questionIds.length; // placeholder; replaced below
  void total;
  void answeredCount;

  const result = computeResult(
    attempt,
    questions,
    {
      id: attempt.id,
      userId: attempt.userId,
      assessmentId: attempt.assessmentId,
      startedAt: attempt.startedAt,
      durationMinutes: attempt.durationMinutes,
      passingScore: attempt.config.passingScore,
      mode: attempt.config.mode,
      timeUsedMinutes: attempt.config.durationMinutes,
    },
    { title: exam.title }
  );

  const finalized: AssessmentAttempt = {
    ...attempt,
    status: isExpired(attempt) ? "expired" : "completed",
    updatedAt: new Date().toISOString(),
  };
  safeSet(ATTEMPT_KEY(attempt.id), finalized);
  safeSet(RESULT_KEY(attempt.id), result);

  const userId = attempt.userId;
  const history = safeGet<AssessmentResult[]>(RESULTS_INDEX(userId)) ?? [];
  safeSet(RESULTS_INDEX(userId), [result, ...history].slice(0, 100));

  return result;
}

export function getResult(attemptId: string): AssessmentResult | null {
  return safeGet<AssessmentResult>(RESULT_KEY(attemptId));
}

export function getHistory(userId?: string): AssessmentResult[] {
  const id = userId ?? currentUserId();
  return safeGet<AssessmentResult[]>(RESULTS_INDEX(id)) ?? [];
}

export function listAttempts(userId?: string): AssessmentAttempt[] {
  const id = userId ?? currentUserId();
  const index = safeGet<string[]>(ATTEMPT_INDEX(id)) ?? [];
  return index
    .map((aid) => getAttempt(aid))
    .filter((a): a is AssessmentAttempt => a !== null);
}
