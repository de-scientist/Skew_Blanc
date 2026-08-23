import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "success" | "warning" | "danger" | "accent";

const tones: Record<Tone, string> = {
  neutral: "bg-subtle text-ink",
  brand:
    "bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200",
  accent:
    "bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-200",
  success:
    "bg-success-50 text-success-700 dark:bg-success-900/40 dark:text-success-200",
  warning:
    "bg-warning-50 text-warning-700 dark:bg-warning-900/40 dark:text-warning-200",
  danger:
    "bg-danger-50 text-danger-700 dark:bg-danger-900/40 dark:text-danger-200",
};

export function Badge({
  tone = "neutral",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
