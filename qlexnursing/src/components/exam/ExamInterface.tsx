"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Exam, Question } from "@/types";
import {
  RESULT_STORAGE_KEY,
  buildResult,
  type Submission,
  type SubmissionMap,
} from "@/lib/result";
import { QuestionCard } from "./QuestionCard";
import { ExamNavigator, type QuestionStatus } from "./ExamNavigator";
import { ExamTimer } from "./ExamTimer";
import { Modal, Button } from "@/components/ui/Modal";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
  ClipboardIcon,
} from "@/components/ui/icons";

const emptySubmissions = (questions: Question[]): SubmissionMap =>
  Object.fromEntries(
    questions.map((q) => [q.id, { selectedOptionId: null, flagged: false }])
  );

export function ExamInterface({
  exam,
  questions,
}: {
  exam: Exam;
  questions: Question[];
}) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<SubmissionMap>(() =>
    emptySubmissions(questions)
  );
  const [current, setCurrent] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locked, setLocked] = useState(false);

  const total = questions.length;
  const answeredCount = useMemo(
    () =>
      Object.values(submissions).filter((s) => s.selectedOptionId !== null)
        .length,
    [submissions]
  );
  const flaggedCount = useMemo(
    () => Object.values(submissions).filter((s) => s.flagged).length,
    [submissions]
  );

  const statuses: QuestionStatus[] = questions.map((q) => {
    const s = submissions[q.id];
    if (s.flagged && s.selectedOptionId !== null) return "flagged";
    if (s.flagged) return "flagged";
    if (s.selectedOptionId !== null) return "answered";
    return "unanswered";
  });

  const question = questions[current];

  function select(optionId: Question["options"][number]["id"]) {
    setSubmissions((prev) => ({
      ...prev,
      [question.id]: { ...prev[question.id], selectedOptionId: optionId },
    }));
  }

  function toggleFlag() {
    setSubmissions((prev) => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        flagged: !prev[question.id].flagged,
      },
    }));
  }

  function goTo(index: number) {
    setCurrent(Math.min(total - 1, Math.max(0, index)));
    setDrawerOpen(false);
  }

  function finish() {
    if (locked) return;
    setLocked(true);
    const result = buildResult(
      exam,
      questions,
      submissions,
      Math.max(1, exam.durationMinutes - Math.floor((exam.durationMinutes * current) / total)),
      exam.id
    );
    try {
      localStorage.setItem(
        RESULT_STORAGE_KEY(exam.id),
        JSON.stringify(result)
      );
    } catch {
      // Storage unavailable — proceed to results view anyway.
    }
    router.push(`/results/${exam.id}`);
  }

  const unanswered = total - answeredCount;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row lg:gap-6">
      {/* Main column */}
      <div className="flex flex-1 flex-col">
        <div className="sticky top-16 z-10 -mx-4 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur lg:-mx-8 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {exam.shortTitle}
              </p>
              <p className="text-xs text-muted">
                Question {current + 1} of {total} · {answeredCount} answered ·{" "}
                {flaggedCount} flagged
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ExamTimer
                initialSeconds={exam.durationMinutes * 60}
                onExpire={() => setShowSubmit(true)}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSubmit(true)}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 py-6">
          <QuestionCard
            question={question}
            index={current + 1}
            total={total}
            selectedOptionId={submissions[question.id].selectedOptionId}
            flagged={submissions[question.id].flagged}
            onSelect={select}
            onToggleFlag={toggleFlag}
          />
        </div>

        <div className="sticky bottom-16 z-10 flex items-center justify-between gap-3 border-t border-line bg-surface/90 py-3 backdrop-blur lg:bottom-0 lg:border-0 lg:bg-transparent">
          <Button
            variant="outline"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
          >
            <ChevronLeftIcon className="h-4 w-4" /> Previous
          </Button>
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            <ClipboardIcon className="h-4 w-4" /> Questions
          </Button>
          {current < total - 1 ? (
            <Button onClick={() => goTo(current + 1)}>
              Next <ChevronRightIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => setShowSubmit(true)}>
              Review & Submit
            </Button>
          )}
        </div>
      </div>

      {/* Desktop navigator */}
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-24 space-y-4">
          <div className="card p-4">
            <ExamNavigator
              total={total}
              statuses={statuses}
              current={current}
              onJump={goTo}
            />
          </div>
          <div className="card p-4 text-sm">
            <p className="font-semibold text-ink">Progress</p>
            <p className="mt-1 text-muted">
              {answeredCount} of {total} answered
            </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-track">
              <div
                className="h-full rounded-full bg-brand-600 transition-[width]"
                style={{ width: `${(answeredCount / total) * 100}%` }}
              />
            </div>
            {flaggedCount > 0 && (
              <p className="mt-3 inline-flex items-center gap-1 text-warning-700">
                <FlagIcon className="h-4 w-4" /> {flaggedCount} flagged for review
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-surface p-5">
            <ExamNavigator
              total={total}
              statuses={statuses}
              current={current}
              onJump={goTo}
            />
            <Button
              className="mt-4 w-full"
              variant="outline"
              onClick={() => setDrawerOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <Modal
        open={showSubmit}
        onClose={() => setShowSubmit(false)}
        title="Submit exam?"
        description={
          unanswered > 0
            ? `You still have ${unanswered} unanswered question${
                unanswered === 1 ? "" : "s"
              }. You can review before submitting.`
            : "You have answered every question. Ready to see your results?"
        }
        footer={
          <>
            <Button variant="outline" onClick={() => setShowSubmit(false)}>
              Return to exam
            </Button>
            <Button onClick={finish}>Submit exam</Button>
          </>
        }
      />
    </div>
  );
}
