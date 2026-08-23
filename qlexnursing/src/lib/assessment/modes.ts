import type { AssessmentMode, ModeConfig } from "@/types/assessment";

/**
 * Single source of truth for how each learning mode behaves.
 *
 * The AssessmentPlayer and the engine read exclusively from these configs.
 * There is no `if (mode === "exam")` branching scattered through the UI —
 * behavior is data, not control flow. To change a mode, edit this file.
 */
export const MODE_CONFIGS: Record<AssessmentMode, ModeConfig> = {
  practice: {
    mode: "practice",
    label: "Practice",
    tagline: "Strengthen your knowledge",
    description:
      "Get immediate feedback and explanations as you answer. Build understanding question by question.",
    feedback: "immediate",
    explanations: "immediate",
    hints: false,
    ai: false,
    timer: "optional",
    randomizeQuestions: false,
    randomizeOptions: false,
    allowNavigation: true,
    allowReview: true,
    scoringEnabled: true,
    strictMode: false,
    adaptiveLearning: false,
    passingScoreRequired: false,
    tutorRevealAllowed: false,
  },
  tutor: {
    mode: "tutor",
    label: "Tutor",
    tagline: "Learn with guidance",
    description:
      "Work through questions with the Nursora guided tutor. Receive hints, Socratic reasoning, and explanations that help you arrive at the answer yourself.",
    feedback: "guided",
    explanations: "interactive",
    hints: true,
    ai: true,
    timer: "none",
    randomizeQuestions: false,
    randomizeOptions: false,
    allowNavigation: true,
    allowReview: true,
    scoringEnabled: true,
    strictMode: false,
    adaptiveLearning: true,
    passingScoreRequired: false,
    tutorRevealAllowed: true,
  },
  test: {
    mode: "test",
    label: "Test",
    tagline: "Measure your knowledge",
    description:
      "Take a timed assessment. Answers and explanations are revealed only after you submit, so you can measure what you actually know.",
    feedback: "after_submission",
    explanations: "after_submission",
    hints: false,
    ai: false,
    timer: "enabled",
    randomizeQuestions: true,
    randomizeOptions: true,
    allowNavigation: true,
    allowReview: true,
    scoringEnabled: true,
    strictMode: false,
    adaptiveLearning: false,
    passingScoreRequired: false,
    tutorRevealAllowed: false,
  },
  exam: {
    mode: "exam",
    label: "Exam",
    tagline: "Simulate examination conditions",
    description:
      "Experience a structured, timed examination environment with strict controls. The timer is authoritative and submission is automatic when time expires.",
    feedback: "after_submission",
    explanations: "after_submission",
    hints: false,
    ai: false,
    timer: "mandatory",
    randomizeQuestions: true,
    randomizeOptions: true,
    allowNavigation: true,
    allowReview: true,
    scoringEnabled: true,
    strictMode: true,
    adaptiveLearning: false,
    passingScoreRequired: true,
    tutorRevealAllowed: false,
  },
};

export function getModeConfig(mode: AssessmentMode): ModeConfig {
  return MODE_CONFIGS[mode];
}

export const ORDERED_MODES: AssessmentMode[] = [
  "practice",
  "tutor",
  "test",
  "exam",
];

export const MODE_DESCRIPTIONS: Record<AssessmentMode, { cta: string }> = {
  practice: { cta: "Start practicing" },
  tutor: { cta: "Study with the tutor" },
  test: { cta: "Take a test" },
  exam: { cta: "Start exam" },
};
