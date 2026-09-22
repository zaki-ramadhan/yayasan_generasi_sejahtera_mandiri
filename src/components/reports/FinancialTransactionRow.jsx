import { formatRupiah, formatDate } from "@/lib/formatters";

/**
 * Single table row for financial transactions.
 * Strictly adheres to font size >= text-sm and font weight <= font-medium.
 * Avoids gimmick dots and pill-shape spam.
 *
 * @param {object} props
 * @param {object} props.transaction - Transaction data object
 */
export function FinancialTransactionRow({ transaction }) {
  const isIncome = transaction.type === "INCOME" || transaction.amount > 0;
  const absAmount = Math.abs(transaction.amount);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
      {/* Date */}
      <td className="py-3.5 px-4 text-sm font-medium text-slate-800 whitespace-nowrap">
        {formatDate(transaction.date, { month: "short" })}
      </td>

      {/* Source */}
      <td className="py-3.5 px-4 text-sm font-normal text-slate-600 whitespace-nowrap">
        {transaction.source}
      </td>

      {/* Type */}
      <td className="py-3.5 px-4 text-sm font-normal text-slate-700 whitespace-nowrap">
        {transaction.typeLabel || (isIncome ? "Donasi Masuk" : "Penyaluran")}
      </td>

      {/* Description */}
      <td className="py-3.5 px-4 text-sm font-normal text-slate-800 max-w-xs truncate" title={transaction.description}>
        {transaction.description}
      </td>

      {/* Category */}
      <td className="py-3.5 px-4 text-sm font-normal text-slate-600 whitespace-nowrap">
        {transaction.category}
      </td>

      {/* Amount */}
      <td className="py-3.5 px-4 text-sm font-medium whitespace-nowrap text-right">
        <span className={isIncome ? "text-emerald-700" : "text-slate-900"}>
          {isIncome ? `+${formatRupiah(absAmount)}` : `-${formatRupiah(absAmount)}`}
        </span>
      </td>

      {/* Status */}
      <td className="py-3.5 px-4 text-sm whitespace-nowrap text-right">
        <span
          className={
            isIncome
              ? "inline-block px-2.5 py-0.5 rounded-md text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200"
              : "inline-block px-2.5 py-0.5 rounded-md text-sm font-medium text-slate-800 bg-slate-100 border border-slate-200"
          }
        >
          {transaction.statusLabel || (isIncome ? "Diterima" : "Tersalurkan")}
        </span>
      </td>
    </tr>
  );
}
