"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { Exam } from "@/types";
import type { AssessmentResult } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DonutChart } from "@/components/ui/DonutChart";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonVariants } from "@/components/ui/Button";
import { QuestionCard } from "@/components/exam/QuestionCard";
import {
  ClockIcon,
  CheckIcon,
  XIcon,
  ArrowRightIcon,
  LightbulbIcon,
} from "@/components/ui/icons";
import { formatClock, formatDuration } from "@/lib/utils";
import { getModeConfig } from "@/lib/assessment/modes";

function accuracyTone(accuracy: number): "success" | "brand" | "warning" {
  if (accuracy >= 80) return "success";
  if (accuracy >= 70) return "brand";
  return "warning";
}

export function AssessmentResults({
  result,
  exam,
}: {
  result: AssessmentResult;
  exam: Exam;
}) {
  const [showReview, setShowReview] = useMemo(
    () => [false, (v: boolean) => v] as const,
    []
  );
  const modeConfig = getModeConfig(result.mode);
  const scoreTone = result.passed ? "success" : "warning";

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white sm:p-8">
        <p className="text-sm font-medium text-brand-100">
          {modeConfig.label} complete
        </p>
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
                  {formatClock(result.timeUsedMinutes * 60)}
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
          <DonutChart value={result.score} sublabel="Score" label="Score" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${result.passed ? "bg-success-500 text-white" : "bg-warning-500 text-white"}`}>
            {result.passed
              ? result.mode === "exam"
                ? "Passed"
                : "Target met"
              : result.mode === "exam"
                ? "Below passing"
                : "Below target"}
          </span>
          <Badge tone="secondary">{modeConfig.label}</Badge>
          {result.weakAreas.length > 0 && (
            <Badge tone="warning">
              {result.weakAreas.length} weak area
              {result.weakAreas.length === 1 ? "" : "s"}
            </Badge>
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Overall</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Score" value={`${result.score}%`} />
            <Row
              label={result.mode === "exam" ? "Passing" : "Target"}
              value={`${result.passingScore}%`}
            />
            <Row
              label="Result"
              value={
                <Badge tone={scoreTone === "success" ? "success" : "warning"}>
                  {result.passed ? "Passed" : "Below target"}
                </Badge>
              }
            />
            <Row
              label="Time spent"
              value={formatDuration(result.timeUsedMinutes)}
            />
            <Row label="Answered" value={`${result.answered} / ${result.total}`} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance by subject</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.subjectPerformance.map((s) => (
              <div key={s.key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{s.key}</span>
                  <span className="tabular-nums text-muted">
                    {s.accuracy}% · {s.questions} Qs
                  </span>
                </div>
                <ProgressBar value={s.accuracy} tone={accuracyTone(s.accuracy)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>By topic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.topicPerformance.map((t) => (
              <div key={t.key}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{t.key}</span>
                  <span className="tabular-nums text-muted">{t.accuracy}%</span>
                </div>
                <ProgressBar value={t.accuracy} tone="brand" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>By difficulty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.difficultyPerformance.map((d) => (
              <div key={d.key}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{d.key}</span>
                  <span className="tabular-nums text-muted">{d.accuracy}%</span>
                </div>
                <ProgressBar value={d.accuracy} tone={accuracyTone(d.accuracy)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {result.weakAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Weak areas to target</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.weakAreas.map((w) => (
              <div
                key={w.key}
                className="flex items-center justify-between rounded-xl border border-line bg-canvas px-4 py-3"
              >
                <div>
                  <p className="font-medium text-ink">{w.label}</p>
                  <p className="text-xs text-muted">
                    {w.total} questions · {w.accuracy}% accuracy · {w.gap} pts
                    below target
                  </p>
                </div>
                <Link
                  href={`/assessment/${exam.id}?mode=practice`}
                  className={buttonVariants({ variant: "secondary", size: "sm" })}
                >
                  Practice
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {result.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LightbulbIcon className="h-5 w-5 text-accent-600" /> Recommended
              next steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.recommendations.slice(0, 5).map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-line bg-canvas px-4 py-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs font-bold text-accent-700">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-ink">{r.title}</p>
                  <p className="text-sm text-muted">{r.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowReview(!showReview)}
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          {showReview ? "Hide review" : "Review answers"}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
        <Link
          href={`/assessment/${exam.id}?mode=${result.mode}`}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Retake ({modeConfig.label})
        </Link>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "ghost", size: "lg" })}
        >
          Back to dashboard
        </Link>
      </div>

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
                  flagged={item.flagged}
                  optionOrder={item.question.options.map((o) => o.id)}
                  mode="review"
                  isCorrect={item.isCorrect}
                  rationales={item.question.optionRationales}
                  showRationales
                />
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
