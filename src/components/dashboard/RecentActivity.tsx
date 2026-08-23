import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { formatRelativeTime, formatDuration } from "@/lib/utils";
import type { RecentActivityItem } from "@/types";

const statusTone = {
  completed: "success",
  "in-progress": "accent",
  abandoned: "neutral",
} as const;

export function RecentActivity({ items }: { items: RecentActivityItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-line p-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{item.title}</p>
              <p className="text-xs text-muted">
                {item.status === "completed" && item.completedAt
                  ? `Completed ${formatRelativeTime(item.completedAt)}`
                  : item.status === "in-progress"
                    ? "In progress"
                    : "Abandoned"}
                {" · "}
                {formatDuration(item.durationMinutes)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {item.score !== null && (
                <Badge tone={statusTone[item.status]}>{item.score}%</Badge>
              )}
              <Link
                href={`/results/${item.id === "act-4" ? "nclex-rn" : "nclex-rn"}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Review
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
