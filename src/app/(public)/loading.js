import { Skeleton } from "@/components/ui/skeleton";
import { CampaignCardSkeleton } from "@/components/shared/CampaignCardSkeleton";

export default function PublicLoading() {
  return (
    <div className="space-y-10 sm:space-y-12 pb-14 animate-pulse">
      {/* 1. Hero Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative aspect-[21/9] min-h-[360px] w-full rounded-2xl border border-slate-300 bg-slate-100 overflow-hidden p-6 sm:p-12 flex flex-col justify-end space-y-3">
          <Skeleton className="h-6 w-36 rounded-md" />
          <Skeleton className="h-9 sm:h-12 w-full max-w-2xl rounded-lg" />
          <Skeleton className="h-4 sm:h-5 w-full max-w-xl rounded" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-11 w-40 rounded-lg" />
            <Skeleton className="h-11 w-40 rounded-lg" />
          </div>
        </div>
      </div>

      {/* 2. Program Donasi Pilihan Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3 border-b border-slate-300 pb-3.5">
          <div className="space-y-1">
            <Skeleton className="h-8 w-64 rounded-lg" />
            <Skeleton className="h-4 w-96 max-w-full rounded" />
          </div>
          {/* Category Filter Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            <Skeleton className="h-9 w-32 rounded-lg shrink-0" />
            <Skeleton className="h-9 w-28 rounded-lg shrink-0" />
            <Skeleton className="h-9 w-32 rounded-lg shrink-0" />
            <Skeleton className="h-9 w-28 rounded-lg shrink-0" />
          </div>
        </div>

        {/* 6 Campaign Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CampaignCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
