import { Skeleton } from "@/components/ui/skeleton";

export default function InvoiceLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 animate-pulse">
      {/* Top Invoice Card */}
      <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Header Status & Invoice ID */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div className="space-y-1">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-6 w-44 rounded-md" />
          </div>
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>

        {/* Countdown Timer Box */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between">
          <Skeleton className="h-4 w-36 rounded" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        {/* Total Payment Amount */}
        <div className="text-center py-4 space-y-2">
          <Skeleton className="h-4 w-32 mx-auto rounded" />
          <Skeleton className="h-9 sm:h-10 w-64 mx-auto rounded-lg" />
        </div>

        {/* QR Code / VA Box Skeleton */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-center">
          <Skeleton className="w-48 h-48 mx-auto rounded-lg" />
          <Skeleton className="h-4 w-56 mx-auto rounded" />
        </div>

        {/* Payment Details Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-4 w-40 rounded" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200">
            <Skeleton className="h-4 w-36 rounded" />
            <Skeleton className="h-4 w-28 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
