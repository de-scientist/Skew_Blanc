import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudyPlanBoard } from "@/components/study/StudyPlanBoard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Study plan",
  robots: { index: false, follow: false },
};

export default function StudyPlanPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ name: "Dashboard", href: "/dashboard" }, { name: "Study Plan" }]} className="mb-2" />
      <PageHeader
        title="Your study plan"
        description="Set a realistic goal and we'll lay out a weekly rhythm you can actually keep."
      />
      <StudyPlanBoard />
    </div>
  );
}
