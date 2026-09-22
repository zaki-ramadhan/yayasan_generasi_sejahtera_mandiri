"use client";

import { FinancialMetricCard } from "./FinancialMetricCard";
import { TopProgramsRankingCard } from "./TopProgramsRankingCard";
import { formatRupiah } from "@/lib/formatters";

/**
 * Public Financial Transparency Dashboard.
 * Replaces old static table with modern analytical overview based on reference.
 *
 * Constraints applied:
 * - Font weight: semibold for numbers/dates, medium/normal for labels
 * - Min text size: text-sm (no text-xs)
 * - Proportional rounded-lg/xl/md (no rounded-full)
 * - No dot separators or badge clutter
 */
export function FinancialLedgerDashboard({
  transactions = [],
  campaigns = [],
  grandTotals = {
    totalIncome: 12500000000,
    totalExpenses: 11000000000,
    netBalance: 1500000000,
  },
  nextDistributionDate = "25 Sep 2026",
}) {
  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="space-y-1.5 border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
          Dashboard Transparansi Keuangan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-normal">
          Ringkasan laporan keseluruhan donasi masuk, penyaluran program amanah, dan saldo kas yayasan.
        </p>
      </div>

      {/* Section 1: Grand Total Keseluruhan */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 rounded-xs bg-primary" />
          <h2 className="text-lg sm:text-xl font-semibold text-slate-950 tracking-tight">
            Grand Total Keseluruhan
          </h2>
        </div>

        {/* 4 Summary Metric Cards (Bersebelahan 4 Kolom ke Samping) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FinancialMetricCard
            label="Total Penghimpunan"
            value={formatRupiah(grandTotals.totalIncome)}
            subtext="Total dana donasi diterima"
          />
          <FinancialMetricCard
            label="Total Penyaluran"
            value={formatRupiah(grandTotals.totalExpenses)}
            subtext="Dana tersalurkan ke program"
          />
          <FinancialMetricCard
            label="Saldo Kas Terkini"
            value={formatRupiah(grandTotals.netBalance)}
            subtext="Sisa kas amanah siap salur"
          />
          <FinancialMetricCard
            label="Penyaluran Mendatang"
            value={nextDistributionDate}
            subtext="Jadwal distribusi terdekat"
          />
        </div>

        {/* Top 5 Program Ranking Card (Di Bawah 4 Card) */}
        <TopProgramsRankingCard
          campaigns={campaigns}
          transactions={transactions}
        />
      </section>
    </div>
  );
}
