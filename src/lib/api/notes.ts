import { request } from "./client";
import {
  countWords,
  createFolderEntity,
  createNoteEntity,
  defaultFolderEntities,
  duplicateNoteEntity,
  isSubject,
  makeId,  normalizeTags,
  readingMinutesFor,
  seedNoteEntities,
} from "@/lib/notes/store";
import type {
  NoteFolder,
  NoteInput,
  NoteSubject,
  UserNote,
} from "@/lib/notes/types";

/**
 * Personal Notes API.
 *
 * The Nursora backend owns the real notes tables; this module mirrors the
 * intended REST contract (`GET /notes`, `POST /notes`, …) against a
 * per-user localStorage store so the full UX works before the backend table
 * ships. Swap each function body for a `fetch` to `NEXT_PUBLIC_API_URL` —
 * signatures already carry `userId` first so server-side authorization maps
 * 1:1 (never trust the client: the real API must scope every query by the
 * authenticated user).
 */

const notesKey = (userId: string) => `nursora:notes:${userId}`;
const foldersKey = (userId: string) => `nursora:note-folders:${userId}`;

function readLS<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeLS(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full/blocked — the UI surfaces save failures via try/catch
    // around these API calls instead.
  }
}

function sanitizeNote(raw: unknown, userId: string): UserNote | null {
  if (!raw || typeof raw !== "object") return null;
  const n = raw as Record<string, unknown>;
  if (typeof n.id !== "string" || typeof n.title !== "string") return null;
  const now = new Date().toISOString();
  const subject: NoteSubject =
    typeof n.subject === "string" && isSubject(n.subject)
      ? n.subject
      : "Other";
  return {
    id: n.id,
    userId,
    title: n.title.slice(0, 200),
    content: typeof n.content === "string" ? n.content : "",
    subject,
    noteType:
      n.noteType === "lecture" ||
      n.noteType === "revision" ||
      n.noteType === "summary" ||
      n.noteType === "clinical" ||
      n.noteType === "nclex"
        ? n.noteType
        : "study",
    folderId: typeof n.folderId === "string" ? n.folderId : null,
    tags: Array.isArray(n.tags)
      ? normalizeTags(n.tags.filter((t): t is string => typeof t === "string"))
      : [],
    isFavorite: n.isFavorite === true,
    isHighYield: n.isHighYield === true,
    isArchived: n.isArchived === true,
    status: n.status === "draft" ? "draft" : "published",
    createdAt: typeof n.createdAt === "string" ? n.createdAt : now,
    updatedAt: typeof n.updatedAt === "string" ? n.updatedAt : now,
    lastViewedAt: typeof n.lastViewedAt === "string" ? n.lastViewedAt : null,
    wordCount: typeof n.wordCount === "number" ? n.wordCount : 0,
    readingMinutes: typeof n.readingMinutes === "number" ? n.readingMinutes : 1,
    aiGenerated: n.aiGenerated === true,
    sourceNoteId:
      typeof n.sourceNoteId === "string" ? n.sourceNoteId : null,
    version: typeof n.version === "number" ? n.version : 1,
  };
}

function loadNotes(userId: string): UserNote[] {
  const stored = readLS<unknown[]>(notesKey(userId));
  if (stored) {
    return stored
      .map((n) => sanitizeNote(n, userId))
      .filter((n): n is UserNote => n !== null);
  }
  // First run: seed a realistic starter library so the dashboard teaches
  // the product instead of showing an empty page.
  const folders = loadFolders(userId);
  const seeded = seedNoteEntities(userId, folders);
  writeLS(notesKey(userId), seeded);
  return seeded;
}

function persistNotes(userId: string, notes: UserNote[]) {
  writeLS(notesKey(userId), notes);
}

function loadFolders(userId: string): NoteFolder[] {
  const stored = readLS<NoteFolder[]>(foldersKey(userId));
  if (stored) return stored.filter((f) => f && typeof f.id === "string");
  const seeded = defaultFolderEntities(userId);
  writeLS(foldersKey(userId), seeded);
  return seeded;
}

function persistFolders(userId: string, folders: NoteFolder[]) {
  writeLS(foldersKey(userId), folders);
}

function requireOwnership(note: UserNote | undefined, userId: string): UserNote {
  if (!note || note.userId !== userId) {
    throw new Error("Note not found.");
  }
  return note;
}

/* ------------------------------- Notes ------------------------------ */

export async function getNotes(userId: string): Promise<UserNote[]> {
  return request(loadNotes(userId), 250);
}

export async function getFolders(userId: string): Promise<NoteFolder[]> {
  return request(loadFolders(userId), 150);
}

export async function getNote(
  userId: string,
  id: string
): Promise<UserNote> {
  const note = loadNotes(userId).find((n) => n.id === id);
  return request(requireOwnership(note, userId), 150);
}

/** Record a view (drives Recent + Recently Studied). Never throws. */
export async function recordNoteView(
  userId: string,
  id: string
): Promise<UserNote | null> {
  try {
    const notes = loadNotes(userId);
    const note = notes.find((n) => n.id === id);
    if (!note || note.userId !== userId) return null;
    const updated: UserNote = {
      ...note,
      lastViewedAt: new Date().toISOString(),
    };
    persistNotes(
      userId,
      notes.map((n) => (n.id === id ? updated : n))
    );
    return request(updated, 0);
  } catch {
    return null;
  }
}

