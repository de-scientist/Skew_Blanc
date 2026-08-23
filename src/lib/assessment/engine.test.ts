import { describe, it, expect } from "vitest";
import type { AnswerOptionId, Exam, Question } from "@/types";
import type {
  AssessmentAttempt,
  AssessmentConfig,
  AssessmentMode,
  AssessmentResult,
  QuestionAttempt,
} from "@/types/assessment";
import {
  buildRecommendations,
  computeResult,
  defaultAssessmentConfig,
  detectWeakAreas,
  evaluateAnswer,
  getModeConfig,
  mulberry32,
  selectQuestions,
  shuffledOptionOrder,
  shuffle,
  WEAK_AREA_MIN_SAMPLES,
  WEAK_AREA_THRESHOLD,
} from "@/lib/assessment/engine";

// --- Test factories -------------------------------------------------------

function makeQuestion(overrides: Partial<Question> = {}): Question {
  const id = overrides.id ?? "q1";
  return {
    id,
    examId: "exam-1",
    number: 1,
    subject: "Fundamentals",
    text: `Question ${id}`,
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "B" },
      { id: "C", text: "C" },
      { id: "D", text: "D" },
    ],
    correctOptionId: "A",
    explanation: "Because A is correct.",
    ...overrides,
  };
}

function makeAttempt(
  questions: Question[],
  answers: Record<string, Partial<QuestionAttempt>>,
  mode: AssessmentMode = "practice"
): AssessmentAttempt {
  const config: AssessmentConfig = {
    mode,
    questionCount: questions.length,
    durationMinutes: 30,
    passingScore: 70,
    randomizeQuestions: false,
    randomizeOptions: false,
    optionalTimer: false,
    filter: {},
  };
  const fullAnswers: Record<string, QuestionAttempt> = {};
  for (const q of questions) {
    fullAnswers[q.id] = {
      questionId: q.id,
      selectedOptionId: null,
      isCorrect: false,
      timeSpentSeconds: 0,
      hintsUsed: 0,
      flagged: false,
      answeredAt: null,
      questionOrder: questions.indexOf(q),
      changedAnswer: false,
      ...answers[q.id],
    } as QuestionAttempt;
  }
  return {
    id: "att-1",
    userId: "u-1",
    assessmentId: "exam-1",
    mode,
    status: "in_progress",
    startedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    durationMinutes: 30,
    config,
    questionIds: questions.map((q) => q.id),
    answers: fullAnswers,
    questionCount: questions.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

const baseResultInput = {
  id: "att-1",
  userId: "u-1",
  assessmentId: "exam-1",
  startedAt: new Date().toISOString(),
  durationMinutes: 30,
  passingScore: 70,
  timeUsedMinutes: 12,
};

const dummyExam: Pick<Exam, "title"> = { title: "RN Nursing" };

// --- evaluateAnswer ------------------------------------------------------

describe("evaluateAnswer", () => {
  it("marks a single-choice answer correct when it matches the key", () => {
    const q = makeQuestion({ correctOptionId: "C" });
    expect(evaluateAnswer(q, "C")).toBe(true);
    expect(evaluateAnswer(q, "A")).toBe(false);
    expect(evaluateAnswer(q, null)).toBe(false);
  });

  it("handles multiple_choice via correctOptionIds", () => {
    const q = makeQuestion({
      questionType: "multiple_choice",
      correctOptionId: "A",
      correctOptionIds: ["A", "C"],
    });
    expect(evaluateAnswer(q, null, ["A", "C"])).toBe(true);
    expect(evaluateAnswer(q, null, ["C", "A"])).toBe(true); // order-independent
    expect(evaluateAnswer(q, null, ["A", "B"])).toBe(false); // missing one
    expect(evaluateAnswer(q, null, ["A", "C", "D"])).toBe(false); // extra
  });
});

// --- PRNG / shuffle ------------------------------------------------------

describe("mulberry32 + shuffle", () => {
  it("is deterministic for a given seed", () => {
    const a = mulberry32(123);
    const b = mulberry32(123);
    const seqA = [a(), a(), a()];
    const seqB = [b(), b(), b()];
    expect(seqA).toEqual(seqB);
  });

  it("produces different sequences for different seeds", () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    expect([a(), a()]).not.toEqual([b(), b()]);
  });

  it("shuffle is deterministic with a seeded rng and non-mutating", () => {
    const input = [1, 2, 3, 4, 5];
    const out1 = shuffle(input, mulberry32(42));
    const out2 = shuffle(input, mulberry32(42));
    expect(out1).toEqual(out2);
    expect(input).toEqual([1, 2, 3, 4, 5]); // original untouched
    expect(out1.slice().sort()).toEqual(input); // same elements
  });

  it("shuffledOptionOrder returns a permutation of the option ids", () => {
    const q = makeQuestion();
    const order = shuffledOptionOrder(q, mulberry32(7));
    expect(order.slice().sort()).toEqual(["A", "B", "C", "D"]);
    expect(order).toHaveLength(4);
  });
});

// --- selectQuestions -----------------------------------------------------

describe("selectQuestions", () => {
  const pool = [
    makeQuestion({ id: "m1", subject: "Math" }),
    makeQuestion({ id: "m2", subject: "Math" }),
    makeQuestion({ id: "s1", subject: "Science" }),
    makeQuestion({ id: "s2", subject: "Science" }),
    makeQuestion({ id: "s3", subject: "Science" }),
  ];

  it("slices to the requested count", () => {
    const out = selectQuestions(
      pool,
      { mode: "practice", questionCount: 3, durationMinutes: 0, passingScore: 70, randomizeQuestions: false, randomizeOptions: false, optionalTimer: false, filter: {} },
      { seed: 1 }
    );
    expect(out).toHaveLength(3);
  });

  it("filters by subject", () => {
    const out = selectQuestions(
      pool,
      { mode: "practice", questionCount: 10, durationMinutes: 0, passingScore: 70, randomizeQuestions: false, randomizeOptions: false, optionalTimer: false, filter: { subject: "Math" } },
      { seed: 1 }
    );
    expect(out).toHaveLength(2);
    expect(out.every((q) => q.subject === "Math")).toBe(true);
  });

  it("keeps pool order when randomization is off", () => {
    const out = selectQuestions(
      pool,
      { mode: "practice", questionCount: 10, durationMinutes: 0, passingScore: 70, randomizeQuestions: false, randomizeOptions: false, optionalTimer: false, filter: { subject: "Science" } },
      { seed: 1 }
    );
    expect(out.map((q) => q.id)).toEqual(["s1", "s2", "s3"]);
  });

  it("falls back to the whole pool when the filter matches nothing", () => {
    const out = selectQuestions(
      pool,
      { mode: "practice", questionCount: 10, durationMinutes: 0, passingScore: 70, randomizeQuestions: false, randomizeOptions: false, optionalTimer: false, filter: { subject: "History" } },
      { seed: 1 }
    );
    expect(out).toHaveLength(pool.length);
  });

  it("biases toward weak keys when onlyWeak is set", () => {
    const out = selectQuestions(
      pool,
      { mode: "practice", questionCount: 10, durationMinutes: 0, passingScore: 70, randomizeQuestions: false, randomizeOptions: false, optionalTimer: false, filter: { onlyWeak: true } },
      { seed: 1, weakKeys: ["Math"] }
    );
    expect(out.every((q) => q.subject === "Math")).toBe(true);
  });
});

// --- detectWeakAreas -----------------------------------------------------

describe("detectWeakAreas", () => {
  it("flags groups below threshold with sufficient samples", () => {
    const groups = [
      withAccuracy("Pharmacology", 2, 5), // 40%
      withAccuracy("Pediatrics", 9, 10), // 90%
    ];
    const weak = detectWeakAreas(groups);
    expect(weak).toHaveLength(1);
    expect(weak[0].key).toBe("Pharmacology");
  });

  it("ignores small samples below minSamples", () => {
    const groups = [withAccuracy("Fundamentals", 0, 1)]; // 0% but n=1
    expect(detectWeakAreas(groups)).toHaveLength(0);
  });

  it("respects a custom threshold and minSamples", () => {
    const groups = [withAccuracy("A", 2, 3)]; // 66%
    expect(detectWeakAreas(groups, 60, 2)).toHaveLength(1);
    expect(detectWeakAreas(groups, 70, 2)).toHaveLength(0);
  });
});

// --- computeResult -------------------------------------------------------

describe("computeResult", () => {
  const questions = [
    makeQuestion({ id: "q1", subject: "Pharm", topic: "A", difficulty: "Easy" }),
    makeQuestion({ id: "q2", subject: "Pharm", topic: "B", difficulty: "Hard", correctOptionId: "B" }),
  ];
  const attempt = makeAttempt(questions, {
    q1: { selectedOptionId: "A", isCorrect: true },
    q2: { selectedOptionId: "C", isCorrect: false },
  });

  it("computes totals, percentage, and pass/fail", () => {
    const result = computeResult(attempt, questions, { ...baseResultInput, mode: "exam" }, dummyExam);
    expect(result.total).toBe(2);
    expect(result.correct).toBe(1);
    expect(result.percentage).toBe(50);
    expect(result.passed).toBe(false); // 50 < 70 passing
  });

  it("reports subject, topic, and difficulty performance", () => {
    const result = computeResult(attempt, questions, { ...baseResultInput, mode: "practice" }, dummyExam);
    expect(result.subjectPerformance[0]).toMatchObject({ key: "Pharm", correct: 1, total: 2, accuracy: 50 });
    expect(result.topicPerformance).toHaveLength(2);
    expect(result.difficultyPerformance).toHaveLength(2);
  });

  it("detects weak areas when a subject is below threshold with enough samples", () => {
    const weakQuestions = [
      makeQuestion({ id: "w1", subject: "Pharmacology", correctOptionId: "B" }),
      makeQuestion({ id: "w2", subject: "Pharmacology", correctOptionId: "B" }),
      makeQuestion({ id: viewId("w3"), subject: "Pharmacology", correctOptionId: "B" }),
    ];
    const weakAttempt = makeAttempt(weakQuestions, {
      w1: { selectedOptionId: "A", isCorrect: true },
      w2: { selectedOptionId: "A", isCorrect: false },
      [viewId("w3")]: { selectedOptionId: "A", isCorrect: false },
    });
    const result = computeResult(weakAttempt, weakQuestions, { ...baseResultInput, mode: "practice" }, dummyExam);
    expect(result.weakAreas.length).toBeGreaterThanOrEqual(1);
    expect(result.weakAreas[0].key).toBe("Pharmacology");
    expect(result.recommendations.some((r) => r.type === "practice_topic")).toBe(true);
  });

  it("never exposes an answer key in the result object", () => {
    const result = computeResult(attempt, questions, { ...baseResultInput }, dummyExam);
    expect(JSON.stringify(result)).not.toMatch(/correctOptionId/);
  });
});

// --- buildRecommendations ------------------------------------------------

describe("buildRecommendations", () => {
  it("recommends practice for the weakest subject", () => {
    const partial: Omit<AssessmentResult, "recommendations"> = {
      ...(computeResult(
        makeAttempt(
          [makeQuestion({ id: "z1", subject: "WeakSubj", correctOptionId: "B" })],
          { z1: { selectedOptionId: "A", isCorrect: false } }
        ),
        [makeQuestion({ id: "z1", subject: "WeakSubj", correctOptionId: "B" })],
        { ...baseResultInput },
        dummyExam
      ) as Omit<AssessmentResult, "recommendations">),
    };
    const recs = buildRecommendations(partial, []);
    expect(recs.some((r) => r.type === "practice_topic" && r.subject === "WeakSubj")).toBe(true);
  });
});

// --- mode config ---------------------------------------------------------

describe("mode configuration", () => {
  it("exposes the four modes with distinct behavior", () => {
    const practice = getModeConfig("practice");
    const tutor = getModeConfig("tutor");
    const test = getModeConfig("test");
    const exam = getModeConfig("exam");
    expect(practice.feedback).toBe("immediate");
    expect(tutor.ai).toBe(true);
    expect(test.timer).toBe("enabled");
    expect(exam.timer).toBe("mandatory");
    expect(exam.passingScoreRequired).toBe(true);
  });

  it("derives a sensible config from an exam + mode", () => {
    const cfg = defaultAssessmentConfig(
      { id: "exam-1", totalQuestions: 40, durationMinutes: 60, passingScore: 75 },
      "exam"
    );
    expect(cfg.questionCount).toBe(40);
    expect(cfg.durationMinutes).toBe(60);
    expect(cfg.passingScore).toBe(75);
    expect(cfg.randomizeQuestions).toBe(true);
  });
});

// --- helpers -------------------------------------------------------------

function withAccuracy(key: string, correct: number, total: number) {
  return { key, correct, total, accuracy: Math.round((correct / total) * 100) };
}

function viewId(s: string) {
  return s;
}
