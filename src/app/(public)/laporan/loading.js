import { Skeleton } from "@/components/ui/skeleton";

export default function LaporanLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
      {/* Top Header */}
      <div className="space-y-1.5 border-b border-slate-200 pb-5">
        <Skeleton className="h-8 sm:h-9 w-96 max-w-full rounded-lg" />
        <Skeleton className="h-4 sm:h-5 w-full max-w-2xl rounded" />
      </div>

      {/* Section 1: Grand Total Keseluruhan (4 Cards Grid) */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-56 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-7 w-36 rounded" />
              <Skeleton className="h-3.5 w-44 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Program Ranking Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <Skeleton className="h-6 w-52 rounded" />
            <Skeleton className="h-4 w-72 max-w-full rounded" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4.5 w-3/4 rounded" />
                <Skeleton className="h-3.5 w-40 rounded" />
              </div>
              <Skeleton className="h-6 w-28 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
