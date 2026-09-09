import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button";
import { NotesExplorer } from "@/components/notes/NotesExplorer";
import { NotesTabs } from "@/components/notes/NotesTabs";
import { PlusIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "My Notes",
  description: "Capture, organize, and master what you learn — your personal nursing knowledge base.",
  robots: { index: false, follow: false },
};

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ name: "Dashboard", href: "/dashboard" }, { name: "My Notes" }]} className="mb-2" />
      <PageHeader
        title="My Notes"
        description="Capture, organize, and master what you learn."
        action={
          <Link href="/notes/create" className={buttonVariants({ variant: "primary" })}>
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            Create Note
          </Link>
        }
      />
      <NotesTabs />
      <NotesExplorer view="all" showStats showSidebar />
    </div>
  );
}
