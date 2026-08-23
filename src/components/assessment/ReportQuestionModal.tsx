"use client";

import { useState } from "react";
import type { Question } from "@/types";
import type { ReportReason } from "@/types/assessment";
import { REPORT_REASONS } from "@/types/assessment";
import { Modal, Button } from "@/components/ui/Modal";
import { Select, Textarea, Field } from "@/components/ui/form";
import { submitReport } from "@/lib/assessment/reports";
import { CheckIcon } from "@/components/ui/icons";

export function ReportQuestionModal({
  question,
  examId,
  onClose,
}: {
  question: Question;
  examId?: string;
  onClose: () => void;
}) {
  const [reason, setReason] = useState<ReportReason>("incorrect_answer");
  const [detail, setDetail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit() {
    submitReport({ question, reason, detail: detail.trim() || undefined, examId });
    setDone(true);
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Report this question"
      description="Help us improve the question bank. Reports are reviewed by an instructor."
    >
      {done ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-100 text-success-700">
            <CheckIcon className="h-6 w-6" />
          </span>
          <p className="font-medium text-ink">Report submitted</p>
          <p className="text-sm text-muted">
            Thank you — our team will review this question.
          </p>
          <Button onClick={onClose}>Close</Button>
        </div>
      ) : (
        <>
          <Field label="What is the issue?" htmlFor="report-reason">
            <Select
              id="report-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value as ReportReason)}
            >
              {REPORT_REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Details (optional)" htmlFor="report-detail" className="mt-3">
            <Textarea
              id="report-detail"
              rows={4}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Add any context that will help us resolve this."
            />
          </Field>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit report</Button>
          </div>
        </>
      )}
    </Modal>
  );
}
