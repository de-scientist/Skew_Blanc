import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { NOTE_TYPE_LABELS } from "@/lib/notes/constants";
import { excerptOf } from "@/lib/notes/store";
import type { UserNote } from "@/lib/notes/types";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useNotes } from "./NotesProvider";
import {
  ArrowRightIcon,
  BookmarkIcon,
  FileTextIcon,
  StarIcon,
} from "@/components/ui/icons";

function Highlighted({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q || q.length < 2) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-warning-100 px-0.5 dark:bg-warning-500/30">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export function NoteCard({
  note,
  search = "",
  layout = "grid",
}: {
  note: UserNote;
  search?: string;
  layout?: "grid" | "list";
}) {
  const { folderName, toggleFavorite } = useNotes();
  const [favBusy, setFavBusy] = React.useState(false);
  const excerpt = React.useMemo(() => excerptOf(note.content), [note.content]);

  const onToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favBusy) return;
    setFavBusy(true);
    try {
      await toggleFavorite(note.id);
    } finally {
      setFavBusy(false);
    }
  };

  return (
    <Card
      className={cn(
        "group flex h-full flex-col transition-shadow hover:shadow-card-hover",
        layout === "list" && "sm:flex-row"
      )}
    >
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            <Badge tone="brand">{note.subject}</Badge>
            {note.isHighYield && (
              <Badge tone="warning">
                <StarIcon className="h-3 w-3" aria-hidden="true" />
                High-Yield
              </Badge>
            )}
            {note.status === "draft" && <Badge tone="neutral">Draft</Badge>}
          </div>
          <button
            type="button"
            onClick={onToggleFavorite}
            disabled={favBusy}
            aria-pressed={note.isFavorite}
            aria-label={note.isFavorite ? `Remove "${note.title}" from favorites` : `Add "${note.title}" to favorites`}
            title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
              note.isFavorite
                ? "text-warning-600 hover:bg-warning-50 dark:text-warning-500 dark:hover:bg-warning-500/10"
                : "text-muted hover:bg-subtle hover:text-ink"
            )}
          >
            <BookmarkIcon
              className="h-4 w-4"
              fill={note.isFavorite ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
        </div>

        <Link
          href={`/notes/${note.id}`}
          className="mt-2 rounded focus-visible:outline-none"
          aria-label={`Open note: ${note.title}`}
        >
          <h3 className="flex items-start gap-2 text-base font-semibold leading-snug text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
            <FileTextIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            <span>
              <Highlighted text={note.title} query={search} />
            </span>
          </h3>
        </Link>

        {excerpt && (
          <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
            <Highlighted text={excerpt} query={search} />
          </p>
        )}

        {note.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
            {note.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-md bg-subtle px-1.5 py-0.5 text-xs font-medium text-muted"
              >
                #{t}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs font-medium text-muted">+{note.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3 text-xs text-muted">
          <span className="truncate">
            {folderName(note.folderId)} · {NOTE_TYPE_LABELS[note.noteType]}
          </span>
          <span className="shrink-0">Updated {formatRelativeTime(note.updatedAt)}</span>
        </div>

        <Link
          href={`/notes/${note.id}`}
          className="mt-2 inline-flex items-center gap-1 self-start text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
          aria-label={`Open note: ${note.title}`}
        >
          Open note
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
