import { Skeleton } from "@/components/ui/skeleton";

export default function DonasiRutinLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* 1. Hero Header Skeleton */}
      <div className="space-y-4">
        {/* Back Link Breadcrumb */}
        <div className="flex items-center gap-1.5 py-0.5">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-44 rounded" />
        </div>
        {/* Page Header (Left-aligned) */}
        <div className="space-y-1 sm:space-y-1.5">
          <Skeleton className="h-8 sm:h-9 w-72 rounded-lg" />
          <Skeleton className="h-5 w-full max-w-xl rounded" />
        </div>
      </div>

      {/* 2. Main Form Grid (12 cols: 7 cols Left, 5 cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (7 Cols): Donor Identity & Program Selection */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Data Donatur */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 shadow-xs">
            <Skeleton className="h-6 w-32 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="h-4 w-48 rounded" />
            </div>

            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28 rounded" />
              <div className="flex gap-2.5">
                <Skeleton className="h-11 w-24 rounded-lg shrink-0" />
                <Skeleton className="h-11 flex-1 rounded-lg" />
              </div>
            </div>

            {/* WhatsApp & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Card 2: Pilihan Program & Jadwal Donasi */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-56 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>

            {/* Program Item Card 1 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-5 shadow-xs">
              {/* Program header & delete button */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-28 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>

              {/* Pilih Program */}
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>

              {/* Frekuensi & Model Komitmen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-36 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>

              {/* Jam Pengingat & Nominal */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32 rounded" />
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Add Program Button Placeholder */}
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </div>

        {/* Right Column (5 Cols): Ringkasan Jadwal Donasi */}
        <div className="lg:col-span-5">
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-5 shadow-xs">
            <div className="space-y-1">
              <Skeleton className="h-6 w-48 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>

            {/* Program Breakdown Item */}
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
              <Skeleton className="h-3.5 w-44 rounded" />
              <Skeleton className="h-3.5 w-28 rounded" />
            </div>

            {/* Total / Calculation */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-28 rounded" />
                <Skeleton className="h-7 w-32 rounded" />
              </div>
              <Skeleton className="h-3.5 w-52 rounded" />
            </div>

            {/* Submit Button */}
            <Skeleton className="h-12 w-full rounded-lg" />

            {/* Footer Help text */}
            <Skeleton className="h-4 w-44 mx-auto rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
