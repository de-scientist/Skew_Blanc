import { describe, expect, it } from "vitest";
import {
  applyQuery,
  allTags,
  buildToc,
  computeStats,
  countWords,
  createNoteEntity,
  duplicateNoteEntity,
  excerptOf,
  normalizeTag,
  normalizeTags,
  noteMatchesSearch,
  relatedNotes,
  validateNoteInput,
} from "./store";
import { DEFAULT_QUERY } from "./constants";
import type { UserNote } from "./types";

function makeNote(overrides: Partial<UserNote> = {}): UserNote {
  const now = new Date().toISOString();
  return {
    id: "note-x",
    userId: "u-1",
    title: "Test note",
    content: "Some content here",
    subject: "Pharmacology",
    noteType: "study",
    folderId: null,
    tags: [],
    isFavorite: false,
    isHighYield: false,
    isArchived: false,
    status: "published",
    createdAt: now,
    updatedAt: now,
    lastViewedAt: null,
    wordCount: 3,
    readingMinutes: 1,
    aiGenerated: false,
    sourceNoteId: null,
    version: 1,
    ...overrides,
  };
}

describe("normalizeTag", () => {
  it("strips hashes, lowercases, and slugifies spaces", () => {
    expect(normalizeTag("#High Yield")).toBe("high-yield");
    expect(normalizeTag("  CARDIAC ")).toBe("cardiac");
  });

  it("dedupes and drops empties", () => {
    expect(normalizeTags(["#NCLEX", "nclex", " ", "Pharm", "pharm"])).toEqual([
      "nclex",
      "pharm",
    ]);
  });
});

describe("validateNoteInput", () => {
  const base = {
    title: "Heart failure",
    content: "Body",
    subject: "Pharmacology" as const,
    noteType: "study" as const,
    folderId: null,
    tags: [],
    isFavorite: false,
    isHighYield: false,
    status: "published" as const,
  };

  it("accepts a complete note", () => {
    expect(validateNoteInput(base)).toEqual({});
  });

  it("rejects empty titles", () => {
    expect(validateNoteInput({ ...base, title: "  " }).title).toBeDefined();
  });

  it("allows empty content for drafts but not published notes", () => {
    expect(
      validateNoteInput({ ...base, content: "  ", status: "draft" }).content
    ).toBeUndefined();
    expect(validateNoteInput({ ...base, content: "  " }).content).toBeDefined();
  });
});

describe("search and filter", () => {
  const notes = [
    makeNote({
      id: "a",
      title: "Heart Failure",
      content: "Pump cannot meet demands",
      subject: "Medical-Surgical Nursing",
      tags: ["cardiac"],
      isFavorite: true,
    }),
    makeNote({
      id: "b",
      title: "ACE Inhibitors",
      content: "Drugs ending in pril",
      subject: "Pharmacology",
      tags: ["medications", "cardiac"],
      isHighYield: true,
    }),
  ];

  it("matches title, content, subject, and tags", () => {
    expect(noteMatchesSearch(notes[0], "pump")).toBe(true);
    expect(noteMatchesSearch(notes[1], "cardiac")).toBe(true);
    expect(noteMatchesSearch(notes[0], "pharm")).toBe(false);
  });

  it("combines filters", () => {
    const result = applyQuery(notes, {
      ...DEFAULT_QUERY,
      search: "cardiac",
      highYieldOnly: true,
    });
    expect(result.map((n) => n.id)).toEqual(["b"]);
  });

  it("sorts alphabetically and oldest-first", () => {
    const alpha = applyQuery(notes, { ...DEFAULT_QUERY, sort: "alpha" });
    expect(alpha[0].id).toBe("b");
  });
});

describe("computeStats", () => {
  it("excludes archived notes from totals", () => {
    const notes = [
      makeNote({ id: "a", isFavorite: true }),
      makeNote({ id: "b", isArchived: true, isFavorite: true }),
    ];
    const stats = computeStats(notes);
    expect(stats.total).toBe(1);
    expect(stats.favorites).toBe(1);
    expect(stats.archived).toBe(1);
  });
});

describe("relatedNotes and allTags", () => {
  it("ranks shared subject and tags first", () => {
    const base = makeNote({
      id: "base",
      subject: "Pharmacology",
      tags: ["cardiac"],
    });
    const close = makeNote({
      id: "close",
      subject: "Pharmacology",
      tags: ["cardiac"],
    });
    const far = makeNote({ id: "far", subject: "Pediatrics", tags: ["growth"] });
    expect(relatedNotes(base, [base, close, far]).map((n) => n.id)).toEqual([
      "close",
    ]);
  });

  it("orders tags by frequency", () => {
    const notes = [
      makeNote({ tags: ["a", "b"] }),
      makeNote({ tags: ["a"] }),
    ];
    expect(allTags(notes)).toEqual(["a", "b"]);
  });
});

describe("content helpers", () => {
  it("counts words and builds excerpts", () => {
    expect(countWords("## Hello\n\n**bold** words here")).toBe(3);
    expect(excerptOf("Short").length).toBeGreaterThan(0);
  });

  it("builds a table of contents from h2/h3", () => {
    const toc = buildToc("## Alpha\n\n### Beta\n\n# Ignored");
    expect(toc.map((t) => t.text)).toEqual(["Alpha", "Beta"]);
  });
});

describe("factories", () => {
  it("creates entities with derived metrics", () => {
    const note = createNoteEntity("u-1", {
      title: "  T  ",
      content: "one two three",
      subject: "Pharmacology",
      noteType: "study",
      folderId: null,
      tags: ["#A"],
      isFavorite: false,
      isHighYield: false,
      status: "published",
    });
    expect(note.title).toBe("T");
    expect(note.tags).toEqual(["a"]);
    expect(note.wordCount).toBe(3);
  });

  it("duplicates with a new id and copy title", () => {
    const original = makeNote({ title: "HF" });
    const copy = duplicateNoteEntity(original);
    expect(copy.id).not.toBe(original.id);
    expect(copy.title).toBe("HF — Copy");
    expect(copy.isArchived).toBe(false);
  });
});
