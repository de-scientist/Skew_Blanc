import type { Exam, Question } from "@/types";
import type {
  AssessmentAttempt,
  AssessmentConfig,
  AssessmentMode,
  AssessmentResult,
} from "@/types/assessment";
import { getQuestionPool } from "./questions";
import {
  createAttempt,
  getAttempt,
  saveAnswer,
  saveAttempt,
  submitAttempt,
  getResult,
  getHistory,
} from "@/lib/assessment/attempt";
import {
  defaultAssessmentConfig,
  selectQuestions,
} from "@/lib/assessment/engine";
import { getModeConfig } from "@/lib/assessment/modes";

export interface StartAssessmentInput {
  exam: Exam;
  mode: AssessmentMode;
  overrides?: Partial<AssessmentConfig>;
}

export interface StartAssessmentOutput {
  attempt: AssessmentAttempt;
  questions: Question[];
}

/**
 * Single seam the frontend uses for the assessment engine.
 *
 * Today these calls are backed by the localStorage attempt service. The
 * signatures mirror the planned REST API (start → answers → submit → result)
 * so a real backend can be wired in `src/lib/api/*` without touching the UI.
 */
export async function startAssessment(
  input: StartAssessmentInput
): Promise<StartAssessmentOutput> {
  const modeConfig = getModeConfig(input.mode);
  const config: AssessmentConfig = {
    ...defaultAssessmentConfig(input.exam, input.mode, modeConfig),
    ...input.overrides,
    mode: input.mode,
  };

  const pool = await getQuestionPool(input.exam.id);
  const seed = Math.floor(Math.random() * 1e9);
  const questions = selectQuestions(pool, config, { seed });

  const attempt = createAttempt(
    input.exam.id,
    input.mode,
    config,
    questions.map((q) => q.id)
  );

  return { attempt, questions };
}

export function fetchAttempt(id: string): AssessmentAttempt | null {
  return getAttempt(id);
}

export function autosaveAnswer(
  attemptId: string,
  questionId: string,
  patch: Parameters<typeof saveAnswer>[2]
): AssessmentAttempt | null {
  return saveAnswer(attemptId, questionId, patch);
}

export function autosaveAttempt(attempt: AssessmentAttempt): void {
  saveAttempt(attempt);
}

export function submitAssessment(
  attempt: AssessmentAttempt,
  questions: Question[],
  exam: Pick<Exam, "id" | "title">
): AssessmentResult {
  return submitAttempt(attempt, questions, exam);
}

export function fetchResult(attemptId: string): AssessmentResult | null {
  return getResult(attemptId);
}

export function fetchHistory(): AssessmentResult[] {
  return getHistory();
}
