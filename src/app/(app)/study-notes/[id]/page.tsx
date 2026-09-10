import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buttonVariants } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card, CardContent } from "@/components/ui/Card";
import { getStudyNote, studyNoteHref, studyNotes } from "@/data/mock/content";
import { formatDate } from "@/lib/utils";
import {
  ArrowRightIcon,
  BookmarkIcon,
  ClockIcon,
  FileTextIcon,
} from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const note = getStudyNote(id);
  if (!note) return { title: "Study note not found" };
  return {
    title: note.title,
    description: note.excerpt,
    robots: { index: false, follow: false },
  };
}

export default async function StudyNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = getStudyNote(id);
  if (!note) notFound();

  const related = studyNotes
    .filter((n) => n.id !== note.id)
    .map((n) => ({
      note: n,
      score:
        (n.category === note.category ? 2 : 0) +
        (n.subject === note.subject ? 1 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.note);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Study Notes", href: "/study-notes" },
          { name: note.title },
        ]}
        className="mb-2"
      />

      <Card className="overflow-hidden">
        <ImageFrame
          src={note.cover}
          alt={note.title}
          ratio="wide"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{note.category}</Badge>
            <Badge tone="neutral">{note.subject}</Badge>
            {note.favorite && (
              <Badge tone="warning">
                <BookmarkIcon className="h-3 w-3" aria-hidden="true" />
                Saved
              </Badge>
            )}
          </div>
          <h1 className="mt-3 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {note.title}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <FileTextIcon className="h-4 w-4" aria-hidden="true" />
              {note.subject}
            </span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon className="h-4 w-4" aria-hidden="true" />
              {note.readingMinutes} min read
            </span>
            <span>Updated {formatDate(note.updatedAt)}</span>
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink">
            {note.excerpt}
          </p>
          <div className="mt-5 max-w-md">
            <ProgressBar
              label="Your progress"
              value={note.progress}
              showValue
              tone="brand"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/exams/nclex-rn"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              Practice Questions
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/study-notes"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Back to Study Notes
            </Link>
          </div>
        </CardContent>
      </Card>

      {related.length > 0 && (
        <section aria-label="Related study notes">
          <h2 className="mb-3 text-base font-bold text-ink">Related Notes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Card key={r.id} className="flex h-full flex-col">
                <CardContent className="flex flex-1 flex-col">
                  <Badge tone="brand">{r.category}</Badge>
                  <h3 className="mt-2 text-base font-semibold text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{r.excerpt}</p>
                  <Link
                    href={studyNoteHref(r.id)}
                    className="mt-3 inline-flex items-center gap-1 self-start text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
                    aria-label={`Open note: ${r.title}`}
                  >
                    Open note
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
