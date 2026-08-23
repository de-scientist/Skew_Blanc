import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExam } from "@/lib/api/exams";
import { AssessmentPlayer } from "@/components/assessment/AssessmentPlayer";
import type { AssessmentMode } from "@/types/assessment";
import { ORDERED_MODES } from "@/lib/assessment/modes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const exam = await getExam(id);
  if (!exam) return { title: "Assessment not found" };
  return {
    title: `Assessment · ${exam.shortTitle}`,
    robots: { index: false, follow: false },
  };
}

export default async function AssessmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { id } = await params;
  const { mode } = await searchParams;
  const exam = await getExam(id);
  if (!exam) notFound();

  const resolved: AssessmentMode = ORDERED_MODES.includes(mode as AssessmentMode)
    ? (mode as AssessmentMode)
    : "practice";

  return <AssessmentPlayer exam={exam} mode={resolved} />;
}
