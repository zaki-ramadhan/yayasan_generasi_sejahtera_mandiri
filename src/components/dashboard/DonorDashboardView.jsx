"use client";

import Link from "next/link";
import { Plus, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { RECENT_TRANSACTIONS, DONOR_ROUTINE_SCHEDULES } from "@/data/adminMockData";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableSortHeader,
  TableEmptyRow,
  useTableSort,
} from "@/components/ui/table";

export function DonorDashboardView() {
  const paidTransactions = RECENT_TRANSACTIONS.filter((t) => t.status === "PAID");

  const {
    items: sortedTransactions,
    sortBy,
    sortOrder,
    handleSort,
  } = useTableSort(paidTransactions, {
    initialSortBy: "date",
    initialSortOrder: "desc",
  });

  return (
    <div className="space-y-6">
      {/* Active Recurring Schedules */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-950">Jadwal Donasi Rutin Anda</h2>
            <p className="text-xs text-slate-500">Pengingat berkala untuk menjaga keistiqamahan sedekah.</p>
          </div>
          <Link href="/donasi-rutin">
            <Button size="sm" className="h-8 text-xs bg-primary hover:bg-primary-hover text-white cursor-pointer">
              <Plus className="w-3.5 h-3.5 mr-1" /> Tambah Jadwal Baru
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {DONOR_ROUTINE_SCHEDULES.map((sch) => (
            <div key={sch.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-900 block">{sch.program}</span>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span>Jadwal: <strong>{sch.freq}</strong></span>
                  <span>Jadwal Berikutnya: <strong className="text-primary">{sch.nextDate}</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-base font-bold text-slate-950">{formatRupiah(sch.nominal)}</span>
                <button
                  type="button"
                  onClick={() => toast.success("Jadwal pengingat telah diperbarui.")}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium underline cursor-pointer"
                >
                  Kelola
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation History and e-Receipts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-950">Riwayat Transaksi &amp; Bukti Setor Zakat Resmi</h2>
            <p className="text-xs text-slate-500">Unduh e-Kwitansi dengan QR Code sah untuk lampiran pajak.</p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200/90 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableSortHeader
                  label="No. Kwitansi"
                  sortKey="id"
                  currentSortBy={sortBy}
                  currentSortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableSortHeader
                  label="Tanggal"
                  sortKey="date"
                  currentSortBy={sortBy}
                  currentSortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableSortHeader
                  label="Program / Akad"
                  sortKey="program"
                  currentSortBy={sortBy}
                  currentSortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableSortHeader
                  label="Nominal"
                  sortKey="amount"
                  currentSortBy={sortBy}
                  currentSortOrder={sortOrder}
                  onSort={handleSort}
                  align="right"
                />
                <TableSortHeader
                  label="Metode"
                  sortKey="channel"
                  currentSortBy={sortBy}
                  currentSortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableHead className="text-center font-medium text-slate-900 w-32">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length === 0 ? (
                <TableEmptyRow colSpan={6} message="Belum ada data" />
              ) : (
                sortedTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-slate-900 font-medium">{tx.id}</TableCell>
                    <TableCell className="text-slate-600 font-normal whitespace-nowrap">{formatDate(tx.date)}</TableCell>
                    <TableCell className="font-normal text-slate-800">{tx.program}</TableCell>
                    <TableCell className="font-medium text-emerald-800 text-right">{formatRupiah(tx.amount)}</TableCell>
                    <TableCell className="text-slate-600 font-normal">{tx.channel}</TableCell>
                    <TableCell className="text-center">
                      <button
                        type="button"
                        onClick={() => toast.success(`Mengunduh e-Kwitansi ${tx.id}...`)}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> e-Kwitansi
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
