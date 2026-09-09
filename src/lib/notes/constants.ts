import type {
  NotesQuery,
  NoteSubject,
  NotesSort,
  NoteType,
} from "./types";

export const NOTE_SUBJECTS: NoteSubject[] = [
  "Anatomy & Physiology",
  "Pharmacology",
  "Fundamentals of Nursing",
  "Medical-Surgical Nursing",
  "Pediatrics",
  "Maternal & Newborn",
  "Mental Health Nursing",
  "Community Health",
  "Pathophysiology",
  "NCLEX High-Yield",
  "Other",
];

export const NOTE_TYPES: Array<{ value: NoteType; label: string }> = [
  { value: "study", label: "Study Note" },
  { value: "lecture", label: "Lecture Note" },
  { value: "revision", label: "Revision Note" },
  { value: "summary", label: "Summary" },
  { value: "clinical", label: "Clinical Note" },
  { value: "nclex", label: "NCLEX Note" },
];

export const NOTE_TYPE_LABELS: Record<NoteType, string> = {
  study: "Study Note",
  lecture: "Lecture Note",
  revision: "Revision Note",
  summary: "Summary",
  clinical: "Clinical Note",
  nclex: "NCLEX Note",
};

export const SORT_OPTIONS: Array<{ value: NotesSort; label: string }> = [
  { value: "updated", label: "Recently updated" },
  { value: "created", label: "Newest first" },
  { value: "viewed", label: "Recently viewed" },
  { value: "alpha", label: "Alphabetical (A–Z)" },
  { value: "oldest", label: "Oldest first" },
  { value: "newest", label: "Recently created" },
];

export const DEFAULT_SORT: NotesSort = "updated";

export const DEFAULT_QUERY: NotesQuery = {
  search: "",
  subjects: [],
  noteTypes: [],
  tags: [],
  folder: "all",
  favoritesOnly: false,
  highYieldOnly: false,
  draftsOnly: false,
  sort: DEFAULT_SORT,
};

export const DEFAULT_FOLDER_NAMES = [
  "Pharmacology",
  "Medical-Surgical",
  "Fundamentals",
  "Pediatrics",
  "Maternal & Newborn",
  "Mental Health",
  "NCLEX Review",
] as const;

/** Callout block types supported by the note renderer. */
export const CALLOUT_TYPES = [
  "key-concept",
  "nursing-alert",
  "nclex-tip",
  "signs-symptoms",
  "interventions",
  "medications",
  "labs",
] as const;

export type CalloutType = (typeof CALLOUT_TYPES)[number];

export const CALLOUT_LABELS: Record<CalloutType, string> = {
  "key-concept": "Key Concept",
  "nursing-alert": "Nursing Alert",
  "nclex-tip": "NCLEX Tip",
  "signs-symptoms": "Signs & Symptoms",
  interventions: "Nursing Interventions",
  medications: "Medications",
  labs: "Lab Values",
};

export const MAX_TITLE_LENGTH = 140;
export const MAX_TAG_LENGTH = 32;
export const MAX_TAGS_PER_NOTE = 20;

/** Notes viewed/edited in the last N days count as "recently studied". */
export const RECENT_DAYS = 14;
