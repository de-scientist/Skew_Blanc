import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ForumsList } from "@/components/forums/ForumsList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { sleep } from "@/lib/api/client";

export const metadata: Metadata = {
  title: "Forums",
  robots: { index: false, follow: false },
};

export default async function ForumsPage() {
  await sleep();
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ name: "Dashboard", href: "/dashboard" }, { name: "Forums" }]} className="mb-2" />
      <PageHeader
        title="Community forums"
        description="Ask questions, share study strategies and learn together with nursing students."
      />
      <ForumsList />
    </div>
  );
}
