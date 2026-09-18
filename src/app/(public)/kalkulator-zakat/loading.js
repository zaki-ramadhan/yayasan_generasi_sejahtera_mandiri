import { Skeleton } from "@/components/ui/skeleton";

export default function KalkulatorZakatLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 animate-pulse">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <Skeleton className="h-9 sm:h-10 w-96 max-w-full mx-auto rounded-lg" />
        <Skeleton className="h-5 w-full max-w-xl mx-auto rounded" />
      </div>

      {/* Tabs & Calculator Layout */}
      <div className="space-y-6">
        {/* Tabs bar */}
        <div className="flex gap-2 overflow-x-auto p-1.5 bg-slate-100 rounded-xl">
          <Skeleton className="h-9 w-32 rounded-lg shrink-0" />
          <Skeleton className="h-9 w-36 rounded-lg shrink-0" />
          <Skeleton className="h-9 w-28 rounded-lg shrink-0" />
          <Skeleton className="h-9 w-28 rounded-lg shrink-0" />
          <Skeleton className="h-9 w-28 rounded-lg shrink-0" />
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          {/* Form Inputs (Left) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-5 shadow-xs">
            <div className="space-y-2">
              <Skeleton className="h-5 w-64 rounded" />
              <Skeleton className="h-4 w-48 rounded" />
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-48 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3.5 w-1/2 rounded" />
            </div>
          </div>

          {/* Results Summary (Right) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-5 shadow-xs">
            <div className="border-b border-slate-200 pb-3 space-y-1">
              <Skeleton className="h-5 w-44 rounded" />
              <Skeleton className="h-3.5 w-32 rounded" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-8 w-48 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
