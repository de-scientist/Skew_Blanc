import type { Exam } from "@/types";
import { mockExams, getMockExamBySlug } from "@/data/mock/exams";
import { request } from "./client";

export async function getExams(): Promise<Exam[]> {
  return request(mockExams);
}

export async function getExam(idOrSlug: string): Promise<Exam | null> {
  const exam =
    mockExams.find((e) => e.id === idOrSlug) ?? getMockExamBySlug(idOrSlug);
  return request(exam ?? null);
}
