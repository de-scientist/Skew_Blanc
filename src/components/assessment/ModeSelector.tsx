import Link from "next/link";
import type { Exam } from "@/types";
import { ORDERED_MODES, getModeConfig } from "@/lib/assessment/modes";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  BookIcon,
  ClipboardIcon,
  SparkIcon,
  TargetIcon,
} from "@/components/ui/icons";

const MODE_ICON = {
  practice: BookIcon,
  tutor: SparkIcon,
  test: ClipboardIcon,
  exam: TargetIcon,
} as const;

function startLabel(mode: (typeof ORDERED_MODES)[number]): string {
  if (mode === "exam") return "Start exam";
  if (mode === "test") return "Take a test";
  if (mode === "tutor") return "Study with the tutor";
  return "Start practicing";
}

/**
 * Mode selection for an exam. Each card launches the shared AssessmentPlayer
 * with the matching centralized ModeConfig, so behavior stays data-driven and
 * the four modes are clearly differentiated for the student.
 */
export function ModeSelector({ exam }: { exam: Exam }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {ORDERED_MODES.map((mode) => {
        const cfg = getModeConfig(mode);
        const Icon = MODE_ICON[mode];
        return (
          <Link
            key={mode}
            href={`/assessment/${exam.id}?mode=${mode}`}
            className="group rounded-2xl border border-line bg-surface p-4 transition hover:border-brand-400 hover:shadow-card"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-ink">{cfg.label}</p>
                <p className="text-xs font-medium text-brand-700">{cfg.tagline}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted">{cfg.description}</p>
            <span
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "mt-3"
              )}
            >
              {startLabel(mode)}
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
