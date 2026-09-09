import { makeId, slugifyHeading, stripMarkdown } from "./store";
import type { UserNote } from "./types";

/**
 * AI study-tools boundary for Notes.
 *
 * Mirrors the architecture of `src/lib/assessment/tutor.ts`: all UI goes
 * through `NoteStudyService`, whose default provider is a deterministic,
 * rule-based engine that composes study material from the note's own
 * content. It never fabricates clinical facts beyond what the student wrote
 * and clearly labels output as study aids.
 *
 * To wire a real LLM later: implement `NoteStudyProvider` against a server
 * route (so model keys stay server-side) and return it from
 * `getNoteStudyProvider()`. No component changes needed.
 */

export interface NoteSummary {
  tldr: string;
  keyConcepts: string[];
  remember: string[];
}

export interface NoteFlashcard {
  id: string;
  front: string;
  back: string;
}

export type GeneratedQuestionType =
  | "multiple_choice"
  | "select_all"
  | "priority"
  | "clinical_scenario";

export interface GeneratedQuestion {
  id: string;
  type: GeneratedQuestionType;
  stem: string;
  options: string[];
  /** Index(es) of correct option(s). */
  correctIndexes: number[];
  rationale: string;
}

export interface NoteStudyProvider {
  readonly name: string;
  summarize(note: UserNote): NoteSummary;
  keyPoints(note: UserNote, count: number): string[];
  flashcards(note: UserNote, count: number): NoteFlashcard[];
  practiceQuestions(note: UserNote, count: number): GeneratedQuestion[];
}

/* ------------------------- content primitives ------------------------ */

function sentencesOf(note: UserNote): string[] {
  const plain = stripMarkdown(note.content).replace(/\s+/g, " ").trim();
  if (!plain) return [];
  return (
    plain.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()).filter((s) => s.length > 12) ??
    [plain]
  );
}

function bulletsOf(note: UserNote): string[] {
  const out: string[] = [];
  for (const line of note.content.split("\n")) {
    const m = /^\s*(?:[-*+]|\d+[.)])\s+(.+?)\s*$/.exec(line);
    if (m && m[1].length > 3) out.push(m[1].replace(/[*_`~=[\]()]/g, "").trim());
  }
  return out;
}

function headingsOf(note: UserNote): string[] {
  const out: string[] = [];
  for (const line of note.content.split("\n")) {
    const m = /^#{1,3}\s+(.+?)\s*$/.exec(line.trim());
    if (m) out.push(m[1].replace(/[*_`~]/g, "").trim());
  }
  return out;
}

/* --------------------------- heuristic provider ---------------------- */

export class HeuristicNoteStudyProvider implements NoteStudyProvider {
  readonly name = "heuristic";

  summarize(note: UserNote): NoteSummary {
    const sentences = sentencesOf(note);
    const bullets = bulletsOf(note);
    const headings = headingsOf(note);
    const tldr =
      sentences[0] ??
      `A ${note.subject} note on ${note.title}. Add more detail to unlock a richer summary.`;
    const keyConcepts = [
      ...headings.slice(0, 3).map((h) => `Understand ${h.toLowerCase()}`),
      ...bullets.slice(0, 5),
    ].slice(0, 6);
    const remember = bullets.slice(5, 8).length
      ? bullets.slice(5, 8)
      : sentences
          .slice(1, 4)
          .map((s) => s.slice(0, 140));
    return {
      tldr,
      keyConcepts:
        keyConcepts.length > 0
          ? keyConcepts
          : ["Break this topic into definition, causes, signs, and nursing actions."],
      remember:
        remember.length > 0
          ? remember
          : ["Restate the single most testable fact from this note in your own words."],
    };
  }

  keyPoints(note: UserNote, count = 5): string[] {
    const bullets = bulletsOf(note);
    const sentences = sentencesOf(note);
    const merged = [...bullets, ...sentences.filter((s) => !bullets.includes(s))];
    return merged.slice(0, Math.max(1, count));
  }

  flashcards(note: UserNote, count = 6): NoteFlashcard[] {
    const cards: NoteFlashcard[] = [];
    const headings = headingsOf(note);
    const bullets = bulletsOf(note);
    const sentences = sentencesOf(note);

    // Heading + following bullets -> Q/A pairs.
    const lines = note.content.split("\n");
    let currentHeading: string | null = null;
    const underHeading = new Map<string, string[]>();
    for (const line of lines) {
      const h = /^#{1,3}\s+(.+?)\s*$/.exec(line.trim());
      if (h) {
        currentHeading = h[1].replace(/[*_`~]/g, "").trim();
        continue;
      }
      const b = /^\s*(?:[-*+]|\d+[.)])\s+(.+?)\s*$/.exec(line);
      if (b && currentHeading) {
        const list = underHeading.get(currentHeading) ?? [];
        list.push(b[1].replace(/[*_`~]/g, "").trim());
        underHeading.set(currentHeading, list);
      }
    }
    for (const [heading, items] of underHeading) {
      if (cards.length >= count) break;
      if (items.length === 0) continue;
      cards.push({
        id: makeId("card"),
        front: `What are the key points of "${heading}" in ${note.title}?`,
        back: items.slice(0, 4).join(" • "),
      });
    }

