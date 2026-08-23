"use client";

import { cn } from "@/lib/utils";
import { FlagIcon, CheckIcon, XIcon } from "@/components/ui/icons";
import type { AnswerOptionId, Question } from "@/types";

export function QuestionCard({
  question,
  index,
  total,
  selectedOptionId,
  flagged,
  onSelect,
  onToggleFlag,
  mode = "practice",
  isCorrect,
  optionOrder,
  disabled,
  rationales,
  showRationales = false,
}: {
  question: Question;
  index: number;
  total: number;
  selectedOptionId: AnswerOptionId | null;
  flagged: boolean;
  onSelect?: (id: AnswerOptionId) => void;
  onToggleFlag?: () => void;
  mode?: "practice" | "review";
  isCorrect?: boolean;
  optionOrder?: AnswerOptionId[];
  disabled?: boolean;
  rationales?: Record<string, string>;
  showRationales?: boolean;
}) {
  const review = mode === "review";
  const order = optionOrder ?? question.options.map((o) => o.id);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-muted">
          Question {index} of {total}
        </p>
        <button
          type="button"
          onClick={onToggleFlag}
          disabled={review || disabled}
          aria-pressed={flagged}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
            flagged
              ? "bg-warning-50 text-warning-700"
              : "bg-subtle text-muted hover:bg-track",
            (review || disabled) && "pointer-events-none opacity-50"
          )}
        >
          <FlagIcon className="h-3.5 w-3.5" />
          {flagged ? "Flagged" : "Flag"}
        </button>
      </div>

      <h2 className="mt-3 text-lg font-semibold leading-snug text-ink">
        {question.text}
      </h2>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-700">
        {question.subject}
        {question.topic ? ` · ${question.topic}` : ""}
        {question.difficulty ? ` · ${question.difficulty}` : ""}
      </p>

      <fieldset className="mt-5 space-y-3" disabled={review || disabled}>
        <legend className="sr-only">Answer options</legend>
        {order.map((optionId) => {
          const option = question.options.find((o) => o.id === optionId);
          if (!option) return null;
          const selected = selectedOptionId === option.id;
          const isCorrectOption = option.id === question.correctOptionId;
          let stateClass = "border-line hover:border-brand-300 hover:bg-brand-50";
          let statusIcon = null;

          if (review) {
            if (isCorrectOption) {
              stateClass = "border-success-500 bg-success-50";
              statusIcon = (
                <CheckIcon className="h-4 w-4 text-success-700" />
              );
            } else if (selected) {
              stateClass = "border-danger-500 bg-danger-50";
              statusIcon = <XIcon className="h-4 w-4 text-danger-700" />;
            } else {
              stateClass = "border-line bg-subtle opacity-70";
            }
          } else if (selected) {
            stateClass = "border-brand-600 bg-brand-50";
          }

          return (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                stateClass
              )}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                className="sr-only"
                checked={selected}
                onChange={() => onSelect?.(option.id)}
                disabled={review}
              />
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  selected || (review && isCorrectOption)
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-line text-muted"
                )}
                aria-hidden="true"
              >
                {option.id}
              </span>
              <span className="flex-1 text-sm text-ink">{option.text}</span>
              {statusIcon}
            </label>
          );
        })}
      </fieldset>

      {review && (
        <div className="mt-5 rounded-xl border border-line bg-canvas p-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            {isCorrect ? (
              <span className="text-success-700">
                <CheckIcon className="inline h-4 w-4" /> Correct
              </span>
            ) : (
              <span className="text-danger-700">
                <XIcon className="inline h-4 w-4" /> Incorrect
              </span>
            )}
          </p>
          <p className="mt-2 text-sm text-ink">
            <span className="font-medium">Explanation: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
