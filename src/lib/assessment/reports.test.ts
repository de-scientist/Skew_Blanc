import { describe, it, expect } from "vitest";
import { submitReport, getReports, getOpenReportCount } from "@/lib/assessment/reports";
import type { Question } from "@/types";
import { REPORT_REASONS } from "@/types/assessment";

const sample: Question = {
  id: "q1",
  examId: "rn-nursing",
  subject: "Pharmacology",
  topic: "Beta-blockers",
  difficulty: "Medium",
  text: "Which is a beta-blocker?",
  options: [
    { id: "a", text: "Atenolol" },
    { id: "b", text: "Lisinopril" },
  ],
  correctOptionId: "a",
  explanation: "Atenolol is a beta-blocker.",
  reviewStatus: "approved",
  questionBankStatus: "published",
  tags: [],
  createdAt: "2024-01-01",
};

describe("question reports (mock store)", () => {
  it("exposes report reason options", () => {
    expect(REPORT_REASONS.length).toBeGreaterThan(0);
    expect(REPORT_REASONS.map((r) => r.value)).toContain("incorrect_answer");
  });

  it("builds a report with open status", () => {
    const report = submitReport({
      question: sample,
      reason: "incorrect_answer",
      detail: "wrong key",
    });
    expect(report.status).toBe("open");
    expect(report.questionId).toBe("q1");
    expect(report.reason).toBe("incorrect_answer");
    expect(report.detail).toBe("wrong key");
    expect(report.id).toBeTruthy();
  });

  it("returns no persisted reports without browser storage", () => {
    expect(getReports()).toEqual([]);
    expect(getOpenReportCount()).toBe(0);
  });
});
