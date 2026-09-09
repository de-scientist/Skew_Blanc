"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { NotesExplorer } from "@/components/notes/NotesExplorer";
import { useNotes } from "@/components/notes/NotesProvider";
import { FolderManager } from "@/components/notes/FolderSidebar";
import { NoteCardSkeleton } from "@/components/notes/NoteSkeletons";
import { PlusIcon } from "@/components/ui/icons";

export function FolderViewClient({ folderId }: { folderId: string }) {
  const { folders, isLoading } = useNotes();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading folder">
        {Array.from({ length: 6 }).map((_, i) => (
          <NoteCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (folderId !== "unfiled" && !folders.some((f) => f.id === folderId)) {
    return (
      <EmptyState
        title="Folder not found."
        description="It may have been deleted. Your notes were moved to Unfiled."
        action={
          <Link href="/notes" className={buttonVariants({ variant: "primary" })}>
            Back to My Notes
          </Link>
        }
      />
    );
  }

  const name =
    folderId === "unfiled"
      ? "Unfiled"
      : (folders.find((f) => f.id === folderId)?.name ?? "Folder");

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ name: "My Notes", href: "/notes" }, { name }]}
        className="mb-2"
      />
      <PageHeader
        title={name}
        description={
          folderId === "unfiled"
            ? "Notes without a folder live here until you organize them."
            : `Every note you filed under ${name}.`
        }
        action={
          <div className="flex flex-wrap items-center gap-2">
            {folderId !== "unfiled" && <FolderManager folderId={folderId} />}
            <Link href="/notes/create" className={buttonVariants({ variant: "primary" })}>
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              Create Note
            </Link>
          </div>
        }
      />
      <NotesExplorer view="folder" folderId={folderId} showSidebar />
    </div>
  );
}
