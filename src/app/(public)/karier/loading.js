import { Skeleton } from "@/components/ui/skeleton";

export default function KarierLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 animate-pulse">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <Skeleton className="h-8 sm:h-10 w-80 max-w-full rounded-lg" />
        <Skeleton className="h-4 sm:h-5 w-full max-w-xl rounded" />
      </div>

      {/* Vacancy Cards List */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-7 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1.5">
                <Skeleton className="h-6 w-64 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-full rounded" />
            <div className="pt-3 border-t border-slate-100 flex gap-4">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
