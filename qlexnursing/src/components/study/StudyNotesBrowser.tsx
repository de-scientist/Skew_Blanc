"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { studyNotes } from "@/data/mock/content";
import { SearchIcon, BookIcon, BookmarkIcon, ArrowRightIcon, FileTextIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function StudyNotesBrowser() {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("All");

  const categories = ["All", ...Array.from(new Set(studyNotes.map((n) => n.category)))];
  const filtered = studyNotes.filter((n) => {
    const matchQ = n.title.toLowerCase().includes(q.toLowerCase()) || n.subject.toLowerCase().includes(q.toLowerCase());
    const matchC = cat === "All" || n.category === cat;
    return matchQ && matchC;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes & subjects…" className="input-icon" aria-label="Search study notes" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className={cn("rounded-xl border px-3 py-2 text-sm font-semibold", cat === c ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted hover:bg-brand-50")}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n) => (
          <Card key={n.id} className="group flex h-full flex-col overflow-hidden">
            <ImageFrame
              src={n.cover}
              alt={n.title}
              ratio="ten"
              zoomOnHover
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <CardContent className="flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <Badge tone="brand">{n.category}</Badge>
                {n.favorite && <BookmarkIcon className="h-4 w-4 text-brand-600" />}
              </div>
              <h3 className="mt-3 flex items-center gap-2 text-base font-semibold text-ink">
                <FileTextIcon className="h-4 w-4 text-muted" /> {n.title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-muted">{n.excerpt}</p>
              <div className="mt-3">
                <ProgressBar label="Read" value={n.progress} showValue tone="brand" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>{n.subject}</span>
                <span>{n.readingMinutes} min read</span>
              </div>
              <Link href="/study-notes" className={buttonVariants({ variant: "ghost", size: "sm", className: "mt-3 self-start" })}>
                Open note
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <EmptyState
          icon={<FileTextIcon className="h-5 w-5" />}
          title="No notes found"
          description="Try a different search term or pick another category."
        />
      )}
    </div>
  );
}
