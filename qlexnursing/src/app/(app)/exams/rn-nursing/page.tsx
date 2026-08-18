import type { Metadata } from "next";
import { getExam } from "@/lib/api/exams";
import {
  createMetadata,
  breadcrumbJsonLd,
  courseJsonLd,
  organizationJsonLd,
} from "@/lib/seo";
import { ExamLanding, type Faq } from "@/components/exam/ExamLanding";

const faqs: Faq[] = [
  {
    q: "What does the RN Nursing exam cover?",
    a: "It is a comprehensive assessment across fundamentals, medical-surgical, pharmacology, maternal-newborn and pediatrics to help you target your study plan.",
  },
  {
    q: "How long is the practice exam?",
    a: "The full exam contains 40 questions with a 75 minute timer, but you can pause and resume your attempt.",
  },
  {
    q: "How should I use my results?",
    a: "Review the subject breakdown, focus on areas below your target accuracy, and re-attempt to measure improvement.",
  },
];

export const metadata: Metadata = createMetadata({
  title: "RN Nursing Practice Exam",
  description:
    "A comprehensive RN nursing exam-preparation experience. Practice questions, track progress and focus your study plan.",
  path: "/exams/rn-nursing",
  keywords: ["RN Nursing", "nursing exam prep", "RN practice questions"],
});

export default async function RnNursingPage() {
  const exam = await getExam("rn-nursing");
  if (!exam) {
    return <p>Exam not found.</p>;
  }
  const jsonLd = [
    organizationJsonLd(),
    courseJsonLd({
      name: exam.title,
      description: exam.description,
      provider: "Skew Blanc LTD",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "RN Nursing", path: "/exams/rn-nursing" },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLanding
        exam={exam}
        breadcrumbLabel="RN Nursing"
        intro="Build a modern RN nursing preparation routine with structured practice, clear performance feedback and a focused study plan."
        faqs={faqs}
      />
    </>
  );
}
