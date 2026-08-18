import type { Exam } from "@/types";

export const mockExams: Exam[] = [
  {
    id: "nclex-rn",
    slug: "nclex-rn",
    title: "NCLEX-RN Practice Exam",
    shortTitle: "NCLEX-RN",
    description:
      "Exam-style questions modeled on the NCLEX-RN blueprint. Build stamina, refine clinical judgment, and track your readiness.",
    totalQuestions: 50,
    durationMinutes: 90,
    passingScore: 75,
    subjects: [
      "Pharmacology",
      "Medical-Surgical",
      "Pediatrics",
      "Mental Health",
      "Fundamentals",
    ],
    level: "Advanced",
    status: "published",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "rn-nursing",
    slug: "rn-nursing",
    title: "RN Nursing Comprehensive Exam",
    shortTitle: "RN Nursing",
    description:
      "A comprehensive RN nursing assessment across core subjects. Identify weak areas and focus your study plan.",
    totalQuestions: 40,
    durationMinutes: 75,
    passingScore: 70,
    subjects: [
      "Fundamentals",
      "Medical-Surgical",
      "Pharmacology",
      "Maternal-Newborn",
      "Pediatrics",
    ],
    level: "Intermediate",
    status: "published",
    updatedAt: "2026-08-05T00:00:00.000Z",
  },
];

export function getMockExamBySlug(slug: string): Exam | undefined {
  return mockExams.find((exam) => exam.slug === slug);
}
