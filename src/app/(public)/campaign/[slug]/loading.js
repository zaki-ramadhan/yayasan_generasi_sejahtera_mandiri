import { Skeleton } from "@/components/ui/skeleton";

export default function CampaignDetailLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-48 rounded" />
      </div>

      {/* Main 2-Column Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Image, Story & Tabs */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Main Visual Banner */}
          <div className="relative aspect-video w-full rounded-2xl border border-slate-300 bg-slate-100 overflow-hidden">
            <Skeleton className="w-full h-full rounded-none" />
          </div>

          {/* Campaign Header Meta */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-6 w-28 rounded-md" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
            <Skeleton className="h-8 sm:h-10 w-full rounded-lg" />
            <Skeleton className="h-8 sm:h-10 w-3/4 rounded-lg" />
          </div>

          {/* Mobile-Only Donation Metrics Placeholder */}
          <div className="lg:hidden p-5 bg-white rounded-xl border border-slate-300 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-8 w-44 rounded-md" />
              <Skeleton className="h-2.5 w-full rounded-full" />
            </div>
          </div>

          {/* Tabs Bar Placeholder */}
          <div className="border-b border-slate-300 pb-3 flex items-center gap-6">
            <Skeleton className="h-5 w-28 rounded" />
            <Skeleton className="h-5 w-36 rounded" />
            <Skeleton className="h-5 w-32 rounded" />
          </div>

          {/* Story Paragraphs Skeleton */}
          <div className="space-y-3.5 pt-2">
            <Skeleton className="h-4.5 w-full rounded" />
            <Skeleton className="h-4.5 w-full rounded" />
            <Skeleton className="h-4.5 w-5/6 rounded" />
            <Skeleton className="h-4.5 w-full rounded" />
            <Skeleton className="h-4.5 w-4/5 rounded" />
          </div>

          {/* Persistent CTA Box Placeholder */}
          <div className="p-5 sm:p-6 rounded-xl border border-slate-700/60 bg-slate-900 space-y-3">
            <Skeleton className="h-6 w-64 bg-slate-800 rounded" />
            <Skeleton className="h-4 w-3/4 bg-slate-800 rounded" />
          </div>
        </div>

        {/* Right Column: Sticky Donation Panel & Doa Sidebar */}
        <div className="lg:col-span-4 hidden lg:block space-y-4">
          {/* Sticky Donation Card */}
          <div className="p-6 sm:p-7 bg-white rounded-xl border border-slate-300 space-y-6 shadow-xs">
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-9 w-48 rounded-lg" />
              <div className="flex justify-between items-center pt-1">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>

            {/* 2-Column Metrics */}
            <div className="grid grid-cols-2 divide-x divide-slate-200 py-3.5 border-y border-slate-200">
              <div className="pr-3 space-y-1 text-center">
                <Skeleton className="h-7 w-16 mx-auto rounded" />
                <Skeleton className="h-4 w-20 mx-auto rounded" />
              </div>
              <div className="pl-3 space-y-1 text-center">
                <Skeleton className="h-7 w-16 mx-auto rounded" />
                <Skeleton className="h-4 w-20 mx-auto rounded" />
              </div>
            </div>

            {/* CTA Button */}
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-4 w-52 mx-auto rounded" />
          </div>

          {/* Doa-Doa Orang Baik Sidebar Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-300 p-5 sm:p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>

            {/* 3 Prayer Cards */}
            <div className="space-y-6 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative bg-white rounded-xl border border-slate-300 p-4 pt-6 space-y-3">
                  <div className="absolute -top-3.5 left-4">
                    <Skeleton className="w-8 h-8 rounded-full border-2 border-white" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-full rounded" />
                    <Skeleton className="h-3.5 w-5/6 rounded" />
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
