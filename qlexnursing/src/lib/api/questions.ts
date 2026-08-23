import type { Question } from "@/types";
import { buildMockQuestions, buildQuestionPool } from "@/data/mock/questions";
import { mockExams } from "@/data/mock/exams";
import { request } from "./client";

export async function getQuestions(examId: string): Promise<Question[]> {
  const exam = mockExams.find((e) => e.id === examId);
  const total = exam?.totalQuestions ?? 40;
  return request(buildMockQuestions(examId, total));
}

/**
 * Returns the full question pool for an assessment, larger than the number of
 * questions shown in a single attempt so the engine can apply pooling,
 * filters, and randomization. In production this maps to
 * `GET /assessments/:id/questions?pool=true`.
 */
export async function getQuestionPool(examId: string): Promise<Question[]> {
  const exam = mockExams.find((e) => e.id === examId);
  const size = Math.max(exam?.totalQuestions ?? 40, 60);
  return request(buildQuestionPool(examId, size));
}
