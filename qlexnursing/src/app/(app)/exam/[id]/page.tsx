import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExam } from "@/lib/api/exams";
import { getQuestions } from "@/lib/api/questions";
import { ExamInterface } from "@/components/exam/ExamInterface";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const exam = await getExam(id);
  if (!exam) {
    return { title: "Exam not found" };
  }
  return {
    ...createMetadata({
      title: `Taking ${exam.shortTitle}`,
      description: exam.description,
      path: `/exam/${exam.id}`,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exam = await getExam(id);
  if (!exam) notFound();
  const questions = await getQuestions(exam.id);

  return <ExamInterface exam={exam} questions={questions} />;
}
