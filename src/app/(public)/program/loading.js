import { Skeleton } from "@/components/ui/skeleton";
import { CampaignCardSkeleton } from "@/components/shared/CampaignCardSkeleton";

export default function ProgramLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 sm:h-9 w-80 max-w-full rounded-lg" />
        <Skeleton className="h-4 sm:h-5 w-full max-w-2xl rounded" />
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Skeleton className="h-9 w-24 rounded-lg shrink-0" />
          <Skeleton className="h-9 w-28 rounded-lg shrink-0" />
          <Skeleton className="h-9 w-32 rounded-lg shrink-0" />
          <Skeleton className="h-9 w-28 rounded-lg shrink-0" />
          <Skeleton className="h-9 w-24 rounded-lg shrink-0" />
        </div>
        <Skeleton className="h-11 w-full max-w-md rounded-lg" />
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <CampaignCardSkeleton key={n} />
        ))}
      </div>
    </div>
  );
}
