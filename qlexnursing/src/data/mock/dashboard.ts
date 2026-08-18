import type { DashboardData } from "@/types";

export const mockDashboard: DashboardData = {
  studentName: "Jordan",
  stats: {
    questionsAnswered: 1248,
    accuracy: 78,
    examsCompleted: 24,
    studyStreakDays: 12,
    correctAnswers: 974,
    incorrectAnswers: 274,
    averageScore: 81,
    timeSpentMinutes: 4860,
  },
  trend: [
    { date: "Jul 20", score: 62 },
    { date: "Jul 24", score: 68 },
    { date: "Jul 28", score: 71 },
    { date: "Aug 01", score: 74 },
    { date: "Aug 05", score: 77 },
    { date: "Aug 09", score: 79 },
    { date: "Aug 14", score: 82 },
  ],
  subjectPerformance: [
    { subject: "Fundamentals", accuracy: 85, questions: 220, average: 82 },
    { subject: "Pharmacology", accuracy: 82, questions: 210, average: 74 },
    { subject: "Pediatrics", accuracy: 79, questions: 180, average: 79 },
    { subject: "Medical-Surgical", accuracy: 75, questions: 340, average: 75 },
    { subject: "Mental Health", accuracy: 72, questions: 160, average: 79 },
  ],
  recentActivity: [
    {
      id: "act-1",
      title: "NCLEX-RN Practice Exam",
      score: 82,
      durationMinutes: 32,
      status: "completed",
      completedAt: "2026-08-18T08:10:00.000Z",
    },
    {
      id: "act-2",
      title: "RN Nursing — Pharmacology Set",
      score: 74,
      durationMinutes: 18,
      status: "completed",
      completedAt: "2026-08-17T19:42:00.000Z",
    },
    {
      id: "act-3",
      title: "Medical-Surgical Drill",
      score: 69,
      durationMinutes: 25,
      status: "completed",
      completedAt: "2026-08-16T21:05:00.000Z",
    },
    {
      id: "act-4",
      title: "NCLEX-RN Practice Exam",
      score: null,
      durationMinutes: 12,
      status: "in-progress",
      completedAt: null,
    },
  ],
  recommendedArea: {
    subject: "Pharmacology",
    reason:
      "Your recent accuracy in Pharmacology is below your overall average. Focusing here will have the largest impact on your score.",
    accuracy: 74,
    overallAccuracy: 78,
  },
  continuePractice: {
    examTitle: "RN Nursing Comprehensive Exam",
    unanswered: 25,
  },
};
