import Link from "next/link";
import { LIBRARY_TABS, libraryTabHref } from "@/data/mock/library";
import type { LibraryTab } from "@/data/mock/library";
import { cn } from "@/lib/utils";

/** Resource tabs for a topic. Plain links (`?tab=`) so every tab is a
 *  deep-linkable URL — refresh, back/forward, and sharing all work. */
export function TopicTabs({
  subjectSlug,
  topicSlug,
  active,
}: {
  subjectSlug: string;
  topicSlug: string;
  active: LibraryTab;
}) {
  return (
    <nav
      aria-label="Topic learning resources"
      className="flex gap-1 overflow-x-auto rounded-xl bg-subtle p-1"
    >
      {LIBRARY_TABS.map((t) => {
        const on = t.value === active;
        return (
          <Link
            key={t.value}
            href={libraryTabHref(subjectSlug, topicSlug, t.value)}
            aria-current={on ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-lg px-3 py-2 text-sm font-semibold",
              on
                ? "bg-surface text-ink shadow-card"
                : "text-muted hover:text-ink"
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
