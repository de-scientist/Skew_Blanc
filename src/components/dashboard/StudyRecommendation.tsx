import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { SparkIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { RecommendedArea } from "@/types";

export function StudyRecommendation({ area }: { area: RecommendedArea }) {
  const gap = area.overallAccuracy - area.accuracy;
  return (
    <Card className="border-brand-200 bg-brand-50/40">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
            <SparkIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              Recommended focus area
            </p>
            <h3 className="text-lg font-bold text-ink">{area.subject}</h3>
            <p className="mt-1 max-w-xl text-sm text-muted">{area.reason}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge tone="warning">Your accuracy {area.accuracy}%</Badge>
              <Badge tone="neutral">Avg {area.overallAccuracy}%</Badge>
              <span className="text-xs text-muted">
                {gap} pts below average
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/assessment/rn-nursing?mode=practice"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Practice {area.subject}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
