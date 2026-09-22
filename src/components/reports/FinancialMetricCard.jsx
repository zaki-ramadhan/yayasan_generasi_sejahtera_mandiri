import { cn } from "@/lib/utils";

/**
 * Reusable metric card for financial ledger summaries.
 * Strictly adheres to font size >= text-sm and font weight <= font-medium.
 *
 * @param {object} props
 * @param {string} props.label - Metric title (e.g. Total Donasi Masuk)
 * @param {string} props.value - Formatted currency or date value
 * @param {string} [props.subtext] - Optional context text
 * @param {string} [props.className] - Optional extra class
 */
export function FinancialMetricCard({ label, value, subtext, className }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-1.5",
        className
      )}
    >
      <p className="text-sm font-normal text-slate-600">
        {label}
      </p>
      <p className="text-xl sm:text-2xl font-semibold text-slate-950 tracking-tight">
        {value}
      </p>
      {subtext && (
        <p className="text-sm font-normal text-slate-500">
          {subtext}
        </p>
      )}
    </div>
  );
}
