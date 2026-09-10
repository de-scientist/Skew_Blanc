/**
 * Nursora Knowledge Library — curated learning content model.
 *
 * Information architecture: Subject → Topic → resources
 * (Quick Notes → Detailed Notes → Flashcards → Cheat Sheet → Questions).
 *
 * This module follows the same mock-data pattern as the rest of the app
 * (`getBlogPost`, `getCategory`, `studyNotes`): typed static content with
 * `get*` accessors. The service layer can later swap these accessors for
 * real API calls without touching the UI. Personal notes live separately
 * in the user's private workspace (`/notes`) and are never mixed into
 * this curated library.
 */

export type TopicDifficulty = "Foundations" | "Core" | "Advanced";

export type DetailCalloutType =
  | "key-concept"
  | "nursing-alert"
  | "nclex-tip"
  | "signs-symptoms"
  | "interventions"
  | "medications"
  | "labs";

export interface QuickSection {
  heading: string;
  points: string[];
  /** Render as a numbered list (e.g. nursing priorities). */
  ordered?: boolean;
}

export interface QuickNotes {
  intro: string;
  sections: QuickSection[];
  nclexFocus: string[];
}

export interface DetailedCallout {
  type: DetailCalloutType;
  text: string;
}

export interface DetailedSection {
  heading: string;
  paragraphs: string[];
  callout?: DetailedCallout;
}

export interface DetailedNotes {
  intro: string;
  sections: DetailedSection[];
}

export interface TopicFlashcard {
  id: string;
  front: string;
  back: string;
  explanation?: string;
}

export interface CheatBlock {
  title: string;
  points: string[];
}

export interface CheatSheet {
  tagline: string;
  blocks: CheatBlock[];
  mnemonic?: { title: string; text: string };
}

export interface KnowledgeTopic {
  id: string;
  subjectSlug: string;
  title: string;
  slug: string;
  description: string;
  difficulty: TopicDifficulty;
  tags: string[];
  estimatedMinutes: number;
  quickNotes: QuickNotes;
  detailedNotes: DetailedNotes;
  flashcards: TopicFlashcard[];
  cheatSheet: CheatSheet;
  /** Exam category slug (see `examCategories`) used for practice CTAs. */
  examSlug: string;
  /** Slugs of related topics (same subject file scope is not required). */
  relatedSlugs: string[];
}

export interface KnowledgeSubject {
  slug: string;
  name: string;
  tagline: string;
  description: string;
}
