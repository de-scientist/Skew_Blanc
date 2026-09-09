"use client";

import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select } from "@/components/ui/form";
import { Badge } from "@/components/ui/Badge";
import {
  DEFAULT_QUERY,
  NOTE_SUBJECTS,
  NOTE_TYPES,
  SORT_OPTIONS,
} from "@/lib/notes/constants";
import {
  allTags,
  applyQuery,
  computeStats,
} from "@/lib/notes/store";
import type { NotesQuery, NoteSubject, NoteType, UserNote } from "@/lib/notes/types";
import { cn } from "@/lib/utils";
import { useNotes } from "./NotesProvider";
import { NoteCard } from "./NoteCard";
import { NotesStats } from "./NotesStats";
import { FolderDialog, FolderSidebar } from "./FolderSidebar";
import { NoteCardSkeleton } from "./NoteSkeletons";
import {
  BookmarkIcon,
  CloseIcon,
  FileTextIcon,
  PlusIcon,
  SearchIcon,
  SlidersIcon,
  StarIcon,
} from "@/components/ui/icons";

export type NotesView = "all" | "favorites" | "recent" | "archived" | "folder";

const VIEW_EMPTY: Record<NotesView, { title: string; description: string }> = {
  all: {
    title: "Your knowledge starts here.",
    description: "Create your first nursing note and build your personal study library.",
  },
  favorites: {
    title: "No favorite notes yet.",
    description: "Save important concepts here for faster revision.",
  },
  recent: {
    title: "Nothing studied recently.",
    description: "Open a note and it will show up here for quick return.",
  },
  archived: {
    title: "Your archive is empty.",
    description: "Archived notes are kept out of sight but never deleted — until you say so.",
  },
  folder: {
    title: "No notes in this folder yet.",
    description: "Move notes here or create a new one to keep this topic together.",
  },
};

