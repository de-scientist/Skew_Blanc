import { Skeleton } from "@/components/ui/Skeleton";

export default function ExamLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-40" />
      <div className="card p-6">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-4 h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-5/6" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-11 w-28 rounded-xl" />
        <Skeleton className="h-11 w-28 rounded-xl" />
      </div>
    </div>
  );
}
