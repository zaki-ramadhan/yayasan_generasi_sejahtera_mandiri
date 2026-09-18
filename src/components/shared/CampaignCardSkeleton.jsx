import { Skeleton } from "@/components/ui/skeleton";

export function CampaignCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-200 bg-white overflow-hidden p-0 space-y-0">
      {/* Thumbnail Skeleton */}
      <Skeleton className="aspect-video w-full rounded-none" />

      {/* Content Skeleton */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
        {/* Category & Location */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* Excerpt */}
        <div className="space-y-1">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>

        {/* Progress Bar Skeleton */}
        <div className="space-y-2 pt-3 mt-auto">
          <Skeleton className="h-2.5 w-full rounded-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3.5 border-t border-slate-100 flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
