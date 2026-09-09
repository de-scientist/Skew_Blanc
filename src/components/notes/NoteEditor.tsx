"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Badge } from "@/components/ui/Badge";
import { CALLOUT_LABELS, CALLOUT_TYPES, MAX_TITLE_LENGTH, NOTE_SUBJECTS, NOTE_TYPES } from "@/lib/notes/constants";
import { countWords, isValidNoteInput, normalizeTag, validateNoteInput } from "@/lib/notes/store";
import type { NoteInput, NoteSubject, NoteType, UserNote } from "@/lib/notes/types";
import { cn } from "@/lib/utils";
import { useNotes } from "./NotesProvider";
import { NoteContent } from "./noteContent";
import { NoteEditorSkeleton } from "./NoteSkeletons";
import { AlertIcon, CheckIcon, StarIcon } from "@/components/ui/icons";

type SaveState =
  | { kind: "idle" }
  | { kind: "dirty" }
  | { kind: "saving" }
  | { kind: "saved"; at: string }
  | { kind: "error"; message: string };

const BLOCK_TEMPLATES: Record<string, string> = {
  "key-concept": "::: key-concept\nA concise explanation of the most important concept.\n:::",
  "nursing-alert": "::: nursing-alert\nImportant clinical safety information.\n:::",
  "nclex-tip": "::: nclex-tip\nA high-yield exam-oriented insight.\n:::",
  "signs-symptoms": "::: signs-symptoms\n- Sign or symptom one\n- Sign or symptom two\n:::",
  interventions: "::: interventions\n1. First nursing action\n2. Second nursing action\n:::",
  medications: "::: medications\n- Medication (class) — indication; key side effects; nursing considerations\n:::",
  labs: "::: labs\n| Test | Normal range | Significance |\n| --- | --- | --- |\n|  |  |  |\n:::",
};

