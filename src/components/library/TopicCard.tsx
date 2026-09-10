import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import {
  knowledgeTopicHref,
  type KnowledgeTopic,
} from "@/data/mock/library";
import { ArrowRightIcon, ClockIcon, FileTextIcon } from "@/components/ui/icons";

export function TopicCard({ topic }: { topic: KnowledgeTopic }) {
  return (
    <Card className="group flex h-full flex-col transition-shadow hover:shadow-card-hover">
      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge tone="brand">{topic.difficulty}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {topic.estimatedMinutes} min
          </span>
        </div>
        <h3 className="mt-2 flex items-start gap-2 text-base font-semibold text-ink">
          <FileTextIcon
            className="mt-0.5 h-4 w-4 shrink-0 text-muted"
            aria-hidden="true"
          />
          {topic.title}
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">
          {topic.description}
        </p>
        <p className="mt-2 text-xs text-muted">
          {topic.flashcards.length} flashcards · Cheat sheet · Questions
        </p>
        <Link
          href={knowledgeTopicHref(topic.subjectSlug, topic.slug)}
          className="mt-3 inline-flex items-center gap-1 self-start text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
          aria-label={`Open topic: ${topic.title}`}
        >
          Open topic
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
