import { Skeleton } from "@/components/ui/skeleton";

export default function VolunteerLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-9 sm:h-10 w-80 max-w-full rounded-lg" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-5/6 rounded" />
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-300 py-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-4 space-y-2">
                <Skeleton className="h-5 w-44 rounded" />
                <Skeleton className="h-4 w-full rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Form Skeleton */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 space-y-6 shadow-xs">
          <Skeleton className="h-6 w-52 rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
