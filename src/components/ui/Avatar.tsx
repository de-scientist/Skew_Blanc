import { cn } from "@/lib/utils";

export function Avatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn(
          "h-9 w-9 rounded-full object-cover",
          className
        )}
      />
    );
  }
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
