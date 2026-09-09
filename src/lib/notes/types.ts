/**
 * Personal Notes domain model.
 *
 * Notes are private to a single user (`userId`). Every read/write path is
 * scoped by `userId` in the API layer (`src/lib/api/notes.ts`) — the UI must
 * never be the only authorization boundary.
 */

export type NoteSubject =
  | "Anatomy & Physiology"
  | "Pharmacology"
  | "Fundamentals of Nursing"
  | "Medical-Surgical Nursing"
  | "Pediatrics"
  | "Maternal & Newborn"
  | "Mental Health Nursing"
  | "Community Health"
  | "Pathophysiology"
  | "NCLEX High-Yield"
  | "Other";

export type NoteType =
  | "study"
  | "lecture"
  | "revision"
  | "summary"
  | "clinical"
  | "nclex";

export type NoteStatus = "draft" | "published";

export type NotesSort =
  | "updated"
  | "created"
  | "viewed"
  | "alpha"
  | "oldest"
  | "newest";

export interface NoteFolder {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserNote {
  id: string;
  userId: string;
  title: string;
  /** Markdown-lite content with optional `::: callout` nursing blocks. */
  content: string;
  subject: NoteSubject;
  noteType: NoteType;
  folderId: string | null;
  /** Normalized lowercase tags without `#`. */
  tags: string[];
  isFavorite: boolean;
  isHighYield: boolean;
  isArchived: boolean;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
  lastViewedAt: string | null;
  wordCount: number;
  readingMinutes: number;
  /** True when the content was produced by an AI study tool. */
  aiGenerated: boolean;
  sourceNoteId: string | null;
  version: number;
}

export interface NoteInput {
  title: string;
  content: string;
  subject: NoteSubject;
  noteType: NoteType;
  folderId: string | null;
  tags: string[];
  isFavorite: boolean;
  isHighYield: boolean;
  status: NoteStatus;
}

export interface NotesQuery {
  search: string;
  subjects: NoteSubject[];
  noteTypes: NoteType[];
  tags: string[];
  /** "all" | "unfiled" | a folder id */
  folder: string;
  favoritesOnly: boolean;
  highYieldOnly: boolean;
  draftsOnly: boolean;
  sort: NotesSort;
}

export interface NotesStats {
  total: number;
  favorites: number;
  highYield: number;
  recentlyStudied: number;
  archived: number;
  drafts: number;
  totalWords: number;
}

export interface TocEntry {
  id: string;
  level: 2 | 3;
  text: string;
}
