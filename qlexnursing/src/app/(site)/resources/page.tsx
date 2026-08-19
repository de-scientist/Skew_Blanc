import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { studyResources } from "@/data/mock/content";
import { examCategories } from "@/data/mock/examCategories";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatNumber } from "@/lib/utils";
import { BookIcon, LayersIcon, FileTextIcon, GraduationIcon, ArrowRightIcon, SparkIcon, ClipboardIcon } from "@/components/ui/icons";

export const metadata: Metadata = createMetadata({
  title: "Study Resources",
  description: "Explore QLexNursing study notes, flashcards, guides and exam resources to support your nursing preparation.",
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
            <Link key={r.id} href={r.href} className="group">
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <CardContent>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    {resIcon[r.type] ?? <BookIcon className="h-5 w-5" />}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted">{r.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted">
                    <span>{r.subject}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
                      Open <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SectionHeading title="Resources by exam" description="Jump straight to materials for your track." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examCategories.map((c) => (
            <Link key={c.id} href={`/exams/${c.slug}`} className="group">
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-ink">{c.name}</h3>
                    <ClipboardIcon className="h-5 w-5 text-muted" />
                  </div>
                  <p className="mt-1 text-sm text-muted">{formatNumber(c.questionCount)} practice questions across {c.subjects.length} subjects.</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Explore {c.shortName} <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
