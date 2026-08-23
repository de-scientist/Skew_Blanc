import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchExperience } from "@/components/search/SearchExperience";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { sleep } from "@/lib/api/client";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: false },
};

export default async function SearchPage() {
  await sleep();
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ name: "Dashboard", href: "/dashboard" }, { name: "Search" }]} className="mb-2" />
      <PageHeader
        title="Search"
        description="Find exams, study notes, forum discussions and articles across Nursora."
      />
      <SearchExperience />
    </div>
  );
}
