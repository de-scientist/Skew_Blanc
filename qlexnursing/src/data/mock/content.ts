import type { ForumTopic, AppNotification, StudyNote, StudyResource, FaqItem } from "@/types/domain";

export const forumTopics: ForumTopic[] = [
  {
    id: "f1",
    slug: "nclex-readiness-65-percent",
    title: "Is 65% on practice exams enough to schedule NCLEX?",
    category: "NCLEX-RN",
    author: "Jordan B.",
    authorInitials: "JB",
    replies: 12,
    views: 430,
    likes: 28,
    excerpt:
      "I've been averaging 65% on CAT-style practice. Should I push higher before booking, or is that close enough?",
    createdAt: "2026-08-15T14:20:00.000Z",
    pinned: true,
  },
  {
    id: "f2",
    slug: "pharmacology-memory-tricks",
    title: "Pharmacology memory tricks that actually worked for you?",
    category: "Pharmacology",
    author: "Amara O.",
    authorInitials: "AO",
    replies: 21,
    views: 612,
    likes: 41,
    excerpt:
      "Antidysrhythmics are destroying me. What systems helped you keep drug classes straight?",
    createdAt: "2026-08-14T09:05:00.000Z",
    solved: true,
  },
  {
    id: "f3",
    slug: "hesi-a2-math-timeline",
    title: "HESI A2 math in 3 weeks — realistic?",
    category: "HESI A2",
    author: "Priya N.",
    authorInitials: "PN",
    replies: 8,
    views: 204,
    likes: 15,
    excerpt:
      "Application deadline is tight. Can I realistically bring math up from a weak baseline in three weeks?",
    createdAt: "2026-08-13T18:40:00.000Z",
  },
  {
    id: "f4",
    slug: "rn-exit-exam-anxiety",
    title: "Coping with RN exit exam anxiety",
    category: "RN Nursing",
    author: "Daniel R.",
    authorInitials: "DR",
    replies: 17,
    views: 388,
    likes: 33,
    excerpt:
      "I know the content but freeze on timed exams. How do you manage the nerves on test day?",
    createdAt: "2026-08-12T11:12:00.000Z",
  },
  {
    id: "f5",
    slug: "lPN-practice-question-quality",
    title: "Best way to use LPN practice sets without burning out",
    category: "LPN Nursing",
    author: "Mark K.",
    authorInitials: "MK",
    replies: 6,
    views: 156,
    likes: 12,
    excerpt:
      "How many LPN questions a day is too many? Looking for a sustainable pace.",
    createdAt: "2026-08-11T20:30:00.000Z",
  },
];

export const notifications: AppNotification[] = [
  {
    id: "n1",
    category: "study",
    title: "Your daily study goal is waiting",
    body: "You're 16 questions away from today's target. A quick session keeps your streak alive.",
    createdAt: "2026-08-19T08:00:00.000Z",
    read: false,
  },
  {
    id: "n2",
    category: "exams",
    title: "New RN Nursing exam available",
    body: "A fresh Medical-Surgical set was added to your recommended practice.",
    createdAt: "2026-08-18T15:30:00.000Z",
    read: false,
  },
  {
    id: "n3",
    category: "results",
    title: "Your exam results are ready",
    body: "NCLEX-RN Practice Exam — 82%. Review your answers to see where to improve.",
    createdAt: "2026-08-18T08:12:00.000Z",
    read: true,
  },
  {
    id: "n4",
    category: "community",
    title: "Someone replied to your discussion",
    body: "Amara O. replied to “Pharmacology memory tricks that actually worked for you?”.",
    createdAt: "2026-08-17T19:00:00.000Z",
    read: true,
  },
  {
    id: "n5",
    category: "system",
    title: "Your profile was updated",
    body: "Your study preferences were saved successfully.",
    createdAt: "2026-08-16T12:00:00.000Z",
    read: true,
  },
];

