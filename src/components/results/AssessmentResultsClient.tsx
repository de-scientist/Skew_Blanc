"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Exam } from "@/types";
import type {
  AssessmentAttempt,
  AssessmentMode,
  AssessmentResult,
  QuestionAttempt,
} from "@/types/assessment";
import { fetchResult } from "@/lib/api/assessment";
import { getExam } from "@/lib/api/exams";
import { getQuestionPool } from "@/lib/api/questions";
import { computeResult, defaultAssessmentConfig } from "@/lib/assessment/engine";
import { AssessmentResults } from "@/components/results/AssessmentResults";
import { buttonVariants } from "@/components/ui/Button";

type State =
  | { status: "loading" }
  | { status: "ready"; result: AssessmentResult; exam: Exam }
  | { status: "missing" };

/**
 * Builds a representative `AssessmentResult` for direct/demo navigation
 * (e.g. a dashboard "recent activity" link) so the results screen is always
 * demoable even without a stored attempt. It runs the real engine
 * (`computeResult`) so the produced shape matches production exactly — there
 * is no second result-building code path.
 */
async function buildDemoResult(examId: string): Promise<AssessmentResult | null> {
  const exam = await getExam(examId);
  if (!exam) return null;
  const questions = await getQuestionPool(examId);
  if (questions.length === 0) return null;

  const questionIds = questions.map((q) => q.id);
  const answers: Record<string, QuestionAttempt> = {};
  questions.forEach((q, i) => {
    const isCorrect = i % 5 !== 0; // ~80% accuracy
    const wrong = q.options.find((o) => o.id !== q.correctOptionId) ?? q.options[0];
    answers[q.id] = {
      questionId: q.id,
      selectedOptionId: isCorrect ? q.correctOptionId : wrong.id,
      isCorrect,
      timeSpentSeconds: 30,
      hintsUsed: 0,
      flagged: i === 3,
      answeredAt: new Date().toISOString(),
      questionOrder: i,
      changedAnswer: false,
    };
  });

  const attempt: AssessmentAttempt = {
    id: `demo-${examId}`,
    userId: "demo-user",
    assessmentId: examId,
    mode: "practice" as AssessmentMode,
    status: "completed",
    startedAt: new Date().toISOString(),
    expiresAt: new Date().toISOString(),
    durationMinutes: exam.durationMinutes,
    config: defaultAssessmentConfig(exam, "practice"),
    questionIds,
    answers,
    questionCount: questions.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return computeResult(
    attempt,
    questions,
    {
      id: attempt.id,
      userId: attempt.userId,
      assessmentId: examId,
      startedAt: attempt.startedAt,
      durationMinutes: exam.durationMinutes,
      passingScore: exam.passingScore,
      mode: "practice",
      timeUsedMinutes: Math.max(1, exam.durationMinutes - 12),
    },
    { title: exam.title }
  );
}

/**
 * Single results entry point for both `/assessment/results/[id]` (a real
 * stored attempt) and `/results/[id]` (legacy/demo link where `id` is an
 * exam id). Resolves a stored attempt first, then falls back to a
 * real-engine demo result.
 */
export function AssessmentResultsClient() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const id = params.id;
    let active = true;

    const stored = fetchResult(id);
    if (stored) {
      getExam(stored.assessmentId).then((exam) => {
        if (!active) return;
        if (!exam) setState({ status: "missing" });
        else setState({ status: "ready", result: stored, exam });
      });
      return;
    }

    buildDemoResult(id).then((demo) => {
      if (!active) return;
      if (!demo) setState({ status: "missing" });
      else setState({ status: "ready", result: demo, exam: { id, title: demo.examTitle } as Exam });
    });

    return () => {
      active = false;
    };
  }, [params.id]);

  if (state.status === "loading") {
    return (
      <div className="container-page py-10">
        <div className="h-64 animate-pulse rounded-2xl bg-track" />
      </div>
    );
  }

  if (state.status === "missing") {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-lg font-semibold text-ink">Results not found</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          This assessment result is no longer available on this device. Start a
          new session from your dashboard to see a full breakdown.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className={buttonVariants({ variant: "primary", size: "lg", className: "mt-6" })}
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  return <AssessmentResults result={state.result} exam={state.exam} />;
}
