import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/cards";
import { ArrowRightIcon, FlameIcon } from "@/components/ui/icons";
import { formatNumber } from "@/lib/utils";

export function DashboardHeader({
  studentName,
  continuePractice,
}: {
  studentName: string;
  continuePractice: { examTitle: string; unanswered: number };
}) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-100">
            {greeting}, {studentName}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Continue your nursing exam preparation.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-brand-100">
            You have {continuePractice.unanswered} unanswered questions in{" "}
            {continuePractice.examTitle}. A short session today keeps your
            streak alive.
          </p>
        </div>
        <GlassCard className="flex shrink-0 items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white">
          <FlameIcon className="h-6 w-6 text-warning-300" />
          <div>
            <p className="text-xs text-white/70">Study streak</p>
            <p className="text-lg font-bold">12 days</p>
          </div>
        </GlassCard>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/exam/rn-nursing"
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
            className: "bg-surface text-ink hover:bg-subtle",
          })}
        >
          Continue practice
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link
          href="/exams/nclex-rn"
          className={buttonVariants({
            variant: "ghost",
            size: "lg",
            className: "text-white hover:bg-white/10",
          })}
        >
          Browse exams
        </Link>
      </div>
    </section>
  );
}
