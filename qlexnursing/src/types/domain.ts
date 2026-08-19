import type { Exam } from "@/types";

export type NursingPath = "RN" | "LPN" | "Pre-Nursing" | "Other";
export type ExamGoal =
  | "ATI"
  | "HESI"
  | "NCLEX-RN"
  | "NCLEX-PN"
  | "RN Nursing"
  | "LPN Nursing"
  | "Other";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  nursingLevel: NursingPath;
  institution?: string;
  primaryGoal: ExamGoal;
  studyGoal?: string;
  preferredLanguage: string;
  timezone: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ExamCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  audience: string;
  questionCount: number;
  examTypes: string[];
  accent: "brand" | "accent" | "violet" | "emerald" | "rose" | "amber";
  subjects: string[];
  heroImage: string;
  highlight: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  program: string;
  rating: number;
  quote: string;
  avatarInitials: string;
  verified: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  cover: string;
  featured?: boolean;
  content: string[];
}

export interface ForumTopic {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  authorInitials: string;
  replies: number;
  views: number;
  likes: number;
  excerpt: string;
  createdAt: string;
  pinned?: boolean;
  solved?: boolean;
}

export type NotificationCategory =
  | "study"
  | "exams"
  | "results"
  | "community"
  | "system";

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface StudyNote {
  id: string;
  title: string;
  subject: string;
  category: string;
  excerpt: string;
  readingMinutes: number;
  updatedAt: string;
  favorite: boolean;
  progress: number;
  cover: string;
}

export interface StudyResource {
  id: string;
  title: string;
  type: "Notes" | "Flashcards" | "Guide" | "Cheat Sheet" | "Video";
  subject: string;
  description: string;
  count: number;
  href: string;
}

export type StudyStreakDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface StudyStreak {
  current: number;
  longest: number;
  weeklyGoalMinutes: number;
  thisWeek: Record<StudyStreakDay, boolean>;
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export type { Exam };
