import { Card, CardContent } from "@/components/ui/Card";
import type { CheatSheet } from "@/data/mock/library";
import { LightbulbIcon } from "@/components/ui/icons";

/** Cheat Sheet: the fastest revision layer — compact, scannable, memorable. */
export function CheatSheetView({ sheet }: { sheet: CheatSheet }) {
  return (
    <div className="space-y-4">
      <p className="text-[15px] font-medium text-ink">{sheet.tagline}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {sheet.blocks.map((b) => (
          <Card key={b.title}>
            <CardContent>
              <h2 className="text-xs font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
                {b.title}
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink">
                {b.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      {sheet.mnemonic && (
        <aside
          aria-label="Mnemonic"
          className="flex items-start gap-3 rounded-xl border border-brand-500/40 bg-brand-50 px-4 py-3 dark:bg-brand-900/25"
        >
          <LightbulbIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-brand-700 dark:text-brand-300"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">{sheet.mnemonic.title}: </span>
            {sheet.mnemonic.text}
          </p>
        </aside>
      )}
    </div>
  );
}
