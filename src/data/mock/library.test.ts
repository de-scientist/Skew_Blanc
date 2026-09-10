import { describe, expect, it } from "vitest";
import { getCategory } from "@/data/mock/examCategories";
import {
  getKnowledgeSubject,
  getKnowledgeSubjects,
  getKnowledgeTopic,
  getRelatedTopics,
  getTopicBySlug,
  getTopicsBySubject,
  isLibraryTab,
  knowledgeSubjectHref,
  knowledgeTopicHref,
  libraryTabHref,
  searchLibrary,
} from "@/data/mock/library";
import { LIBRARY_TOPICS } from "@/data/mock/library-topics";

describe("knowledge library data", () => {
  it("has unique subject slugs", () => {
    const slugs = getKnowledgeSubjects().map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBeGreaterThan(0);
  });

  it("gives every topic a unique subject+slug route that resolves", () => {
    const keys = LIBRARY_TOPICS.map((t) => `${t.subjectSlug}/${t.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const t of LIBRARY_TOPICS) {
      expect(getKnowledgeSubject(t.subjectSlug)).toBeDefined();
      expect(getKnowledgeTopic(t.subjectSlug, t.slug)?.id).toBe(t.id);
      expect(getTopicBySlug(t.slug)?.id).toBe(t.id);
    }
  });

  it("equips every topic with all five learning resources", () => {
    for (const t of LIBRARY_TOPICS) {
      expect(t.quickNotes.sections.length, t.slug).toBeGreaterThan(0);
      expect(t.quickNotes.nclexFocus.length, t.slug).toBeGreaterThan(0);
      expect(t.detailedNotes.sections.length, t.slug).toBeGreaterThan(0);
      expect(t.flashcards.length, t.slug).toBeGreaterThan(0);
      expect(t.cheatSheet.blocks.length, t.slug).toBeGreaterThan(0);
      expect(getCategory(t.examSlug), t.slug).toBeDefined();
    }
  });

  it("uses unique flashcard ids across the library", () => {
    const ids = LIBRARY_TOPICS.flatMap((t) => t.flashcards.map((c) => c.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("resolves every related-topic link to a different real topic", () => {
    for (const t of LIBRARY_TOPICS) {
      expect(t.relatedSlugs.length, t.slug).toBeGreaterThan(0);
      for (const r of getRelatedTopics(t)) {
        expect(r.id).not.toBe(t.id);
      }
      const resolved = t.relatedSlugs.map((s) => getTopicBySlug(s));
      expect(resolved.every(Boolean), t.slug).toBe(true);
    }
  });

  it("builds detail hrefs carrying subject and topic slugs", () => {
    expect(knowledgeSubjectHref("medical-surgical-nursing")).toBe(
      "/knowledge/medical-surgical-nursing"
    );
    expect(knowledgeTopicHref("medical-surgical-nursing", "heart-failure")).toBe(
      "/knowledge/medical-surgical-nursing/heart-failure"
    );
    expect(
      libraryTabHref("medical-surgical-nursing", "heart-failure", "flashcards")
    ).toBe("/knowledge/medical-surgical-nursing/heart-failure?tab=flashcards");
    expect(isLibraryTab("flashcards")).toBe(true);
    expect(isLibraryTab("nope")).toBe(false);
  });

  it("searches topics, subjects, and tags with relevance", () => {
    expect(searchLibrary("h")).toEqual([]);
    const heart = searchLibrary("heart");
    expect(heart[0]?.href).toBe(
      "/knowledge/medical-surgical-nursing/heart-failure"
    );
    const insulin = searchLibrary("insulin");
    expect(insulin.some((r) => r.href.endsWith("/diabetes-mellitus"))).toBe(
      true
    );
  });

  it("lists topics per subject for subject pages", () => {
    expect(getTopicsBySubject("nope")).toEqual([]);
    for (const s of getKnowledgeSubjects()) {
      expect(getTopicsBySubject(s.slug).length).toBeGreaterThan(0);
    }
  });
});
