"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { NoteStudyService, type GeneratedQuestion } from "@/lib/notes/ai";
import type { UserNote } from "@/lib/notes/types";
import { cn } from "@/lib/utils";
import { useNotes } from "./NotesProvider";
import { FlashcardViewer } from "./FlashcardViewer";
import { CheckCircleIcon, LightbulbIcon, SparkIcon } from "@/components/ui/icons";

type Tab = "summary" | "flashcards" | "questions" | "keypoints";

const TABS: Array<{ value: Tab; label: string }> = [
  { value: "summary", label: "Summary" },
  { value: "flashcards", label: "Flashcards" },
  { value: "questions", label: "Questions" },
  { value: "keypoints", label: "Key Points" },
];

function PracticeQuiz({ questions }: { questions: GeneratedQuestion[] }) {
  const [selected, setSelected] = React.useState<Record<string, number>>({});
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const score = questions.filter((q) => checked[q.id] && selected[q.id] === q.correctIndexes[0]).length;
  const done = questions.filter((q) => checked[q.id]).length;

  return (
    <div className="space-y-4">
      {done > 0 && (
        <p role="status" className="text-sm font-semibold text-ink">
          Score: {score}/{done}
          {done === questions.length && (
            <span className="ml-2 font-normal text-muted">
              {score === questions.length ? "Excellent — this topic is sticking." : "Review the rationales below, then try the flashcards."}
            </span>
          )}
        </p>
      )}
      {questions.map((q, qi) => {
        const isChecked = !!checked[q.id];
        const correct = isChecked && selected[q.id] === q.correctIndexes[0];
        return (
          <div key={q.id} className="rounded-xl border border-line p-4">
            <p className="flex items-start gap-2 text-sm font-semibold text-ink">
              <Badge tone="brand" className="mt-0.5 shrink-0">Q{qi + 1}</Badge>
              {q.stem}
            </p>
            <div className="mt-3 space-y-1.5" role="radiogroup" aria-label={`Question ${qi + 1} options`}>
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.correctIndexes[0];
                const isPicked = selected[q.id] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    role="radio"
                    aria-checked={isPicked}
                    disabled={isChecked}
                    onClick={() => setSelected((s) => ({ ...s, [q.id]: oi }))}
                    className={cn(
                      "flex w-full items-start gap-2 rounded-xl border px-3 py-2 text-left text-sm",
                      isChecked && isCorrect
                        ? "border-success-500 bg-success-50 dark:bg-success-500/10"
                        : isChecked && isPicked
                          ? "border-danger-500 bg-danger-50 dark:bg-danger-500/10"
                          : isPicked
                            ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                            : "border-line hover:bg-subtle"
                    )}
                  >
                    <span className="font-bold text-muted">{String.fromCharCode(65 + oi)}.</span>
                    <span className="text-ink">{opt}</span>
                  </button>
                );
              })}
            </div>
            {!isChecked ? (
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                disabled={selected[q.id] === undefined}
                onClick={() => setChecked((c) => ({ ...c, [q.id]: true }))}
              >
                Check answer
              </Button>
            ) : (
              <div className={cn("mt-3 rounded-xl p-3 text-sm", correct ? "bg-success-50 text-success-700 dark:bg-success-500/10" : "bg-danger-50 text-danger-700 dark:bg-danger-500/10")}>
                <p className="flex items-center gap-1.5 font-semibold">
                  <CheckCircleIcon className="h-4 w-4" aria-hidden="true" />
                  {correct ? "Correct." : "Not quite — review the rationale."}
                </p>
                <p className="mt-1 text-ink/80">{q.rationale}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function AIStudyPanel({ note }: { note: UserNote }) {
  const { updateNote, createNote, notify } = useNotes();
  const service = React.useMemo(() => new NoteStudyService(), []);
  const [tab, setTab] = React.useState<Tab>("summary");
  const [busy, setBusy] = React.useState(false);

  const summary = React.useMemo(() => service.summarize(note), [service, note]);
  const keyPoints = React.useMemo(() => service.keyPoints(note, 6), [service, note]);
  const cards = React.useMemo(() => service.flashcards(note, 8), [service, note]);
  const questions = React.useMemo(() => service.practiceQuestions(note, 3), [service, note]);

  const summaryMarkdown = React.useMemo(() => {
    const lines = [
      `## Quick Summary (AI study aid)`,
      ``,
      summary.tldr,
      ``,
      `### Key Concepts`,
      ``,
      ...summary.keyConcepts.map((c) => `- ${c}`),
      ``,
      `### Remember`,
      ``,
      ...summary.remember.map((r) => `- ${r}`),
    ];
    return lines.join("\n");
  }, [summary]);

  const appendToNote = async () => {
    setBusy(true);
    try {
      await updateNote(note.id, {
        content: `${note.content.trim()}\n\n---\n\n${summaryMarkdown}`,
      });
      notify("Summary added to your note.");
    } finally {
      setBusy(false);
    }
  };

  const createFromSummary = async () => {
    setBusy(true);
    try {
      const created = await createNote(
        {
          title: `${note.title} — Summary`,
          content: summaryMarkdown,
          subject: note.subject,
          noteType: "summary",
          folderId: note.folderId,
          tags: [...note.tags, "summary"],
          isFavorite: false,
          isHighYield: note.isHighYield,
          status: "published",
        },
        { aiGenerated: true, sourceNoteId: note.id }
      );
      window.location.assign(`/notes/${created.id}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section aria-label="AI study tools" className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink">
          <SparkIcon className="h-4 w-4 text-brand-600" aria-hidden="true" />
          Study Tools
        </h2>
        <Badge tone="neutral">Guided · rule-based</Badge>
      </div>
      <p className="mt-1 text-sm text-muted">
        Turn this note into a summary, flashcards, or practice questions. Generated from your own content.
      </p>

      <div className="mt-4 flex gap-1 overflow-x-auto rounded-xl bg-subtle p-1" role="tablist" aria-label="Study tool">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-2 text-sm font-semibold",
              tab === t.value ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4" role="tabpanel">
        {tab === "summary" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Quick Summary</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-ink">{summary.tldr}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Key Concepts</h3>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/90">
                {summary.keyConcepts.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-warning-500/40 bg-warning-50 p-3 dark:bg-warning-500/10">
              <h3 className="flex items-center gap-1.5 text-sm font-bold text-warning-700">
                <LightbulbIcon className="h-4 w-4" aria-hidden="true" /> Remember
              </h3>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-ink/90">
                {summary.remember.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => void appendToNote()} disabled={busy}>
                Add to Note
              </Button>
              <Button size="sm" onClick={() => void createFromSummary()} disabled={busy}>
                Create New Note
              </Button>
            </div>
          </div>
        )}
        {tab === "flashcards" && <FlashcardViewer cards={cards} />}
        {tab === "questions" && <PracticeQuiz questions={questions} />}
        {tab === "keypoints" && (
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink/90">
            {keyPoints.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
