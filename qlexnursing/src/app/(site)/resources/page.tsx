import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResourceCard, ImageCard } from "@/components/ui/cards";
import { ArrowRightIcon } from "@/components/ui/icons";
import { studyResources } from "@/data/mock/content";
import { examCategories } from "@/data/mock/examCategories";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatNumber } from "@/lib/utils";
import { BookIcon, LayersIcon, FileTextIcon, GraduationIcon, SparkIcon } from "@/components/ui/icons";

export const metadata: Metadata = createMetadata({
  title: "Study Resources",
  description: "Explore Nursora study notes, flashcards, guides and exam resources to support your nursing preparation.",
  path: "/resources",
});

const resIcon: Record<string, React.ReactNode> = {
  Notes: <FileTextIcon className="h-5 w-5" />,
  Flashcards: <LayersIcon className="h-5 w-5" />,
  Guide: <BookIcon className="h-5 w-5" />,
  "Cheat Sheet": <SparkIcon className="h-5 w-5" />,
  Video: <GraduationIcon className="h-5 w-5" />,
};

export default function ResourcesPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
  ]);
  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white sm:p-12">
        <Badge tone="accent" className="bg-white/15 text-accent-200">Resource hub</Badge>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Everything you need, in one place</h1>
        <p className="mt-3 max-w-2xl text-brand-100">Notes, flashcards, guides and exam resources linked to the subjects you actually practice.</p>
      </div>

      <div className="mt-10">
        <SectionHeading title="Browse by resource" description="Pick a format and dive in." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studyResources.map((r) => (
            <ResourceCard
              key={r.id}
              href={r.href}
              type={r.type}
              title={r.title}
              description={r.description}
              count={r.count}
              icon={resIcon[r.type] ?? <BookIcon className="h-5 w-5" />}
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SectionHeading title="Resources by exam" description="Jump straight to materials for your track." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examCategories.map((c) => (
            <ImageCard
              key={c.id}
              href={`/exams/${c.slug}`}
              image={c.heroImage}
              alt={`${c.name} resources`}
              ratio="video"
              overlay="bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent"
              sizes="(max-width: 1024px) 100vw, 33vw"
              eyebrow={`${formatNumber(c.questionCount)} questions`}
              title={c.name}
              description={`Practice questions across ${c.subjects.length} subjects.`}
              footer={
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
                  Explore {c.shortName}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
