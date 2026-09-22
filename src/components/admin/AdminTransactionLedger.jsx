"use client";

import { useState, useMemo } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortDropdown } from "@/components/shared/SortDropdown";
import { Pagination } from "@/components/ui/pagination";
import { formatRupiah } from "@/lib/formatters";
import { exportTransactionsToCsv } from "@/lib/exportCsv";
import { FinancialMetricCard } from "@/components/reports/FinancialMetricCard";
import { FinancialTransactionRow } from "@/components/reports/FinancialTransactionRow";

const PERIOD_OPTIONS = [
  { label: "7 Hari Terakhir", value: "7d" },
  { label: "30 Hari Terakhir", value: "30d" },
  { label: "1 Tahun Terakhir", value: "1y" },
];

const TYPE_OPTIONS = [
  { label: "Semua Transaksi", value: "ALL" },
  { label: "Donasi Masuk", value: "INCOME" },
  { label: "Penyaluran Program", value: "EXPENSE" },
];

const PAGE_SIZE = 10;

/**
 * Admin Transaction Ledger Component.
 * Preserved for admin dashboard with filtering, metric cards, paginated table, and CSV export.
 */
export function AdminTransactionLedger({
  transactions = [],
  nextDistributionDate = "25 Sep 2026",
}) {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedType, setSelectedType] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const referenceTime = transactions[0]?.date
      ? Math.max(new Date().getTime(), new Date(transactions[0].date).getTime())
      : new Date().getTime();

    let cutoffDays = 30;
    if (selectedPeriod === "7d") cutoffDays = 7;
    if (selectedPeriod === "30d") cutoffDays = 30;
    if (selectedPeriod === "1y") cutoffDays = 365;

    const cutoffTime = referenceTime - cutoffDays * 24 * 60 * 60 * 1000;

    return transactions.filter((tx) => {
      const txTime = new Date(tx.date).getTime();
      const matchesPeriod = txTime >= cutoffTime;

      const matchesType =
        selectedType === "ALL" ||
        (selectedType === "INCOME" && (tx.type === "INCOME" || tx.amount > 0)) ||
        (selectedType === "EXPENSE" && (tx.type === "EXPENSE" || tx.amount < 0));

      return matchesPeriod && matchesType;
    });
  }, [transactions, selectedPeriod, selectedType]);

  const metrics = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    filteredTransactions.forEach((tx) => {
      if (tx.type === "INCOME" || tx.amount > 0) {
        totalIncome += Math.abs(tx.amount);
      } else {
        totalExpenses += Math.abs(tx.amount);
      }
    });

    const netBalance = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netBalance,
    };
  }, [filteredTransactions]);

  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE) || 1;
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredTransactions.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredTransactions, currentPage]);

  const handlePeriodChange = (val) => {
    setSelectedPeriod(val);
    setCurrentPage(1);
  };

  const handleTypeChange = (val) => {
    setSelectedType(val);
    setCurrentPage(1);
  };

  const handleExportCsv = () => {
    exportTransactionsToCsv(
      filteredTransactions,
      `laporan-transaksi-admin-${selectedPeriod}-${selectedType.toLowerCase()}.csv`
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Header & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-950 tracking-tight leading-tight">
            Buku Kas &amp; Riwayat Transaksi (Admin)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Kelola mutasi arus kas donasi masuk, pencatatan penyaluran, dan pembukuan yayasan.
          </p>
        </div>

        {/* Filters Dropdown Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <SortDropdown
            options={PERIOD_OPTIONS}
            value={selectedPeriod}
            onChange={handlePeriodChange}
            label="Periode"
            className="h-10 px-3.5 text-sm font-normal border-slate-300 text-slate-800"
            align="end"
          />
          <SortDropdown
            options={TYPE_OPTIONS}
            value={selectedType}
            onChange={handleTypeChange}
            label="Kategori"
            className="h-10 px-3.5 text-sm font-normal border-slate-300 text-slate-800"
            align="end"
          />
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinancialMetricCard
          label="Total Donasi Masuk"
          value={formatRupiah(metrics.totalIncome)}
          subtext="Periode aktif terpilih"
        />
        <FinancialMetricCard
          label="Total Penyaluran"
          value={formatRupiah(metrics.totalExpenses)}
          subtext="Distribusi program amanah"
        />
        <FinancialMetricCard
          label="Saldo Kas Terkini"
          value={formatRupiah(metrics.netBalance)}
          subtext="Sisa dana amanah"
        />
        <FinancialMetricCard
          label="Penyaluran Mendatang"
          value={nextDistributionDate}
          subtext="Jadwal distribusi terdekat"
        />
      </div>

      {/* Transactions Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-950">
              Riwayat Transaksi
            </h3>
            <p className="text-sm font-normal text-slate-600">
              Menampilkan {paginatedTransactions.length} dari {filteredTransactions.length} transaksi
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            disabled={filteredTransactions.length === 0}
            className="h-10 px-3.5 text-sm font-medium border-slate-300 text-slate-800 hover:bg-slate-50 gap-2 rounded-lg cursor-pointer self-start sm:self-auto shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-600 shrink-0" />
            <span>Export CSV</span>
          </Button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-2xs">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 text-sm font-medium text-slate-700">Tanggal</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-700">Sumber</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-700">Tipe</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-700">Deskripsi</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-700">Kategori</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-700 text-right">Nominal</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-700 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <FinancialTransactionRow key={tx.id} transaction={tx} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm font-normal text-slate-500">
                    Tidak ada catatan transaksi pada periode dan filter yang dipilih.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="pt-2"
          />
        )}
      </div>
    </div>
  );
}
