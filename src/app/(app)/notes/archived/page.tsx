import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { NotesExplorer } from "@/components/notes/NotesExplorer";
import { NotesTabs } from "@/components/notes/NotesTabs";

export const metadata: Metadata = {
  title: "Archived Notes",
  description: "Notes you archived. Restore them or delete them permanently.",
  robots: { index: false, follow: false },
};

export default function ArchivedPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ name: "My Notes", href: "/notes" }, { name: "Archived" }]}
        className="mb-2"
      />
      <PageHeader
        title="Archived Notes"
        description="Out of sight, never gone. Restore a note or delete it permanently."
      />
      <NotesTabs />
      <NotesExplorer view="archived" />
    </div>
  );
}
