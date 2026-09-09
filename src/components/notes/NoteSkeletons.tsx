import { cn } from "@/lib/utils";
import {
  Skeleton,
  SkeletonText,
} from "@/components/ui/Skeleton";

export function NoteCardSkeleton() {
  return (
    <div className="card p-5" aria-hidden="true">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-9 w-9 rounded-xl" />
      </div>
      <Skeleton className="mt-3 h-5 w-3/4" />
      <SkeletonText className="mt-2" lines={2} />
      <div className="mt-3 flex gap-1.5">
        <Skeleton className="h-5 w-14 rounded-md" />
        <Skeleton className="h-5 w-14 rounded-md" />
      </div>
      <Skeleton className="mt-4 h-4 w-1/2" />
    </div>
  );
}

export function NotesDashboardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-hidden="true">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-5">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-3 h-8 w-1/3" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-6 h-11 w-full rounded-xl" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <NoteCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function NoteViewerSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <Skeleton className="h-4 w-48" />
      <div className="card p-6 sm:p-8">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="mt-4 h-8 w-2/3" />
        <Skeleton className="mt-2 h-4 w-1/3" />
        <SkeletonText className="mt-6" lines={8} />
      </div>
    </div>
  );
}

export function NoteEditorSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Skeleton className="h-12 w-full rounded-xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-11 rounded-xl" />
        <Skeleton className="h-11 rounded-xl" />
        <Skeleton className="h-11 rounded-xl" />
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
