"use client";

import Link from "next/link";
import { formatRupiah } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import {
  DonorCard,
  DonorListItem,
  DonorListSkeleton,
  DonorEmptyText,
} from "@/components/donor/DonorDashboardPrimitives";

export function DonorRoutineDonationsCard({
  routineDonations = [],
  isLoading = false,
}) {
  return (
    <DonorCard
      title="Donasi Rutin Tersimpan"
      actionText={routineDonations.length > 0 ? "Kelola" : undefined}
      actionHref="/donasi-rutin"
    >
      <div className="space-y-2.5">
        {isLoading ? (
          <DonorListSkeleton count={2} height="h-12" />
        ) : routineDonations.length === 0 ? (
          <DonorEmptyText message="Belum ada data" />
        ) : (
          routineDonations.map((item) => (
            <DonorListItem key={item.id}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {item.frequency === "DAILY"
                      ? "Harian"
                      : item.frequency === "WEEKLY"
                      ? "Pekanan"
                      : "Bulanan"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {item.status === "ACTIVE" ? "Aktif" : "Dijeda"}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900 truncate">
                  {item.programTitle}
                </p>
              </div>
              <div className="text-right shrink-0 space-y-0.5">
                <p className="text-sm font-medium text-emerald-800">
                  {formatRupiah(item.amount)}
                </p>
                <span className="text-xs text-slate-500 block">
                  {item.routineType === "AUTO_DONATION"
                    ? "Auto-Invoice"
                    : "Pengingat WA"}
                </span>
              </div>
            </DonorListItem>
          ))
        )}
      </div>

      <Link href="/donasi-rutin" className="block pt-1">
        <Button
          variant="outline"
          size="sm"
          className="w-full h-8.5 text-sm font-medium rounded-md border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 cursor-pointer"
        >
          Atur Donasi Rutin Baru
        </Button>
      </Link>
    </DonorCard>
  );
}
