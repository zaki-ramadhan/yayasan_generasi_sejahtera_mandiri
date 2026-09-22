import { cn } from "@/lib/utils";

/**
 * Reusable Chart Legend Grid for Donut and Pie charts.
 * Clean swatches, text-sm min, no dot separators, no bold.
 *
 * @param {object} props
 * @param {Array<{label: string, color: string, value?: string, percentage?: number}>} props.items
 * @param {string} [props.className]
 */
export function ChartLegendGrid({ items = [], className = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 text-sm",
        className
      )}
    >
      {items.map((item, idx) => (
        <div key={`${item.label}-${idx}`} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-xs shrink-0"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span className="font-medium text-slate-700">{item.label}</span>
          {item.percentage !== undefined && (
            <span className="text-slate-500 font-normal">
              ({item.percentage}%)
            </span>
          )}
          {item.value && (
            <span className="font-semibold text-slate-950">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
