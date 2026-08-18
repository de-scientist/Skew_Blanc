import * as React from "react";
import { cn, formatNumber } from "@/lib/utils";

type Accent = "brand" | "accent" | "success" | "warning";

const iconWrap: Record<Accent, string> = {
  brand: "bg-brand-50 text-brand-700",
  accent: "bg-accent-50 text-accent-700",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
};

export function StatCard({
  label,
  value,
  footnote,
  accent = "brand",
  icon,
  className,
}: {
  label: string;
  value: string | number;
  footnote?: string;
  accent?: Accent;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card p-5", className)}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        {icon && (
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg",
              iconWrap[accent]
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-ink tabular-nums">
        {typeof value === "number" ? formatNumber(value) : value}
      </p>
      {footnote && <p className="mt-1 text-xs text-muted">{footnote}</p>}
    </div>
  );
}
