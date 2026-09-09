import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { NotesExplorer } from "@/components/notes/NotesExplorer";
import { NotesTabs } from "@/components/notes/NotesTabs";

export const metadata: Metadata = {
  title: "Recent Notes",
  description: "Notes you have recently viewed or edited.",
  robots: { index: false, follow: false },
};

export default function RecentPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ name: "My Notes", href: "/notes" }, { name: "Recent" }]}
        className="mb-2"
      />
      <PageHeader
        title="Recent Notes"
        description="Pick up where you left off — sorted by your latest interaction."
      />
      <NotesTabs />
      <NotesExplorer view="recent" />
    </div>
  );
}
