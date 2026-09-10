import { describe, expect, it } from "vitest";
import {
  getStudyNote,
  studyNoteHref,
  studyNotes,
} from "@/data/mock/content";

/**
 * Open-note routing contract for Study Notes.
 *
 * Regression coverage: every study-note card's "Open note" action must
 * navigate to that note's own detail URL (`/study-notes/:id`) — never back
 * to the bare list — and the detail route must be able to resolve the id
 * independently (direct URL / refresh safe).
 */
describe("study-note open-note routing", () => {
  it("resolves every listed note by its own id", () => {
    expect(studyNotes.length).toBeGreaterThan(0);
    for (const n of studyNotes) {
      const found = getStudyNote(n.id);
      expect(found?.id).toBe(n.id);
      expect(found?.title).toBe(n.title);
    }
  });

  it("returns undefined for an unknown id (detail route renders not-found)", () => {
    expect(getStudyNote("nonexistent")).toBeUndefined();
    expect(getStudyNote("")).toBeUndefined();
  });

  it("builds a per-note detail href that carries the note id", () => {
    for (const n of studyNotes) {
      const href = studyNoteHref(n.id);
      expect(href).toBe(`/study-notes/${n.id}`);
      expect(href).not.toBe("/study-notes");
    }
  });

  it("uses unique ids so one card can never open another note", () => {
    const ids = studyNotes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
