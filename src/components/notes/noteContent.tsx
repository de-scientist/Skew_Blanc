import * as React from "react";
import { CALLOUT_LABELS, CALLOUT_TYPES } from "@/lib/notes/constants";
import { slugifyHeading } from "@/lib/notes/store";
import { cn } from "@/lib/utils";
import {
  AlertIcon,
  CheckCircleIcon,
  FileTextIcon,
  InfoIcon,
  LightbulbIcon,
  PillIcon,
  StarIcon,
} from "@/components/ui/icons";

/**
 * Safe markdown-lite renderer for note content.
 *
 * Supports headings, paragraphs, bold/italic/strikethrough/highlight/code,
 * links, bullet/numbered/checklists, blockquotes, dividers, tables, and
 * nursing callout fences (`::: key-concept` … `:::`). Everything is built
 * from React text nodes — user HTML is never injected, so stored content
 * cannot execute scripts.
 */

const CALLOUT_ICONS: Record<string, (p: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
  "key-concept": LightbulbIcon,
  "nursing-alert": AlertIcon,
  "nclex-tip": StarIcon,
  "signs-symptoms": FileTextIcon,
  interventions: CheckCircleIcon,
  medications: PillIcon,
  labs: InfoIcon,
};

const CALLOUT_STYLES: Record<string, string> = {
  "key-concept": "border-brand-500/40 bg-brand-50 dark:bg-brand-900/25",
  "nursing-alert": "border-danger-500/40 bg-danger-50 dark:bg-danger-500/10",
  "nclex-tip": "border-warning-500/50 bg-warning-50 dark:bg-warning-500/10",
};

/* ------------------------------ inline ------------------------------ */

function inlineNodes(text: string, keyPrefix: string): React.ReactNode[] {
  const pattern =
    /(\*\*.+?\*\*|\*[^*]+?\*|~~.+?~~|==.+?==|`[^`]+?`|\[[^\]]+?\]\(https?:\/\/[^\s)]+?\)|\[[^\]]+?\]\(\/[^\s)]*?\))/g;
  const parts = text.split(pattern).filter((p) => p !== "");
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return <del key={key}>{part.slice(2, -2)}</del>;
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <mark
          key={key}
          className="rounded bg-warning-100 px-0.5 text-inherit dark:bg-warning-500/25"
        >
          {part.slice(2, -2)}
        </mark>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="rounded bg-subtle px-1 py-0.5 font-mono text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = /^\[([^\]]+?)\]\((https?:\/\/[^\s)]+?|\/[^\s)]*?)\)$/.exec(part);
    if (link) {
      return (
        <a
          key={key}
          href={link[2]}
          target={link[2].startsWith("http") ? "_blank" : undefined}
          rel={link[2].startsWith("http") ? "noreferrer" : undefined}
          className="font-medium text-brand-600 underline-offset-2 hover:underline dark:text-brand-300"
        >
          {link[1]}
        </a>
      );
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

/* ------------------------------- blocks ------------------------------ */

export type NoteBlock =
  | { kind: "heading"; level: 1 | 2 | 3; text: string; id?: string }
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "hr" }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "check"; items: Array<{ checked: boolean; text: string }> }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "callout"; type: string; body: NoteBlock[] };

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

function isSeparatorRow(line: string): boolean {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

function parseLines(lines: string[], start: number, inCallout: boolean): { blocks: NoteBlock[]; next: number } {
  const blocks: NoteBlock[] = [];
  let i = start;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Closing fence ends a callout body.
    if (inCallout && trimmed === ":::") {
      return { blocks, next: i + 1 };
    }

    // Opening callout fence.
    const fence = /^:::\s*([\w-]+)?\s*$/.exec(trimmed);
    if (fence && !inCallout) {
      const parsed = parseLines(lines, i + 1, true);
      blocks.push({
        kind: "callout",
        type: (fence[1] ?? "note").toLowerCase(),
        body: parsed.blocks,
      });
      i = parsed.next;
      continue;
    }
    // A fence line inside a callout without a type just closes it.
    if (fence && inCallout) {
      return { blocks, next: i + 1 };
    }

    const heading = /^(#{1,3})\s+(.+?)\s*$/.exec(trimmed);
    if (heading) {
      blocks.push({
        kind: "heading",
        level: heading[1].length as 1 | 2 | 3,
        text: heading[2],
      });
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(trimmed)) {
      blocks.push({ kind: "hr" });
      i++;
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(trimmed);
    if (quote) {
      const texts = [quote[1]];
      i++;
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        texts.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push({ kind: "quote", text: texts.join(" ") });
      continue;
    }

    if (trimmed.includes("|") && i + 1 < lines.length && isSeparatorRow(lines[i + 1])) {
      const header = splitTableRow(trimmed);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push({ kind: "table", header, rows });
      continue;
    }

    if (/^[-*+]\s+\[[ xX]\]\s+/.test(trimmed)) {
      const items: Array<{ checked: boolean; text: string }> = [];
      while (i < lines.length && /^[-*+]\s+\[[ xX]\]\s+/.test(lines[i].trim())) {
        const m = /^[-*+]\s+\[([ xX])\]\s+(.+?)\s*$/.exec(lines[i].trim());
        if (m) items.push({ checked: m[1].toLowerCase() === "x", text: m[2] });
        i++;
      }
      blocks.push({ kind: "check", items });
      continue;
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    const texts = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3}\s|:::\s*>|[-*+]\s|\d+[.)]\s|\||-{3,}\s*$)/.test(lines[i].trim())
    ) {
      texts.push(lines[i].trim());
      i++;
    }
    blocks.push({ kind: "paragraph", text: texts.join(" ") });
  }

  return { blocks, next: i };
}

/**
 * Parse content and assign heading anchors in document order (h2/h3 only),
 * matching `buildToc()` from `@/lib/notes/store` exactly.
 */
export function parseNoteBlocks(content: string): NoteBlock[] {
  const { blocks } = parseLines(content.split("\n"), 0, false);
  let tocIndex = 0;
  const assign = (list: NoteBlock[]) => {
    for (const b of list) {
      if (b.kind === "heading" && (b.level === 2 || b.level === 3)) {
        b.id = slugifyHeading(b.text.replace(/[*_`~=[\]()]/g, ""), tocIndex++);
      } else if (b.kind === "callout") {
        assign(b.body);
      }
    }
  };
  assign(blocks);
  return blocks;
}

