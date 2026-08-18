import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExam } from "@/lib/api/exams";
import { getQuestions } from "@/lib/api/questions";
import { ResultsView } from "@/components/results/ResultsView";

export const metadata: Metadata = {
  title: "Exam Results",
  robots: { index: false, follow: false },
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exam = await getExam(id);
  if (!exam) notFound();
  const questions = await getQuestions(exam.id);

  return <ResultsView exam={exam} questions={questions} />;
}
