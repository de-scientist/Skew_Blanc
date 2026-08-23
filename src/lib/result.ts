import type {
  AnswerOptionId,
  Exam,
  ExamResult,
  Question,
  SubjectPerformance,
} from "@/types";

export interface Submission {
  selectedOptionId: AnswerOptionId | null;
  flagged: boolean;
}

export type SubmissionMap = Record<string, Submission>;

export const RESULT_STORAGE_KEY = (examId: string) => `qlex:result:${examId}`;

export function buildResult(
  exam: Exam,
  questions: Question[],
  submissions: SubmissionMap,
  timeTakenMinutes: number,
  resultId: string
): ExamResult {
  const answers = questions.map((question) => {
    const submission = submissions[question.id];
    const selected = submission?.selectedOptionId ?? null;
    const isCorrect = selected === question.correctOptionId;
    return { question, selectedOptionId: selected, isCorrect };
  });

  const answered = answers.filter((a) => a.selectedOptionId !== null);
  const correct = answers.filter((a) => a.isCorrect).length;
  const total = questions.length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);

  const subjectMap = new Map<string, { correct: number; total: number }>();
  for (const a of answers) {
    const subject = a.question.subject;
    const entry = subjectMap.get(subject) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (a.isCorrect) entry.correct += 1;
    subjectMap.set(subject, entry);
  }

  const subjectPerformance: SubjectPerformance[] = Array.from(
    subjectMap.entries()
  ).map(([subject, value]) => ({
    subject,
    accuracy: value.total === 0 ? 0 : Math.round((value.correct / value.total) * 100),
    questions: value.total,
    average: 0,
  }));

  return {
    id: resultId,
    examId: exam.id,
    examTitle: exam.title,
    score,
    correct,
    total,
    unanswered: total - answered.length,
    timeTakenMinutes,
    submittedAt: new Date().toISOString(),
    subjectPerformance,
    answers,
  };
}

/**
 * Generates a representative result for demonstration when no submission is
 * stored (e.g. direct navigation to /results/[id]). Deterministic so the
 * UI is stable across reloads.
 */
export function buildDemoResult(
  exam: Exam,
  questions: Question[],
  resultId: string
): ExamResult {
  const submissions: SubmissionMap = {};
  questions.forEach((q, idx) => {
    const isCorrect = idx % 5 !== 0; // ~80% accuracy
    submissions[q.id] = {
      selectedOptionId: isCorrect ? q.correctOptionId : q.options[0].id,
      flagged: idx === 3,
    };
  });
  return buildResult(exam, questions, submissions, exam.durationMinutes - 12, resultId);
}
