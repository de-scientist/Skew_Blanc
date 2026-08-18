import type { Question } from "@/types";
import { buildMockQuestions } from "@/data/mock/questions";
import { mockExams } from "@/data/mock/exams";
import { request } from "./client";

export async function getQuestions(examId: string): Promise<Question[]> {
  const exam = mockExams.find((e) => e.id === examId);
  const total = exam?.totalQuestions ?? 40;
  return request(buildMockQuestions(examId, total));
}
