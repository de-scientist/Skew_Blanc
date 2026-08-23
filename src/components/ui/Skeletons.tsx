import { cn } from "@/lib/utils";
import {
  Skeleton,
  SkeletonText,
} from "@/components/ui/Skeleton";

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("card p-5", className)}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="mt-4 h-4 w-2/3" />
      <SkeletonText className="mt-3" lines={2} />
    </div>
  );
}

export function ServiceCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("card overflow-hidden", className)}>
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-5">
        <Skeleton className="h-4 w-1/2" />
        <SkeletonText className="mt-3" lines={2} />
        <Skeleton className="mt-4 h-4 w-1/3" />
      </div>
    </div>
  );
}

export function ExamCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("card overflow-hidden", className)}>
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <SkeletonText className="mt-3" lines={2} />
        <Skeleton className="mt-4 h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("card overflow-hidden", className)}>
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-5">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="mt-3 h-4 w-3/4" />
        <SkeletonText className="mt-3" lines={2} />
      </div>
    </div>
  );
}

export function TestimonialCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("card p-8", className)}>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-full" />
        ))}
      </div>
      <SkeletonText className="mt-4" lines={3} />
      <div className="mt-6 flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="mt-2 h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}
