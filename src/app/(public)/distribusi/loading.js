import { Skeleton } from "@/components/ui/skeleton";

export default function DistribusiLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2 max-w-3xl">
        <Skeleton className="h-8 sm:h-9 w-96 max-w-full rounded-lg" />
        <Skeleton className="h-4 sm:h-5 w-full max-w-2xl rounded" />
      </div>

      {/* Distribution Cards List */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-300 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-5 items-start">
              <Skeleton className="w-full md:w-56 h-40 rounded-xl shrink-0" />
              <div className="space-y-3 flex-1 w-full">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded" />
                <div className="pt-2 flex flex-wrap gap-4 border-t border-slate-100">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-4 w-36 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
