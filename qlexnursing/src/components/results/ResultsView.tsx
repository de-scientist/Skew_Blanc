"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Exam, ExamResult, Question } from "@/types";
import {
  RESULT_STORAGE_KEY,
  buildDemoResult,
} from "@/lib/result";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DonutChart } from "@/components/ui/DonutChart";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { QuestionCard } from "@/components/exam/QuestionCard";
import {
  ClockIcon,
  CheckIcon,
  XIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";
import { formatClock, formatDuration } from "@/lib/utils";

export function ResultsView({
  exam,
  questions,
}: {
  exam: Exam;
  questions: Question[];
}) {
  const [result, setResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    let parsed: ExamResult | null = null;
    try {
      const raw = localStorage.getItem(RESULT_STORAGE_KEY(exam.id));
      if (raw) parsed = JSON.parse(raw) as ExamResult;
    } catch {
      parsed = null;
    }
    if (!parsed) {
      parsed = buildDemoResult(exam, questions, exam.id);
    }
    setResult(parsed);
  }, [exam, questions]);

  const [showReview, setShowReview] = useState(false);

  const scoreTone = useMemo(() => {
    if (!result) return "brand";
    if (result.score >= exam.passingScore) return "success";
    return "warning";
  }, [result, exam.passingScore]);

  if (!result) {
    return (
      <div className="space-y-4">
        <div className="h-40 animate-pulse rounded-2xl bg-slate-200/70" />
        <div className="h-72 animate-pulse rounded-2xl bg-slate-200/70" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white sm:p-8">
        <p className="text-sm font-medium text-brand-100">Exam complete</p>
        <div className="mt-4 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {result.examTitle}
            </h1>
            <div className="mt-4 flex flex-wrap gap-6">
              <div>
                <p className="flex items-center gap-1.5 text-brand-100">
                  <CheckIcon className="h-4 w-4" /> Correct
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {result.correct} / {result.total}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-brand-100">
                  <ClockIcon className="h-4 w-4" /> Time
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {formatClock(result.timeTakenMinutes * 60)}
                </p>
              </div>
              <div>
                <p className="text-brand-100">Unanswered</p>
                <p className="text-2xl font-bold tabular-nums">
                  {result.unanswered}
                </p>
              </div>
            </div>
          </div>
          <DonutChart
            value={result.score}
            sublabel="Score"
            label="Score"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowReview((v) => !v)}
            className={buttonVariants({
              variant: "secondary",
              size: "lg",
              className: "bg-white text-brand-800 hover:bg-brand-50",
            })}
          >
            {showReview ? "Hide review" : "Review answers"}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <Link
            href={`/exam/${exam.id}`}
            className={buttonVariants({
              variant: "ghost",
              size: "lg",
              className: "text-white hover:bg-white/10",
            })}
          >
            Retake exam
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "ghost",
              size: "lg",
              className: "text-white hover:bg-white/10",
            })}
          >
            Back to dashboard
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-ink">
          Performance summary
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Overall</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Score</span>
                <span className="font-semibold text-ink">{result.score}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Passing</span>
                <span className="font-semibold text-ink">
                  {exam.passingScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Result</span>
                <Badge tone={scoreTone === "success" ? "success" : "warning"}>
                  {result.score >= exam.passingScore ? "Passed" : "Below target"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Time spent</span>
                <span className="font-semibold text-ink">
                  {formatDuration(result.timeTakenMinutes)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance by subject</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.subjectPerformance.map((subject) => {
                const tone =
                  subject.accuracy >= 80
                    ? "success"
                    : subject.accuracy >= 70
                      ? "brand"
                      : "warning";
                return (
                  <div key={subject.subject}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-ink">
                        {subject.subject}
                      </span>
                      <span className="tabular-nums text-muted">
                        {subject.accuracy}% · {subject.questions} Qs
                      </span>
                    </div>
                    <ProgressBar value={subject.accuracy} tone={tone} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      {showReview && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-ink">Question review</h2>
          {result.answers.map((item, i) => (
            <Card key={item.question.id}>
              <CardContent>
                <QuestionCard
                  question={item.question}
                  index={i + 1}
                  total={result.total}
                  selectedOptionId={item.selectedOptionId}
                  flagged={false}
                  mode="review"
                  isCorrect={item.isCorrect}
                />
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