/* ------------------------------ component ---------------------------- */

function Callout({ type, body }: { type: string; body: NoteBlock[] }) {
  const known = (CALLOUT_TYPES as readonly string[]).includes(type);
  const label = known
    ? CALLOUT_LABELS[type as keyof typeof CALLOUT_LABELS]
    : type
        .split("-")
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
        .join(" ");
  const Icon = CALLOUT_ICONS[type] ?? InfoIcon;
  const style = CALLOUT_STYLES[type] ?? "border-line bg-subtle";
  return (
    <aside
      className={cn("my-4 rounded-xl border border-l-4 px-4 py-3", style)}
      aria-label={label}
    >
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </p>
      <div className="mt-1.5 space-y-2 text-sm leading-relaxed text-ink">
        {body.map((b, i) => (
          <RenderedBlock key={i} block={b} index={i} />
        ))}
      </div>
    </aside>
  );
}

function RenderedBlock({ block, index }: { block: NoteBlock; index: number }) {
  switch (block.kind) {
    case "heading": {
      if (block.level === 1) {
        return (
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink">
            {inlineNodes(block.text, `h-${index}`)}
          </h1>
        );
      }
      if (block.level === 2) {
        return (
          <h2 id={block.id} className="mt-6 scroll-mt-24 text-xl font-bold tracking-tight text-ink">
            {inlineNodes(block.text, `h-${index}`)}
          </h2>
        );
      }
      return (
        <h3 id={block.id} className="mt-5 scroll-mt-24 text-base font-bold text-ink">
          {inlineNodes(block.text, `h-${index}`)}
        </h3>
      );
    }
    case "paragraph":
      return (
        <p className="my-3 leading-7 text-ink/90">{inlineNodes(block.text, `p-${index}`)}</p>
      );
    case "quote":
      return (
        <blockquote className="my-4 border-l-4 border-brand-500/50 bg-subtle/60 px-4 py-2 text-sm italic leading-relaxed text-muted">
          {inlineNodes(block.text, `q-${index}`)}
        </blockquote>
      );
    case "hr":
      return <hr className="my-6 border-line" />;
    case "ul":
      return (
        <ul className="my-3 list-disc space-y-1.5 pl-6 text-ink/90">
          {block.items.map((item, i) => (
            <li key={i} className="leading-7">
              {inlineNodes(item, `ul-${index}-${i}`)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-3 list-decimal space-y-1.5 pl-6 text-ink/90">
          {block.items.map((item, i) => (
            <li key={i} className="leading-7">
              {inlineNodes(item, `ol-${index}-${i}`)}
            </li>
          ))}
        </ol>
      );
    case "check":
      return (
        <ul className="my-3 space-y-1.5 text-ink/90">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 leading-7">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px]",
                  item.checked
                    ? "border-success-600 bg-success-600 text-white"
                    : "border-line bg-surface"
                )}
              >
                {item.checked ? "✓" : ""}
              </span>
              <span className={item.checked ? "text-muted line-through" : undefined}>
                {inlineNodes(item.text, `ck-${index}-${i}`)}
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="my-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[28rem] border-collapse text-sm">
            <thead>
              <tr className="bg-subtle">
                {block.header.map((cell, i) => (
                  <th key={i} className="border-b border-line px-3 py-2 text-left font-semibold text-ink">
                    {inlineNodes(cell, `th-${index}-${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="odd:bg-surface even:bg-subtle/50">
                  {row.map((cell, c) => (
                    <td key={c} className="border-b border-line px-3 py-2 text-ink/90">
                      {inlineNodes(cell, `td-${index}-${r}-${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return <Callout type={block.type} body={block.body} />;
  }
}

export function NoteContent({ content }: { content: string }) {
  const blocks = React.useMemo(() => parseNoteBlocks(content), [content]);
  if (blocks.length === 0) {
    return <p className="text-sm italic text-muted">This note is empty.</p>;
  }
  return (
    <div className="note-body">
      {blocks.map((block, i) => (
        <RenderedBlock key={i} block={block} index={i} />
      ))}
    </div>
  );
}
