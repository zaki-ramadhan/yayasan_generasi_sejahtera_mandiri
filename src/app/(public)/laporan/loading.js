import { Skeleton } from "@/components/ui/skeleton";

export default function LaporanLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2 max-w-3xl">
        <Skeleton className="h-8 sm:h-9 w-96 max-w-full rounded-lg" />
        <Skeleton className="h-4 sm:h-5 w-full max-w-2xl rounded" />
      </div>

      {/* 4-Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-y border-slate-300 py-4 sm:py-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="py-3 sm:py-0 sm:px-6 first:pl-0 space-y-2">
            <Skeleton className="h-3.5 w-24 rounded" />
            <Skeleton className="h-8 w-36 rounded-md" />
            <Skeleton className="h-3.5 w-28 rounded" />
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4 pt-2">
        <Skeleton className="h-6 w-52 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-300 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-5 w-full rounded" />
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
