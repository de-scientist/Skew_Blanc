"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildQuestionPool } from "@/data/mock/questions";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Field, Select } from "@/components/ui/form";
import { NOTE_TYPE_LABELS } from "@/lib/notes/constants";
import { buildToc, relatedNotes } from "@/lib/notes/store";
import type { Question } from "@/types";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { useNotes } from "./NotesProvider";
import { NoteContent } from "./noteContent";
import { AIStudyPanel } from "./AIStudyPanel";
import { NoteCard } from "./NoteCard";
import { NoteViewerSkeleton } from "./NoteSkeletons";
import {
  AlertIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CheckIcon,
  CloseIcon,
  FileTextIcon,
  StarIcon,
} from "@/components/ui/icons";

function RelatedQuestions({ subject, tags }: { subject: string; tags: string[] }) {
  const questions: Question[] = React.useMemo(() => {
    const pool = buildQuestionPool("nclex-rn", 60);
    const bySubject = pool.filter((q) => q.subject === subject);
    const rest = pool.filter((q) => q.subject !== subject);
    void tags;
    return [...bySubject, ...rest].slice(0, 3);
  }, [subject, tags]);

  return (
    <section aria-label="Practice this topic" className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-bold text-ink">Practice This Topic</h2>
        <Badge tone="brand">{subject}</Badge>
      </div>
      <ul className="mt-3 space-y-3">
        {questions.map((q, i) => (
          <li key={q.id} className="rounded-xl border border-line p-3">
            <p className="text-sm font-medium leading-relaxed text-ink">
              <span className="mr-2 font-bold text-muted">Q{i + 1}</span>
              {q.text.length > 140 ? `${q.text.slice(0, 140)}…` : q.text}
            </p>
            <p className="mt-1 text-xs text-muted">
              {q.subject} · {q.topic ?? "Clinical review"}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/exams/nclex-rn"
        className={buttonVariants({ variant: "primary", size: "sm", className: "mt-4" })}
      >
        Practice Questions
        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

export function NoteViewerClient({ id }: { id: string }) {
  const router = useRouter();
  const {
    notes,
    folders,
    isLoading,
    folderName,
    toggleFavorite,
    toggleHighYield,
    archiveNote,
    restoreNote,
    removeNote,
    duplicateNote,
    moveToFolder,
  } = useNotes();

  const note = notes.find((n) => n.id === id);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [moveOpen, setMoveOpen] = React.useState(false);
  const [moveTarget, setMoveTarget] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const viewedRef = React.useRef<string | null>(null);

  // Record the view for Recent + Recently Studied (fire-and-forget).
  React.useEffect(() => {
    if (!note || viewedRef.current === note.id) return;
    viewedRef.current = note.id;
    void import("@/lib/api/notes").then((m) =>
      m.recordNoteView(note.userId, note.id).catch(() => null)
    );
  }, [note]);

  const toc = React.useMemo(() => (note ? buildToc(note.content) : []), [note]);
  const related = React.useMemo(
    () => (note ? relatedNotes(note, notes) : []),
    [note, notes]
  );

  if (isLoading) return <NoteViewerSkeleton />;

  if (!note) {
    return (
      <EmptyState
        icon={<AlertIcon className="h-5 w-5" aria-hidden="true" />}
        title="Note not found."
        description="It may have been deleted or moved. Your other notes are safe."
        action={
          <Link href="/notes" className={buttonVariants({ variant: "primary" })}>
            Back to My Notes
          </Link>
        }
      />
    );
  }

  const run = async (fn: () => Promise<unknown>, after?: () => void) => {
    setBusy(true);
    try {
      await fn();
      after?.();
    } finally {
      setBusy(false);
    }
  };

  const onDelete = () =>
    run(() => removeNote(note.id), () => {
      setConfirmDelete(false);
      router.push(note.isArchived ? "/notes/archived" : "/notes");
    });

  const onDuplicate = () => {
    router.push(`/notes/create?duplicate=${note.id}`);
    void duplicateNote;
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { name: "My Notes", href: "/notes" },
          ...(note.folderId
            ? [{ name: folderName(note.folderId), href: `/notes/folders/${note.folderId}` }]
            : []),
          { name: note.title },
        ]}
        className="mb-2"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_15rem] lg:items-start">
        <article className="min-w-0">
          <div className="card p-5 sm:p-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone="brand">{note.subject}</Badge>
              <Badge tone="neutral">{NOTE_TYPE_LABELS[note.noteType]}</Badge>
              {note.isHighYield && (
                <Badge tone="warning">
                  <StarIcon className="h-3 w-3" aria-hidden="true" />
                  High-Yield
                </Badge>
              )}
              {note.status === "draft" && <Badge tone="neutral">Draft</Badge>}
              {note.aiGenerated && <Badge tone="accent">AI-assisted</Badge>}
            </div>

            <h1 className="mt-3 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {note.title}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {folderName(note.folderId)} · Updated {formatRelativeTime(note.updatedAt)} ·{" "}
              {formatDate(note.updatedAt)} · {note.wordCount} words · {note.readingMinutes} min read
              {note.lastViewedAt && <> · Last viewed {formatRelativeTime(note.lastViewedAt)}</>}
            </p>

            {note.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
                {note.tags.map((t) => (
                  <span key={t} className="rounded-md bg-subtle px-2 py-0.5 text-xs font-medium text-muted">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-y border-line py-3">
              <Link href={`/notes/${note.id}/edit`} className={buttonVariants({ variant: "primary", size: "sm" })}>
                Edit
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void run(() => toggleFavorite(note.id))}
                aria-pressed={note.isFavorite}
                aria-label={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
                disabled={busy}
              >
                <BookmarkIcon
                  className="h-4 w-4"
                  fill={note.isFavorite ? "currentColor" : "none"}
                  aria-hidden="true"
                />
                {note.isFavorite ? "Favorited" : "Favorite"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void run(() => toggleHighYield(note.id))}
                aria-pressed={note.isHighYield}
                disabled={busy}
              >
                <StarIcon className="h-4 w-4" aria-hidden="true" />
                {note.isHighYield ? "High-Yield" : "Mark High-Yield"}
              </Button>
              <Dropdown
                label="More note actions"
                trigger={
                  <span className={buttonVariants({ variant: "outline", size: "sm" })} aria-hidden="true">
                    More ⋯
                  </span>
                }
                items={[
                  { label: "Duplicate", description: "Create a separate copy", onClick: onDuplicate },
                  { label: "Move to folder", description: "Organize this note", onClick: () => { setMoveTarget(note.folderId ?? ""); setMoveOpen(true); } },
                  note.isArchived
                    ? { label: "Restore", description: "Back to active notes", onClick: () => void run(() => restoreNote(note.id)) }
                    : { label: "Archive", description: "Hide from active views", onClick: () => void run(() => archiveNote(note.id)) },
                  { label: "Delete", description: "Permanently remove", tone: "danger" as const, onClick: () => setConfirmDelete(true) },
                ]}
              />
            </div>

            {/* Body */}
            <div className="mx-auto mt-6 max-w-[42rem]">
              <NoteContent content={note.content} />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <AIStudyPanel note={note} />
            <RelatedQuestions subject={note.subject} tags={note.tags} />
            {related.length > 0 && (
              <section aria-label="Related notes">
                <h2 className="mb-3 text-base font-bold text-ink">Related Notes</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <NoteCard key={r.id} note={r} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        {/* Table of contents */}
        {toc.length > 0 && (
          <aside className="hidden lg:sticky lg:top-20 lg:block" aria-label="Table of contents">
            <nav className="card max-h-[70vh] overflow-y-auto p-4 scrollbar-thin">
              <p className="px-1 text-xs font-bold uppercase tracking-wide text-muted">
                On this page
              </p>
              <ul className="mt-2 space-y-0.5">
                {toc.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className={
                        entry.level === 3
                          ? "block rounded-lg px-3 py-1.5 pl-6 text-[13px] text-muted hover:bg-subtle hover:text-ink"
                          : "block rounded-lg px-3 py-1.5 text-sm font-medium text-ink hover:bg-subtle"
                      }
                    >
                      {entry.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      {/* Mobile ToC */}
      {toc.length > 0 && (
        <details className="card p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold text-ink">
            Table of contents ({toc.length})
          </summary>
          <ul className="mt-2 space-y-0.5">
            {toc.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-subtle hover:text-ink"
                >
                  {entry.text}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Move dialog */}
      <Modal
        open={moveOpen}
        onClose={() => setMoveOpen(false)}
        title="Move to folder"
        description="Choose where this note should live."
        footer={
          <>
            <Button variant="outline" onClick={() => setMoveOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button
              disabled={busy}
              onClick={() =>
                void run(() => moveToFolder(note.id, moveTarget || null), () => setMoveOpen(false))
              }
            >
              {busy ? "Moving…" : "Move note"}
            </Button>
          </>
        }
      >
        <Field label="Folder" htmlFor="move-folder">
          <Select id="move-folder" value={moveTarget} onChange={(e) => setMoveTarget(e.target.value)}>
            <option value="">Unfiled</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </Select>
        </Field>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete this note?"
        description="This action cannot be undone. Archive instead if you might need it later."
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmDelete(false)} disabled={busy}>
              <CloseIcon className="h-4 w-4" aria-hidden="true" />
              Keep note
            </Button>
            <Button variant="danger" onClick={() => void onDelete()} disabled={busy}>
              {busy ? "Deleting…" : "Delete permanently"}
            </Button>
          </>
        }
      >
        <p className="flex items-center gap-2 rounded-xl bg-subtle p-3 text-sm text-muted">
          <FileTextIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          “{note.title}”
        </p>
      </Modal>

      {note.isArchived && (
        <div className="card flex flex-wrap items-center justify-between gap-3 border-warning-500/40 p-4" role="note">
          <p className="text-sm text-muted">
            This note is archived. It is hidden from your library and search-by-default views.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => void run(() => restoreNote(note.id))} disabled={busy}>
              <CheckIcon className="h-4 w-4" aria-hidden="true" />
              Restore
            </Button>
            <Button size="sm" variant="danger" onClick={() => setConfirmDelete(true)}>
              Delete permanently
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
