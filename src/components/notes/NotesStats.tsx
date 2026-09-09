import { StatCard } from "@/components/ui/StatCard";
import type { NotesStats as Stats } from "@/lib/notes/types";
import {
  BookIcon,
  BookmarkIcon,
  ClockIcon,
  StarIcon,
} from "@/components/ui/icons";

export function NotesStats({ stats }: { stats: Stats }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      role="region"
      aria-label="Notes overview"
    >
      <StatCard
        label="Total Notes"
        value={stats.total}
        footnote={stats.drafts > 0 ? `${stats.drafts} draft${stats.drafts === 1 ? "" : "s"} in progress` : "Your personal library"}
        accent="brand"
        icon={<BookIcon className="h-4 w-4" aria-hidden="true" />}
      />
      <StatCard
        label="Favorites"
        value={stats.favorites}
        footnote="Saved for fast revision"
        accent="accent"
        icon={<BookmarkIcon className="h-4 w-4" aria-hidden="true" />}
      />
      <StatCard
        label="High-Yield"
        value={stats.highYield}
        footnote="Exam-critical concepts"
        accent="warning"
        icon={<StarIcon className="h-4 w-4" aria-hidden="true" />}
      />
      <StatCard
        label="Recently Studied"
        value={stats.recentlyStudied}
        footnote="Active in the last 14 days"
        accent="success"
        icon={<ClockIcon className="h-4 w-4" aria-hidden="true" />}
      />
    </div>
  );
}
