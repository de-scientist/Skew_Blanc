import {
  MAX_TAGS_PER_NOTE,
  MAX_TAG_LENGTH,
  MAX_TITLE_LENGTH,
  NOTE_SUBJECTS,
  RECENT_DAYS,
} from "./constants";
import type {
  NoteFolder,
  NoteInput,
  NotesQuery,
  NotesStats,
  NoteSubject,
  TocEntry,
  UserNote,
} from "./types";

/* ------------------------------------------------------------------ */
/* Tags                                                                */
/* ------------------------------------------------------------------ */

/** Normalize a single raw tag: strip `#`, trim, lowercase, drop junk. */
export function normalizeTag(raw: string): string {
  return raw
    .replace(/^#+/, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, MAX_TAG_LENGTH);
}

export function normalizeTags(raw: string[]): string[] {
  const seen = new Set<string>();
  for (const t of raw) {
    const n = normalizeTag(t);
    if (n.length > 0) seen.add(n);
    if (seen.size >= MAX_TAGS_PER_NOTE) break;
  }
  return [...seen];
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

export type NoteErrors = Partial<
  Record<"title" | "content" | "subject" | "noteType" | "tags", string>
>;

export function validateNoteInput(input: NoteInput): NoteErrors {
  const errors: NoteErrors = {};
  if (input.title.trim().length === 0) {
    errors.title = "Give your note a title.";
  } else if (input.title.trim().length > MAX_TITLE_LENGTH) {
    errors.title = `Title must be ${MAX_TITLE_LENGTH} characters or fewer.`;
  }
  // Drafts may be empty; published notes need real content.
  if (input.status === "published" && input.content.trim().length === 0) {
    errors.content = "Add some content before publishing this note.";
  }
  if (!NOTE_SUBJECTS.includes(input.subject)) {
    errors.subject = "Choose a valid subject.";
  }
  if (!input.noteType) {
    errors.noteType = "Choose a note type.";
  }
  if (input.tags.length > MAX_TAGS_PER_NOTE) {
    errors.tags = `Use at most ${MAX_TAGS_PER_NOTE} tags.`;
  }
  return errors;
}

export function isValidNoteInput(input: NoteInput): boolean {
  return Object.keys(validateNoteInput(input)).length === 0;
}

/* ------------------------------------------------------------------ */
/* Derived content metrics                                             */
/* ------------------------------------------------------------------ */

export function stripMarkdown(content: string): string {
  return content
    .replace(/^:::\s*[\w-]+.*$/gm, "")
    .replace(/^:::\s*$/gm, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/==(.*?)==/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/^#{1,4}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+\[[ xX]\]\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+[.)]\s+/gm, "")
    .replace(/^\|/gm, "")
    .replace(/\|/g, " ")
    .replace(/^[-:|\s]+$/gm, "")
    .trim();
}

export function countWords(content: string): number {
  const plain = stripMarkdown(content);
  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
}

export function readingMinutesFor(content: string): number {
  return Math.max(1, Math.ceil(countWords(content) / 200));
}

export function excerptOf(content: string, maxLength = 160): string {
  const plain = stripMarkdown(content).replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;
  const cut = plain.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : maxLength).trim()}…`;
}

/* ------------------------------------------------------------------ */
/* Querying: search / filter / sort                                    */
/* ------------------------------------------------------------------ */

export function noteMatchesSearch(note: UserNote, search: string): boolean {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  const haystacks = [
    note.title,
    stripMarkdown(note.content),
    note.subject,
    ...note.tags,
  ];
  return haystacks.some((h) => h.toLowerCase().includes(q));
}

export function applyQuery(notes: UserNote[], query: NotesQuery): UserNote[] {
  const filtered = notes.filter((note) => {
    if (!noteMatchesSearch(note, query.search)) return false;
    if (query.subjects.length > 0 && !query.subjects.includes(note.subject)) {
      return false;
    }
    if (query.noteTypes.length > 0 && !query.noteTypes.includes(note.noteType)) {
      return false;
    }
    if (
      query.tags.length > 0 &&
      !query.tags.every((t) => note.tags.includes(normalizeTag(t)))
    ) {
      return false;
    }
    if (query.folder === "unfiled" && note.folderId !== null) return false;
    if (
      query.folder !== "all" &&
      query.folder !== "unfiled" &&
      note.folderId !== query.folder
    ) {
      return false;
    }
    if (query.favoritesOnly && !note.isFavorite) return false;
    if (query.highYieldOnly && !note.isHighYield) return false;
    if (query.draftsOnly && note.status !== "draft") return false;
    return true;
  });

  const sorted = [...filtered];
  switch (query.sort) {
    case "alpha":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "created":
    case "newest":
      sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
    case "oldest":
      sorted.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
      break;
    case "viewed":
      sorted.sort(
        (a, b) =>
          +(b.lastViewedAt ? new Date(b.lastViewedAt) : 0) -
          +(a.lastViewedAt ? new Date(a.lastViewedAt) : 0)
      );
      break;
    case "updated":
    default:
      sorted.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
      break;
  }
  return sorted;
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export function computeStats(notes: UserNote[], now = Date.now()): NotesStats {
  const active = notes.filter((n) => !n.isArchived);
  const cutoff = now - RECENT_DAYS * 24 * 60 * 60 * 1000;
  return {
    total: active.length,
    favorites: active.filter((n) => n.isFavorite).length,
    highYield: active.filter((n) => n.isHighYield).length,
    recentlyStudied: active.filter((n) => {
      const last = Math.max(
        +new Date(n.updatedAt),
        n.lastViewedAt ? +new Date(n.lastViewedAt) : 0
      );
      return last >= cutoff;
    }).length,
    archived: notes.filter((n) => n.isArchived).length,
    drafts: active.filter((n) => n.status === "draft").length,
    totalWords: active.reduce((sum, n) => sum + n.wordCount, 0),
  };
}

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

/** Notes sharing subject, folder, or tags — best overlap first. */
export function relatedNotes(
  note: UserNote,
  all: UserNote[],
  limit = 4
): UserNote[] {
  return all
    .filter((n) => n.id !== note.id && !n.isArchived)
    .map((n) => {
      let score = 0;
      if (n.subject === note.subject) score += 3;
      if (note.folderId && n.folderId === note.folderId) score += 2;
      const shared = n.tags.filter((t) => note.tags.includes(t)).length;
      score += shared;
      return { note: n, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.note);
}

/** All tags used across the library, most frequent first. */
export function allTags(notes: UserNote[]): string[] {
  const counts = new Map<string, number>();
  for (const n of notes) {
    for (const t of n.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);
}

/* ------------------------------------------------------------------ */
/* Table of contents                                                   */
/* ------------------------------------------------------------------ */

export function slugifyHeading(text: string, index: number): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return `${slug || "section"}-${index}`;
}

export function buildToc(content: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const lines = content.split("\n");
  let index = 0;
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line.trim());
    if (match) {
      const text = match[2].replace(/[*_`~=[\]()]/g, "").trim();
      if (!text) continue;
      entries.push({
        id: slugifyHeading(text, index++),
        level: match[1].length === 2 ? 2 : 3,
        text,
      });
    }
  }
  return entries;
}

