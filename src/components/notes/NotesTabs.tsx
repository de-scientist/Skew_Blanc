"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "All Notes", href: "/notes" },
  { label: "Favorites", href: "/notes/favorites" },
  { label: "Recent", href: "/notes/recent" },
  { label: "Archived", href: "/notes/archived" },
];

export function NotesTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Notes sections" className="flex gap-1 overflow-x-auto rounded-xl bg-subtle p-1">
      {TABS.map((t) => {
        const active =
          t.href === "/notes" ? pathname === "/notes" : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-lg px-3 py-2 text-sm font-semibold",
              active ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink"
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
