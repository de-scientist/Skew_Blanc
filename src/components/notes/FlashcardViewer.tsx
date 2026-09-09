"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { NoteFlashcard } from "@/lib/notes/ai";
import { cn } from "@/lib/utils";

export function FlashcardViewer({ cards }: { cards: NoteFlashcard[] }) {
  const [order, setOrder] = React.useState<number[]>(() => cards.map((_, i) => i));
  const [position, setPosition] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [known, setKnown] = React.useState<Set<string>>(new Set());
  const [review, setReview] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    setOrder(cards.map((_, i) => i));
    setPosition(0);
    setFlipped(false);
  }, [cards]);

  if (cards.length === 0) return null;
  const current = cards[order[position] ?? 0];
  if (!current) return null;

  const go = (dir: 1 | -1) => {
    setPosition((p) => (p + dir + cards.length) % cards.length);
    setFlipped(false);
  };

  const shuffle = () => {
    const next = [...order];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    setOrder(next);
    setPosition(0);
    setFlipped(false);
  };

  const mark = (kind: "known" | "review") => {
    if (kind === "known") {
      setKnown((prev) => new Set(prev).add(current.id));
      setReview((prev) => {
        const next = new Set(prev);
        next.delete(current.id);
        return next;
      });
    } else {
      setReview((prev) => new Set(prev).add(current.id));
      setKnown((prev) => {
        const next = new Set(prev);
        next.delete(current.id);
        return next;
      });
    }
    go(1);
  };

  return (
    <div className="space-y-3" aria-label="Flashcards">
      <div className="flex items-center justify-between text-sm text-muted">
        <span role="status">
          Card {position + 1} of {cards.length}
        </span>
        <span className="flex gap-2">
          <Badge tone="success">{known.size} known</Badge>
          <Badge tone="warning">{review.size} to review</Badge>
        </span>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-label={flipped ? "Show question side" : "Show answer side. Activate to flip the card."}
        className="block min-h-[12rem] w-full rounded-2xl border border-line bg-surface p-6 text-left shadow-card transition-shadow hover:shadow-card-hover"
      >
        <p className="text-xs font-bold uppercase tracking-wide text-muted">
          {flipped ? "Answer" : "Question"} — tap to flip
        </p>
        <p className={cn("mt-3 leading-relaxed text-ink", flipped ? "text-[15px]" : "text-lg font-semibold")}>
          {flipped ? current.back : current.front}
        </p>
      </button>

      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => go(-1)} aria-label="Previous card">
          ← Prev
        </Button>
        <Button variant="ghost" size="sm" onClick={shuffle}>
          Shuffle
        </Button>
        <Button variant="outline" size="sm" onClick={() => go(1)} aria-label="Next card">
          Next →
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => mark("review")} className="flex-1">
          Needs review
        </Button>
        <Button size="sm" onClick={() => mark("known")} className="flex-1">
          Mark known
        </Button>
      </div>
    </div>
  );
}
