import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DonutChart } from "@/components/ui/DonutChart";
import { LineChart } from "@/components/ui/LineChart";
import { formatNumber, formatDuration } from "@/lib/utils";
import type { DashboardStats, PerformanceTrendPoint } from "@/types";

export function PerformanceOverview({
  stats,
  trend,
}: {
  stats: DashboardStats;
  trend: PerformanceTrendPoint[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-canvas p-4">
            <DonutChart value={stats.accuracy} sublabel="Accuracy" />
            <div className="grid w-full grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-success-50 p-2">
                <p className="text-lg font-bold text-success-700 tabular-nums">
                  {formatNumber(stats.correctAnswers)}
                </p>
                <p className="text-xs text-muted">Correct</p>
              </div>
              <div className="rounded-lg bg-danger-50 p-2">
                <p className="text-lg font-bold text-danger-700 tabular-nums">
                  {formatNumber(stats.incorrectAnswers)}
                </p>
                <p className="text-xs text-muted">Incorrect</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="text-muted">
                Avg. score{" "}
                <span className="font-semibold text-ink">
                  {stats.averageScore}%
                </span>
              </span>
              <span className="text-muted">
                Time spent{" "}
                <span className="font-semibold text-ink">
                  {formatDuration(stats.timeSpentMinutes)}
                </span>
              </span>
            </div>
            <LineChart
              data={trend.map((point) => ({
                label: point.date,
                value: point.score,
              }))}
            />
            <p className="mt-2 text-xs text-muted">
              Score trend over your last {trend.length} practice sessions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