export async function createNote(
  userId: string,
  input: NoteInput,
  opts?: { aiGenerated?: boolean; sourceNoteId?: string | null }
): Promise<UserNote> {
  const folders = loadFolders(userId);
  const folderId =
    input.folderId && folders.some((f) => f.id === input.folderId)
      ? input.folderId
      : null;
  const note: UserNote = {
    ...createNoteEntity(userId, { ...input, folderId }),
    aiGenerated: opts?.aiGenerated ?? false,
    sourceNoteId: opts?.sourceNoteId ?? null,
  };
  const notes = loadNotes(userId);
  persistNotes(userId, [note, ...notes]);
  return request(note, 300);
}

export async function updateNote(
  userId: string,
  id: string,
  patch: Partial<NoteInput> & { isArchived?: boolean }
): Promise<UserNote> {
  const notes = loadNotes(userId);
  const existing = requireOwnership(
    notes.find((n) => n.id === id),
    userId
  );
  const folders = loadFolders(userId);
  const next: UserNote = {
    ...existing,
    title: patch.title !== undefined ? patch.title.trim() : existing.title,
    content: patch.content !== undefined ? patch.content : existing.content,
    subject: patch.subject ?? existing.subject,
    noteType: patch.noteType ?? existing.noteType,
    folderId:
      patch.folderId !== undefined
        ? patch.folderId &&
          folders.some((f) => f.id === patch.folderId)
          ? patch.folderId
          : null
        : existing.folderId,
    tags: patch.tags !== undefined ? normalizeTags(patch.tags) : existing.tags,
    isFavorite: patch.isFavorite ?? existing.isFavorite,
    isHighYield: patch.isHighYield ?? existing.isHighYield,
    status: patch.status ?? existing.status,
    isArchived: patch.isArchived ?? existing.isArchived,
    updatedAt: new Date().toISOString(),
    version: existing.version + 1,
  };
  next.wordCount = countWords(next.content);
  next.readingMinutes = readingMinutesFor(next.content);
  persistNotes(
    userId,
    notes.map((n) => (n.id === id ? next : n))
  );
  return request(next, 300);
}

export async function deleteNote(
  userId: string,
  id: string
): Promise<{ id: string }> {
  const notes = loadNotes(userId);
  requireOwnership(
    notes.find((n) => n.id === id),
    userId
  );
  persistNotes(
    userId,
    notes.filter((n) => n.id !== id)
  );
  return request({ id }, 250);
}

export async function duplicateNote(
  userId: string,
  id: string
): Promise<UserNote> {
  const notes = loadNotes(userId);
  const existing = requireOwnership(
    notes.find((n) => n.id === id),
    userId
  );
  const copy = duplicateNoteEntity(existing);
  persistNotes(userId, [copy, ...notes]);
  return request(copy, 300);
}

export async function toggleFavorite(
  userId: string,
  id: string
): Promise<UserNote> {
  const notes = loadNotes(userId);
  const existing = requireOwnership(
    notes.find((n) => n.id === id),
    userId
  );
  return updateNote(userId, id, { isFavorite: !existing.isFavorite });
}

export async function toggleHighYield(
  userId: string,
  id: string
): Promise<UserNote> {
  const notes = loadNotes(userId);
  const existing = requireOwnership(
    notes.find((n) => n.id === id),
    userId
  );
  return updateNote(userId, id, { isHighYield: !existing.isHighYield });
}

export async function archiveNote(
  userId: string,
  id: string
): Promise<UserNote> {
  return updateNote(userId, id, { isArchived: true });
}

export async function restoreNote(
  userId: string,
  id: string
): Promise<UserNote> {
  return updateNote(userId, id, { isArchived: false });
}

/* ------------------------------ Folders ----------------------------- */

export async function createFolder(
  userId: string,
  name: string
): Promise<NoteFolder> {
  const clean = name.trim();
  if (!clean) throw new Error("Give the folder a name.");
  if (clean.length > 60) throw new Error("Folder names are limited to 60 characters.");
  const folders = loadFolders(userId);
  if (
    folders.some((f) => f.name.toLowerCase() === clean.toLowerCase())
  ) {
    throw new Error("A folder with that name already exists.");
  }
  const folder = createFolderEntity(userId, clean);
  persistFolders(userId, [...folders, folder]);
  return request(folder, 200);
}

export async function renameFolder(
  userId: string,
  id: string,
  name: string
): Promise<NoteFolder> {
  const clean = name.trim();
  if (!clean) throw new Error("Give the folder a name.");
  const folders = loadFolders(userId);
  const existing = folders.find((f) => f.id === id);
  if (!existing) throw new Error("Folder not found.");
  if (
    folders.some(
      (f) => f.id !== id && f.name.toLowerCase() === clean.toLowerCase()
    )
  ) {
    throw new Error("A folder with that name already exists.");
  }
  const next = { ...existing, name: clean, updatedAt: new Date().toISOString() };
  persistFolders(
    userId,
    folders.map((f) => (f.id === id ? next : f))
  );
  return request(next, 200);
}

export async function deleteFolder(
  userId: string,
  id: string
): Promise<{ id: string }> {
  const folders = loadFolders(userId);
  if (!folders.some((f) => f.id === id)) throw new Error("Folder not found.");
  persistFolders(
    userId,
    folders.filter((f) => f.id !== id)
  );
  // Notes are never deleted with a folder — they move to Unfiled.
  const notes = loadNotes(userId);
  persistNotes(
    userId,
    notes.map((n) =>
      n.folderId === id
        ? { ...n, folderId: null, updatedAt: new Date().toISOString() }
        : n
    )
  );
  return request({ id }, 200);
}

export async function moveNoteToFolder(
  userId: string,
  noteId: string,
  folderId: string | null
): Promise<UserNote> {
  return updateNote(userId, noteId, { folderId });
}

/** Storage key helper (useful for cross-tab sync listeners). */
export function storageKeyForNotes(userId: string): string {
  return notesKey(userId);
}
