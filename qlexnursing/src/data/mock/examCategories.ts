import type { ExamCategory } from "@/types/domain";
import { mockExams } from "./exams";

export const examCategories: ExamCategory[] = [
  {
    id: "ati-teas",
    slug: "ati-teas",
    name: "ATI TEAS",
    shortName: "ATI TEAS",
    tagline: "Nursing school entrance",
    description:
      "Prepare for nursing-school admission with realistic TEAS practice across Reading, Math, Science and English.",
    audience: "Pre-Nursing",
    questionCount: 12450,
    examTypes: ["Practice", "Tutor", "Test", "Exam"],
    accent: "violet",
    subjects: ["Reading", "Mathematics", "Science", "English & Language Usage"],
    heroImage:
      "https://images.unsplash.com/photo-1523240795612-9a0543919b60?auto=format&fit=crop&w=1600&q=80",
    highlight: "Admission ready",
  },
  {
    id: "hesi-a2",
    slug: "hesi-a2",
    name: "HESI A2",
    shortName: "HESI A2",
    tagline: "Admission assessment",
    description:
      "Build confidence across the core HESI A2 admission subjects with guided practice and detailed rationales.",
    audience: "Pre-Nursing",
    questionCount: 9870,
    examTypes: ["Practice", "Tutor", "Test", "Exam"],
    accent: "emerald",
    subjects: [
      "Mathematics",
      "Reading Comprehension",
      "Vocabulary",
      "Grammar",
      "Biology",
      "Anatomy & Physiology",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1600&q=80",
    highlight: "Admission ready",
  },
  {
    id: "rn-nursing",
    slug: "rn-nursing",
    name: "RN Nursing",
    shortName: "RN Nursing",
    tagline: "Registered nursing",
    description:
      "Practice ATI, HESI, Exit, Examplify and General RN exams with a comprehensive question bank built around the RN blueprint.",
    audience: "RN",
    questionCount: 45403,
    examTypes: ["Practice", "Tutor", "Test", "Exam"],
    accent: "brand",
    subjects: [
      "Fundamentals",
      "Medical-Surgical",
      "Pharmacology",
      "Maternal-Newborn",
      "Pediatrics",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1600&q=80",
    highlight: "Most popular",
  },
  {
    id: "lpn-nursing",
    slug: "lpn-nursing",
    name: "LPN Nursing",
    shortName: "LPN Nursing",
    tagline: "Practical nursing",
    description:
      "Prepare with targeted practical-nursing practice across foundational and clinical subjects for licensure confidence.",
    audience: "LPN",
    questionCount: 18920,
    examTypes: ["Practice", "Tutor", "Test", "Exam"],
    accent: "amber",
    subjects: [
      "Fundamentals",
      "Medical-Surgical",
      "Pharmacology",
      "Maternal-Newborn",
      "Pediatrics",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80",
    highlight: "Focused prep",
  },
  {
    id: "nclex-rn",
    slug: "nclex-rn",
    name: "NCLEX-RN",
    shortName: "NCLEX-RN",
    tagline: "Registered nurse licensure",
    description:
      "Prepare for next-generation RN licensure with realistic exam-style questions, clinical-judgment drills and readiness insights.",
    audience: "RN",
    questionCount: 32110,
    examTypes: ["Practice", "Tutor", "Test", "Exam"],
    accent: "accent",
    subjects: [
      "Pharmacology",
      "Medical-Surgical",
      "Pediatrics",
      "Mental Health",
      "Fundamentals",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
    highlight: "Licensure ready",
  },
  {
    id: "nclex-pn",
    slug: "nclex-pn",
    name: "NCLEX-PN",
    shortName: "NCLEX-PN",
    tagline: "Practical nurse licensure",
    description:
      "Prepare for PN licensure with practical-nursing focused questions modeled on the NCLEX-PN blueprint.",
    audience: "LPN",
    questionCount: 14580,
    examTypes: ["Practice", "Tutor", "Test", "Exam"],
    accent: "rose",
    subjects: [
      "Fundamentals",
      "Medical-Surgical",
      "Pharmacology",
      "Maternal-Newborn",
      "Pediatrics",
      "Mental Health",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1600&q=80",
    highlight: "Licensure ready",
  },
];

export function getCategory(slug: string): ExamCategory | undefined {
  return examCategories.find((c) => c.slug === slug);
}

export function getCategoryExam(slug: string) {
  return mockExams.find((e) => e.slug === slug);
}
