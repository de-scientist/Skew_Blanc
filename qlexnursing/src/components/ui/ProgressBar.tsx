import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  tone = "brand",
  className,
  label,
  showValue = false,
}: {
  value: number;
  max?: number;
  tone?: "brand" | "accent" | "success" | "warning" | "danger";
  className?: string;
  label?: string;
  showValue?: boolean;
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const barColor: Record<string, string> = {
    brand: "bg-brand-600",
    accent: "bg-accent-500",
    success: "bg-success-500",
    warning: "bg-warning-500",
    danger: "bg-danger-500",
  };
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-ink">{label}</span>}
          {showValue && (
            <span className="tabular-nums text-muted">{Math.round(percent)}%</span>
          )}
        </div>
      )}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-500", barColor[tone])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
