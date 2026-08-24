"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { examCategories } from "@/data/mock/examCategories";
import { studyNotes } from "@/data/mock/content";
import { forumTopics } from "@/data/mock/content";
import { blogPosts } from "@/data/mock/blog";
import {
  SearchIcon,
  ClipboardIcon,
  BookIcon,
  MessageIcon,
  FileTextIcon,
  ArrowRightIcon,
  CornerDownLeftIcon,
  XIcon,
} from "@/components/ui/icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

type Result = { group: string; title: string; sub: string; href: string; icon: React.ReactNode };

export function SearchExperience() {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);

  const all: Result[] = [
    ...examCategories.map((c) => ({
      group: "Exams",
      title: c.name,
      sub: c.description,
      href: `/exams/${c.slug}`,
      icon: <ClipboardIcon className="h-4 w-4" />,
    })),
    ...studyNotes.map((n) => ({
      group: "Study Notes",
      title: n.title,
      sub: `${n.subject} · ${n.category}`,
      href: "/study-notes",
      icon: <BookIcon className="h-4 w-4" />,
    })),
    ...forumTopics.map((t) => ({
      group: "Forums",
      title: t.title,
      sub: t.category,
      href: `/forums/${t.slug}`,
      icon: <MessageIcon className="h-4 w-4" />,
    })),
    ...blogPosts.map((b) => ({
      group: "Articles",
      title: b.title,
      sub: b.category,
      href: `/blog/${b.slug}`,
      icon: <FileTextIcon className="h-4 w-4" />,
    })),
  ];

  const results = React.useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return all.filter(
      (r) => r.title.toLowerCase().includes(term) || r.sub.toLowerCase().includes(term)
    );
  }, [q, all]);

  React.useEffect(() => setActive(0), [q]);

  function clearSearch() {
    setQ("");
    setActive(0);
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Escape" && q) {
      e.preventDefault();
      clearSearch();
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      router.push(results[active].href);
    }
  }

  const grouped = results.reduce<Record<string, Result[]>>((acc, r) => {
    (acc[r.group] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search nursing exams, notes, discussions & articles…"
          aria-label="Search Nursora — exams, notes, discussions and articles"
          autoComplete="off"
          className="h-14 w-full rounded-2xl border border-line bg-canvas pl-12 pr-12 text-base text-ink shadow-sm transition-all duration-200 outline-none placeholder:text-muted hover:border-brand-300 focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(13,148,136,0.12)] focus:ring-0"
        />
        {q && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-brand-50 hover:text-brand-600"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {!q.trim() && (
        <div className="mt-6">
          <p className="mb-3 text-sm text-muted">
            Jump straight to what helps you learn, practice and advance.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { g: "Exams", items: examCategories.slice(0, 4).map((c) => c.name) },
              { g: "Study Notes", items: studyNotes.slice(0, 4).map((n) => n.title) },
              { g: "Forums", items: forumTopics.slice(0, 4).map((t) => t.title) },
              { g: "Articles", items: blogPosts.slice(0, 4).map((b) => b.title) },
            ].map((col) => (
              <div key={col.g} className="rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">{col.g}</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {col.items.map((i) => (
                    <li key={i} className="truncate text-ink">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {q.trim() && results.length === 0 && (
        <EmptyState
          className="mt-8"
          icon={<SearchIcon className="h-5 w-5" />}
          title={`We couldn't find “${q}” yet`}
          description="Try a nursing topic, an exam name, a study note, a discussion, or an article."
        />
      )}

      <div className="mt-6 space-y-6">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group}>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">{group}</p>
            <div className="space-y-2">
              {items.map((r) => {
                const idx = results.indexOf(r);
                return (
                  <button
                    key={r.href + r.title}
                    type="button"
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => router.push(r.href)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                      idx === active ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30" : "border-line bg-surface hover:bg-brand-50"
                    )}
                  >
                    <span className="text-muted">{r.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">{r.title}</span>
                      <span className="block truncate text-xs text-muted">{r.sub}</span>
                    </span>
                    {idx === active ? <CornerDownLeftIcon className="h-4 w-4 text-brand-600" /> : <ArrowRightIcon className="h-4 w-4 text-muted" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
