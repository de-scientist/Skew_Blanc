import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageCard } from "@/components/ui/cards";
import { ArrowRightIcon } from "@/components/ui/icons";
import { examCategories } from "@/data/mock/examCategories";
import { accentStyles } from "@/lib/accents";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Nursing Exam Prep",
  description:
    "Explore Nursora exam prep across ATI TEAS, HESI A2, RN Nursing, LPN Nursing, NCLEX-RN and NCLEX-PN. Pick your pathway and start practicing.",
  path: "/exams",
  keywords: ["nursing exams", "ATI TEAS", "HESI A2", "NCLEX", "RN Nursing", "LPN Nursing"],
});

export default function ExamsIndexPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
  ]);
  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white sm:p-12">
        <Badge tone="accent" className="bg-white/15 text-accent-200">Exam library</Badge>
        <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Choose your exam. Start where you are.
        </h1>
        <p className="mt-3 max-w-2xl text-brand-100">
          Every track includes practice, tutor, test and exam modes with detailed
          rationales and performance tracking. Realistic questions, clear feedback.
        </p>
      </div>

      <div className="mt-10">
        <SectionHeading title="All exam pathways" description="Six focused tracks, one calm study system." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examCategories.map((cat) => {
            const a = accentStyles[cat.accent];
            return (
              <ImageCard
                key={cat.id}
                href={`/exams/${cat.slug}`}
                image={cat.heroImage}
                alt={`${cat.name} preparation`}
                ratio="video"
                overlay="bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent"
                sizes="(max-width: 1024px) 100vw, 33vw"
                badge={
                  <Badge tone="neutral" className="bg-white/90 text-ink">
                    {cat.audience}
                  </Badge>
                }
                eyebrow={cat.tagline}
                title={cat.name}
                description={cat.description}
                footer={
                  <>
                    <span className="text-xs font-medium text-muted">
                      {formatNumber(cat.questionCount)} questions
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-semibold ${a.text}`}
                    >
                      Open {cat.shortName}
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </>
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
