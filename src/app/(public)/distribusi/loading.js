import { Skeleton } from "@/components/ui/skeleton";

export default function DistribusiLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 lg:space-y-10">
      {/* Top Header - Centered */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <Skeleton className="h-8 sm:h-9 w-64 mx-auto rounded-lg" />
        <Skeleton className="h-4 sm:h-5 w-full max-w-2xl mx-auto rounded" />
      </div>

      {/* Grid 2 Kolom: Baris 1 = 2 Laporan Chart */}
      <div className="space-y-8 lg:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-8 sm:pb-10 border-b border-slate-200">
          {/* Section 1: Laporan Keuangan Audit (Donut Chart & Metrics) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="space-y-1">
                <Skeleton className="h-6 w-48 rounded" />
                <Skeleton className="h-4 w-72 max-w-full rounded" />
              </div>
              <Skeleton className="h-4 w-28 rounded" />
            </div>

            {/* Donut Chart Container */}
            <div className="h-64 sm:h-72 w-full rounded-xl bg-slate-100/80 border border-slate-200 flex items-center justify-center p-4">
              <Skeleton className="w-44 h-44 rounded-full" />
            </div>

            {/* 4 Metrics Grid (2 Kolom) */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                  <Skeleton className="h-3.5 w-24 rounded" />
                  <Skeleton className="h-5 w-32 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Dinamika Tren Penyaluran (Area Chart & Metrics) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="space-y-1">
                <Skeleton className="h-6 w-44 rounded" />
                <Skeleton className="h-4 w-64 max-w-full rounded" />
              </div>
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>

            {/* Area Chart Container */}
            <div className="h-64 sm:h-72 w-full rounded-xl bg-slate-100/80 border border-slate-200 flex items-end justify-center p-6 gap-3">
              {[40, 65, 50, 85, 70, 95, 60, 80].map((h, i) => (
                <Skeleton key={i} className="w-full rounded-t-md" style={{ height: `${h}%` }} />
              ))}
            </div>

            {/* 4 Metrics Grid (2 Kolom) */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                  <Skeleton className="h-3.5 w-24 rounded" />
                  <Skeleton className="h-5 w-32 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Section 3 Berada di Tengah Sumbu X (Radar Chart & Metrics) */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="space-y-1">
                <Skeleton className="h-6 w-52 rounded" />
                <Skeleton className="h-4 w-80 max-w-full rounded" />
              </div>
              <Skeleton className="h-4 w-28 rounded" />
            </div>

            {/* Radar Chart Container */}
            <div className="h-64 sm:h-72 w-full rounded-xl bg-slate-100/80 border border-slate-200 flex items-center justify-center p-4">
              <Skeleton className="w-48 h-48 rounded-full" />
            </div>

            {/* 4 Metrics Grid (2 Kolom) */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                  <Skeleton className="h-3.5 w-24 rounded" />
                  <Skeleton className="h-5 w-32 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
