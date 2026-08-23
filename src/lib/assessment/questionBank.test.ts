import { describe, it, expect } from "vitest";
import { getAllQuestions, getQuestion, getSubjects } from "@/lib/assessment/questionBank";

describe("question bank (mock store)", () => {
  it("builds a non-empty pool across exams", () => {
    const all = getAllQuestions();
    expect(all.length).toBeGreaterThan(0);
  });

  it("every question has required fields for all four modes", () => {
    for (const q of getAllQuestions()) {
      expect(q.id).toBeTruthy();
      expect(q.correctOptionId).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(["Easy", "Medium", "Hard"]).toContain(q.difficulty);
      expect(["pending", "approved", "rejected"]).toContain(q.reviewStatus);
    }
  });

  it("looks up a question by id", () => {
    const all = getAllQuestions();
    const found = getQuestion(all[0].id);
    expect(found?.id).toBe(all[0].id);
  });

  it("returns a sorted, unique subject list", () => {
    const subjects = getSubjects();
    const unique = Array.from(new Set(subjects));
    expect(subjects).toEqual(unique);
    const sorted = [...subjects].sort();
    expect(subjects).toEqual(sorted);
  });
});
