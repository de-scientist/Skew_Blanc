import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewTopicForm } from "@/components/forums/NewTopicForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "New topic",
  robots: { index: false, follow: false },
};

export default function NewTopicPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ name: "Dashboard", href: "/dashboard" }, { name: "Forums", href: "/forums" }, { name: "New topic" }]} className="mb-2" />
      <PageHeader title="Start a discussion" description="Ask a question or share a study strategy with the community." />
      <Card className="max-w-2xl">
        <CardContent>
          <NewTopicForm />
        </CardContent>
      </Card>
    </div>
  );
}
