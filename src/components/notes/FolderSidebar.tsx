"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input } from "@/components/ui/form";
import { useNotes } from "./NotesProvider";
import { cn } from "@/lib/utils";
import {
  AlertIcon,
  BookIcon,
  FileTextIcon,
  PlusIcon,
} from "@/components/ui/icons";

export function FolderDialog({
  open,
  onClose,
  initialName = "",
  title,
  submitLabel,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initialName?: string;
  title: string;
  submitLabel: string;
  onSubmit: (name: string) => Promise<void>;
}) {
  const [name, setName] = React.useState(initialName);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setName(initialName);
      setError(null);
    }
  }, [open, initialName]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Give the folder a name.");
      return;
    }
    setBusy(true);
    try {
      await onSubmit(name.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the folder.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description="Organize related notes so you can revise by topic."
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={() => void submit} disabled={busy} type="submit" form="folder-form">
            {busy ? "Saving…" : submitLabel}
          </Button>
        </>
      }
    >
      <form id="folder-form" onSubmit={(e) => void submit(e)} className="space-y-2">
        <Field label="Folder name" htmlFor="folder-name">
          <Input
            id="folder-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cardiology"
            maxLength={60}
            invalid={!!error}
            autoFocus
          />
        </Field>
        {error && (
          <p role="alert" className="text-sm text-danger-600">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}

export function FolderSidebar({
  activeFolder,
  onNewFolder,
}: {
  activeFolder: string;
  onNewFolder: () => void;
}) {
  const { folders, notes } = useNotes();
  const counts = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const n of notes) {
      if (n.isArchived) continue;
      if (n.folderId) map.set(n.folderId, (map.get(n.folderId) ?? 0) + 1);
    }
    return map;
  }, [notes]);
  const unfiled = notes.filter((n) => !n.isArchived && !n.folderId).length;

  return (
    <nav aria-label="Folders" className="card p-3">
      <div className="flex items-center justify-between px-2 pb-2">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">Folders</p>
        <button
          type="button"
          onClick={onNewFolder}
          aria-label="Create new folder"
          title="Create new folder"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-subtle hover:text-ink"
        >
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <ul className="space-y-1">
        <li>
          <Link
            href="/notes"
            aria-current={activeFolder === "all" ? "page" : undefined}
            className={cn(
              "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
              activeFolder === "all" ? "bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "text-ink hover:bg-subtle"
            )}
          >
            <span className="flex items-center gap-2">
              <BookIcon className="h-4 w-4" aria-hidden="true" />
              All Notes
            </span>
            <span className="text-xs text-muted">{notes.filter((n) => !n.isArchived).length}</span>
          </Link>
        </li>
        {folders.map((f) => {
          const active = activeFolder === f.id;
          return (
            <li key={f.id}>
              <Link
                href={`/notes/folders/${f.id}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
                  active ? "bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "text-ink hover:bg-subtle"
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <FileTextIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{f.name}</span>
                </span>
                <span className="shrink-0 text-xs text-muted">{counts.get(f.id) ?? 0}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/notes/folders/unfiled"
            aria-current={activeFolder === "unfiled" ? "page" : undefined}
            className={cn(
              "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
              activeFolder === "unfiled" ? "bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200" : "text-ink hover:bg-subtle"
            )}
          >
            <span className="flex items-center gap-2">
              <FileTextIcon className="h-4 w-4" aria-hidden="true" />
              Unfiled
            </span>
            <span className="text-xs text-muted">{unfiled}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export function FolderManager({ folderId }: { folderId: string }) {
  const { folders, renameFolder, deleteFolder } = useNotes();
  const router = useRouter();
  const folder = folders.find((f) => f.id === folderId);
  const [renaming, setRenaming] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  if (!folder) return null;

  const onDelete = async () => {
    setBusy(true);
    try {
      await deleteFolder(folderId);
      setConfirmDelete(false);
      router.push("/notes");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => setRenaming(true)}>
        Rename
      </Button>
      <Button variant="outline" size="sm" onClick={() => setConfirmDelete(true)}>
        Delete
      </Button>
      <FolderDialog
        open={renaming}
        onClose={() => setRenaming(false)}
        initialName={folder.name}
        title="Rename folder"
        submitLabel="Save"
        onSubmit={(name) => renameFolder(folderId, name).then(() => undefined)}
      />
      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete this folder?"
        description="Notes inside will be moved to Unfiled. They will not be deleted."
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmDelete(false)} disabled={busy}>
              Keep folder
            </Button>
            <Button variant="danger" onClick={() => void onDelete()} disabled={busy}>
              {busy ? "Deleting…" : "Delete folder"}
            </Button>
          </>
        }
      >
        <p className="flex items-start gap-2 rounded-xl bg-warning-50 p-3 text-sm text-warning-700 dark:bg-warning-500/10">
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Delete folder and move notes to Unfiled.
        </p>
      </Modal>
    </div>
  );
}
