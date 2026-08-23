import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportsAdmin } from "@/components/admin/ReportsAdmin";

export const metadata: Metadata = {
  title: "Question Reports · Nursora",
};

export default function QuestionReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Question Reports"
        description="Review and resolve student-reported questions across all four modes."
      />
      <ReportsAdmin />
    </div>
  );
}
