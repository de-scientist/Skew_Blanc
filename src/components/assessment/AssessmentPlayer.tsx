"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Exam, Question } from "@/types";
import type {
  AssessmentAttempt,
  AssessmentMode,
  ModeConfig,
} from "@/types/assessment";
import {
  startAssessment,
  autosaveAnswer,
  submitAssessment,
} from "@/lib/api/assessment";
import { getQuestionPool } from "@/lib/api/questions";
import { getModeConfig } from "@/lib/assessment/modes";
import {
  shuffledOptionOrder,
  evaluateAnswer,
} from "@/lib/assessment/engine";
import { getAttempt, getRemainingSeconds } from "@/lib/assessment/attempt";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { ExamNavigator, type QuestionStatus } from "@/components/exam/ExamNavigator";
import { ExamTimer } from "@/components/exam/ExamTimer";
import { TutorPanel } from "@/components/assessment/TutorPanel";
import { ReportQuestionModal } from "@/components/assessment/ReportQuestionModal";
import { Modal, Button } from "@/components/ui/Modal";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
  ClipboardIcon,
} from "@/components/ui/icons";
import type { AnswerOptionId } from "@/types";

type Phase = "loading" | "active" | "submitting";

export function AssessmentPlayer({
  exam,
  mode,
}: {
  exam: Exam;
  mode: AssessmentMode;
}) {
  const router = useRouter();
  const modeConfig: ModeConfig = getModeConfig(mode);
  const sessionKey = `nursora:current:${exam.id}:${mode}`;

  const [phase, setPhase] = useState<Phase>("loading");
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [optionOrders, setOptionOrders] = useState<Record<string, AnswerOptionId[]>>({});
  const [current, setCurrent] = useState(0);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [revealedMap, setRevealedMap] = useState<Record<string, boolean>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const startedRef = useRef(false);

  const loadOrStart = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Resume an in-progress attempt so the authoritative timer survives a
    // refresh or tab close (expiresAt is persisted, not a frontend counter).
    const existingId =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(sessionKey)
        : null;
    const existing = existingId ? getAttempt(existingId) : null;

    if (existing && existing.status === "in_progress") {
      const pool = await getQuestionPool(exam.id);
      const qs = existing.questionIds
        .map((id) => pool.find((q) => q.id === id))
        .filter((q): q is Question => Boolean(q));
      const orders: Record<string, AnswerOptionId[]> = {};
      for (const q of qs) {
        orders[q.id] = modeConfig.randomizeOptions
          ? shuffledOptionOrder(q)
          : q.options.map((o) => o.id);
      }
      setAttempt(existing);
      setQuestions(qs);
      setOptionOrders(orders);
      setPhase("active");
      return;
    }

    const { attempt: att, questions: qs } = await startAssessment({
      exam,
      mode,
    });
    const orders: Record<string, AnswerOptionId[]> = {};
    for (const q of qs) {
      orders[q.id] = modeConfig.randomizeOptions
        ? shuffledOptionOrder(q)
        : q.options.map((o) => o.id);
    }
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(sessionKey, att.id);
    }
    setAttempt(att);
    setQuestions(qs);
    setOptionOrders(orders);
    setPhase("active");
  }, [exam, mode, modeConfig, sessionKey]);

  useEffect(() => {
    void loadOrStart();
  }, [loadOrStart]);

  const total = questions.length;
  const question = questions[current];
  const qid = question?.id ?? "";
  const answer = attempt?.answers[qid];

  const select = useCallback(
    (optionId: AnswerOptionId) => {
      if (!attempt || !question) return;
      if (mode === "practice" && checkedMap[qid]) return;
      if (mode === "tutor" && revealedMap[qid]) return;
      const updated = autosaveAnswer(attempt.id, qid, {
        selectedOptionId: optionId,
      });
      if (updated) setAttempt(updated);
    },
    [attempt, question, mode, qid, checkedMap, revealedMap]
  );

  const toggleFlag = useCallback(() => {
    if (!attempt || !qid) return;
    const cur = attempt.answers[qid];
    const updated = autosaveAnswer(attempt.id, qid, { flagged: !cur.flagged });
    if (updated) setAttempt(updated);
  }, [attempt, qid]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(Math.min(total - 1, Math.max(0, index)));
      setDrawerOpen(false);
    },
    [total]
  );

  const feedbackVisible =
    (mode === "practice" && checkedMap[qid]) ||
    (mode === "tutor" && revealedMap[qid]);

  const statusFor = useCallback(
    (id: string): QuestionStatus => {
      if (!attempt) return "unanswered";
      const a = attempt.answers[id];
      const q = questions.find((x) => x.id === id);
      const isAnswered = a?.selectedOptionId !== null;
      const isFlagged = a?.flagged;
      if (q && a) {
        const fb =
          (mode === "practice" && checkedMap[id]) ||
          (mode === "tutor" && revealedMap[id]);
        if (fb) {
          return evaluateAnswer(q, a.selectedOptionId) ? "correct" : "incorrect";
        }
      }
      if (isFlagged) return "flagged";
      if (isAnswered) return "answered";
      return "unanswered";
    },
    [attempt, questions, mode, checkedMap, revealedMap]
  );

  const statuses: QuestionStatus[] = questions.map((q) => statusFor(q.id));
  const answeredCount = useMemo(
    () => statuses.filter((s) => s === "answered" || s === "correct").length,
    [statuses]
  );
  const flaggedCount = useMemo(
    () => Object.values(attempt?.answers ?? {}).filter((a) => a.flagged).length,
    [attempt]
  );

  const autoSubmitOnExpire =
    modeConfig.timer === "mandatory" || modeConfig.timer === "enabled";

  const doSubmit = useCallback(() => {
    if (!attempt || phase === "submitting") return;
    setPhase("submitting");
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(sessionKey);
    }
    const result = submitAssessment(attempt, questions, {
      id: exam.id,
      title: exam.title,
    });
    router.push(`/assessment/results/${result.attemptId}`);
  }, [attempt, questions, exam, phase, sessionKey, router]);

  if (phase === "loading" || !attempt || !question) {
    return (
      <div className="space-y-4 py-10">
        <div className="h-40 animate-pulse rounded-2xl bg-track" />
        <div className="h-72 animate-pulse rounded-2xl bg-track" />
      </div>
    );
  }

  const isLast = current === total - 1;
  const timerSeconds =
    modeConfig.timer === "none" ? 0 : getRemainingSeconds(attempt);

  const submitLabel =
    mode === "practice" || mode === "tutor" ? "See results" : "Submit";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row lg:gap-6">
      <div className="flex flex-1 flex-col">
        <div className="sticky top-16 z-content -mx-4 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur lg:-mx-8 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {exam.shortTitle} · {modeConfig.label}
              </p>
              <p className="text-xs text-muted">
                Question {current + 1} of {total} · {answeredCount} answered ·{" "}
                {flaggedCount} flagged
              </p>
            </div>
            <div className="flex items-center gap-2">
              {modeConfig.timer !== "none" && (
                <ExamTimer
                  initialSeconds={timerSeconds}
                  onExpire={() => autoSubmitOnExpire && doSubmit()}
                />
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSubmit(true)}
              >
                {isLast ? "Finish" : "Review & Submit"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 py-6">
          <QuestionCard
            question={question}
            index={current + 1}
            total={total}
            selectedOptionId={answer?.selectedOptionId ?? null}
            flagged={answer?.flagged ?? false}
            onSelect={select}
            onToggleFlag={toggleFlag}
            optionOrder={optionOrders[qid]}
            mode={feedbackVisible ? "review" : "practice"}
            isCorrect={evaluateAnswer(question, answer?.selectedOptionId ?? null)}
            rationales={question.optionRationales}
            showRationales={feedbackVisible}
            disabled={feedbackVisible}
          />

          <div className="mt-4 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReportOpen(true)}
            >
              Report question
            </Button>
          </div>

          {mode === "practice" && !checkedMap[qid] && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setCheckedMap((p) => ({ ...p, [qid]: true }))}
                disabled={answer?.selectedOptionId === null}
              >
                Check answer
              </Button>
            </div>
          )}
          {mode === "practice" && checkedMap[qid] && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted">
                Review the explanation, then continue.
              </p>
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Exit practice
              </Button>
            </div>
          )}
          {mode === "tutor" && (
            <div className="mt-4 rounded-xl border border-line bg-canvas p-3 text-xs text-muted">
              Working with the tutor: select an answer, then use the panel to
              get a hint, analyze a mistake, or reveal the answer for learning.
            </div>
          )}
        </div>

        <div className="sticky bottom-16 z-content flex items-center justify-between gap-3 border-t border-line bg-surface/90 py-3 backdrop-blur lg:bottom-0 lg:border-0 lg:bg-transparent">
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
              {mode === "practice" || mode === "tutor" ? "Finish" : "Review & Submit"}
            </Button>
          )}
        </div>
      </div>

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
          {mode === "tutor" ? (
            <TutorPanel
              question={question}
              selectedOptionId={answer?.selectedOptionId ?? null}
              revealAllowed={modeConfig.tutorRevealAllowed}
              onReveal={() => setRevealedMap((p) => ({ ...p, [qid]: true }))}
            />
          ) : (
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
              <p className="mt-3 text-xs text-muted">{modeConfig.description}</p>
            </div>
          )}
        </div>
      </aside>

      <Modal
        open={showSubmit}
        onClose={() => setShowSubmit(false)}
        title={
          mode === "practice" || mode === "tutor"
            ? "Finish session?"
            : "Submit assessment?"
        }
        description={
          mode === "practice" || mode === "tutor"
            ? "Your progress will be scored and saved to your history."
            : `Answered: ${answeredCount} · Unanswered: ${total - answeredCount} · Flagged: ${flaggedCount}. Review before submitting — you cannot change answers after.`
        }
        footer={
          <>
            <Button variant="outline" onClick={() => setShowSubmit(false)}>
              {mode === "practice" || mode === "tutor"
                ? "Keep going"
                : "Return to review"}
            </Button>
            <Button
              onClick={() => {
                setShowSubmit(false);
                doSubmit();
              }}
            >
              {submitLabel}
            </Button>
          </>
        }
      />

      {reportOpen && question && (
        <ReportQuestionModal
          question={question}
          examId={exam.id}
          onClose={() => setReportOpen(false)}
        />
      )}

      {drawerOpen && (
        <div
          className="fixed inset-0 z-modal lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Question navigator"
        >
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
    </div>
  );
}
