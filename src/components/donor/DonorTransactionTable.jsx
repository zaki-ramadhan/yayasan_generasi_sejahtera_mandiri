"use client";

import Link from "next/link";
import {
  Search,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function DonorTransactionTable({
  items = [],
  pagination = { total: 0, totalPages: 1, currentPage: 1, limit: 25 },
  search = "",
  sortBy = "date",
  sortOrder = "desc",
  isLoading = false,
  onSearchChange,
  onSortChange,
  onPageChange,
  onLimitChange,
}) {
  const handleSortToggle = (columnKey) => {
    if (sortBy === columnKey) {
      onSortChange(columnKey, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(columnKey, "desc");
    }
  };

  const renderSortIcon = (columnKey) => {
    if (sortBy !== columnKey) {
      return <ChevronsUpDown className="w-4 h-4 text-slate-400 shrink-0" />;
    }
    if (sortOrder === "asc") {
      return <ChevronUp className="w-4 h-4 text-primary shrink-0" />;
    }
    return <ChevronDown className="w-4 h-4 text-primary shrink-0" />;
  };

  const fromRecord =
    pagination.total === 0
      ? 0
      : (pagination.currentPage - 1) * pagination.limit + 1;
  const toRecord = Math.min(
    pagination.currentPage * pagination.limit,
    pagination.total
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-2xs overflow-hidden">
      {/* Table Header Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Daftar Riwayat Transaksi
          </h2>
          <p className="text-sm font-normal text-slate-500 mt-0.5">
            Rincian seluruh donasi, sedekah, dan zakat yang tercatat
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Cari program, invoice, metode..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9 text-sm rounded-md border-slate-200 focus:border-primary"
            />
          </div>

          {/* Rows Per Page Selector */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-sm font-medium text-slate-600">Baris:</span>
            <Select
              value={String(pagination.limit)}
              onValueChange={(val) => onLimitChange(Number(val))}
            >
              <SelectTrigger className="w-20 h-9 text-sm rounded-md border-slate-200">
                <SelectValue placeholder="25" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700">
              <th className="py-3 px-3 sm:px-4 font-medium w-14 text-center">
                No.
              </th>
              <th className="py-3 px-3 sm:px-4 font-medium">
                <button
                  type="button"
                  onClick={() => handleSortToggle("name")}
                  className="flex items-center gap-1.5 hover:text-slate-950 cursor-pointer text-left"
                >
                  <span>Atas Nama</span>
                  {renderSortIcon("name")}
                </button>
              </th>
              <th className="py-3 px-3 sm:px-4 font-medium text-right">
                <button
                  type="button"
                  onClick={() => handleSortToggle("nominal")}
                  className="inline-flex items-center gap-1.5 hover:text-slate-950 cursor-pointer ml-auto"
                >
                  <span>Nominal</span>
                  {renderSortIcon("nominal")}
                </button>
              </th>
              <th className="py-3 px-3 sm:px-4 font-medium">
                <button
                  type="button"
                  onClick={() => handleSortToggle("program")}
                  className="flex items-center gap-1.5 hover:text-slate-950 cursor-pointer text-left"
                >
                  <span>Program / Akad</span>
                  {renderSortIcon("program")}
                </button>
              </th>
              <th className="py-3 px-3 sm:px-4 font-medium">
                <button
                  type="button"
                  onClick={() => handleSortToggle("payment")}
                  className="flex items-center gap-1.5 hover:text-slate-950 cursor-pointer text-left"
                >
                  <span>Metode</span>
                  {renderSortIcon("payment")}
                </button>
              </th>
              <th className="py-3 px-3 sm:px-4 font-medium">
                <button
                  type="button"
                  onClick={() => handleSortToggle("date")}
                  className="flex items-center gap-1.5 hover:text-slate-950 cursor-pointer text-left"
                >
                  <span>Tanggal</span>
                  {renderSortIcon("date")}
                </button>
              </th>
              <th className="py-3 px-3 sm:px-4 font-medium text-center w-28">
                Kwitansi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 px-3 sm:px-4 text-center">
                    <div className="h-4 bg-slate-200 rounded-sm w-6 mx-auto" />
                  </td>
                  <td className="py-4 px-3 sm:px-4">
                    <div className="h-4 bg-slate-200 rounded-sm w-28" />
                  </td>
                  <td className="py-4 px-3 sm:px-4 text-right">
                    <div className="h-4 bg-slate-200 rounded-sm w-24 ml-auto" />
                  </td>
                  <td className="py-4 px-3 sm:px-4">
                    <div className="h-4 bg-slate-200 rounded-sm w-44" />
                  </td>
                  <td className="py-4 px-3 sm:px-4">
                    <div className="h-4 bg-slate-200 rounded-sm w-20" />
                  </td>
                  <td className="py-4 px-3 sm:px-4">
                    <div className="h-4 bg-slate-200 rounded-sm w-24" />
                  </td>
                  <td className="py-4 px-3 sm:px-4 text-center">
                    <div className="h-8 bg-slate-200 rounded-md w-20 mx-auto" />
                  </td>
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-14 text-center text-sm font-medium text-slate-500"
                >
                  Belum ada data
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3.5 px-3 sm:px-4 text-center text-slate-500 font-normal">
                    {item.no}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 font-medium text-slate-900">
                    {item.donorName}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-right font-medium text-emerald-800">
                    {formatRupiah(item.amount)}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 font-medium text-slate-800 max-w-xs">
                    {item.campaignSlug ? (
                      <Link
                        href={`/program/${item.campaignSlug}`}
                        className="hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.programTitle}
                      </Link>
                    ) : (
                      <span className="line-clamp-1">{item.programTitle}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 font-normal text-slate-700">
                    {item.paymentChannel.replace("_", " ")}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 font-normal text-slate-600 whitespace-nowrap">
                    {formatDate(item.date)}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-center whitespace-nowrap">
                    <Link
                      href={`/invoice/${item.invoiceId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 rounded-md text-sm font-medium border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400"
                      >
                        Kwitansi
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
        <div>
          Menampilkan{" "}
          <span className="font-medium text-slate-900">{fromRecord}</span> -{" "}
          <span className="font-medium text-slate-900">{toRecord}</span> dari{" "}
          <span className="font-medium text-slate-900">{pagination.total}</span>{" "}
          data
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            disabled={pagination.currentPage <= 1 || isLoading}
            onClick={() => onPageChange(pagination.currentPage - 1)}
            className="h-8 px-2.5 rounded-md border-slate-200 text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Sebelumnya</span>
          </Button>

          <span className="px-2 text-sm font-medium text-slate-800">
            Halaman {pagination.currentPage} / {Math.max(1, pagination.totalPages)}
          </span>

          <Button
            size="sm"
            variant="outline"
            disabled={
              pagination.currentPage >= pagination.totalPages || isLoading
            }
            onClick={() => onPageChange(pagination.currentPage + 1)}
            className="h-8 px-2.5 rounded-md border-slate-200 text-sm font-medium"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
