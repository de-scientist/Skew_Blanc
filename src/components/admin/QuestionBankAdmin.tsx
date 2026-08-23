"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  Difficulty,
  Question,
  QuestionBankStatus,
  ReviewStatus,
} from "@/types";
import {
  getAllQuestions,
  getSubjects,
  updateQuestion,
  type QuestionOverride,
} from "@/lib/assessment/questionBank";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { EmptyState } from "@/components/ui/EmptyState";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];
const REVIEW_STATUSES: ReviewStatus[] = ["pending", "approved", "rejected"];
const BANK_STATUSES: QuestionBankStatus[] = [
  "draft",
  "published",
  "archived",
  "ai_generated",
];

export function QuestionBankAdmin() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [subject, setSubject] = useState("");
  const [review, setReview] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Question | null>(null);

  useEffect(() => {
    setQuestions(getAllQuestions());
  }, []);

  const subjects = useMemo(() => getSubjects(), [questions]);

  const filtered = useMemo(() => {
    if (!questions) return [];
    return questions.filter((q) => {
      if (subject && q.subject !== subject) return false;
      if (review && q.reviewStatus !== review) return false;
      if (difficulty && q.difficulty !== difficulty) return false;
      if (search && !q.text.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [questions, subject, review, difficulty, search]);

  function refresh() {
    setQuestions(getAllQuestions());
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-brand-50 p-4 text-sm text-brand-900 dark:bg-brand-900/30 dark:text-brand-100">
        <p className="font-semibold">How the bank powers the four modes</p>
        <p className="mt-1">
          <span className="font-medium">Practice / Tutor</span> show the
          explanation and option rationales immediately.{" "}
          <span className="font-medium">Test / Exam</span> reveal them only after
          submission. <span className="font-medium">Difficulty</span> drives
          question pools and weak-area recommendations;{" "}
          <span className="font-medium">Review status</span> is the quality gate —
          keep items <code>approved</code> before they feed Exam mode. Edits here
          persist locally for the demo.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Subject" htmlFor="f-subject">
          <Select id="f-subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Review status" htmlFor="f-review">
          <Select id="f-review" value={review} onChange={(e) => setReview(e.target.value)}>
            <option value="">All</option>
            {REVIEW_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Difficulty" htmlFor="f-diff">
          <Select id="f-diff" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">All</option>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Search" htmlFor="f-search">
          <Input
            id="f-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search question text"
          />
        </Field>
      </div>

      {questions === null ? (
        <div className="h-40 animate-pulse rounded-2xl bg-track" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No questions match"
          description="Adjust the filters to see more of the question bank."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Topic</th>
                    <th className="px-4 py-3">Difficulty</th>
                    <th className="px-4 py-3">Review</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Question</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q) => (
                    <tr key={q.id} className="border-b border-line last:border-0">
                      <td className="px-4 py-3">{q.subject}</td>
                      <td className="px-4 py-3 text-muted">{q.topic}</td>
                      <td className="px-4 py-3">{q.difficulty}</td>
                      <td className="px-4 py-3">
                        <Badge
                          tone={
                            q.reviewStatus === "approved"
                              ? "success"
                              : q.reviewStatus === "rejected"
                                ? "danger"
                                : "warning"
                          }
                        >
                          {q.reviewStatus}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted">{q.questionBankStatus}</td>
                      <td className="max-w-xs truncate px-4 py-3 text-ink">
                        {q.text}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="outline" onClick={() => setEditing(q)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {editing && (
        <EditQuestionModal
          question={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            updateQuestion;
            refresh();
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function EditQuestionModal({
  question,
  onClose,
  onSaved,
}: {
  question: Question;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>(question.difficulty ?? "Medium");
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>(
    question.reviewStatus ?? "pending"
  );
  const [bankStatus, setBankStatus] = useState<QuestionBankStatus>(
    question.questionBankStatus ?? "draft"
  );
  const [explanation, setExplanation] = useState(question.explanation);
  const [correctOptionId, setCorrectOptionId] = useState(question.correctOptionId);

  function save() {
    const patch: QuestionOverride = {
      difficulty,
      reviewStatus,
      questionBankStatus: bankStatus,
      explanation,
      correctOptionId,
    };
    updateQuestion(question.id, patch);
    onSaved();
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Edit question"
      description={`${question.subject} · ${question.topic ?? ""}`}
    >
      <div className="space-y-3">
        <p className="text-sm text-ink">{question.text}</p>
        <Field label="Correct answer" htmlFor="e-correct">
          <Select
            id="e-correct"
            value={correctOptionId}
            onChange={(e) => setCorrectOptionId(e.target.value as Question["correctOptionId"])}
          >
            {question.options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.id} — {o.text}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Explanation" htmlFor="e-explanation">
          <Textarea
            id="e-explanation"
            rows={4}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Difficulty" htmlFor="e-diff">
            <Select
              id="e-diff"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Review" htmlFor="e-review">
            <Select
              id="e-review"
              value={reviewStatus}
              onChange={(e) => setReviewStatus(e.target.value as ReviewStatus)}
            >
              {REVIEW_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Bank status" htmlFor="e-bank">
            <Select
              id="e-bank"
              value={bankStatus}
              onChange={(e) => setBankStatus(e.target.value as QuestionBankStatus)}
            >
              {BANK_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>Save changes</Button>
        </div>
      </div>
    </Modal>
  );
}
