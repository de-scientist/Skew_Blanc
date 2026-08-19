import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExam } from "@/lib/api/exams";
import { getCategory } from "@/data/mock/examCategories";
import {
  createMetadata,
  breadcrumbJsonLd,
  courseJsonLd,
  organizationJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import { ExamLanding, type Faq } from "@/components/exam/ExamLanding";

const intros: Record<string, string> = {
  "ati-teas":
    "Build a calm, repeatable TEAS routine with structured practice, clear feedback and a focused study plan for admission.",
  "hesi-a2":
    "Strengthen the core HESI A2 subjects with guided practice and detailed rationales so test day feels familiar.",
  "rn-nursing":
    "Build a modern RN nursing preparation routine with structured practice, clear performance feedback and a focused study plan.",
  "lpn-nursing":
    "Target your practical-nursing prep with realistic questions across the subjects that matter for licensure.",
  "nclex-rn":
    "Practice exam-style questions, track your progress and identify areas that need more attention before the real board exam.",
  "nclex-pn":
    "Prepare for PN licensure with practical-nursing focused questions modeled on the NCLEX-PN blueprint.",
};

function getFaqs(slug: string): Faq[] {
  const base: Faq[] = [
    {
      q: "How is this practice exam structured?",
      a: "It mirrors the real blueprint with exam-style multiple choice questions across the core subjects for this track, with a timer and detailed results.",
    },
    {
      q: "Will this predict my real exam result?",
      a: "Practice exams help you build stamina and find weak areas. They are a preparation tool and not a guarantee of a passing score on the official exam.",
    },
    {
      q: "Can I review my answers after submitting?",
      a: "Yes. After submission you receive a detailed results breakdown with the correct answer and explanation for every question.",
    },
  ];
  if (slug.startsWith("nclex")) {
    base.unshift({
      q: "Is this affiliated with the official NCLEX or NCSBN?",
      a: "No. QLexNursing is an independent study tool and is not affiliated with, endorsed by, or sponsored by NCSBN or any trademark holder.",
    });
  }
  return base;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Exam not found" };
  const exam = await getExam(category);
  return createMetadata({
    title: `${cat.name} Practice Exam`,
    description: cat.description,
    path: `/exams/${category}`,
    keywords: [cat.name, `${cat.shortName} practice`, "nursing exam prep"],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  const exam = await getExam(category);
  if (!cat || !exam) notFound();

  const jsonLd = [
    organizationJsonLd(),
    courseJsonLd({ name: exam.title, description: exam.description, provider: "Skew Blanc LTD" }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Exams", path: "/exams" },
      { name: cat.name, path: `/exams/${cat.slug}` },
    ]),
    faqJsonLd(getFaqs(cat.slug).map((f) => ({ question: f.q, answer: f.a }))),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-page py-8">
        <ExamLanding
          exam={exam}
          intro={intros[cat.slug] ?? cat.description}
          faqs={getFaqs(cat.slug)}
          breadcrumbLabel={cat.name}
          banner={{ image: cat.heroImage, accent: cat.accent, highlight: cat.highlight }}
        />
      </div>
    </>
  );
}
