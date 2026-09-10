import Link from "next/link";
import { buildQuestionPool } from "@/data/mock/questions";
import { getCategory } from "@/data/mock/examCategories";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { KnowledgeTopic } from "@/data/mock/library";
import { ArrowRightIcon, ClipboardIcon } from "@/components/ui/icons";

/** Topic questions: real items from the existing question pool, matched by
 *  subject and tags — then handed off to the existing exam engine. No
 *  second question system. */
export function QuestionsTab({ topic }: { topic: KnowledgeTopic }) {
  const pool = buildQuestionPool(topic.examSlug, 60);
  const keywords = [
    ...topic.tags,
    ...topic.title.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3),
  ];
  const scored = pool.map((q) => {
    let score = 0;
    if (q.subject === topic.title) score += 4;
    const hay = `${q.text} ${(q.topic ?? "")} ${(q.tags ?? []).join(" ")}`.toLowerCase();
    score += keywords.filter((k) => hay.includes(k.toLowerCase())).length;
    return { q, score };
  });
  const related = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.q);

  const exam = getCategory(topic.examSlug);

  return (
    <div className="space-y-4">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h2 className="text-base font-bold text-ink">Practice this topic</h2>
          <p className="mt-1 text-sm text-muted">
            {related.length > 0
              ? `${related.length} related questions from the bank — full timed practice lives in the exam.`
              : "Jump into the full exam for timed practice with detailed rationales."}
          </p>
        </div>
        {exam && (
          <Link
            href={`/exams/${exam.slug}`}
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            Practice in {exam.shortName}
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      {related.length === 0 ? (
        <EmptyState
          icon={<ClipboardIcon className="h-5 w-5" aria-hidden="true" />}
          title="Practice questions for this topic aren't available yet."
          description="The full exam bank is still the best place to drill this subject."
          action={
            exam ? (
              <Link
                href={`/exams/${exam.slug}`}
                className={buttonVariants({ variant: "primary" })}
              >
                Open {exam.name}
              </Link>
            ) : undefined
          }
        />
      ) : (
        <ul className="space-y-3">
          {related.map((q, i) => (
            <li key={q.id}>
              <Card>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{q.subject}</Badge>
                    {q.difficulty && <Badge tone="neutral">{q.difficulty}</Badge>}
                  </div>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-ink">
                    <span className="mr-2 font-bold text-muted">Q{i + 1}</span>
                    {q.text.length > 160
                      ? `${q.text.slice(0, 160)}…`
                      : q.text}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {q.topic ?? "Clinical review"} · Answer and rationale
                    available in the full exam
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