function useDebouncedValue<T>(value: T, delayMs = 220): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export function NotesExplorer({
  view,
  folderId,
  showStats = false,
  showSidebar = false,
}: {
  view: NotesView;
  folderId?: string;
  showStats?: boolean;
  showSidebar?: boolean;
}) {
  const { notes, folders, isLoading, loadError, refresh, folderName, createFolder } = useNotes();
  const [search, setSearch] = React.useState("");
  const [query, setQuery] = React.useState<NotesQuery>(DEFAULT_QUERY);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [layout, setLayout] = React.useState<"grid" | "list">("grid");
  const [folderDialogOpen, setFolderDialogOpen] = React.useState(false);
  const debouncedSearch = useDebouncedValue(search);

  const availableTags = React.useMemo(() => allTags(notes), [notes]);

  const base = React.useMemo((): UserNote[] => {
    const active = notes.filter((n) => !n.isArchived);
    switch (view) {
      case "favorites":
        return active.filter((n) => n.isFavorite);
      case "recent":
        return [...active]
          .filter((n) => n.lastViewedAt)
          .sort((a, b) => +new Date(b.lastViewedAt!) - +new Date(a.lastViewedAt!))
          .slice(0, 30);
      case "archived":
        return notes.filter((n) => n.isArchived);
      case "folder":
        if (folderId === "unfiled") return active.filter((n) => !n.folderId);
        return active.filter((n) => n.folderId === folderId);
      case "all":
      default:
        return active;
    }
  }, [notes, view, folderId]);

  const effectiveQuery: NotesQuery = React.useMemo(() => {
    const q: NotesQuery = { ...query, search: debouncedSearch };
    if (view === "favorites") q.favoritesOnly = true;
    if (view === "archived") return { ...q, sort: query.sort };
    return q;
  }, [query, debouncedSearch, view]);

  const results = React.useMemo(() => {
    if (view === "archived" || view === "recent") {
      // Archived/recent views keep their intrinsic ordering; still apply
      // search + attribute filters for consistency.
      const filtered = applyQuery(base, { ...effectiveQuery, sort: "updated" });
      if (view === "recent") {
        return [...filtered].sort(
          (a, b) =>
            +(b.lastViewedAt ? new Date(b.lastViewedAt) : 0) -
            +(a.lastViewedAt ? new Date(a.lastViewedAt) : 0)
        );
      }
      return filtered;
    }
    return applyQuery(base, effectiveQuery);
  }, [base, effectiveQuery, view]);

  const stats = React.useMemo(() => computeStats(notes), [notes]);

  const activeFilterCount =
    query.subjects.length +
    query.noteTypes.length +
    query.tags.length +
    (query.favoritesOnly && view !== "favorites" ? 1 : 0) +
    (query.highYieldOnly ? 1 : 0) +
    (query.draftsOnly ? 1 : 0);

  const clearFilters = () =>
    setQuery((q) => ({
      ...DEFAULT_QUERY,
      sort: q.sort,
      folder: q.folder,
    }));

  const toggleInList = <T,>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  if (loadError) {
    return (
      <div className="card p-8 text-center" role="alert">
        <p className="font-semibold text-ink">Something went wrong while loading your notes.</p>
        <p className="mt-1 text-sm text-muted">Your work is safe. Please try again.</p>
        <Button className="mt-4" onClick={() => void refresh()}>
          Retry
        </Button>
      </div>
    );
  }

  const empty = VIEW_EMPTY[view];
  const searching = debouncedSearch.trim().length > 0 || activeFilterCount > 0;

  return (
    <div className="space-y-5">
      {showStats && !isLoading && <NotesStats stats={stats} />}

      <div className={cn(showSidebar && "lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-6")}>
        {showSidebar && (
          <div className="mb-4 lg:mb-0 lg:sticky lg:top-20">
            <div className="hidden lg:block">
              <FolderSidebar
                activeFolder={view === "folder" ? (folderId ?? "all") : "all"}
                onNewFolder={() => setFolderDialogOpen(true)}
              />
            </div>
            {/* Mobile folder strip */}
            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden" role="navigation" aria-label="Folders">
              <Link
                href="/notes"
                className={cn(
                  "shrink-0 rounded-xl border px-3 py-2 text-sm font-semibold",
                  view === "all" ? "border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted"
                )}
              >
                All
              </Link>
              {folders.map((f) => (
                <Link
                  key={f.id}
                  href={`/notes/folders/${f.id}`}
                  className={cn(
                    "shrink-0 rounded-xl border px-3 py-2 text-sm font-semibold",
                    folderId === f.id ? "border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted"
                  )}
                >
                  {f.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="min-w-0 space-y-4">
          {/* Search + controls */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your notes…"
                  aria-label="Search your notes"
                  className="input-icon pr-9"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:bg-subtle hover:text-ink"
                  >
                    <CloseIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setFiltersOpen((v) => !v)}
                  aria-expanded={filtersOpen}
                  aria-controls="notes-filters"
                >
                  <SlidersIcon className="h-4 w-4" aria-hidden="true" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge tone="brand" className="ml-1">{activeFilterCount}</Badge>
                  )}
                </Button>
                <div className="hidden sm:block">
                  <Select
                    aria-label="Sort notes"
                    value={query.sort}
                    onChange={(e) => setQuery((q) => ({ ...q, sort: e.target.value as NotesQuery["sort"] }))}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            {/* Filter panel */}
            {filtersOpen && (
              <div id="notes-filters" className="card space-y-4 p-4 sm:p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Subject" htmlFor="filter-subjects">
                    <div id="filter-subjects" className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by subject">
                      {NOTE_SUBJECTS.map((s) => {
                        const on = query.subjects.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setQuery((q) => ({ ...q, subjects: toggleInList(q.subjects, s as NoteSubject) }))}
                            className={cn(
                              "rounded-lg border px-2.5 py-1.5 text-xs font-semibold",
                              on ? "border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted hover:bg-subtle"
                            )}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Note type" htmlFor="filter-types">
                    <div id="filter-types" className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by note type">
                      {NOTE_TYPES.map((t) => {
                        const on = query.noteTypes.includes(t.value);
                        return (
                          <button
                            key={t.value}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setQuery((q) => ({ ...q, noteTypes: toggleInList(q.noteTypes, t.value as NoteType) }))}
                            className={cn(
                              "rounded-lg border px-2.5 py-1.5 text-xs font-semibold",
                              on ? "border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted hover:bg-subtle"
                            )}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                </div>

                <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Quick filters">
                  {view !== "favorites" && (
                    <button
                      type="button"
                      aria-pressed={query.favoritesOnly}
                      onClick={() => setQuery((q) => ({ ...q, favoritesOnly: !q.favoritesOnly }))}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold",
                        query.favoritesOnly ? "border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted hover:bg-subtle"
                      )}
                    >
                      <BookmarkIcon className="h-3.5 w-3.5" aria-hidden="true" /> Favorites
                    </button>
                  )}
                  <button
                    type="button"
                    aria-pressed={query.highYieldOnly}
                    onClick={() => setQuery((q) => ({ ...q, highYieldOnly: !q.highYieldOnly }))}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold",
                      query.highYieldOnly ? "border-warning-500 bg-warning-50 text-warning-700 dark:bg-warning-500/10" : "border-line text-muted hover:bg-subtle"
                    )}
                  >
                    <StarIcon className="h-3.5 w-3.5" aria-hidden="true" /> High-Yield
                  </button>
                  <button
                    type="button"
                    aria-pressed={query.draftsOnly}
                    onClick={() => setQuery((q) => ({ ...q, draftsOnly: !q.draftsOnly }))}
                    className={cn(
                      "rounded-lg border px-2.5 py-1.5 text-xs font-semibold",
                      query.draftsOnly ? "border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted hover:bg-subtle"
                    )}
                  >
                    Drafts
                  </button>
                </div>

                {availableTags.length > 0 && (
                  <Field label="Tags" htmlFor="filter-tags">
                    <div id="filter-tags" className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by tag">
                      {availableTags.slice(0, 24).map((t) => {
                        const on = query.tags.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setQuery((q) => ({ ...q, tags: toggleInList(q.tags, t) }))}
                            className={cn(
                              "rounded-md px-2 py-1 text-xs font-medium",
                              on ? "bg-brand-600 text-white" : "bg-subtle text-muted hover:text-ink"
                            )}
                          >
                            #{t}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
                  <div className="sm:hidden">
                    <Field label="Sort" htmlFor="filter-sort-mobile">
                      <Select
                        id="filter-sort-mobile"
                        value={query.sort}
                        onChange={(e) => setQuery((q) => ({ ...q, sort: e.target.value as NotesQuery["sort"] }))}
                      >
                        {SORT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                  <div className="flex items-center gap-2">
                    {(activeFilterCount > 0 || searching) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          clearFilters();
                          setSearch("");
                        }}
                      >
                        Clear all filters
                      </Button>
                    )}
                    <div className="flex rounded-xl border border-line p-0.5" role="group" aria-label="Change layout">
                      {(["grid", "list"] as const).map((l) => (
                        <button
                          key={l}
                          type="button"
                          aria-pressed={layout === l}
                          onClick={() => setLayout(l)}
                          className={cn(
                            "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize",
                            layout === l ? "bg-subtle text-ink" : "text-muted hover:text-ink"
                          )}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result meta */}
          {!isLoading && (
            <p className="text-sm text-muted" role="status" aria-live="polite">
              {results.length === 0
                ? "No notes to show."
                : `${results.length} note${results.length === 1 ? "" : "s"}${
                    view === "folder" ? ` in ${folderId === "unfiled" ? "Unfiled" : folderName(folderId ?? null)}` : ""
                  }`}
            </p>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading notes">
              {Array.from({ length: 6 }).map((_, i) => (
                <NoteCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon={<FileTextIcon className="h-5 w-5" aria-hidden="true" />}
              title={searching ? "We couldn't find any matching notes." : empty.title}
              description={searching ? "Try another keyword, subject, or tag." : empty.description}
              action={
                searching ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearFilters();
                      setSearch("");
                    }}
                  >
                    Clear search & filters
                  </Button>
                ) : view === "favorites" ? (
                  <Link href="/notes" className={buttonVariants({ variant: "primary" })}>
                    Explore My Notes
                  </Link>
                ) : (
                  <Link href="/notes/create" className={buttonVariants({ variant: "primary" })}>
                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                    {view === "all" ? "Create Your First Note" : "Create Note"}
                  </Link>
                )
              }
            />
          ) : (
            <div
              className={cn(
                "grid gap-4",
                layout === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}
            >
              {results.map((note) => (
                <NoteCard key={note.id} note={note} search={debouncedSearch} layout={layout} />
              ))}
            </div>
          )}
        </div>
      </div>

      <FolderDialog
        open={folderDialogOpen}
        onClose={() => setFolderDialogOpen(false)}
        title="Create folder"
        submitLabel="Create folder"
        onSubmit={(name) => createFolder(name).then(() => undefined)}
      />
    </div>
  );
}
