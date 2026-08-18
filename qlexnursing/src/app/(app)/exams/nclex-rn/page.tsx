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
    q: "How is the NCLEX-RN practice exam structured?",
    a: "It mirrors the NCLEX-RN blueprint with exam-style multiple choice questions across pharmacology, medical-surgical, pediatrics, mental health and fundamentals.",
  },
  {
    q: "Will this predict my real NCLEX result?",
    a: "Practice exams help you build stamina and identify weak areas. They are a preparation tool and not a guarantee of a passing score on the official exam.",
  },
  {
    q: "Can I review my answers after submitting?",
    a: "Yes. After submission you receive a detailed results breakdown with the correct answer and explanation for every question.",
  },
];

export const metadata: Metadata = createMetadata({
  title: "NCLEX-RN Practice Exam",
  description:
    "Practice NCLEX-RN exam-style questions, track your progress and identify areas that need more attention.",
  path: "/exams/nclex-rn",
  keywords: ["NCLEX-RN", "NCLEX practice", "nursing board exam"],
});

export default async function NclexPage() {
  const exam = await getExam("nclex-rn");
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
      { name: "NCLEX-RN", path: "/exams/nclex-rn" },
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
        breadcrumbLabel="NCLEX-RN"
        intro="Practice exam-style questions, track your progress and identify areas that need more attention before the real board exam."
        faqs={faqs}
      />
    </>
  );
}
