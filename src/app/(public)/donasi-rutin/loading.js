import { Skeleton } from "@/components/ui/skeleton";

export default function DonasiRutinLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <Skeleton className="h-9 sm:h-10 w-80 max-w-full mx-auto rounded-lg" />
        <Skeleton className="h-5 w-full max-w-lg mx-auto rounded" />
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Donor identity */}
        <div className="space-y-4 pb-6 border-b border-slate-200">
          <Skeleton className="h-5 w-48 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </div>

        {/* Program Commitment */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-56 rounded" />
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <Skeleton className="h-11 w-full rounded-lg" />
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>

        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