/* ------------------------------------------------------------------ */
/* Factories                                                           */
/* ------------------------------------------------------------------ */

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createNoteEntity(
  userId: string,
  input: NoteInput,
  now = new Date().toISOString()
): UserNote {
  return {
    id: makeId("note"),
    userId,
    title: input.title.trim(),
    content: input.content,
    subject: input.subject,
    noteType: input.noteType,
    folderId: input.folderId,
    tags: normalizeTags(input.tags),
    isFavorite: input.isFavorite,
    isHighYield: input.isHighYield,
    isArchived: false,
    status: input.status,
    createdAt: now,
    updatedAt: now,
    lastViewedAt: null,
    wordCount: countWords(input.content),
    readingMinutes: readingMinutesFor(input.content),
    aiGenerated: false,
    sourceNoteId: null,
    version: 1,
  };
}

export function duplicateNoteEntity(note: UserNote): UserNote {
  const now = new Date().toISOString();
  return {
    ...note,
    id: makeId("note"),
    title: `${note.title} — Copy`,
    isArchived: false,
    status: "draft" as const,
    createdAt: now,
    updatedAt: now,
    lastViewedAt: null,
    version: 1,
  };
}

export function createFolderEntity(userId: string, name: string): NoteFolder {
  const now = new Date().toISOString();
  return {
    id: makeId("folder"),
    userId,
    name: name.trim(),
    createdAt: now,
    updatedAt: now,
  };
}

export function isSubject(value: string): value is NoteSubject {
  return (NOTE_SUBJECTS as string[]).includes(value);
}

