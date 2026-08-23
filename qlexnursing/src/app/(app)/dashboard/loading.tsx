import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-40 w-full rounded-2xl" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-5">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-3 h-8 w-2/3" />
            <Skeleton className="mt-3 h-3 w-1/3" />
          </div>
        ))}
      </div>
      <div className="card p-5">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="mt-4 h-4 w-3/4" />
      </div>
      <Skeleton className="h-72 w-full rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}
