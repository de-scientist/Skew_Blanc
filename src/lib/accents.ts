import type { ExamCategory } from "@/types/domain";

export type Accent = ExamCategory["accent"];

export const accentStyles: Record<
  Accent,
  { text: string; bg: string; border: string; soft: string; gradient: string; ring: string }
> = {
  brand: {
    text: "text-brand-700 dark:text-brand-300",
    bg: "bg-brand-600",
    border: "border-brand-200 dark:border-brand-800",
    soft: "bg-brand-50 dark:bg-brand-900/30",
    gradient: "from-brand-600 to-brand-800",
    ring: "ring-brand-500",
  },
  accent: {
    text: "text-accent-700 dark:text-accent-300",
    bg: "bg-accent-500",
    border: "border-accent-200 dark:border-accent-800",
    soft: "bg-accent-50 dark:bg-accent-900/30",
    gradient: "from-accent-500 to-accent-700",
    ring: "ring-accent-500",
  },
  violet: {
    text: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-600",
    border: "border-violet-200 dark:border-violet-800",
    soft: "bg-violet-50 dark:bg-violet-900/30",
    gradient: "from-violet-500 to-violet-700",
    ring: "ring-violet-500",
  },
  emerald: {
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-600",
    border: "border-emerald-200 dark:border-emerald-800",
    soft: "bg-emerald-50 dark:bg-emerald-900/30",
    gradient: "from-emerald-500 to-emerald-700",
    ring: "ring-emerald-500",
  },
  rose: {
    text: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-600",
    border: "border-rose-200 dark:border-rose-800",
    soft: "bg-rose-50 dark:bg-rose-900/30",
    gradient: "from-rose-500 to-rose-700",
    ring: "ring-rose-500",
  },
  amber: {
    text: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-600",
    border: "border-amber-200 dark:border-amber-800",
    soft: "bg-amber-50 dark:bg-amber-900/30",
    gradient: "from-amber-500 to-amber-700",
    ring: "ring-amber-500",
  },
};
