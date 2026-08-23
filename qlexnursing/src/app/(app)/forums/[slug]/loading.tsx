import { Skeleton } from "@/components/ui/Skeleton";

export default function ForumTopicLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-32" />
      <div className="card p-6">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="mt-3 h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-5/6" />
        <Skeleton className="mt-2 h-3 w-2/3" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
