import { describe, expect, it } from "vitest";
import { HeuristicNoteStudyProvider, NoteStudyService } from "./ai";
import type { UserNote } from "./types";

function makeNote(): UserNote {
  const now = new Date().toISOString();
  return {
    id: "note-1",
    userId: "u-1",
    title: "Heart Failure",
    content: `## Left-Sided Failure\n\n- Dyspnea and orthopnea\n- Crackles on auscultation\n\n## Right-Sided Failure\n\n- Jugular vein distention\n- Dependent edema\n`,
    subject: "Medical-Surgical Nursing",
    noteType: "nclex",
    folderId: null,
    tags: ["cardiac"],
    isFavorite: false,
    isHighYield: true,
    isArchived: false,
    status: "published",
    createdAt: now,
    updatedAt: now,
    lastViewedAt: null,
    wordCount: 20,
    readingMinutes: 1,
    aiGenerated: false,
    sourceNoteId: null,
    version: 1,
  };
}

describe("HeuristicNoteStudyProvider", () => {
  const provider = new HeuristicNoteStudyProvider();
  const note = makeNote();

  it("summarizes without inventing content", () => {
    const summary = provider.summarize(note);
    expect(summary.tldr.length).toBeGreaterThan(0);
    expect(summary.keyConcepts.length).toBeGreaterThan(0);
    expect(summary.remember.length).toBeGreaterThan(0);
  });

  it("derives flashcards from the note's own bullets", () => {
    const cards = provider.flashcards(note, 4);
    expect(cards).toHaveLength(4);
    expect(cards[0].front).toContain("Left-Sided Failure");
    for (const c of cards) {
      expect(c.front.length).toBeGreaterThan(0);
      expect(c.back.length).toBeGreaterThan(0);
    }
  });

  it("builds answerable practice questions", () => {
    const questions = provider.practiceQuestions(note, 3);
    expect(questions).toHaveLength(3);
    for (const q of questions) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndexes[0]).toBeGreaterThanOrEqual(0);
      expect(q.correctIndexes[0]).toBeLessThan(4);
      expect(q.options[q.correctIndexes[0]].length).toBeGreaterThan(0);
    }
  });

  it("handles nearly-empty notes gracefully", () => {
    const empty = { ...note, content: "" };
    expect(provider.flashcards(empty, 2).length).toBeGreaterThan(0);
    expect(provider.summarize(empty).tldr.length).toBeGreaterThan(0);
  });
});

describe("NoteStudyService", () => {
  it("exposes the provider boundary", () => {
    const service = new NoteStudyService();
    expect(service.providerName).toBe("heuristic");
    expect(service.keyPoints(makeNote(), 2).length).toBeLessThanOrEqual(2);
  });
});
