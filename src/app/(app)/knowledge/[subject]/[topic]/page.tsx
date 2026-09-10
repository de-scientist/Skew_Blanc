import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FlashcardViewer } from "@/components/notes/FlashcardViewer";
import {
  getKnowledgeSubject,
  getKnowledgeTopic,
  getRelatedTopics,
  isLibraryTab,
  knowledgeSubjectHref,
  libraryTabHref,
  type LibraryTab,
} from "@/data/mock/library";
import { TopicTabs } from "@/components/library/TopicTabs";
import { TopicCard } from "@/components/library/TopicCard";
import { QuickNotesView } from "@/components/library/QuickNotesView";
import { DetailedNotesView } from "@/components/library/DetailedNotesView";
import { CheatSheetView } from "@/components/library/CheatSheetView";
import { QuestionsTab } from "@/components/library/QuestionsTab";
import {
  ArrowRightIcon,
  ClockIcon,
  FileTextIcon,
  LayersIcon,
} from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}): Promise<Metadata> {
  const { subject, topic } = await params;
  const t = getKnowledgeTopic(subject, topic);
  if (!t) return { title: "Topic not found" };
  return {
    title: t.title,
    description: t.description,
    robots: { index: false, follow: false },
  };
}

const NEXT_STEPS: Record<LibraryTab, LibraryTab[]> = {
  quick: ["detailed"],
  detailed: ["flashcards", "cheatsheet", "questions"],
  flashcards: ["questions", "cheatsheet"],
  cheatsheet: ["questions", "flashcards"],
  questions: ["detailed", "flashcards"],
};

const TAB_LABELS: Record<LibraryTab, string> = {
  quick: "Quick Notes",
  detailed: "Detailed Notes",
  flashcards: "Flashcards",
  cheatsheet: "Cheat Sheet",
  questions: "Questions",
};

export default async function KnowledgeTopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string; topic: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { subject, topic } = await params;
  const { tab } = await searchParams;
  const t = getKnowledgeTopic(subject, topic);
  if (!t) notFound();
  const s = getKnowledgeSubject(subject);
  const active: LibraryTab = isLibraryTab(tab) ? tab : "quick";
  const related = getRelatedTopics(t);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Knowledge Library", href: "/knowledge" },
          ...(s
            ? [{ name: s.name, href: knowledgeSubjectHref(subject) }]
            : []),
          { name: t.title },
        ]}
        className="mb-2"
      />

      <div>
        <div className="flex flex-wrap items-center gap-1.5">
          {s && <Badge tone="brand">{s.name}</Badge>}
          <Badge tone="neutral">{t.difficulty}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {t.estimatedMinutes} min
          </span>
        </div>
        <h1 className="mt-2 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t.title}
        </h1>
        <p className="mt-2 max-w-3xl text-[15px] text-muted">
          {t.description}
        </p>
        {t.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
            {t.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-subtle px-2 py-0.5 text-xs font-medium text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <TopicTabs subjectSlug={subject} topicSlug={topic} active={active} />

      {active === "quick" && <QuickNotesView quick={t.quickNotes} />}
      {active === "detailed" && (
        <DetailedNotesView detailed={t.detailedNotes} />
      )}
      {active === "flashcards" &&
        (t.flashcards.length > 0 ? (
          <div className="card mx-auto w-full max-w-2xl p-5 sm:p-6">
            <FlashcardViewer
              cards={t.flashcards.map((c) => ({
                id: c.id,
                front: c.front,
                back: c.explanation
                  ? `${c.back}\n\n${c.explanation}`
                  : c.back,
              }))}
            />
          </div>
        ) : (
          <EmptyState
            icon={<LayersIcon className="h-5 w-5" aria-hidden="true" />}
            title="Flashcards are coming soon for this topic."
            description="Read the detailed notes meanwhile — cards will appear here once published."
          />
        ))}
      {active === "cheatsheet" && <CheatSheetView sheet={t.cheatSheet} />}
      {active === "questions" && <QuestionsTab topic={t} />}

      {/* Guided next step — the student always knows what to do next. */}
      <section
        aria-label="What to do next"
        className="card flex flex-wrap items-center gap-2 p-4 sm:p-5"
      >
        <p className="mr-1 text-sm font-bold text-ink">Keep going:</p>
        {NEXT_STEPS[active].map((next, i) => (
          <Link
            key={next}
            href={libraryTabHref(subject, topic, next)}
            className={buttonVariants({
              variant: i === 0 ? "primary" : "outline",
              size: "sm",
            })}
          >
            {TAB_LABELS[next]}
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        ))}
      </section>

      {related.length > 0 && (
        <section aria-label="Related topics">
          <h2 className="mb-3 text-base font-bold text-ink">Related Topics</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((r) => (
              <TopicCard key={r.id} topic={r} />
            ))}
          </div>
        </section>
      )}

      <section
        aria-label="My notes on this topic"
        className="card flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5"
      >
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-ink">
            <FileTextIcon className="h-4 w-4 text-muted" aria-hidden="true" />
            My Notes
          </h2>
          <p className="mt-1 text-sm text-muted">
            Connect this topic to your private workspace — capture your own
            takeaways alongside curated content.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/notes/create"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Add personal note
          </Link>
          <Link
            href="/notes"
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            View My Notes
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div>
        <Link
          href={knowledgeSubjectHref(subject)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
        >
          <ArrowRightIcon
            className="h-4 w-4 rotate-180"
            aria-hidden="true"
          />
          Back to {s?.name ?? "subject"}
        </Link>
      </div>
    </div>
  );
}
