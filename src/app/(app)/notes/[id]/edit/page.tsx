import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { NoteEditor } from "@/components/notes/NoteEditor";

export const metadata: Metadata = {
  title: "Edit Note",
  robots: { index: false, follow: false },
};

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <Breadcrumb
        items={[
          { name: "My Notes", href: "/notes" },
          { name: "Note", href: `/notes/${id}` },
          { name: "Edit" },
        ]}
        className="mb-2"
      />
      <PageHeader
        title="Edit Note"
        description="Refine your understanding — changes autosave as you write."
      />
      <NoteEditor mode="edit" noteId={id} />
    </div>
  );
}
