"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  tone?: "default" | "danger";
  description?: string;
}

export function Dropdown({
  trigger,
  items,
  align = "right",
  label,
  className,
}: {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center"
      >
        {trigger}
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 mt-2 min-w-[14rem] overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-card-hover",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {items.map((item, i) =>
            item.href ? (
              <a
                key={i}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  item.tone === "danger"
                    ? "text-danger-600 hover:bg-danger-50"
                    : "text-ink hover:bg-brand-50"
                )}
              >
                {item.icon && (
                  <span className="shrink-0 text-muted">{item.icon}</span>
                )}
                <span className="flex flex-col">
                  <span>{item.label}</span>
                  {item.description && (
                    <span className="text-xs font-normal text-muted">
                      {item.description}
                    </span>
                  )}
                </span>
              </a>
            ) : (
              <button
                key={i}
                type="button"
                role="menuitem"
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors",
                  item.tone === "danger"
                    ? "text-danger-600 hover:bg-danger-50"
                    : "text-ink hover:bg-brand-50"
                )}
              >
                {item.icon && (
                  <span className="shrink-0 text-muted">{item.icon}</span>
                )}
                <span className="flex flex-col">
                  <span>{item.label}</span>
                  {item.description && (
                    <span className="text-xs font-normal text-muted">
                      {item.description}
                    </span>
                  )}
                </span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
