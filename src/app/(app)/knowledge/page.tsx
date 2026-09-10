import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  getSubjectSummaries,
  knowledgeSubjectHref,
} from "@/data/mock/library";
import { LibrarySearch } from "@/components/library/LibrarySearch";
import {
  ArrowRightIcon,
  BookIcon,
  FileTextIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Knowledge Library",
  description:
    "Explore structured nursing resources designed to help you learn, revise, and master every topic.",
  robots: { index: false, follow: false },
};

const LOOP = [
  "Discover",
  "Learn",
  "Condense",
  "Memorize",
  "Practice",
  "Master",
];

export default function KnowledgeLibraryPage() {
  const subjects = getSubjectSummaries();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ name: "Dashboard", href: "/dashboard" }, { name: "Knowledge Library" }]}
        className="mb-2"
      />
      <PageHeader
        title="Knowledge Library"
        description="Explore structured nursing resources designed to help you learn, revise, and master every topic."
        action={
          <Link
            href="/notes"
            className={buttonVariants({ variant: "outline" })}
          >
            <FileTextIcon className="h-4 w-4" aria-hidden="true" />
            My Notes
          </Link>
        }
      />

      <LibrarySearch />

      <section aria-label="Browse by subject" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {subjects.map((s) => (
          <Card
            key={s.slug}
            className="group flex h-full flex-col transition-shadow hover:shadow-card-hover"
          >
            <CardContent className="flex flex-1 flex-col">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                <BookIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-lg font-bold text-ink">{s.name}</h2>
              <p className="mt-1 text-sm text-muted">{s.tagline}</p>
              <p className="mt-2 text-sm text-muted">{s.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge tone="brand">
                  {s.topicCount} topic{s.topicCount === 1 ? "" : "s"}
                </Badge>
                <Badge tone="neutral">{s.flashcardCount} flashcards</Badge>
              </div>
              <Link
                href={knowledgeSubjectHref(s.slug)}
                className="mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
                aria-label={`Browse ${s.name}`}
              >
                Browse subject
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section
        aria-label="How learning works"
        className="card flex flex-wrap items-center gap-x-2 gap-y-2 p-4 sm:p-5"
      >
        <p className="mr-1 text-sm font-bold text-ink">Your loop:</p>
        {LOOP.map((step, i) => (
          <span key={step} className="flex items-center gap-2 text-sm">
            <span
              className={
                i === LOOP.length - 1
                  ? "font-bold text-brand-700 dark:text-brand-300"
                  : "font-medium text-muted"
              }
            >
              {step}
            </span>
            {i < LOOP.length - 1 && (
              <ArrowRightIcon
                className="h-3.5 w-3.5 text-muted"
                aria-hidden="true"
              />
            )}
          </span>
        ))}
      </section>

      <section
        aria-label="Personal workspace"
        className="card flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5"
      >
        <div>
          <h2 className="text-base font-bold text-ink">
            Looking for your own notes?
          </h2>
          <p className="mt-1 text-sm text-muted">
            The Knowledge Library is curated by educators. Your private
            workspace lives separately in My Notes.
          </p>
        </div>
        <Link
          href="/notes"
          className={buttonVariants({ variant: "primary", size: "sm" })}
        >
          Open My Notes
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
