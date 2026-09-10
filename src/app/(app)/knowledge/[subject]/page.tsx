import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  getKnowledgeSubject,
  getTopicsBySubject,
} from "@/data/mock/library";
import { LibrarySearch } from "@/components/library/LibrarySearch";
import { TopicCard } from "@/components/library/TopicCard";
import { FileTextIcon } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const s = getKnowledgeSubject(subject);
  if (!s) return { title: "Subject not found" };
  return {
    title: s.name,
    description: s.description,
    robots: { index: false, follow: false },
  };
}

export default async function KnowledgeSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const s = getKnowledgeSubject(subject);
  if (!s) notFound();
  const topics = getTopicsBySubject(subject);
  const flashcardCount = topics.reduce((n, t) => n + t.flashcards.length, 0);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Knowledge Library", href: "/knowledge" },
          { name: s.name },
        ]}
        className="mb-2"
      />
      <PageHeader
        title={s.name}
        description={s.description}
        action={
          <span className="flex flex-wrap gap-1.5">
            <Badge tone="brand">
              {topics.length} topic{topics.length === 1 ? "" : "s"}
            </Badge>
            <Badge tone="neutral">{flashcardCount} flashcards</Badge>
          </span>
        }
      />

      <LibrarySearch scope={subject} />

      {topics.length === 0 ? (
        <EmptyState
          icon={<FileTextIcon className="h-5 w-5" aria-hidden="true" />}
          title="Topics are coming soon for this subject."
          description="Our educators are preparing structured resources for this area."
        />
      ) : (
        <section
          aria-label={`${s.name} topics`}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {topics.map((t) => (
            <TopicCard key={t.id} topic={t} />
          ))}
        </section>
      )}
    </div>
  );
}
