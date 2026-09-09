import type { Metadata } from "next";
import { FolderViewClient } from "@/components/notes/FolderViewClient";

export const metadata: Metadata = {
  title: "Folder",
  description: "Notes organized in this folder.",
  robots: { index: false, follow: false },
};

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  return <FolderViewClient folderId={folderId} />;
}
