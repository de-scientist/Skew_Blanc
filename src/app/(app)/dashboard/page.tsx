import type { Metadata } from "next";
import { getDashboard } from "@/lib/api/dashboard";
import {
  createMetadata,
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { PerformanceOverview } from "@/components/dashboard/PerformanceOverview";
import { SubjectPerformance } from "@/components/dashboard/SubjectPerformance";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StudyRecommendation } from "@/components/dashboard/StudyRecommendation";

export const metadata: Metadata = createMetadata({
  title: "Dashboard",
  description:
    "Track your NCLEX-RN and RN nursing exam preparation: accuracy, streak, subject performance and recommended focus areas.",
  path: "/dashboard",
});

export default async function DashboardPage() {
  const data = await getDashboard();
  const jsonLd = [organizationJsonLd(), breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
  ])];

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ name: "Dashboard" }]} />
      <DashboardHeader
        studentName={data.studentName}
        continuePractice={data.continuePractice}
      />
      <DashboardStats stats={data.stats} />
      <StudyRecommendation area={data.recommendedArea} />
      <PerformanceOverview stats={data.stats} trend={data.trend} />
      <div className="grid gap-6 lg:grid-cols-2">
        <SubjectPerformance data={data.subjectPerformance} />
        <RecentActivity items={data.recentActivity} />
      </div>
    </div>
  );
}
