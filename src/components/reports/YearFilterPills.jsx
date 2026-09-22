import { cn } from "@/lib/utils";

/**
 * Reusable Year Filter Pills for analytical report sections.
 *
 * @param {object} props
 * @param {Array<{id: string, label: string}>} [props.years] - List of year filter options
 * @param {string} props.activeYear - Currently active year ID ('all' | '2026' | '2025')
 * @param {(yearId: string) => void} props.onSelectYear - Selection callback
 * @param {string} [props.className] - Optional wrapper class
 */
export function YearFilterPills({
  years = [
    { id: "all", label: "Semua Tahun" },
    { id: "2026", label: "Tahun 2026" },
    { id: "2025", label: "Tahun 2025" },
  ],
  activeYear = "all",
  onSelectYear,
  className = "",
}) {
  return (
    <div
      className={cn(
        "inline-flex p-1 bg-slate-100 rounded-md border border-slate-200 gap-1 overflow-x-auto max-w-full",
        className
      )}
      role="tablist"
      aria-label="Filter Tahun Laporan"
    >
      {years.map((year) => {
        const isActive = activeYear === year.id;
        return (
          <button
            key={year.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectYear?.(year.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer select-none",
              isActive
                ? "bg-primary text-white shadow-xs"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-200/60"
            )}
          >
            {year.label}
          </button>
        );
      })}
    </div>
  );
}
