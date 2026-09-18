import { Skeleton } from "@/components/ui/skeleton";

export default function ArtikelCatalogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 sm:h-9 w-64 max-w-full rounded-lg" />
        <Skeleton className="h-4 sm:h-5 w-full max-w-lg rounded" />
      </div>

      {/* Search Bar & Sort Control */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
        <Skeleton className="h-11 w-full sm:max-w-md rounded-lg" />
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-11 w-44 rounded-lg" />
        </div>
      </div>

      {/* Horizontal Mini Cards Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-3.5 sm:p-4 bg-white border border-slate-300 rounded-xl flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch"
          >
            {i % 2 !== 0 && (
              <Skeleton className="w-full sm:w-36 md:w-40 h-40 sm:h-auto sm:min-h-[140px] rounded-lg shrink-0" />
            )}
            <div className="flex-1 space-y-2 py-1 flex flex-col justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-20 rounded" />
                <Skeleton className="h-4.5 w-full rounded" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-3 w-28 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

