"use client";

import { TransactionLimitTableRow } from "./TransactionLimitTableRow";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableSortHeader,
  TableEmptyRow,
  useTableSort,
} from "@/components/ui/table";

/**
 * Reusable table component for displaying transaction limits.
 *
 * Adheres strictly to:
 * - Minimum font size: text-sm (no text-xs anywhere)
 * - Maximum font weight: font-medium in tbody
 * - Responsive table container with horizontal scroll (overflow-x-auto)
 *
 * @param {object} props
 * @param {string} props.title - Table section title (e.g. Virtual Account (VA))
 * @param {string} [props.description] - Subtitle / explanatory text
 * @param {Array<object>} props.items - Array of channel limit records
 */
export function TransactionLimitTable({ title, description, items = [] }) {
  const {
    items: sortedItems,
    sortBy,
    sortOrder,
    handleSort,
  } = useTableSort(items, {
    initialSortBy: "",
    initialSortOrder: "asc",
  });

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortHeader
              label="Saluran Pembayaran"
              sortKey="name"
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
              onSort={handleSort}
              className="w-1/2"
            />
            <TableSortHeader
              label="Batas Minimum"
              sortKey="minAmount"
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
              onSort={handleSort}
              className="w-1/4"
            />
            <TableSortHeader
              label="Batas Maksimum"
              sortKey="maxAmount"
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
              onSort={handleSort}
              className="w-1/4"
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems && sortedItems.length > 0 ? (
            sortedItems.map((item) => (
              <TransactionLimitTableRow
                key={item.id}
                item={item}
              />
            ))
          ) : (
            <TableEmptyRow colSpan={3} message="Belum ada data" />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
