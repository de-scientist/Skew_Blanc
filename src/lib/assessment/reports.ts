import type { ID, Question } from "@/types";
import type { QuestionReport, ReportReason, ReportStatus } from "@/types/assessment";

const REPORTS_KEY = "nursora:reports";

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — degrade gracefully */
  }
}

function genId(): string {
  return `rep-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export interface SubmitReportInput {
  question: Question;
  reason: ReportReason;
  detail?: string;
  examId?: ID;
}

/**
 * Persists a student-submitted question report to the (mock) local store.
 * The shape mirrors what a `POST /questions/:id/report` endpoint would accept,
 * so this can be swapped for a real API call later.
 */
export function submitReport(input: SubmitReportInput): QuestionReport {
  const report: QuestionReport = {
    id: genId(),
    questionId: input.question.id,
    examId: input.examId ?? input.question.examId,
    reason: input.reason,
    detail: input.detail,
    questionText: input.question.text,
    subject: input.question.subject,
    status: "open",
    createdAt: new Date().toISOString(),
  };
  const all = getReports();
  safeSet(REPORTS_KEY, [report, ...all]);
  return report;
}

export function getReports(): QuestionReport[] {
  return safeGet<QuestionReport[]>(REPORTS_KEY) ?? [];
}

export function getReport(id: ID): QuestionReport | null {
  return getReports().find((r) => r.id === id) ?? null;
}

export function updateReport(
  id: ID,
  patch: Partial<Pick<QuestionReport, "status" | "reviewerNote">>
): QuestionReport | null {
  const all = getReports();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch };
  all[idx] = updated;
  safeSet(REPORTS_KEY, all);
  return updated;
}

export function getOpenReportCount(): number {
  return getReports().filter((r) => r.status === "open").length;
}

export type { ReportStatus };
