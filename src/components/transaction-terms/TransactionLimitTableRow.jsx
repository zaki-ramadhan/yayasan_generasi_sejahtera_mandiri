import Image from "next/image";
import { formatRupiah } from "@/lib/formatters";
import { cn } from "@/lib/utils";

/**
 * Single row for the transaction limits table.
 *
 * Adheres strictly to:
 * - Minimum font size: text-sm (no text-xs)
 * - Maximum font weight in data cells: font-medium (no font-semibold or font-bold in tbody)
 * - Official channel logo thumbnail (like in footer)
 * - Natural kerning without artificial tracking
 *
 * @param {object} props
 * @param {object} props.item - Transaction limit channel record
 * @param {boolean} [props.isLast] - Whether this is the final row
 */
export function TransactionLimitTableRow({ item, isLast = false }) {
  return (
    <tr
      className={cn(
        "border-slate-200 transition-colors hover:bg-slate-50/60",
        !isLast && "border-b"
      )}
    >
      {/* Saluran Pembayaran (Logo + Nama & Platform) */}
      <td className="py-3.5 sm:py-4 px-4 sm:px-6 align-middle">
        <div className="flex items-center gap-3">
          {item.logo && (
            <div className="w-14 sm:w-16 h-8 sm:h-9 flex items-center justify-center shrink-0">
              <Image
                src={item.logo}
                alt={item.name}
                width={48}
                height={24}
                className="max-h-6 w-auto max-w-full object-contain select-none pointer-events-none"
                unoptimized
              />
            </div>
          )}
          <div className="space-y-0.5 min-w-0">
            <span className="text-sm font-medium text-slate-900 block truncate">
              {item.name}
            </span>
            {item.description && (
              <span className="text-sm font-normal text-slate-500 block leading-relaxed truncate">
                {item.description}
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Batas Minimum */}
      <td className="py-3.5 sm:py-4 px-4 sm:px-6 align-middle">
        <span className="text-sm font-normal text-slate-700 block">
          {formatRupiah(item.minAmount)}
        </span>
      </td>

      {/* Batas Maksimum */}
      <td className="py-3.5 sm:py-4 px-4 sm:px-6 align-middle">
        <span className="text-sm font-medium text-slate-900 block">
          {formatRupiah(item.maxAmount)}
        </span>
      </td>
    </tr>
  );
}
