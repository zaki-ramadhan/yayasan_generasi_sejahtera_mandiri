"use client";

import { formatRupiah } from "@/lib/formatters";
import { DonorEmptyText } from "@/components/donor/DonorDashboardPrimitives";

const CATEGORY_THEMES = [
  { text: "text-emerald-800", bg: "bg-slate-50" },
  { text: "text-sky-800", bg: "bg-white" },
  { text: "text-amber-800", bg: "bg-white" },
];

export function DonorTopCategoryCards({ categories = [] }) {
  if (categories.length === 0) {
    return <DonorEmptyText message="Belum ada data" py="py-2" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
      {categories.slice(0, 3).map((cat, idx) => {
        const theme = CATEGORY_THEMES[idx % CATEGORY_THEMES.length];

        return (
          <div
            key={cat.name}
            className={`p-3 rounded-md border border-slate-200/80 flex items-center justify-between ${theme.bg}`}
          >
            <div className="min-w-0 pr-2">
              <span className="text-sm font-medium text-slate-800 block truncate">
                {cat.name}
              </span>
              <span className="text-xs font-normal text-slate-500">
                {formatRupiah(cat.value)}
              </span>
            </div>
            <span className={`text-sm font-medium shrink-0 ${theme.text}`}>
              {cat.percentage}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
