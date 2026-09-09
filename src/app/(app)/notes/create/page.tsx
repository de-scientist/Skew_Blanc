import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { NoteEditor } from "@/components/notes/NoteEditor";
import { NoteEditorSkeleton } from "@/components/notes/NoteSkeletons";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Write a new nursing note with rich formatting and nursing-specific blocks.",
  robots: { index: false, follow: false },
};

export default function CreateNotePage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <Breadcrumb
        items={[{ name: "My Notes", href: "/notes" }, { name: "Create Note" }]}
        className="mb-2"
      />
      <PageHeader
        title="Create Note"
        description="Capture what you learn — autosave keeps every word safe."
      />
      <Suspense fallback={<NoteEditorSkeleton />}>
        <NoteEditor mode="create" />
      </Suspense>
    </div>
  );
}