/* ------------------------------------------------------------------ */
/* Seeds (first-run demo library, per user)                            */
/* ------------------------------------------------------------------ */

export function defaultFolderEntities(userId: string): NoteFolder[] {
  const base = Date.now();
  return [
    "Pharmacology",
    "Medical-Surgical",
    "Fundamentals",
    "Pediatrics",
    "Maternal & Newborn",
    "Mental Health",
    "NCLEX Review",
  ].map((name, i) => ({
    id: `seed-folder-${i + 1}`,
    userId,
    name,
    createdAt: new Date(base - (30 - i) * 86400000).toISOString(),
    updatedAt: new Date(base - (30 - i) * 86400000).toISOString(),
  }));
}

interface SeedSpec {
  title: string;
  subject: NoteSubject;
  noteType: UserNote["noteType"];
  folder: number | null;
  tags: string[];
  isFavorite: boolean;
  isHighYield: boolean;
  daysAgo: number;
  content: string;
}

const SEEDS: SeedSpec[] = [
  {
    title: "Heart Failure — High-Yield Concepts",
    subject: "Medical-Surgical Nursing",
    noteType: "nclex",
    folder: 1,
    tags: ["cardiac", "nclex", "high-yield", "prioritization"],
    isFavorite: true,
    isHighYield: true,
    daysAgo: 0,
    content: `Heart failure occurs when the heart cannot pump sufficient blood to meet the body's metabolic demands. Think perfusion first: every assessment and intervention protects cardiac output.

::: key-concept
Left-sided failure backs up into the lungs (pulmonary congestion). Right-sided failure backs up into the body (peripheral congestion). "Left = Lungs, Right = Rest of body."
:::

## Left-Sided Heart Failure

- Dyspnea, orthopnea, paroxysmal nocturnal dyspnea
- Crackles, cough with frothy sputum
- Fatigue, decreased activity tolerance

## Right-Sided Heart Failure

- Jugular vein distention (JVD)
- Dependent edema, weight gain
- Hepatomegaly, ascites

::: nursing-alert
Daily weights are the single best indicator of fluid status. A gain of 2–3 lb in 24 hours or 5 lb in a week must be reported immediately.
:::

## Nursing Interventions

1. Assess lung sounds, edema, I&O, and daily weights
2. Position in high Fowler's to ease breathing
3. Restrict sodium and fluids as prescribed
4. Administer diuretics, ACE inhibitors, beta blockers as ordered

::: nclex-tip
NCLEX loves "first action" questions here: airway and perfusion come before calling the provider. Assess first, then intervene.
:::`,
  },
  {
    title: "ACE Inhibitors — Pharmacology Essentials",
    subject: "Pharmacology",
    noteType: "study",
    folder: 0,
    tags: ["pharmacology", "medications", "cardiac", "nclex"],
    isFavorite: true,
    isHighYield: true,
    daysAgo: 1,
    content: `ACE inhibitors end in **-pril**: lisinopril, enalapril, captopril. They block conversion of angiotensin I to angiotensin II, causing vasodilation and lower blood pressure.

::: medications
- Class: ACE inhibitors (-pril)
- Indication: Hypertension, heart failure, diabetic nephropathy
- Side effects: Dry persistent cough, hyperkalemia, hypotension, angioedema
- Nursing considerations: Monitor BP, potassium, and renal function; check pregnancy status
:::

::: nursing-alert
Angioedema (swelling of face, lips, tongue) is a medical emergency. Stop the drug and seek emergency help. ACE inhibitors are teratogenic — never give in pregnancy.
:::

## Key Teaching Points

- Rise slowly to prevent orthostatic hypotension
- Report persistent dry cough to the provider
- Avoid potassium supplements and salt substitutes
- Take at the same time each day`,
  },
  {
    title: "Prioritization Frameworks — ABCs, Maslow, Nursing Process",
    subject: "Fundamentals of Nursing",
    noteType: "revision",
    folder: 2,
    tags: ["fundamentals", "prioritization", "nclex", "frameworks"],
    isFavorite: false,
    isHighYield: true,
    daysAgo: 3,
    content: `Most "who do you see first" questions are answered with the same frameworks. Apply them in order before looking at the options.

## The Order of Operations

1. **ABCs** — Airway, Breathing, Circulation beats everything
2. **Maslow** — Physiologic needs before safety, love, esteem
3. **Acute vs chronic** — New, sudden, unstable beats stable chronic
4. **Actual vs potential** — Real problems beat "at risk for"

::: nclex-tip
If one option involves an airway problem and the others don't, that option is almost always the priority. Unstable and unexpected findings outrank stable, expected ones.
:::

## Practice Rule

- Assess before you intervene (unless the intervention is lifesaving)
- Least invasive, least restrictive first
- Delegate only stable, predictable tasks to UAP`,
  },
  {
    title: "Labor Stages — Maternal & Newborn Quick Review",
    subject: "Maternal & Newborn",
    noteType: "lecture",
    folder: 4,
    tags: ["maternal", "labor", "newborn"],
    isFavorite: false,
    isHighYield: false,
    daysAgo: 6,
    content: `## Stage 1 — Latent, Active, Transition

- Latent: 0–3 cm, mild irregular contractions
- Active: 4–7 cm, regular strong contractions
- Transition: 8–10 cm, intense contractions, urge to push

## Stage 2 — Pushing and Birth

- Full dilation to delivery of the infant
- Encourage open-glottis pushing, frequent position changes

## Stage 3 — Placenta

- Delivery of the placenta within 5–30 minutes
- Watch for hemorrhage; assess fundus and lochia

## Stage 4 — Recovery

- First 1–4 hours postpartum
- Fundus firm at midline, lochia rubra, vitals every 15 minutes

::: nursing-alert
A boggy fundus with heavy bleeding means uterine atony — massage the fundus and notify the provider. Never push a boggy fundus down without supporting the lower uterus.
:::`,
  },
  {
    title: "Pediatric Milestones — What NCLEX Actually Tests",
    subject: "Pediatrics",
    noteType: "summary",
    folder: 3,
    tags: ["pediatrics", "growth", "development"],
    isFavorite: false,
    isHighYield: false,
    daysAgo: 9,
    content: `Age-banded milestones you are most likely to be tested on.

## Gross Motor

- 3 months: holds head up
- 6 months: rolls back to abdomen, sits with support
- 9 months: crawls, pulls to stand
- 12 months: walks with assistance, stands alone briefly

## Language & Social

- 2 months: social smile
- 6 months: babbles, stranger anxiety begins
- 12 months: first words, separation anxiety peaks
- 2 years: 2-word phrases, parallel play

::: key-concept
In growth questions, compare the finding to the expected norm for the age. Failure to double birth weight by 6 months or triple by 12 months needs evaluation.
:::`,
  },
  {
    title: "Therapeutic Communication — Mental Health Foundations",
    subject: "Mental Health Nursing",
    noteType: "clinical",
    folder: 5,
    tags: ["mental-health", "communication", "nclex"],
    isFavorite: true,
    isHighYield: false,
    daysAgo: 12,
    content: `Therapeutic responses acknowledge, explore, and validate. Nontherapeutic responses reassure falsely, judge, contradict, or shut the conversation down.

## Always Choose

- Open-ended questions: "Tell me more about..."
- Reflection: "It sounds like you feel..."
- Clarification and silence when appropriate

## Never Choose

- "Don't worry, everything will be fine" (false reassurance)
- "Why did you do that?" (demanding explanation)
- Giving advice or approving/disapproving
- Changing the subject prematurely

::: nclex-tip
The correct communication option is usually the one that invites the client to say more. Safety first though — if harm is mentioned, assess and protect.
:::`,
  },
];

export function seedNoteEntities(
  userId: string,
  folders: NoteFolder[]
): UserNote[] {
  const now = Date.now();
  return SEEDS.map((seed, i) => {
    const updated = new Date(now - seed.daysAgo * 86400000).toISOString();
    const created = new Date(now - (seed.daysAgo + 4) * 86400000).toISOString();
    const content = seed.content;
    return {
      id: `seed-note-${i + 1}`,
      userId,
      title: seed.title,
      content,
      subject: seed.subject,
      noteType: seed.noteType,
      folderId:
        seed.folder === null ? null : (folders[seed.folder]?.id ?? null),
      tags: normalizeTags(seed.tags),
      isFavorite: seed.isFavorite,
      isHighYield: seed.isHighYield,
      isArchived: false,
      status: "published" as const,
      createdAt: created,
      updatedAt: updated,
      lastViewedAt: seed.daysAgo <= 3 ? updated : null,
      wordCount: countWords(content),
      readingMinutes: readingMinutesFor(content),
      aiGenerated: false,
      sourceNoteId: null,
      version: 1,
    };
  });
}
