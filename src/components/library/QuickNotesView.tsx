import { Badge } from "@/components/ui/Badge";
import type { QuickNotes } from "@/data/mock/library";
import { LightbulbIcon, StarIcon } from "@/components/ui/icons";

/** Quick Notes: scannable essentials for rapid learning and revision. */
export function QuickNotesView({ quick }: { quick: QuickNotes }) {
  return (
    <div className="card space-y-6 p-5 sm:p-8">
      <p className="max-w-3xl text-[15px] font-medium leading-relaxed text-ink">
        {quick.intro}
      </p>

      <div className="grid gap-5">
        {quick.sections.map((s) => (
          <section key={s.heading} aria-label={s.heading}>
            <h2 className="text-base font-bold text-ink">{s.heading}</h2>
            {s.ordered ? (
              <ol className="mt-2 list-decimal space-y-1.5 pl-6 text-[15px] leading-relaxed text-ink/90">
                {s.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
            ) : (
              <ul className="mt-2 list-disc space-y-1.5 pl-6 text-[15px] leading-relaxed text-ink/90">
                {s.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <aside
        aria-label="NCLEX focus"
        className="rounded-xl border border-warning-500/50 bg-warning-50 px-4 py-3 dark:bg-warning-500/10"
      >
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink">
          <StarIcon className="h-4 w-4" aria-hidden="true" />
          NCLEX Focus
        </p>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink">
          {quick.nclexFocus.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <LightbulbIcon
                className="mt-0.5 h-4 w-4 shrink-0 text-warning-600"
                aria-hidden="true"
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </aside>

      <p className="text-xs text-muted">
        <Badge tone="neutral" className="mr-2">
          Educational content
        </Badge>
        Always follow current institutional protocols, clinical guidelines,
        and professional supervision.
      </p>
    </div>
  );
}
