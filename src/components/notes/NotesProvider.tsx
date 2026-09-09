"use client";

import * as React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  archiveNote,
  createFolder as apiCreateFolder,
  createNote as apiCreateNote,
  deleteFolder as apiDeleteFolder,
  deleteNote as apiDeleteNote,
  duplicateNote as apiDuplicateNote,
  getFolders,
  getNotes,
  moveNoteToFolder,
  renameFolder as apiRenameFolder,
  restoreNote,
  storageKeyForNotes,
  toggleFavorite as apiToggleFavorite,
  toggleHighYield as apiToggleHighYield,
  updateNote as apiUpdateNote,
} from "@/lib/api/notes";
import type {
  NoteFolder,
  NoteInput,
  UserNote,
} from "@/lib/notes/types";
import { cn } from "@/lib/utils";

export interface Toast {
  id: string;
  message: string;
  tone: "success" | "error" | "info";
}

interface NotesContextValue {
  userId: string | null;
  notes: UserNote[];
  folders: NoteFolder[];
  isLoading: boolean;
  loadError: string | null;
  refresh: () => Promise<void>;
  createNote: (
    input: NoteInput,
    opts?: { aiGenerated?: boolean; sourceNoteId?: string | null }
  ) => Promise<UserNote>;
  updateNote: (
    id: string,
    patch: Partial<NoteInput> & { isArchived?: boolean }
  ) => Promise<UserNote>;
  removeNote: (id: string) => Promise<void>;
  duplicateNote: (id: string) => Promise<UserNote>;
  toggleFavorite: (id: string) => Promise<UserNote>;
  toggleHighYield: (id: string) => Promise<UserNote>;
  archiveNote: (id: string) => Promise<UserNote>;
  restoreNote: (id: string) => Promise<UserNote>;
  moveToFolder: (noteId: string, folderId: string | null) => Promise<UserNote>;
  createFolder: (name: string) => Promise<NoteFolder>;
  renameFolder: (id: string, name: string) => Promise<NoteFolder>;
  deleteFolder: (id: string) => Promise<void>;
  folderName: (folderId: string | null) => string;
  toasts: Toast[];
  notify: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: string) => void;
}

const NotesContext = React.createContext<NotesContextValue | null>(null);

const TOAST_STYLES: Record<Toast["tone"], string> = {
  success: "border-success-500/40 bg-surface text-ink",
  error: "border-danger-500/40 bg-surface text-ink",
  info: "border-line bg-surface text-ink",
};

function Toasts({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-toast flex flex-col items-center gap-2 px-4 lg:bottom-8"
    >
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          role="status"
          onClick={() => onDismiss(t.id)}
          className={cn(
            "pointer-events-auto max-w-md rounded-xl border px-4 py-2.5 text-sm font-medium shadow-card-hover",
            TOAST_STYLES[t.tone]
          )}
        >
          {t.message}
        </button>
      ))}
    </div>
  );
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const userId = user?.id ?? null;
  const [notes, setNotes] = React.useState<UserNote[]>([]);
  const [folders, setFolders] = React.useState<NoteFolder[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = React.useCallback(
    (message: string, tone: Toast["tone"] = "success") => {
      const id = `toast-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const refresh = React.useCallback(async () => {
    if (!userId) {
      setNotes([]);
      setFolders([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setLoadError(null);
    try {
      const [n, f] = await Promise.all([getNotes(userId), getFolders(userId)]);
      setNotes(n);
      setFolders(f);
    } catch {
      setLoadError("Something went wrong while loading your notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  React.useEffect(() => {
    if (status === "loading") return;
    void refresh();
  }, [status, refresh]);

  // Cross-tab sync: another tab writing notes refreshes this view.
  React.useEffect(() => {
    if (!userId) return;
    const key = storageKeyForNotes(userId);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) void refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [userId, refresh]);

  const mutate = React.useCallback(
    async <T,>(fn: () => Promise<T>, successMessage?: string): Promise<T> => {
      try {
        const result = await fn();
        await refresh();
        if (successMessage) notify(successMessage);
        return result;
      } catch (err) {
        notify(err instanceof Error ? err.message : "Something went wrong. Please try again.", "error");
        throw err;
      }
    },
    [notify, refresh]
  );

  const value = React.useMemo<NotesContextValue>(() => {
    if (!userId) {
      return {
        userId,
        notes: [],
        folders: [],
        isLoading,
        loadError,
        refresh,
        createNote: () => Promise.reject(new Error("Sign in to create notes.")),
        updateNote: () => Promise.reject(new Error("Sign in to edit notes.")),
        removeNote: () => Promise.reject(new Error("Sign in to manage notes.")),
        duplicateNote: () => Promise.reject(new Error("Sign in to manage notes.")),
        toggleFavorite: () => Promise.reject(new Error("Sign in to manage notes.")),
        toggleHighYield: () => Promise.reject(new Error("Sign in to manage notes.")),
        archiveNote: () => Promise.reject(new Error("Sign in to manage notes.")),
        restoreNote: () => Promise.reject(new Error("Sign in to manage notes.")),
        moveToFolder: () => Promise.reject(new Error("Sign in to manage notes.")),
        createFolder: () => Promise.reject(new Error("Sign in to manage folders.")),
        renameFolder: () => Promise.reject(new Error("Sign in to manage folders.")),
        deleteFolder: () => Promise.reject(new Error("Sign in to manage folders.")),
        folderName: () => "Unfiled",
        toasts,
        notify,
        dismissToast,
      };
    }
    const uid = userId;
    return {
      userId,
      notes,
      folders,
      isLoading,
      loadError,
      refresh,
      createNote: (input, opts) => mutate(() => apiCreateNote(uid, input, opts), "Note created."),
      updateNote: (id, patch) => mutate(() => apiUpdateNote(uid, id, patch), "Note saved."),
      removeNote: (id) => mutate(() => apiDeleteNote(uid, id), "Note deleted."),
      duplicateNote: (id) => mutate(() => apiDuplicateNote(uid, id), "Note duplicated."),
      toggleFavorite: (id) => mutate(() => apiToggleFavorite(uid, id)),
      toggleHighYield: (id) => mutate(() => apiToggleHighYield(uid, id)),
      archiveNote: (id) => mutate(() => apiArchiveNote(uid, id), "Note archived."),
      restoreNote: (id) => mutate(() => apiRestoreNote(uid, id), "Note restored."),
      moveToFolder: (noteId, folderId) => mutate(() => moveNoteToFolder(uid, noteId, folderId), "Note moved."),
      createFolder: (name) => mutate(() => apiCreateFolder(uid, name), "Folder created."),
      renameFolder: (id, name) => mutate(() => apiRenameFolder(uid, id, name), "Folder renamed."),
      deleteFolder: (id) => mutate(() => apiDeleteFolder(uid, id), "Folder deleted. Notes moved to Unfiled."),
      folderName: (folderId) =>
        folderId ? (folders.find((f) => f.id === folderId)?.name ?? "Unfiled") : "Unfiled",
      toasts,
      notify,
      dismissToast,
    };
  }, [userId, notes, folders, isLoading, loadError, refresh, mutate, toasts, notify, dismissToast]);

  return (
    <NotesContext.Provider value={value}>
      {children}
      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </NotesContext.Provider>
  );
}

export function useNotes(): NotesContextValue {
  const ctx = React.useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within a NotesProvider");
  return ctx;
}
