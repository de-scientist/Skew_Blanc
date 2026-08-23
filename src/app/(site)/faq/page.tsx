import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/mock/content";
import { createMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { HelpIcon } from "@/components/ui/icons";

export const metadata: Metadata = createMetadata({
  title: "FAQs",
  description: "Answers to common questions about Nursora exam preparation, accounts, exams and performance tracking.",
  path: "/faq",
  keywords: ["nursing exam FAQ", "NCLEX prep", "Nursora help"],
});

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export default function FaqPage() {
  const jsonLd = [
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faq" }]),
    faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
  ];
  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <HelpIcon className="h-4 w-4" /> Help center
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="mt-3 text-muted">
            Everything you need to know about preparing with Nursora.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {categories.map((cat) => (
            <section key={cat}>
              <SectionHeading title={cat} className="mb-4" />
              <Accordion
                items={faqs
                  .filter((f) => f.category === cat)
                  .map((f) => ({ question: f.question, answer: f.answer }))}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
