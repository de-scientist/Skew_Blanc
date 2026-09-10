import { Badge } from "@/components/ui/Badge";
import { NoteContent } from "@/components/notes/noteContent";
import { buildToc } from "@/lib/notes/store";
import type { DetailedNotes } from "@/data/mock/library";

/** Compose structured sections into the markdown-lite format rendered by
 *  the shared `NoteContent` component, so detailed notes reuse the exact
 *  callouts, tables, and heading anchors as personal notes. */
export function detailedNotesMarkdown(detailed: DetailedNotes): string {
  const parts: string[] = [detailed.intro];
  for (const s of detailed.sections) {
    parts.push(`## ${s.heading}`);
    parts.push(...s.paragraphs);
    if (s.callout) {
      parts.push(`::: ${s.callout.type}\n${s.callout.text}\n:::`);
    }
  }
  return parts.join("\n\n");
}

/** Detailed Notes: deep-learning resource with sticky table of contents. */
export function DetailedNotesView({
  detailed,
}: {
  detailed: DetailedNotes;
}) {
  const content = detailedNotesMarkdown(detailed);
  const toc = buildToc(content);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_15rem] lg:items-start">
      <article className="card min-w-0 p-5 sm:p-8">
        <div className="mx-auto max-w-[42rem]">
          <NoteContent content={content} />
        </div>
        <p className="mx-auto mt-8 max-w-[42rem] text-xs text-muted">
          <Badge tone="neutral" className="mr-2">
            Educational content
          </Badge>
          Always follow current institutional protocols, clinical guidelines,
          and professional supervision.
        </p>
      </article>

      {toc.length > 0 && (
        <aside
          className="hidden lg:sticky lg:top-20 lg:block"
          aria-label="Table of contents"
        >
          <nav className="card max-h-[70vh] overflow-y-auto p-4 scrollbar-thin">
            <p className="px-1 text-xs font-bold uppercase tracking-wide text-muted">
              On this page
            </p>
            <ul className="mt-2 space-y-0.5">
              {toc.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className={
                      entry.level === 3
                        ? "block rounded-lg px-3 py-1.5 pl-6 text-[13px] text-muted hover:bg-subtle hover:text-ink"
                        : "block rounded-lg px-3 py-1.5 text-sm font-medium text-ink hover:bg-subtle"
                    }
                  >
                    {entry.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      {toc.length > 0 && (
        <details className="card p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold text-ink">
            Table of contents ({toc.length})
          </summary>
          <ul className="mt-2 space-y-0.5">
            {toc.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-subtle hover:text-ink"
                >
                  {entry.text}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
