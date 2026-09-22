import { TransactionLimitTableRow } from "./TransactionLimitTableRow";

/**
 * Reusable table component for displaying transaction limits.
 *
 * Adheres strictly to:
 * - Minimum font size: text-sm (no text-xs anywhere)
 * - Maximum font weight: font-semibold (no font-bold)
 * - No tracking-wider / artificial letter spacing on columns
 * - Responsive table container with horizontal scroll (overflow-x-auto)
 *
 * @param {object} props
 * @param {string} props.title - Table section title (e.g. Virtual Account (VA))
 * @param {string} [props.description] - Subtitle / explanatory text
 * @param {Array<object>} props.items - Array of channel limit records
 */
export function TransactionLimitTable({ title, description, items = [] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-2xs overflow-hidden">
      {/* Table Header Bar */}
      <div className="p-4 sm:p-5 sm:py-3 border-b border-slate-200 bg-slate-50/60">
        <h2 className="text-base sm:text-lg font-semibold text-slate-950">
          {title}
        </h2>
        {description && (
          <p className="text-sm font-normal text-slate-600 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[540px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-slate-700 w-1/2">
              </th>
              <th className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-slate-700 w-1/4">
                Batas Minimum
              </th>
              <th className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-slate-700 w-1/4">
                Batas Maksimum
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.map((item, index) => (
              <TransactionLimitTableRow
                key={item.id}
                item={item}
                isLast={index === items.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