    // Remaining bullets become definition-style cards.
    for (const b of bullets) {
      if (cards.length >= count) break;
      const snippet = b.length > 90 ? `${b.slice(0, 90)}…` : b;
      cards.push({
        id: makeId("card"),
        front: `Explain: ${snippet}`,
        back: b,
      });
    }

    // Fall back to sentences + headings so short notes still produce cards.
    for (const s of sentences) {
      if (cards.length >= count) break;
      cards.push({
        id: makeId("card"),
        front: `True or false — and why? ${s.length > 100 ? `${s.slice(0, 100)}…` : s}`,
        back: s,
      });
    }
    for (const h of headings) {
      if (cards.length >= count) break;
      cards.push({
        id: makeId("card"),
        front: `Summarize "${h}" in your own words.`,
        back: `Cover definition, key facts, and one nursing implication of ${h}. Check your answer against the "${h}" section of "${note.title}".`,
      });
    }
    return cards.slice(0, Math.max(1, count));
  }

  practiceQuestions(note: UserNote, count = 3): GeneratedQuestion[] {
    const bullets = bulletsOf(note);
    const sentences = sentencesOf(note);
    const questions: GeneratedQuestion[] = [];
    const types: GeneratedQuestionType[] = [
      "multiple_choice",
      "priority",
      "clinical_scenario",
    ];

    for (let i = 0; i < count; i++) {
      const type = types[i % types.length];
      const anchor =
        bullets[i % Math.max(1, bullets.length)] ??
        sentences[i % Math.max(1, sentences.length)] ??
        note.title;
      const distractors = [
        ...bullets.filter((b) => b !== anchor).slice(0, 3),
        ...sentences.filter((s) => s !== anchor).slice(0, 3),
      ].slice(0, 3);
      while (distractors.length < 3) {
        distractors.push(
          "An expected finding that requires only routine monitoring"
        );
      }
      const stem =
        type === "priority"
          ? `A nurse is caring for a client related to "${note.title}". Which finding requires the nurse's immediate action? (${anchor.length > 80 ? `${anchor.slice(0, 80)}…` : anchor})`
          : type === "clinical_scenario"
            ? `A client scenario reflects the concept: ${anchor.length > 90 ? `${anchor.slice(0, 90)}…` : anchor} Which nursing response best applies the principle from "${note.title}"?`
            : `Based on "${note.title}", which statement best reflects the concept: ${anchor.length > 90 ? `${anchor.slice(0, 90)}…` : anchor}?`;
      // Deterministic rotation keeps the correct answer position varied.
      const correctSlot = (i + note.title.length) % 4;
      const options = [...distractors];
      options.splice(correctSlot, 0, anchor);
      questions.push({
        id: makeId("genq"),
        type,
        stem,
        options: options.slice(0, 4),
        correctIndexes: [correctSlot],
        rationale: `The correct choice restates the note's key point ("${anchor.length > 120 ? `${anchor.slice(0, 120)}…` : anchor}"). Review the related section of "${note.title}" and re-explain why the other options are lower priority.`,
      });
    }
    return questions;
  }
}

export function getNoteStudyProvider(): NoteStudyProvider {
  const requested = process.env.NEXT_PUBLIC_NOTES_AI_PROVIDER;
  if (requested && requested !== "heuristic") {
    // Future LLM-backed provider plugs in here. Always fall back so the UI
    // never claims live-AI capability it does not have.
    return new HeuristicNoteStudyProvider();
  }
  return new HeuristicNoteStudyProvider();
}

export class NoteStudyService {
  constructor(private provider: NoteStudyProvider = getNoteStudyProvider()) {}

  get providerName(): string {
    return this.provider.name;
  }

  summarize(note: UserNote): NoteSummary {
    return this.provider.summarize(note);
  }

  keyPoints(note: UserNote, count = 5): string[] {
    return this.provider.keyPoints(note, count);
  }

  flashcards(note: UserNote, count = 6): NoteFlashcard[] {
    return this.provider.flashcards(note, count);
  }

  practiceQuestions(note: UserNote, count = 3): GeneratedQuestion[] {
    return this.provider.practiceQuestions(note, count);
  }
}

/** Anchor id for a heading — shared with the note renderer. */
export function headingId(text: string, index: number): string {
  return slugifyHeading(text, index);
}
