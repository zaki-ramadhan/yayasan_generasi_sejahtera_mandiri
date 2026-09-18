import { Skeleton } from "@/components/ui/skeleton";

export default function TentangKamiLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6 animate-pulse">
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-2xs">
        {/* Banner */}
        <div className="h-40 sm:h-52 lg:h-60 w-full bg-slate-200">
          <Skeleton className="w-full h-full rounded-none" />
        </div>

        {/* Profile Content */}
        <div className="px-5 sm:px-8 pb-5 sm:pb-6 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 -mt-12 sm:-mt-14 mb-3.5">
            {/* Logo Avatar */}
            <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md" />
            {/* Buttons */}
            <div className="flex gap-2 pt-2 sm:pt-0">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Skeleton className="h-8 w-72 sm:w-96 rounded-lg" />
            <Skeleton className="h-4 w-full max-w-xl rounded" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-28 rounded-full" />
              <Skeleton className="h-7 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid Sections (Vision, Mission, Legal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-300 space-y-4">
          <Skeleton className="h-6 w-36 rounded-md" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-300 space-y-4">
          <Skeleton className="h-6 w-36 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>
        </div>
      </div>

      {/* 3. Team / Leadership Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-md" />
          <Skeleton className="h-4 w-80 max-w-full rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 space-y-3 text-center">
              <Skeleton className="w-20 h-20 rounded-full mx-auto" />
              <div className="space-y-1">
                <Skeleton className="h-4.5 w-28 mx-auto rounded" />
                <Skeleton className="h-3.5 w-20 mx-auto rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
