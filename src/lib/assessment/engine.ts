import type { AnswerOptionId, Difficulty, Exam, Question } from "@/types";
import type {
  AssessmentAttempt,
  AssessmentConfig,
  AssessmentMode,
  AssessmentResult,
  GroupPerformance,
  ModeConfig,
  QuestionSelectionFilter,
  Recommendation,
  WeakArea,
} from "@/types/assessment";
import { getModeConfig } from "./modes";

export const WEAK_AREA_THRESHOLD = 70;
export const WEAK_AREA_MIN_SAMPLES = 3;

/** Deterministic PRNG so a given attempt seed reproduces the same order. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(input: T[], rng: () => number = Math.random): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Display order of option ids (positions shuffled, ids preserved). */
export function shuffledOptionOrder(
  question: Question,
  rng: () => number = Math.random
): AnswerOptionId[] {
  return shuffle(
    question.options.map((o) => o.id),
    rng
  );
}

export function evaluateAnswer(
  question: Question,
  selected: AnswerOptionId | null,
  selectedMultiple?: AnswerOptionId[]
): boolean {
  if (question.questionType === "multiple_choice" && question.correctOptionIds) {
    const chosen = selectedMultiple ?? [];
    const correct = [...question.correctOptionIds].sort();
    const picked = [...chosen].sort();
    return (
      correct.length === picked.length &&
      correct.every((id, i) => id === picked[i])
    );
  }
  return selected !== null && selected === question.correctOptionId;
}

function matchesFilter(q: Question, f?: QuestionSelectionFilter): boolean {
  if (!f) return true;
  if (f.subject && q.subject !== f.subject) return false;
  if (f.topic && q.topic !== f.topic) return false;
  if (f.subtopic && q.subtopic !== f.subtopic) return false;
  if (f.difficulty && q.difficulty !== f.difficulty) return false;
  if (f.questionType && q.questionType !== f.questionType) return false;
  if (f.poolId && q.poolId !== f.poolId) return false;
  if (f.tags && f.tags.length > 0) {
    const qt = q.tags ?? [];
    if (!f.tags.some((t) => qt.includes(t))) return false;
  }
  return true;
}

export interface SelectionOptions {
  seed?: number;
  /** Weak-area subject/topic keys to bias toward when filter.onlyWeak is set. */
  weakKeys?: string[];
}

/**
 * Builds the ordered question set for an attempt.
 *
 * Order of operations (mirrors a real backend): filter the pool → apply a
 * question pool/weak-area bias → slice to the requested count → optionally
 * randomize order. Option randomization is handled per-question at render
 * time via `shuffledOptionOrder`, so correctness is never affected by display.
 */
export function selectQuestions(
  pool: Question[],
  config: AssessmentConfig,
  options: SelectionOptions = {}
): Question[] {
  const rng = mulberry32(options.seed ?? Date.now());
  let candidates = pool.filter((q) => matchesFilter(q, config.filter));

  if (config.filter?.onlyWeak && options.weakKeys?.length) {
    const weak = new Set(options.weakKeys);
    const weakOnes = candidates.filter(
      (q) => weak.has(q.subject) || (q.topic && weak.has(q.topic))
    );
    if (weakOnes.length > 0) candidates = weakOnes;
  }

  if (candidates.length === 0) candidates = [...pool];

  if (config.randomizeQuestions) {
    candidates = shuffle(candidates, rng);
  }

  const count = Math.min(config.questionCount, candidates.length);
  return candidates.slice(0, count);
}

function groupAccuracy(
  items: {
    subject: string;
    topic?: string;
    difficulty?: Difficulty;
    questionType?: Question["questionType"];
    isCorrect: boolean;
  }[]
): {
  subject: GroupPerformance[];
  topic: GroupPerformance[];
  difficulty: GroupPerformance[];
  type: GroupPerformance[];
} {
  const acc = <K extends string>(pick: (x: (typeof items)[number]) => K) => {
    const map = new Map<K, { correct: number; total: number }>();
    for (const it of items) {
      const k = pick(it);
      const e = map.get(k) ?? { correct: 0, total: 0 };
      e.total += 1;
      if (it.isCorrect) e.correct += 1;
      map.set(k, e);
    }
    return Array.from(map.entries()).map(([key, v]) => ({
      key,
      correct: v.correct,
      total: v.total,
      accuracy: v.total === 0 ? 0 : Math.round((v.correct / v.total) * 100),
    }));
  };

  return {
    subject: acc((x) => x.subject),
    topic: acc((x) => x.topic ?? x.subject),
    difficulty: acc((x) => (x.difficulty ?? "Medium") as Difficulty),
    type: acc((x) => (x.questionType ?? "single_choice") as string),
  };
}

export function detectWeakAreas(
  groups: GroupPerformance[],
  threshold = WEAK_AREA_THRESHOLD,
  minSamples = WEAK_AREA_MIN_SAMPLES
): WeakArea[] {
  return groups
    .filter((g) => g.total >= minSamples && g.accuracy < threshold)
    .map((g) => ({
      key: g.key,
      label: g.key,
      accuracy: g.accuracy,
      total: g.total,
      gap: threshold - g.accuracy,
    }))
    .sort((a, b) => b.gap - a.gap);
}

