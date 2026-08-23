import type { BlogPost } from "@/types/domain";

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-build-a-nclex-study-plan",
    title: "How to Build a NCLEX Study Plan That Actually Sticks",
    excerpt:
      "A practical, week-by-week framework for turning a vague goal into a consistent, measurable NCLEX preparation routine.",
    category: "NCLEX",
    author: "Nursora Team",
    publishedAt: "2026-07-22",
    updatedAt: "2026-08-01",
    readingMinutes: 7,
    cover:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    content: [
      "Most students fail at NCLEX preparation not because they lack ability, but because they lack a structure they can follow on tired days.",
      "Start by blocking study time like a clinical shift. Consistency beats marathon sessions. Twenty focused minutes daily outperforms a single exhausted Sunday.",
      "Use your performance data. If Pharmacology sits below your target accuracy, weight your week toward it — but keep a small dose of your strongest subject to protect confidence.",
      "Finally, simulate early and often. The exam interface, timer and stamina matter as much as content knowledge.",
    ],
  },
  {
    slug: "ati-teas-math-made-simple",
    title: "ATI TEAS Math Made Simple: The Formulas That Matter",
    excerpt:
      "The handful of math concepts that show up most often on the TEAS, and how to practice them without panic.",
    category: "ATI",
    author: "Nursora Team",
    publishedAt: "2026-07-15",
    readingMinutes: 6,
    cover:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    content: [
      "The TEAS math section rewards calm repetition more than cleverness. Fractions, percentages, ratios and basic algebra account for the majority of points.",
      "Drill word problems daily. Translate the sentence into an equation before reaching for a calculator.",
      "Track your accuracy by sub-topic so you can see progress, not just effort.",
    ],
  },
  {
    slug: "clinical-judgment-for-nclex",
    title: "Clinical Judgment for the Next-Gen NCLEX",
    excerpt:
      "What the NCSBN clinical-judgment model means for your practice, and how to train it deliberately.",
    category: "Clinical Judgment",
    author: "Nursora Team",
    publishedAt: "2026-06-30",
    readingMinutes: 8,
    cover:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Next-gen items reward the ability to recognize cues, analyze them, and prioritize. Practice questions should push you to explain your reasoning, not just pick an answer.",
      "After each question, ask: what was the safest action for this patient right now? That single habit builds judgment faster than any mnemonic.",
    ],
  },
  {
    slug: "hesi-a2-anatomy-tips",
    title: "A2 Anatomy & Physiology: High-Yield Systems to Review",
    excerpt:
      "Where to spend your limited HESI A2 prep time for the biggest anatomy return.",
    category: "HESI",
    author: "Nursora Team",
    publishedAt: "2026-06-18",
    readingMinutes: 5,
    cover:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    content: [
      "The cardiovascular, respiratory and nervous systems appear constantly. Anchor your review there before moving to the smaller systems.",
      "Use diagrams, not paragraphs. Labeling a pathway cements it far better than rereading notes.",
    ],
  },
  {
    slug: "rn-vs-lpn-prep",
    title: "RN vs LPN Exam Prep: How to Focus Your Practice",
    excerpt:
      "The overlap is large, but the emphasis differs. Here is how to aim your study time.",
    category: "RN Nursing",
    author: "Nursora Team",
    publishedAt: "2026-06-02",
    readingMinutes: 5,
    cover:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Both paths test fundamentals and medical-surgical heavily. RN prep leans further into independent clinical judgment; LPN prep emphasizes safe, supervised care.",
      "Choose your track early and let the dashboard weight your recommendations accordingly.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategories = [
  "NCLEX",
  "ATI",
  "HESI",
  "RN Nursing",
  "LPN Nursing",
  "Study Tips",
  "Clinical Judgment",
];
