import { cn } from "@/lib/utils";

export function Avatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white",
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
