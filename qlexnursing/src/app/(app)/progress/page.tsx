import type { Metadata } from "next";
import { getDashboard } from "@/lib/api/dashboard";
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { PerformanceOverview } from "@/components/dashboard/PerformanceOverview";
import { SubjectPerformance } from "@/components/dashboard/SubjectPerformance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { GlassCard } from "@/components/ui/cards";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { mockStreak } from "@/data/mock/user";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatDuration, formatNumber } from "@/lib/utils";
import { FlameIcon, TrendingUpIcon, TargetIcon, ArrowRightIcon, CheckIcon, SparkIcon } from "@/components/ui/icons";

export const metadata: Metadata = createMetadata({
  title: "Progress & Performance",
  description: "Track your nursing exam readiness, accuracy, subject mastery and study streak.",
  path: "/progress",
});

export default async function ProgressPage() {
  const data = await getDashboard();
  const jsonLd = breadcrumbJsonLd([
    { name: "Dashboard", path: "/dashboard" },
    { name: "Progress", path: "/progress" },
  ]);
  const days = Object.entries(mockStreak.thisWeek) as [keyof typeof mockStreak.thisWeek, boolean][];
  const strongest = [...data.subjectPerformance].sort((a, b) => b.accuracy - a.accuracy)[0];
  const weakest = [...data.subjectPerformance].sort((a, b) => a.accuracy - b.accuracy)[0];

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        title="Progress & performance"
        description="Understand where you stand and where to focus next."
        breadcrumbs={[{ name: "Dashboard", href: "/dashboard" }, { name: "Progress" }]}
      />

      <DashboardStats stats={data.stats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PerformanceOverview stats={data.stats} trend={data.trend} />
          <SubjectPerformance data={data.subjectPerformance} />
        </div>

        <div className="space-y-6" id="streak">
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlameIcon className="h-5 w-5 text-warning-500" /> Study streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-ink">🔥 {mockStreak.current} days</p>
              <p className="text-xs text-muted">Longest: {mockStreak.longest} days</p>
              <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
                {days.map(([d, on]) => (
                  <div key={d} className="rounded-lg bg-subtle p-2">
                    <p className="text-[10px] text-muted">{d}</p>
                    {on ? <CheckIcon className="mx-auto mt-1 h-4 w-4 text-success-600" /> : <span className="mx-auto mt-1.5 block h-1.5 w-1.5 rounded-full bg-line" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard id="recap">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SparkIcon className="h-5 w-5 text-brand-600" /> Learning recap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row icon={<CheckIcon className="h-4 w-4 text-success-600" />} label="Questions completed" value={formatNumber(data.stats.questionsAnswered)} />
              <Row icon={<TargetIcon className="h-4 w-4 text-brand-600" />} label="Accuracy" value={`${data.stats.accuracy}%`} />
              <Row icon={<TrendingUpIcon className="h-4 w-4 text-accent-600" />} label="Time studied" value={formatDuration(data.stats.timeSpentMinutes)} />
              <Row icon={<FlameIcon className="h-4 w-4 text-warning-500" />} label="Streak" value={`${mockStreak.current} days`} />
              <div className="rounded-xl bg-success-50 p-3 dark:bg-success-900/20">
                <p className="text-xs font-semibold text-success-700">Strongest: {strongest.subject}</p>
                <ProgressBar value={strongest.accuracy} tone="success" className="mt-1" showValue />
              </div>
              <div className="rounded-xl bg-warning-50 p-3 dark:bg-warning-900/20">
                <p className="text-xs font-semibold text-warning-700">Weakest: {weakest.subject}</p>
                <ProgressBar value={weakest.accuracy} tone="warning" className="mt-1" showValue />
              </div>
              <Badge tone="success">+4 pts vs last week</Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href="/exam/rn-nursing"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Practice weak areas
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted">{icon} {label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
