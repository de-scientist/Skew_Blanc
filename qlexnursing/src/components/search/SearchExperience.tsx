"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { examCategories } from "@/data/mock/examCategories";
import { studyNotes } from "@/data/mock/content";
import { forumTopics } from "@/data/mock/content";
import { blogPosts } from "@/data/mock/blog";
import { SearchIcon, ClipboardIcon, BookIcon, MessageIcon, FileTextIcon, ArrowRightIcon, CornerDownLeftIcon } from "@/components/ui/icons";
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
  }, [q]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => setActive(0), [q]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
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
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search exams, notes, forums, articles…"
          aria-label="Global search"
          className="h-14 w-full rounded-2xl border border-line bg-canvas pl-12 pr-4 text-base text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-line px-2 py-1 text-xs text-muted">⌘K</span>
      </div>

      {!q.trim() && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
      )}

      {q.trim() && results.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">No results for “{q}”.</p>
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
