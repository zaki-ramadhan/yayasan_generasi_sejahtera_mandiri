"use client";

import { formatRupiah } from "@/lib/formatters";
import { DonorEmptyText } from "@/components/donor/DonorDashboardPrimitives";

export function DonorCategoryLegend({ categories = [], colors = [] }) {
  if (categories.length === 0) {
    return <DonorEmptyText message="Belum ada data" py="py-2" />;
  }

  return (
    <div className="space-y-2.5 pt-1 border-t border-slate-100">
      {categories.map((item, idx) => (
        <div
          key={item.name}
          className="flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: colors[idx % colors.length],
              }}
            />
            <span className="font-medium text-slate-700 truncate">
              {item.name}
            </span>
          </div>
          <span className="font-medium text-slate-900 shrink-0">
            {formatRupiah(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
