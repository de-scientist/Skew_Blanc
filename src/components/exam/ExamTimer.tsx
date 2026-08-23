"use client";

import { useEffect, useRef, useState } from "react";
import { cn, formatClock } from "@/lib/utils";
import { ClockIcon } from "@/components/ui/icons";

export function ExamTimer({
  initialSeconds,
  onExpire,
  running = true,
}: {
  initialSeconds: number;
  onExpire: () => void;
  running?: boolean;
}) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const expiredRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0 && !expiredRef.current) {
      expiredRef.current = true;
      onExpire();
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft, running, onExpire]);

  const warning = secondsLeft <= 60;
  const minutes = Math.floor(secondsLeft / 60);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold tabular-nums",
        warning ? "bg-danger-50 text-danger-700" : "bg-canvas text-ink"
      )}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${minutes} minutes ${
        warning ? "(low time)" : ""
      }`}
    >
      <ClockIcon className="h-4 w-4" />
      {formatClock(secondsLeft)}
      {warning && <span className="sr-only">— less than one minute left</span>}
    </div>
  );
}
