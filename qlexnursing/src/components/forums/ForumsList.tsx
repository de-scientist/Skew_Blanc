"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { buttonVariants } from "@/components/ui/Button";
import { forumTopics } from "@/data/mock/content";
import { SearchIcon, MessageIcon, EyeIcon, ArrowRightIcon, PlusIcon, CheckCircleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ForumsList() {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("All");

  const categories = ["All", ...Array.from(new Set(forumTopics.map((t) => t.category)))];
  const filtered = forumTopics.filter((t) => {
    const matchQ = t.title.toLowerCase().includes(q.toLowerCase()) || t.excerpt.toLowerCase().includes(q.toLowerCase());
    const matchC = cat === "All" || t.category === cat;
    return matchQ && matchC;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search discussions…" className="input-icon" aria-label="Search forums" />
        </div>
        <Link href="/forums/new" className={buttonVariants({ variant: "primary", size: "md" })}>
          <PlusIcon className="h-4 w-4" /> New topic
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} className={cn("rounded-xl border px-3 py-1.5 text-sm font-semibold", cat === c ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted hover:bg-brand-50")}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((t) => (
          <Link key={t.id} href={`/forums/${t.slug}`} className="group">
              <Card className="transition-all hover:border-brand-300 hover:shadow-card-hover">
                <CardContent className="flex items-center gap-4">
                  <Avatar name={t.author} className="h-11 w-11 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{t.category}</Badge>
                    {t.pinned && <Badge tone="warning">Pinned</Badge>}
                    {t.solved && <Badge tone="success">Solved</Badge>}
                  </div>
                  <h3 className="mt-1 truncate font-semibold text-ink group-hover:text-brand-700">{t.title}</h3>
                  <p className="truncate text-sm text-muted">{t.excerpt}</p>
                </div>
                <div className="hidden shrink-0 items-center gap-4 text-xs text-muted sm:flex">
                  <span className="inline-flex items-center gap-1"><MessageIcon className="h-3.5 w-3.5" /> {t.replies}</span>
                  <span className="inline-flex items-center gap-1"><EyeIcon className="h-3.5 w-3.5" /> {t.views}</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-muted">No discussions found.</p>
      )}
    </div>
  );
}
