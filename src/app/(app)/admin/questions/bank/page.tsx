import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuestionBankAdmin } from "@/components/admin/QuestionBankAdmin";

export const metadata: Metadata = {
  title: "Question Bank · Nursora",
};

export default function QuestionBankPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Question Bank"
        description="Author and manage the question bank that powers Practice, Tutor, Test, and Exam modes."
      />
      <QuestionBankAdmin />
    </div>
  );
}
