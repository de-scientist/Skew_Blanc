"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/types";
import type { TutorAction, TutorMessage } from "@/types/assessment";
import { TutorService } from "@/lib/assessment/tutor";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ACTIONS: { action: TutorAction; label: string }[] = [
  { action: "hint", label: "Give me a hint" },
  { action: "explain_concept", label: "Explain this" },
  { action: "analyze_mistake", label: "Why is my answer wrong?" },
  { action: "clinical_example", label: "Clinical example" },
  { action: "simplify", label: "Explain simply" },
  { action: "teach_topic", label: "Teach me this topic" },
  { action: "follow_up", label: "Ask me another question" },
  { action: "reveal_answer", label: "Reveal the answer" },
];

export function TutorPanel({
  question,
  selectedOptionId,
  revealAllowed,
  onReveal,
}: {
  question: Question;
  selectedOptionId: Question["options"][number]["id"] | null;
  revealAllowed: boolean;
  onReveal?: () => void;
}) {
  const service = useMemo(() => new TutorService(), []);
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [busy, setBusy] = useState(false);

  function send(action: TutorAction) {
    setBusy(true);
    const ctx = {
      subject: question.subject,
      topic: question.topic,
      questionText: question.text,
      options: question.options.map((o) => ({ id: o.id, text: o.text })),
      studentAnswerId: selectedOptionId,
      correctAnswerId: question.correctOptionId,
      explanation: question.explanation,
      difficulty: question.difficulty,
      learningObjective: question.tags?.[0],
    };
    const reply = service.respond(action, ctx);
    setMessages((prev) => [...prev, reply]);
    if (action === "reveal_answer" && onReveal) onReveal();
    setBusy(false);
  }

  return (
    <div className="card flex h-full flex-col p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Guided Tutor</p>
          <p className="text-xs text-muted">
            Reason it through — the tutor helps you arrive at the answer.
          </p>
        </div>
        <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[11px] font-semibold text-accent-700">
          AI-assisted
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-xl bg-canvas p-3 scrollbar-thin" aria-live="polite">
        {messages.length === 0 && (
          <p className="text-sm text-muted">
            Select an answer, then ask the tutor to hint, explain a concept, or
            analyze a mistake. The tutor guides — it does not replace your
            instructor or clinical judgment.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "rounded-xl p-3 text-sm",
              m.role === "tutor"
                ? "bg-surface text-ink"
                : "bg-brand-50 text-ink"
            )}
          >
            <p className="whitespace-pre-wrap">{m.content}</p>
            {m.revealsAnswer && (
              <p className="mt-2 text-[11px] font-semibold text-warning-700">
                Answer revealed for learning — re-explain it back to lock it in.
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {ACTIONS.map(({ action, label }) => {
          if (action === "reveal_answer" && !revealAllowed) return null;
          return (
            <Button
              key={action}
              size="sm"
              variant={action === "reveal_answer" ? "outline" : "secondary"}
              disabled={busy}
              onClick={() => send(action)}
            >
              {label}
            </Button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] leading-snug text-muted">
        Educational support only. For real patient-care decisions, consult a
        qualified nurse, instructor, or clinician.
      </p>
    </div>
  );
}
