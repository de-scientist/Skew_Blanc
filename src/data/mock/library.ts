import { LIBRARY_TOPICS } from "./library-topics";
import type {
  KnowledgeSubject,
  KnowledgeTopic,
  TopicDifficulty,
} from "./library-types";

export { LIBRARY_TOPICS };

export type {
  KnowledgeSubject,
  KnowledgeTopic,
  TopicDifficulty,
  QuickSection,
  QuickNotes,
  DetailedCallout,
  DetailedSection,
  DetailedNotes,
  TopicFlashcard,
  CheatBlock,
  CheatSheet,
} from "./library-types";

/* --------------------------------- data --------------------------------- */

export const KNOWLEDGE_SUBJECTS: KnowledgeSubject[] = [
  {
    slug: "fundamentals-of-nursing",
    name: "Fundamentals of Nursing",
    tagline: "Assessment, safety, and the skills every nurse uses daily.",
    description:
      "Core nursing foundations: infection control, vital-sign assessment, patient safety, and the clinical judgment frameworks behind every decision.",
  },
  {
    slug: "medical-surgical-nursing",
    name: "Medical-Surgical Nursing",
    tagline: "Cardiac, respiratory, endocrine, and other core clinical concepts.",
    description:
      "Adult health nursing across body systems — perfusion, oxygenation, and metabolism taught through high-yield conditions and NCLEX priorities.",
  },
  {
    slug: "pharmacology",
    name: "Pharmacology",
    tagline: "Drug classes, safety checks, and must-know side effects.",
    description:
      "Medication mastery by class: mechanisms that explain the effects, monitoring that keeps patients safe, and interactions the exam loves.",
  },
];

/* --------------------------------- routes -------------------------------- */

export function knowledgeHref(): string {
  return "/knowledge";
}

export function knowledgeSubjectHref(subjectSlug: string): string {
  return `/knowledge/${subjectSlug}`;
}

export function knowledgeTopicHref(
  subjectSlug: string,
  topicSlug: string
): string {
  return `/knowledge/${subjectSlug}/${topicSlug}`;
}

export type LibraryTab =
  | "quick"
  | "detailed"
  | "flashcards"
  | "cheatsheet"
  | "questions";

export const LIBRARY_TABS: Array<{ value: LibraryTab; label: string }> = [
  { value: "quick", label: "Quick Notes" },
  { value: "detailed", label: "Detailed Notes" },
  { value: "flashcards", label: "Flashcards" },
  { value: "cheatsheet", label: "Cheat Sheet" },
  { value: "questions", label: "Questions" },
];

export function isLibraryTab(value: unknown): value is LibraryTab {
  return LIBRARY_TABS.some((t) => t.value === value);
}

export function libraryTabHref(
  subjectSlug: string,
  topicSlug: string,
  tab: LibraryTab
): string {
  return `${knowledgeTopicHref(subjectSlug, topicSlug)}?tab=${tab}`;
}

/* -------------------------------- accessors ------------------------------ */

export function getKnowledgeSubjects(): KnowledgeSubject[] {
  return KNOWLEDGE_SUBJECTS;
}

export function getKnowledgeSubject(
  slug: string
): KnowledgeSubject | undefined {
  return KNOWLEDGE_SUBJECTS.find((s) => s.slug === slug);
}

export function getTopicsBySubject(subjectSlug: string): KnowledgeTopic[] {
  return LIBRARY_TOPICS.filter((t) => t.subjectSlug === subjectSlug);
}

export function getKnowledgeTopic(
  subjectSlug: string,
  topicSlug: string
): KnowledgeTopic | undefined {
  return LIBRARY_TOPICS.find(
    (t) => t.subjectSlug === subjectSlug && t.slug === topicSlug
  );
}

export function getTopicBySlug(slug: string): KnowledgeTopic | undefined {
  return LIBRARY_TOPICS.find((t) => t.slug === slug);
}

export function getRelatedTopics(topic: KnowledgeTopic): KnowledgeTopic[] {
  return topic.relatedSlugs
    .map((slug) => getTopicBySlug(slug))
    .filter((t): t is KnowledgeTopic => t !== undefined)
    .filter((t) => t.id !== topic.id);
}

export interface LibrarySearchResult {
  type: "subject" | "topic";
  title: string;
  subtitle: string;
  href: string;
}

/** Relevance-ordered search across subjects, topics, tags, and keywords. */
export function searchLibrary(query: string): LibrarySearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const scored: Array<{ r: LibrarySearchResult; score: number }> = [];

  for (const s of KNOWLEDGE_SUBJECTS) {
    let score = 0;
    if (s.name.toLowerCase().includes(q)) score += 5;
    if (s.tagline.toLowerCase().includes(q)) score += 2;
    if (s.description.toLowerCase().includes(q)) score += 1;
    if (score > 0) {
      scored.push({
        r: {
          type: "subject",
          title: s.name,
          subtitle: `${getTopicsBySubject(s.slug).length} topics · ${s.tagline}`,
          href: knowledgeSubjectHref(s.slug),
        },
        score,
      });
    }
  }

  for (const t of LIBRARY_TOPICS) {
    const subject = getKnowledgeSubject(t.subjectSlug);
    let score = 0;
    if (t.title.toLowerCase().includes(q)) score += 6;
    if (t.title.toLowerCase().startsWith(q)) score += 2;
    if (t.description.toLowerCase().includes(q)) score += 2;
    if (t.tags.some((tag) => tag.toLowerCase().includes(q))) score += 3;
    if (subject && subject.name.toLowerCase().includes(q)) score += 1;
    if (score > 0) {
      scored.push({
        r: {
          type: "topic",
          title: t.title,
          subtitle: `${subject?.name ?? t.subjectSlug} · ${t.flashcards.length} flashcards`,
          href: knowledgeTopicHref(t.subjectSlug, t.slug),
        },
        score,
      });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.r)
    .slice(0, 12);
}

/** Subjects annotated with live topic counts for landing cards. */
export function getSubjectSummaries(): Array<
  KnowledgeSubject & { topicCount: number; flashcardCount: number }
> {
  return KNOWLEDGE_SUBJECTS.map((s) => {
    const topics = getTopicsBySubject(s.slug);
    return {
      ...s,
      topicCount: topics.length,
      flashcardCount: topics.reduce((sum, t) => sum + t.flashcards.length, 0),
    };
  });
}
