import { describe, expect, it } from "vitest";
import { getNote, getNotes, recordNoteView } from "@/lib/api/notes";

/**
 * Fetch-by-id contract behind the personal-notes viewer
 * (`/notes` → Open note → `/notes/:id` → render).
 *
 * The viewer resolves its note via `getNote(userId, id)` semantics; these
 * tests lock that behaviour: a valid id returns that exact note, an
 * unknown id rejects (viewer shows "Note not found"), and views are
 * recorded for Recent without throwing.
 */
describe("personal-notes fetch-by-id", () => {
  const userId = "u-1001";

  it("lists notes with stable, unique ids for navigation", async () => {
    const notes = await getNotes(userId);
    expect(notes.length).toBeGreaterThan(0);
    const ids = notes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const n of notes) {
      expect(typeof n.id).toBe("string");
      expect(n.id.length).toBeGreaterThan(0);
    }
  });

  it("fetches the exact note requested (no cross-note leakage)", async () => {
    const notes = await getNotes(userId);
    const first = notes[0];
    const second = notes[1] ?? notes[0];
    const fetched = await getNote(userId, first.id);
    expect(fetched.id).toBe(first.id);
    expect(fetched.title).toBe(first.title);
    expect(fetched.content).toBe(first.content);
    if (second.id !== first.id) {
      expect(fetched.id).not.toBe(second.id);
    }
  });

  it("rejects an unknown id so the viewer can show not-found", async () => {
    await expect(getNote(userId, "nonexistent")).rejects.toThrow(
      "Note not found."
    );
  });

  it("records a view without throwing (drives Recent)", async () => {
    const notes = await getNotes(userId);
    const viewed = await recordNoteView(userId, notes[0].id);
    expect(viewed?.id).toBe(notes[0].id);
    expect(typeof viewed?.lastViewedAt).toBe("string");
    const missing = await recordNoteView(userId, "nonexistent");
    expect(missing).toBeNull();
  });
});
