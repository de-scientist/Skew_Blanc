"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/ui/icons";

export interface AccordionItemData {
  question: string;
  answer: React.ReactNode;
}

export function Accordion({
  items,
  defaultOpen = [],
  className,
}: {
  items: AccordionItemData[];
  defaultOpen?: number[];
  className?: string;
}) {
  const [open, setOpen] = React.useState<Set<number>>(
    () => new Set(defaultOpen)
  );

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div className={cn("divide-y divide-line rounded-2xl border border-line bg-surface", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `acc-panel-${i}`;
        const btnId = `acc-btn-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink transition-colors hover:bg-brand-50/50"
              >
                <span>{item.question}</span>
                <ChevronRightIcon
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-90"
                  )}
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="px-5 pb-5 text-sm leading-relaxed text-muted"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
