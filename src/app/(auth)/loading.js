import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Title Skeleton */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>

        {/* Card Box Skeleton */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          {/* Google Button Skeleton */}
          <Skeleton className="w-full h-10 rounded-lg" />

          {/* Divider Skeleton */}
          <div className="flex items-center justify-center">
            <Skeleton className="w-16 h-3 rounded" />
          </div>

          {/* Form Fields Skeleton */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="w-full h-11 rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="w-full h-11 rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="w-full h-11 rounded-lg" />
            </div>
          </div>

          {/* Submit Button Skeleton */}
          <Skeleton className="w-full h-11 rounded-lg mt-2" />

          {/* Footer Link Skeleton */}
          <div className="pt-4 border-t border-slate-100 flex justify-center">
            <Skeleton className="h-4 w-44 rounded" />
          </div>
        </div>

        {/* Back Link Skeleton */}
        <div className="flex justify-center pt-1">
          <Skeleton className="h-4 w-40 rounded" />
        </div>
      </div>
    </div>
  );
}
