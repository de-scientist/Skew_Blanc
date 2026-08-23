import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudyNotesBrowser } from "@/components/study/StudyNotesBrowser";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BookIcon } from "@/components/ui/icons";
import { sleep } from "@/lib/api/client";

export const metadata: Metadata = {
  title: "Study Notes",
  robots: { index: false, follow: false },
};

export default async function StudyNotesPage() {
  await sleep();
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ name: "Dashboard", href: "/dashboard" }, { name: "Study Notes" }]} className="mb-2" />
      <PageHeader
        title="QLex Study Notes"
        description="Concise, exam-aligned notes and flashcards for the subjects you practice."
        action={
          <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-muted">
            <BookIcon className="h-4 w-4 text-brand-600" /> 240 notes · 320 flashcards
          </span>
        }
      />
      <StudyNotesBrowser />
    </div>
  );
}
