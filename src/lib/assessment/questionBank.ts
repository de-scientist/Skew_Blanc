import type {
  Difficulty,
  Question,
  QuestionBankStatus,
  ReviewStatus,
} from "@/types";
import { buildQuestionPool } from "@/data/mock/questions";
import { mockExams } from "@/data/mock/exams";

const OVERRIDES_KEY = "nursora:question-overrides";

/** Editable subset of a question for instructor/authoring workflows. */
export type QuestionOverride = Partial<
  Pick<
    Question,
    | "difficulty"
    | "explanation"
    | "correctOptionId"
    | "reviewStatus"
    | "questionBankStatus"
    | "topic"
    | "tags"
    | "optionRationales"
  >
>;

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

/**
 * Instructor-facing question bank over the generated mock questions.
 *
 * Edits are kept as a small override map keyed by question id and merged over
 * the static mock bank at read time, so authoring changes persist in the demo
 * without mutating source data. In production this becomes a database-backed
 * CRUD service behind the same `getQuestion(s)` contract.
 */
export function getOverrides(): Record<string, QuestionOverride> {
  return safeGet<Record<string, QuestionOverride>>(OVERRIDES_KEY) ?? {};
}

export function updateQuestion(id: string, patch: QuestionOverride): void {
  const all = getOverrides();
  all[id] = { ...all[id], ...patch };
  safeSet(OVERRIDES_KEY, all);
}

export function getAllQuestions(): Question[] {
  const all: Question[] = [];
  for (const exam of mockExams) {
    all.push(...buildQuestionPool(exam.id, 60));
  }
  const overrides = getOverrides();
  return all.map((q) => (overrides[q.id] ? { ...q, ...overrides[q.id] } : q));
}

export function getQuestion(id: string): Question | null {
  return getAllQuestions().find((q) => q.id === id) ?? null;
}

export function getSubjects(): string[] {
  return Array.from(new Set(getAllQuestions().map((q) => q.subject))).sort();
}

export type { Difficulty, QuestionBankStatus, ReviewStatus };
