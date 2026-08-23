export type ID = string;

export type ExamSlug = "nclex-rn" | "rn-nursing" | "rn-nursing-dashboard";

export type ExamStatus = "draft" | "published" | "archived";

export interface Exam {
  id: ID;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  totalQuestions: number;
  durationMinutes: number;
  passingScore: number;
  subjects: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  status: ExamStatus;
  updatedAt: string;
}

export type AnswerOptionId = "A" | "B" | "C" | "D" | "E";

export interface AnswerOption {
  id: AnswerOptionId;
  text: string;
}

export type QuestionType = "single_choice" | "multiple_choice" | "true_false";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionBankStatus = "draft" | "published" | "archived" | "ai_generated";
export type ReviewStatus = "pending" | "approved" | "rejected";

/**
 * A question in the Nursora question bank.
 *
 * The base fields (id, examId, number, subject, text, options,
 * correctOptionId, explanation) are kept compatible with the original
 * assessment flow so existing components keep working. The additional fields
 * power the four-mode engine: richer metadata, multiple question types,
 * per-option rationales, and nursing-specific context.
 */
export interface Question {
  id: ID;
  examId: ID;
  number: number;
  subject: string;
  text: string;
  options: AnswerOption[];
  correctOptionId: AnswerOptionId;
  explanation: string;
  // --- Enriched question-bank fields (optional for backward compatibility) ---
  questionType?: QuestionType;
  topic?: string;
  subtopic?: string;
  difficulty?: Difficulty;
  correctOptionIds?: AnswerOptionId[];
  optionRationales?: Record<string, string>;
  tags?: string[];
  nursingProcess?: string;
  clinicalSetting?: string;
  competency?: string;
  priorityLevel?: string;
  cognitiveLevel?: string;
  questionBankStatus?: QuestionBankStatus;
  reviewStatus?: ReviewStatus;
  poolId?: string;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubjectPerformance {
  subject: string;
  accuracy: number;
  questions: number;
  average: number;
}

export interface PerformanceTrendPoint {
  date: string;
  score: number;
}

export interface RecentActivityItem {
  id: ID;
  title: string;
  score: number | null;
  durationMinutes: number;
  status: "completed" | "in-progress" | "abandoned";
  completedAt: string | null;
}

export interface DashboardStats {
  questionsAnswered: number;
  accuracy: number;
  examsCompleted: number;
  studyStreakDays: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageScore: number;
  timeSpentMinutes: number;
}

export interface RecommendedArea {
  subject: string;
  reason: string;
  accuracy: number;
  overallAccuracy: number;
}

export interface DashboardData {
  studentName: string;
  stats: DashboardStats;
  trend: PerformanceTrendPoint[];
  subjectPerformance: SubjectPerformance[];
  recentActivity: RecentActivityItem[];
  recommendedArea: RecommendedArea;
  continuePractice: {
    examTitle: string;
    unanswered: number;
  };
}

export interface AnswerSubmission {
  questionId: ID;
  selectedOptionId: AnswerOptionId | null;
  flagged: boolean;
}

export interface ExamResult {
  id: ID;
  examId: ID;
  examTitle: string;
  score: number;
  correct: number;
  total: number;
  unanswered: number;
  timeTakenMinutes: number;
  submittedAt: string;
  subjectPerformance: SubjectPerformance[];
  answers: {
    question: Question;
    selectedOptionId: AnswerOptionId | null;
    isCorrect: boolean;
  }[];
}
