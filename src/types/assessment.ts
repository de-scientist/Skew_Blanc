import type {
  AnswerOptionId,
  Difficulty,
  ID,
  Question,
} from "./index";

export type AssessmentMode = "practice" | "tutor" | "test" | "exam";

export type TimerMode = "none" | "optional" | "enabled" | "mandatory";
export type FeedbackTiming = "immediate" | "after_submission" | "guided";
export type ExplanationTiming = "immediate" | "after_submission" | "interactive";

/**
 * Centralized configuration for an assessment mode.
 *
 * The four modes are NOT implemented as four separate code paths. Every mode
 * is a projection of this single configuration object consumed by the
 * AssessmentPlayer and the engine. Adding or tuning behavior happens here,
 * not in scattered conditional logic across components.
 */
export interface ModeConfig {
  mode: AssessmentMode;
  label: string;
  tagline: string;
  description: string;
  /** When answer correctness is shown to the student. */
  feedback: FeedbackTiming;
  /** When explanations/rationales become visible. */
  explanations: ExplanationTiming;
  hints: boolean;
  ai: boolean;
  timer: TimerMode;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  allowNavigation: boolean;
  allowReview: boolean;
  scoringEnabled: boolean;
  strictMode: boolean;
  adaptiveLearning: boolean;
  /** Whether a passing score is enforced (exam). */
  passingScoreRequired: boolean;
  /** Whether answers are revealed in the tutor flow on explicit request. */
  tutorRevealAllowed: boolean;
}

export type QuestionSelectionFilter = {
  subject?: string;
  topic?: string;
  subtopic?: string;
  difficulty?: Difficulty;
  questionType?: Question["questionType"];
  onlyUnanswered?: boolean;
  onlyWeak?: boolean;
  poolId?: string;
  tags?: string[];
};

export interface AssessmentConfig {
  mode: AssessmentMode;
  questionCount: number;
  durationMinutes: number;
  passingScore: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  optionalTimer: boolean;
  filter?: QuestionSelectionFilter;
}

export interface QuestionAttempt {
  questionId: ID;
  selectedOptionId: AnswerOptionId | null;
  selectedOptionIds?: AnswerOptionId[];
  isCorrect: boolean;
  timeSpentSeconds: number;
  hintsUsed: number;
  flagged: boolean;
  answeredAt: string | null;
  questionOrder: number;
  confidence?: 1 | 2 | 3;
  changedAnswer: boolean;
}

export type AttemptStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "expired"
  | "abandoned";

export interface AssessmentAttempt {
  id: ID;
  userId: ID;
  assessmentId: ID;
  mode: AssessmentMode;
  status: AttemptStatus;
  startedAt: string;
  expiresAt: string;
  durationMinutes: number;
  config: AssessmentConfig;
  /** Ordered question ids for this attempt (pooling + randomization applied). */
  questionIds: ID[];
  /** Keyed by question id. */
  answers: Record<ID, QuestionAttempt>;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupPerformance {
  key: string;
  accuracy: number;
  correct: number;
  total: number;
}

export interface WeakArea {
  key: string;
  label: string;
  accuracy: number;
  total: number;
  gap: number;
}

export type RecommendationType =
  | "practice_topic"
  | "review_topic"
  | "tutor_session"
  | "take_test"
  | "retry_questions";

export interface Recommendation {
  type: RecommendationType;
  title: string;
  detail: string;
  subject?: string;
  topic?: string;
  priority: number;
}

export interface AssessmentResult {
  id: ID;
  attemptId: ID;
  assessmentId: ID;
  mode: AssessmentMode;
  userId: ID;
  examTitle: string;
  score: number;
  correct: number;
  total: number;
  unanswered: number;
  answered: number;
  percentage: number;
  passed: boolean;
  passingScore: number;
  timeUsedMinutes: number;
  durationMinutes: number;
  submittedAt: string;
  startedAt: string;
  subjectPerformance: GroupPerformance[];
  topicPerformance: GroupPerformance[];
  difficultyPerformance: GroupPerformance[];
  questionTypePerformance: GroupPerformance[];
  weakAreas: WeakArea[];
  recommendations: Recommendation[];
  answers: {
    question: Question;
    selectedOptionId: AnswerOptionId | null;
    selectedOptionIds?: AnswerOptionId[];
    isCorrect: boolean;
    flagged: boolean;
    hintsUsed: number;
  }[];
}

// --- Question reporting ---

export type ReportReason =
  | "incorrect_answer"
  | "incorrect_explanation"
  | "ambiguous"
  | "typo"
  | "outdated"
  | "other";

export const REPORT_REASONS: { value: ReportReason; label: string }[] = [
  { value: "incorrect_answer", label: "Incorrect answer" },
  { value: "incorrect_explanation", label: "Incorrect explanation" },
  { value: "ambiguous", label: "Ambiguous question" },
  { value: "typo", label: "Typographical error" },
  { value: "outdated", label: "Outdated information" },
  { value: "other", label: "Other" },
];

export type ReportStatus = "open" | "reviewed" | "resolved";

export interface QuestionReport {
  id: ID;
  questionId: ID;
  examId?: ID;
  reason: ReportReason;
  detail?: string;
  questionText: string;
  subject?: string;
  status: ReportStatus;
  createdAt: string;
  reviewerNote?: string;
}

// --- AI Tutor ---

export type TutorAction =
  | "hint"
  | "explain_answer"
  | "explain_concept"
  | "analyze_mistake"
  | "clinical_example"
  | "simplify"
  | "follow_up"
  | "teach_topic"
  | "reveal_answer";

export interface TutorContext {
  subject: string;
  topic?: string;
  questionText: string;
  options: { id: string; text: string }[];
  studentAnswerId?: AnswerOptionId | null;
  correctAnswerId?: AnswerOptionId;
  explanation?: string;
  difficulty?: Difficulty;
  learningObjective?: string;
  previousMessages?: TutorMessage[];
}

export interface TutorMessage {
  id: string;
  role: "tutor" | "student";
  content: string;
  action?: TutorAction;
  createdAt: string;
  /** Marks messages that reveal the answer so the UI can treat them specially. */
  revealsAnswer?: boolean;
}

export interface TutorSession {
  id: ID;
  attemptId?: ID;
  questionId?: ID;
  messages: TutorMessage[];
  createdAt: string;
  updatedAt: string;
}