export function buildRecommendations(
  result: Omit<AssessmentResult, "recommendations">,
  weakAreas: WeakArea[]
): Recommendation[] {
  const recs: Recommendation[] = [];

  const sortedSubjects = [...result.subjectPerformance].sort(
    (a, b) => a.accuracy - b.accuracy
  );
  const weakest = sortedSubjects[0];
  const strongest = sortedSubjects[sortedSubjects.length - 1];

  if (weakest && weakest.accuracy < WEAK_AREA_THRESHOLD) {
    recs.push({
      type: "practice_topic",
      title: `Practice ${weakest.key}`,
      detail: `Your accuracy in ${weakest.key} is ${weakest.accuracy}%. Targeted practice will strengthen this area.`,
      subject: weakest.key,
      priority: 100,
    });
    recs.push({
      type: "tutor_session",
      title: `Book a tutor session on ${weakest.key}`,
      detail: `Work through ${weakest.key} questions with the guided tutor to close the gap.`,
      subject: weakest.key,
      priority: 90,
    });
  }

  for (const w of weakAreas.slice(0, 3)) {
    recs.push({
      type: "review_topic",
      title: `Review ${w.label}`,
      detail: `${w.total} questions answered at ${w.accuracy}% accuracy. Review the rationales before your next attempt.`,
      topic: w.label,
      priority: 80 - w.gap,
    });
  }

  if (strongest && result.mode !== "exam") {
    recs.push({
      type: "take_test",
      title: `Validate with a Test in ${strongest.key}`,
      detail: `You are strongest in ${strongest.key} (${strongest.accuracy}%). Confirm with a timed test.`,
      subject: strongest.key,
      priority: 40,
    });
  }

  if (recs.length === 0) {
    recs.push({
      type: "practice_topic",
      title: "Keep your streak going",
      detail:
        "Great work — no weak areas detected yet. Continue mixed practice to stay sharp.",
      priority: 10,
    });
  }

  return recs.sort((a, b) => b.priority - a.priority);
}

/**
 * The single, authoritative scoring + analytics routine.
 *
 * In production this runs on the server (see `src/lib/api/assessment.ts`).
 * Here it is a pure function so it is identical whether called client- or
 * server-side, and fully unit-testable.
 */
export function computeResult(
  attempt: AssessmentAttempt,
  questions: Question[],
  base: {
    id: string;
    userId: string;
    assessmentId: string;
    startedAt: string;
    durationMinutes: number;
    passingScore: number;
    mode: AssessmentMode;
    timeUsedMinutes: number;
  },
  exam: Pick<Exam, "title">
): AssessmentResult {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const answers = attempt.questionIds
    .map((qid) => {
      const q = byId.get(qid);
      const a = attempt.answers[qid];
      if (!q || !a) return null;
      const isCorrect = evaluateAnswer(
        q,
        a.selectedOptionId,
        a.selectedOptionIds
      );
      return { question: q, attempt: a, isCorrect };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const total = answers.length;
  const answered = answers.filter(
    (x) =>
      x.attempt.selectedOptionId !== null ||
      (x.attempt.selectedOptionIds?.length ?? 0) > 0
  ).length;
  const correct = answers.filter((x) => x.isCorrect).length;
  const unanswered = total - answered;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  const passingScore = base.passingScore;
  const passed =
    base.mode === "exam"
      ? percentage >= passingScore
      : percentage >= Math.min(passingScore, 100);

  const { subject, topic, difficulty, type } = groupAccuracy(
    answers.map((x) => ({
      subject: x.question.subject,
      topic: x.question.topic,
      difficulty: x.question.difficulty,
      questionType: x.question.questionType,
      isCorrect: x.isCorrect,
    }))
  );

  const weakAreas = detectWeakAreas([...subject, ...topic]);

  const resultBase = {
    id: base.id,
    attemptId: attempt.id,
    assessmentId: base.assessmentId,
    mode: base.mode,
    userId: base.userId,
    examTitle: exam.title,
    score: percentage,
    correct,
    total,
    unanswered,
    answered,
    percentage,
    passed,
    passingScore,
    timeUsedMinutes: base.timeUsedMinutes,
    durationMinutes: base.durationMinutes,
    submittedAt: new Date().toISOString(),
    startedAt: base.startedAt,
    subjectPerformance: subject,
    topicPerformance: topic,
    difficultyPerformance: difficulty,
    questionTypePerformance: type,
    weakAreas,
    answers: answers.map((x) => ({
      question: x.question,
      selectedOptionId: x.attempt.selectedOptionId,
      selectedOptionIds: x.attempt.selectedOptionIds,
      isCorrect: x.isCorrect,
      flagged: x.attempt.flagged,
      hintsUsed: x.attempt.hintsUsed,
    })),
  };

  return {
    ...resultBase,
    recommendations: buildRecommendations(resultBase, weakAreas),
  };
}

/**
 * Derives a sensible default AssessmentConfig from an exam + mode, applying
 * the centralized ModeConfig (timer strictness, randomization, etc.).
 */
export function defaultAssessmentConfig(
  exam: Pick<
    Exam,
    "id" | "totalQuestions" | "durationMinutes" | "passingScore"
  >,
  mode: AssessmentMode,
  modeConfig: ModeConfig = getModeConfig(mode)
): AssessmentConfig {
  return {
    mode,
    questionCount: exam.totalQuestions,
    durationMinutes: modeConfig.timer === "none" ? 0 : exam.durationMinutes,
    passingScore: exam.passingScore,
    randomizeQuestions: modeConfig.randomizeQuestions,
    randomizeOptions: modeConfig.randomizeOptions,
    optionalTimer: modeConfig.timer === "optional",
    filter: {},
  };
}