function Toggle({
  pressed,
  onChange,
  label,
  hint,
}: {
  pressed: boolean;
  onChange: (next: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      onClick={() => onChange(!pressed)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-left"
    >
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="block text-xs text-muted">{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          pressed ? "bg-brand-600" : "bg-track"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            pressed ? "left-[1.375rem]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

export function NoteEditor({ mode, noteId }: { mode: "create" | "edit"; noteId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { notes, folders, isLoading, createNote, updateNote } = useNotes();

  const existing: UserNote | undefined =
    mode === "edit" ? notes.find((n) => n.id === noteId) : undefined;
  const duplicateSourceId = mode === "create" ? searchParams.get("duplicate") : null;
  const duplicateSource = duplicateSourceId
    ? notes.find((n) => n.id === duplicateSourceId)
    : undefined;

  const [title, setTitle] = React.useState("");
  const [subject, setSubject] = React.useState<NoteSubject>("Medical-Surgical Nursing");
  const [noteType, setNoteType] = React.useState<NoteType>("study");
  const [folderId, setFolderId] = React.useState<string>("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagDraft, setTagDraft] = React.useState("");
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isHighYield, setIsHighYield] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [tab, setTab] = React.useState<"write" | "preview">("write");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [saveState, setSaveState] = React.useState<SaveState>({ kind: "idle" });
  const [saving, setSaving] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);
  const [savedId, setSavedId] = React.useState<string | null>(noteId ?? null);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const stateRef = React.useRef({ title, content, subject, noteType, folderId, tags, isFavorite, isHighYield });
  stateRef.current = { title, content, subject, noteType, folderId, tags, isFavorite, isHighYield };
  const savedIdRef = React.useRef<string | null>(noteId ?? null);
  savedIdRef.current = savedId;

  // Hydrate from existing note / duplicate source once data is ready.
  React.useEffect(() => {
    if (isLoading || hydrated) return;
    const source = mode === "edit" ? existing : duplicateSource;
    if (mode === "edit" && !existing) {
      setHydrated(true);
      return;
    }
    if (source) {
      setTitle(mode === "edit" ? source.title : `${source.title} — Copy`);
      setSubject(source.subject);
      setNoteType(source.noteType);
      setFolderId(source.folderId ?? "");
      setTags(source.tags);
      setIsFavorite(mode === "edit" ? source.isFavorite : false);
      setIsHighYield(source.isHighYield);
      setContent(source.content);
      if (mode === "create" && duplicateSource) setSavedId(null);
    }
    setHydrated(true);
  }, [isLoading, hydrated, mode, existing, duplicateSource]);

  const buildInput = React.useCallback(
    (status: "draft" | "published"): NoteInput => {
      const s = stateRef.current;
      return {
        title: s.title,
        content: s.content,
        subject: s.subject,
        noteType: s.noteType,
        folderId: s.folderId || null,
        tags: s.tags,
        isFavorite: s.isFavorite,
        isHighYield: s.isHighYield,
        status,
      };
    },
    []
  );

  const persist = React.useCallback(
    async (status: "draft" | "published", silent = false): Promise<UserNote | null> => {
      const input = buildInput(status);
      if (!silent) {
        const validation = validateNoteInput(input);
        setErrors(validation);
        if (!isValidNoteInput(input)) return null;
      }
      const id = savedIdRef.current;
      if (id) {
        return updateNote(id, input);
      }
      const created = await createNote(input);
      setSavedId(created.id);
      return created;
    },
    [buildInput, createNote, updateNote]
  );

  // Autosave: debounce 1.5s after the user stops typing. Skips empty,
  // untitled notes so drafts are never meaningless.
  React.useEffect(() => {
    if (!hydrated) return;
    if (!title.trim() && !content.trim()) {
      setSaveState({ kind: "idle" });
      return;
    }
    if (!title.trim()) {
      setSaveState({ kind: "dirty" });
      return;
    }
    setSaveState((s) => (s.kind === "saving" ? s : { kind: "dirty" }));
    const t = window.setTimeout(() => {
      (async () => {
        setSaveState({ kind: "saving" });
        try {
          const input = buildInput("draft");
          // Autosave must never publish or wipe: keep the author's status
          // unless this is a brand-new unsaved note (saved as draft).
          const status: "draft" | "published" =
            savedIdRef.current && existing?.status === "published" ? "published" : "draft";
          let result: UserNote | null;
          if (savedIdRef.current) {
            result = await updateNote(savedIdRef.current, { ...input, status });
          } else {
            result = await createNote({ ...input, status: "draft" });
            setSavedId(result.id);
          }
          void result;
          setSaveState({ kind: "saved", at: new Date().toISOString() });
        } catch {
          setSaveState({
            kind: "error",
            message: "Unable to save changes. Your work is still on this page.",
          });
        }
      })();
    }, 1500);
    return () => window.clearTimeout(t);
  }, [title, content, subject, noteType, folderId, tags, isFavorite, isHighYield, hydrated, buildInput, createNote, updateNote, existing?.status]);

  const retryAutosave = () => {
    setSaveState({ kind: "dirty" });
    // Trigger the effect by nudging content identity.
    setContent((c) => c);
  };

  const onSave = async (status: "draft" | "published") => {
    setSaving(true);
    try {
      const result = await persist(status);
      if (result) router.push(`/notes/${result.id}`);
    } catch {
      // Toast already surfaced by the provider.
    } finally {
      setSaving(false);
    }
  };

  /* ------------------------- toolbar helpers ------------------------ */

  const insertAtCursor = (snippet: string, selectOffset?: number) => {
    const el = textareaRef.current;
    if (!el) {
      setContent((c) => (c ? `${c}\n${snippet}` : snippet));
      return;
    }
    const { selectionStart, selectionEnd, value } = el;
    const next = `${value.slice(0, selectionStart)}${snippet}${value.slice(selectionEnd)}`;
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = selectionStart + (selectOffset ?? snippet.length);
      el.setSelectionRange(pos, pos);
    });
  };

  const wrapSelection = (before: string, after: string, placeholder = "text") => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart, selectionEnd, value } = el;
    const selected = value.slice(selectionStart, selectionEnd) || placeholder;
    const next = `${value.slice(0, selectionStart)}${before}${selected}${after}${value.slice(selectionEnd)}`;
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(selectionStart + before.length, selectionStart + before.length + selected.length);
    });
  };

  const prefixLines = (prefix: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart, selectionEnd, value } = el;
    const start = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const endIdx = value.indexOf("\n", selectionEnd);
    const end = endIdx === -1 ? value.length : endIdx;
    const chunk = value.slice(start, end);
    const next = chunk
      .split("\n")
      .map((l) => (l.trim() ? `${prefix}${l.replace(/^([-*+]|\d+[.)]|#{1,3}|>)\s+/, "")}` : l))
      .join("\n");
    setContent(`${value.slice(0, start)}${next}${value.slice(end)}`);
    requestAnimationFrame(() => el.focus());
  };

  const toolbar: Array<{ label: string; hint: string; action: () => void }> = [
    { label: "B", hint: "Bold", action: () => wrapSelection("**", "**", "key term") },
    { label: "I", hint: "Italic", action: () => wrapSelection("*", "*", "emphasis") },
    { label: "H2", hint: "Heading", action: () => prefixLines("## ") },
    { label: "H3", hint: "Subheading", action: () => prefixLines("### ") },
    { label: "•", hint: "Bullet list", action: () => prefixLines("- ") },
    { label: "1.", hint: "Numbered list", action: () => prefixLines("1. ") },
    { label: "☑", hint: "Checklist", action: () => prefixLines("- [ ] ") },
    { label: "❝", hint: "Quote", action: () => prefixLines("> ") },
    { label: "Link", hint: "Insert link", action: () => wrapSelection("[", "](https://)", "resource") },
    { label: "<>", hint: "Inline code", action: () => wrapSelection("`", "`", "value") },
    { label: "Mark", hint: "Highlight", action: () => wrapSelection("==", "==", "must remember") },
    { label: "―", hint: "Divider", action: () => insertAtCursor("\n---\n") },
    {
      label: "Table",
      hint: "Insert table",
      action: () =>
        insertAtCursor("\n| Column A | Column B |\n| --- | --- |\n|  |  |\n"),
    },
  ];

  const addTag = (raw: string) => {
    const t = normalizeTag(raw);
    if (!t) return;
    setTags((prev) => (prev.includes(t) ? prev : [...prev, t].slice(0, 20)));
    setTagDraft("");
  };

  /* -------------------------------- render --------------------------- */

  if (!isLoading && hydrated && mode === "edit" && !existing) {
    return (
      <EmptyState
        icon={<AlertIcon className="h-5 w-5" aria-hidden="true" />}
        title="Note not found."
        description="It may have been deleted. Your other notes are safe."
        action={
          <Link href="/notes" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            Back to My Notes
          </Link>
        }
      />
    );
  }

  if (isLoading || !hydrated) return <NoteEditorSkeleton />;

  const words = countWords(content);

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="note-title" className="sr-only">
          Note title
        </label>
        <Input
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your note a clear title..."
          maxLength={MAX_TITLE_LENGTH}
          invalid={!!errors.title}
          className="h-auto border-0 bg-transparent px-0 py-2 text-2xl font-bold tracking-tight shadow-none focus:ring-0 sm:text-3xl"
        />
        <div className="flex items-center justify-between">
          {errors.title ? (
            <p role="alert" className="text-sm text-danger-600">{errors.title}</p>
          ) : (
            <span className="text-xs text-muted">{words} words</span>
          )}
          <SaveIndicator state={saveState} onRetry={retryAutosave} />
        </div>
      </div>
      {errors.content && (
        <p role="alert" className="text-sm text-danger-600">{errors.content}</p>
      )}

      {/* Metadata */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Subject" htmlFor="note-subject">
          <Select id="note-subject" value={subject} onChange={(e) => setSubject(e.target.value as NoteSubject)} invalid={!!errors.subject}>
            {NOTE_SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </Field>
        <Field label="Note type" htmlFor="note-type">
          <Select id="note-type" value={noteType} onChange={(e) => setNoteType(e.target.value as NoteType)}>
            {NOTE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </Select>
        </Field>
        <Field label="Folder" htmlFor="note-folder">
          <Select id="note-folder" value={folderId} onChange={(e) => setFolderId(e.target.value)}>
            <option value="">Unfiled</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </Select>
        </Field>
        <Field label="Tags" htmlFor="note-tags">
          <Input
            id="note-tags"
            value={tagDraft}
            onChange={(e) => {
              const v = e.target.value;
              if (v.endsWith(",") || v.endsWith(" ")) addTag(v);
              else setTagDraft(v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(tagDraft);
              } else if (e.key === "Backspace" && !tagDraft && tags.length > 0) {
                setTags((prev) => prev.slice(0, -1));
              }
            }}
            onBlur={() => addTag(tagDraft)}
            placeholder="Add tags, press Enter…"
          />
        </Field>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Note tags">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-md bg-subtle px-2 py-1 text-xs font-medium text-ink">
              #{t}
              <button
                type="button"
                onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
                aria-label={`Remove tag ${t}`}
                className="rounded px-0.5 text-muted hover:text-danger-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Toggle
          pressed={isHighYield}
          onChange={setIsHighYield}
          label="Mark as High-Yield"
          hint="Surfaces this note in high-yield revision."
        />
        <Toggle
          pressed={isFavorite}
          onChange={setIsFavorite}
          label="Add to Favorites"
          hint="Pin it for one-tap revision."
        />
      </div>

      {/* Content */}
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line p-2">
          <div className="flex flex-wrap items-center gap-1" role="toolbar" aria-label="Formatting">
            {toolbar.map((t) => (
              <button
                key={t.hint}
                type="button"
                title={t.hint}
                aria-label={t.hint}
                onClick={t.action}
                className="min-h-[2.25rem] min-w-[2.25rem] rounded-lg px-2 text-sm font-semibold text-muted hover:bg-subtle hover:text-ink"
              >
                {t.label}
              </button>
            ))}
            <label className="sr-only" htmlFor="nursing-block">Insert nursing block</label>
            <select
              id="nursing-block"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  insertAtCursor(`\n${BLOCK_TEMPLATES[e.target.value]}\n`);
                  e.target.value = "";
                }
              }}
              className="min-h-[2.25rem] rounded-lg border border-line bg-surface px-2 text-sm font-semibold text-muted"
              aria-label="Insert nursing block"
            >
              <option value="">+ Block</option>
              {CALLOUT_TYPES.map((c) => (
                <option key={c} value={c}>{CALLOUT_LABELS[c]}</option>
              ))}
            </select>
          </div>
          <div className="flex rounded-xl border border-line p-0.5" role="tablist" aria-label="Editor view">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize",
                  tab === t ? "bg-subtle text-ink" : "text-muted hover:text-ink"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === "write" ? (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"Write your note using Markdown...\n\n## Heading\n- Bullet point\n- [ ] Checklist item\n> Quote\n\n::: nclex-tip\nHigh-yield insight\n:::"}
            rows={16}
            aria-label="Note content"
            className="min-h-[20rem] rounded-none border-0 bg-surface font-[15px] leading-7 focus:ring-0"
          />
        ) : (
          <div className="min-h-[20rem] p-5" role="tabpanel" aria-label="Preview">
            <NoteContent content={content || "*Nothing to preview yet.*"} />
          </div>
        )}
      </div>

      {/* Desktop actions */}
      <div className="hidden items-center justify-between gap-3 lg:flex">
        <p className="text-xs text-muted">
          {savedId ? "Changes autosave as you write." : "A draft is created automatically as you write."}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => void onSave("draft")} disabled={saving}>
            {saving ? "Saving…" : "Save draft"}
          </Button>
          <Button onClick={() => void onSave("published")} disabled={saving}>
            <CheckIcon className="h-4 w-4" aria-hidden="true" />
            {saving ? "Saving…" : "Save note"}
          </Button>
        </div>
      </div>

      {/* Mobile sticky actions */}
      <div className="sticky bottom-20 z-content flex gap-2 rounded-2xl border border-line bg-surface/95 p-2 shadow-card-hover backdrop-blur lg:hidden">
        <Button variant="outline" onClick={() => void onSave("draft")} disabled={saving} className="flex-1">
          Draft
        </Button>
        <Button onClick={() => void onSave("published")} disabled={saving} className="flex-1">
          <CheckIcon className="h-4 w-4" aria-hidden="true" />
          Save note
        </Button>
      </div>

      {isHighYield && (
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <StarIcon className="h-3.5 w-3.5 text-warning-600" aria-hidden="true" />
          Marked HIGH-YIELD — it will stand out during revision.
          <Badge tone="warning" className="ml-1">High-Yield</Badge>
        </p>
      )}
      {duplicateSource && mode === "create" && (
        <p className="text-xs text-muted">Duplicating “{duplicateSource.title}”. Saving creates a separate note.</p>
      )}
    </div>
  );
}

function SaveIndicator({ state, onRetry }: { state: SaveState; onRetry: () => void }) {
  switch (state.kind) {
    case "saving":
      return (
        <span role="status" className="text-xs text-muted">
          Saving…
        </span>
      );
    case "saved":
      return (
        <span role="status" className="inline-flex items-center gap-1 text-xs text-success-600">
          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Saved
        </span>
      );
    case "dirty":
      return (
        <span role="status" className="text-xs text-muted">
          Draft · unsaved changes
        </span>
      );
    case "error":
      return (
        <span role="alert" className="inline-flex items-center gap-2 text-xs text-danger-600">
          Unable to save changes.
          <button type="button" onClick={onRetry} className="font-semibold underline underline-offset-2">
            Retry
          </button>
        </span>
      );
    case "idle":
    default:
      return null;
  }
}
