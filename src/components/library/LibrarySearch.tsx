"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { searchLibrary } from "@/data/mock/library";
import { cn } from "@/lib/utils";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";

/** Live search across library subjects, topics, and tags. */
export function LibrarySearch({ scope }: { scope?: string }) {
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(() => {
    const all = searchLibrary(q);
    return scope
      ? all.filter(
          (r) =>
            r.href.startsWith(`/knowledge/${scope}/`) ||
            r.href === `/knowledge/${scope}`
        )
      : all;
  }, [q, scope]);

  React.useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <SearchIcon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        placeholder="Search nursing topics, conditions, medications..."
        aria-label="Search the Knowledge Library"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls="library-search-results"
        className="input-icon pr-9"
      />
      {q && (
        <button
          type="button"
          onClick={() => setQ("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:bg-subtle hover:text-ink"
        >
          <CloseIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {open && q.trim().length >= 2 && (
        <div
          id="library-search-results"
          role="listbox"
          aria-label="Matching topics"
          className="absolute inset-x-0 top-full z-content mt-2 max-h-80 overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-card-hover"
        >
          {results.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-muted">
              No topics match “{q.trim()}” yet. Try a condition, drug class,
              or subject.
            </p>
          ) : (
            results.map((r) => (
              <Link
                key={`${r.type}-${r.href}`}
                href={r.href}
                role="option"
                aria-selected={false}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left",
                  "hover:bg-subtle"
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {r.title}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {r.subtitle}
                  </span>
                </span>
                <Badge tone={r.type === "subject" ? "accent" : "brand"}>
                  {r.type === "subject" ? "Subject" : "Topic"}
                </Badge>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