export const studyNotes: StudyNote[] = [
  {
    id: "sn1",
    title: "Fundamentals of Nursing: Prioritization Frameworks",
    subject: "Fundamentals",
    category: "Notes",
    excerpt:
      "Maslow, ABCs, and the nursing process as a decision engine for tiered questions.",
    readingMinutes: 9,
    updatedAt: "2026-08-10T00:00:00.000Z",
    favorite: true,
    progress: 60,
    cover:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sn2",
    title: "Pharmacology: Antidysrhythmic Drug Classes",
    subject: "Pharmacology",
    category: "Cheat Sheet",
    excerpt:
      "A compact reference for Class I–IV agents, indications and safety watch-outs.",
    readingMinutes: 7,
    updatedAt: "2026-08-09T00:00:00.000Z",
    favorite: false,
    progress: 25,
    cover:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sn3",
    title: "Medical-Surgical: Heart Failure Management",
    subject: "Medical-Surgical",
    category: "Notes",
    excerpt:
      "Assessment, monitoring and patient teaching across the heart-failure continuum.",
    readingMinutes: 11,
    updatedAt: "2026-08-08T00:00:00.000Z",
    favorite: true,
    progress: 80,
    cover:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sn4",
    title: "Maternal-Newborn: Labor and Delivery Stages",
    subject: "Maternal-Newborn",
    category: "Guide",
    excerpt:
      "Stage-by-stage expectations, assessment cues and when to escalate.",
    readingMinutes: 8,
    updatedAt: "2026-08-07T00:00:00.000Z",
    favorite: false,
    progress: 10,
    cover:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sn5",
    title: "Pediatrics: Growth & Development Milestones",
    subject: "Pediatrics",
    category: "Flashcards",
    excerpt:
      "Age-banded milestones you are most likely to be tested on.",
    readingMinutes: 6,
    updatedAt: "2026-08-06T00:00:00.000Z",
    favorite: false,
    progress: 40,
    cover:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  },
];

export const studyResources: StudyResource[] = [
  {
    id: "r1",
    title: "Nursora Study Notes",
    type: "Notes",
    subject: "All subjects",
    description:
      "Concise, exam-aligned notes written by nursing educators and reviewed for accuracy.",
    count: 240,
    href: "/study-notes",
  },
  {
    id: "r2",
    title: "Pharmacology Flashcards",
    type: "Flashcards",
    subject: "Pharmacology",
    description: "Spaced-repetition decks for drug classes, side effects and safety.",
    count: 320,
    href: "/study-notes",
  },
  {
    id: "r3",
    title: "NCLEX Readiness Guide",
    type: "Guide",
    subject: "NCLEX-RN",
    description: "A step-by-step path from first practice to exam day.",
    count: 1,
    href: "/exams/nclex-rn",
  },
  {
    id: "r4",
    title: "Fundamentals Cheat Sheet",
    type: "Cheat Sheet",
    subject: "Fundamentals",
    description: "Prioritization frameworks and must-know assessments on one page.",
    count: 1,
    href: "/study-notes",
  },
  {
    id: "r5",
    title: "Clinical Judgment Drills",
    type: "Video",
    subject: "Clinical Judgment",
    description: "Walkthroughs of next-gen style case reasoning.",
    count: 18,
    href: "/exams/nclex-rn",
  },
];

export const faqs: FaqItem[] = [
  {
    category: "Getting Started",
    question: "What is Nursora?",
    answer:
      "Nursora is a nursing exam-preparation platform that helps students practice with realistic questions, review detailed rationales, and track performance across ATI TEAS, HESI A2, RN Nursing, LPN Nursing, NCLEX-RN and NCLEX-PN.",
  },
  {
    category: "Getting Started",
    question: "Is Nursora affiliated with the official NCLEX or NCSBN?",
    answer:
      "No. Nursora is an independent study tool and is not affiliated with, endorsed by, or sponsored by NCSBN or any trademark holder. All practice content is original and for preparation purposes only.",
  },
  {
    category: "Exams",
    question: "Which nursing exams are available?",
    answer:
      "You can practice ATI TEAS, HESI A2, RN Nursing, LPN Nursing, NCLEX-RN and NCLEX-PN. Each area includes practice, tutor, test and exam modes.",
  },
  {
    category: "Exams",
    question: "Can I practice ATI TEAS questions?",
    answer:
      "Yes. The ATI TEAS area includes Reading, Math, Science and English practice modeled on the admission exam's structure.",
  },
  {
    category: "Exams",
    question: "Can I practice HESI A2 questions?",
    answer:
      "Yes. The HESI A2 area covers Math, Reading Comprehension, Vocabulary, Grammar, Biology and Anatomy & Physiology.",
  },
  {
    category: "Exams",
    question: "Is NCLEX preparation available?",
    answer:
      "Yes. NCLEX-RN and NCLEX-PN areas include realistic exam-style questions, clinical-judgment drills and readiness insights. This is preparation only and not the official exam.",
  },
  {
    category: "Study Resources",
    question: "What study resources are included?",
    answer:
      "You get Nursora Study Notes, flashcards, subject guides, cheat sheets and community forums, all linked to the subjects you practice.",
  },
  {
    category: "Results",
    question: "How is my performance calculated?",
    answer:
      "After each attempt we compute accuracy by subject, a trend over time, and a recommended focus area based on your weakest subjects relative to your overall average.",
  },
  {
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Use the Forgot password link on the sign-in page. Enter your email and follow the secure reset instructions sent to you.",
  },
  {
    category: "Technical Support",
    question: "Why am I seeing a demo account?",
    answer:
      "Authentication is wired through the platform's API layer. In environments without a live backend, the app runs on clearly labeled mock data so you can explore the full experience.",
  },
];
