"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, FlagIcon, XIcon } from "@/components/ui/icons";
import type { AnswerOptionId } from "@/types";

export type QuestionStatus = "answered" | "unanswered" | "flagged" | "correct" | "incorrect";

export function ExamNavigator({
  total,
  statuses,
  current,
  onJump,
}: {
  total: number;
  statuses: QuestionStatus[];
  current: number;
  onJump: (index: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-success-500" /> Answered
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded-full border border-line" /> Unanswered
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-warning-500" /> Flagged
        </span>
      </div>
      <ul className="grid grid-cols-5 gap-2 sm:grid-cols-8">
        {Array.from({ length: total }).map((_, i) => {
          const status = statuses[i];
          const isCurrent = i === current;
          const isAnswered = status === "answered" || status === "correct";
          const isFlagged = status === "flagged" || status === "incorrect";
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => onJump(i)}
                aria-label={`Go to question ${i + 1}, ${status}`}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "flex h-9 w-full items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                  isCurrent && "ring-2 ring-brand-500 ring-offset-1",
                  status === "correct" && "border-success-500 bg-success-50 text-success-700",
                  status === "incorrect" && "border-danger-500 bg-danger-50 text-danger-700",
                  status === "flagged" && "border-warning-500 bg-warning-50 text-warning-700",
                  isAnswered && !isCurrent && "border-success-500 bg-success-50 text-success-700",
                  status === "unanswered" && !isCurrent && "border-line text-muted",
                  isCurrent && status === "unanswered" && "border-line text-muted"
                )}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
