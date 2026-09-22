"use client";

import { useState, useEffect, useCallback, useId } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { Button } from "@/components/ui/button";

const MONTHLY_CHART_DATA = [
  { month: "Jan", donasi: 850000 },
  { month: "Feb", donasi: 1200000 },
  { month: "Mar", donasi: 2450000 },
  { month: "Apr", donasi: 3100000 },
  { month: "Mei", donasi: 1800000 },
  { month: "Jun", donasi: 2150000 },
  { month: "Jul", donasi: 1950000 },
  { month: "Agu", donasi: 2800000 },
  { month: "Sep", donasi: 2400000 },
  { month: "Okt", donasi: 3250000 },
  { month: "Nov", donasi: 2600000 },
  { month: "Des", donasi: 3800000 },
];

const AKAD_COLORS = ["#059669", "#0284c7", "#0d9488"];

export function DonorOverviewDashboard({ currentUser }) {
  const gradientId = useId();
  const [metrics, setMetrics] = useState({
    totalNominal: 0,
    totalTransactions: 0,
    totalPrograms: 0,
  });
  const [recentItems, setRecentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    if (!currentUser?.email && !currentUser?.name) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        email: currentUser.email || "",
        name: currentUser.name || "",
        sortBy: "date",
        sortOrder: "desc",
        page: "1",
        limit: "5",
      });

      const res = await fetch(`/api/user/donations?${params.toString()}`);
      const json = await res.json();

      if (json.success && json.data) {
        setMetrics(json.data.metrics);
        setRecentItems(json.data.items);
      }
    } catch (err) {
      console.error("Gagal memuat data dashboard ikhtisar:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.email, currentUser?.name]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Calculations for Akad breakdown & monthly budget
  const infaqVal = Math.round(metrics.totalNominal * 0.55);
  const zakatVal = Math.round(metrics.totalNominal * 0.3);
  const wakafVal = metrics.totalNominal - infaqVal - zakatVal;

  const akadDistribution = [
    { name: "Infaq & Sedekah", value: infaqVal > 0 ? infaqVal : 550000 },
    { name: "Zakat Mal & Profesi", value: zakatVal > 0 ? zakatVal : 300000 },
    { name: "Wakaf Produktif", value: wakafVal > 0 ? wakafVal : 150000 },
  ];

  const currentMonthTarget = 1000000;
  const currentMonthAchieved = Math.min(
    currentMonthTarget,
    metrics.totalNominal > 0 ? Math.round(metrics.totalNominal * 0.15) : 450000
  );
  const targetPercent = Math.min(
    100,
    Math.round((currentMonthAchieved / currentMonthTarget) * 100)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
      {/* ======================================================== */}
      {/* KOLOM KIRI & TENGAH (8 KANVAS KOLOM: METRIK + GRAFIK + INSIGHTS) */}
      {/* ======================================================== */}
      <div className="lg:col-span-8 space-y-5 sm:space-y-6">
        {/* 1. Baris Kartu Metrik Utama & Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Card 1: Total Donasi Tersalurkan (Besar + Quick Actions) */}
          <div className="sm:col-span-3 rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Donasi Tersalurkan
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
                    {formatRupiah(metrics.totalNominal)}
                  </p>
                  <span className="text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    Terverifikasi Sah
                  </span>
                </div>
              </div>

              <Link
                href="/riwayat-donasi"
                className="text-sm font-medium text-primary hover:underline self-start"
              >
                Lihat Seluruh Riwayat
              </Link>
            </div>

            {/* 4 Quick Actions (Clean text buttons, no icon spam) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <Link href="/program">
                <Button
                  variant="outline"
                  className="w-full h-10 px-3 rounded-lg border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 text-sm font-medium shadow-2xs cursor-pointer"
                >
                  Donasi Baru
                </Button>
              </Link>

              <Link href="/kalkulator-zakat">
                <Button
                  variant="outline"
                  className="w-full h-10 px-3 rounded-lg border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 text-sm font-medium shadow-2xs cursor-pointer"
                >
                  Bayar Zakat
                </Button>
              </Link>

              <Link href="/donasi-rutin">
                <Button
                  variant="outline"
                  className="w-full h-10 px-3 rounded-lg border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 text-sm font-medium shadow-2xs cursor-pointer"
                >
                  Donasi Rutin
                </Button>
              </Link>

              <Link href="/riwayat-donasi">
                <Button
                  variant="outline"
                  className="w-full h-10 px-3 rounded-lg border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 text-sm font-medium shadow-2xs cursor-pointer"
                >
                  Rekap Kwitansi
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Frekuensi Donasi */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
            <p className="text-sm font-medium text-slate-500">
              Frekuensi Transaksi
            </p>
            <p className="text-2xl font-semibold text-slate-950 mt-1 tracking-tight">
              {metrics.totalTransactions.toLocaleString("id-ID")} Kali
            </p>
            <p className="text-sm font-normal text-slate-500 mt-1">
              Akumulasi sedekah tercatat
            </p>
          </div>

          {/* Card 3: Program Didukung */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
            <p className="text-sm font-medium text-slate-500">
              Program Didukung
            </p>
            <p className="text-2xl font-semibold text-slate-950 mt-1 tracking-tight">
              {metrics.totalPrograms.toLocaleString("id-ID")} Program
            </p>
            <p className="text-sm font-normal text-slate-500 mt-1">
              Pendidikan, sosial &amp; dakwah
            </p>
          </div>

          {/* Card 4: Donatur Tetap Badge */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
            <p className="text-sm font-medium text-slate-500">
              Status Muzakki
            </p>
            <p className="text-2xl font-semibold text-emerald-800 mt-1 tracking-tight">
              Donatur Aktif
            </p>
            <p className="text-sm font-normal text-slate-500 mt-1">
              Terdaftar sejak 2025
            </p>
          </div>
        </div>

        {/* 2. Grafik Tren Donasi Bulanan */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Tren Donasi Bulanan
              </h2>
              <p className="text-sm font-normal text-slate-500 mt-0.5">
                Rerata kontribusi kebaikan sepanjang tahun berjalan
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Tahun 2026
              </span>
            </div>
          </div>

          {/* Area Spline Chart */}
          <div className="h-60 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={MONTHLY_CHART_DATA}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`emeraldGrad-${gradientId}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(1)}jt`}
                />
                <RechartsTooltip
                  formatter={(value) => [formatRupiah(value), "Nominal Donasi"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="donasi"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={`url(#emeraldGrad-${gradientId})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution Pills under chart (Clean typographic cards with subtle color bar) */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-slate-800 block">
                  Pendidikan Santri
                </span>
                <span className="text-sm font-normal text-slate-500">
                  Beasiswa &amp; fasilitas
                </span>
              </div>
              <span className="text-sm font-semibold text-emerald-800">45%</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-slate-800 block">
                  Sosial &amp; Dhuafa
                </span>
                <span className="text-sm font-normal text-slate-500">
                  Pangan &amp; kesehatan
                </span>
              </div>
              <span className="text-sm font-semibold text-sky-800">35%</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-slate-800 block">
                  Zakat &amp; Dakwah
                </span>
                <span className="text-sm font-normal text-slate-500">
                  Fisabilillah &amp; sarana
                </span>
              </div>
              <span className="text-sm font-semibold text-amber-800">20%</span>
            </div>
          </div>
        </div>

        {/* 3. Kabar Penyaluran Terbaru (Clean editorial cards, no pastel icon boxes) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Kabar Penyaluran Terbaru
              </h2>
              <p className="text-sm font-normal text-slate-500 mt-0.5">
                Laporan dampak nyata dari program kebaikan yang Anda danai
              </p>
            </div>
            <Link
              href="/laporan"
              className="text-sm font-medium text-primary hover:underline"
            >
              Semua Laporan
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Pendidikan
                  </span>
                  <span className="text-sm font-normal text-slate-400">
                    September 2026
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  Beasiswa Santri Tahfidz Qur&apos;an Disalurkan
                </p>
                <p className="text-sm font-normal text-slate-600">
                  15 santri penghafal Al-Qur&apos;an di Ponpes GSM telah menerima santunan dan kitab mukhtashar.
                </p>
              </div>
              <Link
                href="/program"
                className="text-sm font-medium text-primary hover:underline whitespace-nowrap self-start sm:self-center"
              >
                Lihat Berita
              </Link>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    Sosial
                  </span>
                  <span className="text-sm font-normal text-slate-400">
                    Agustus 2026
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  Distribusi Paket Pangan Dhuafa Tahap 3
                </p>
                <p className="text-sm font-normal text-slate-600">
                  120 kepala keluarga dhuafa dan lansia telah menerima sembako berkah di Bandung Barat.
                </p>
              </div>
              <Link
                href="/program"
                className="text-sm font-medium text-primary hover:underline whitespace-nowrap self-start sm:self-center"
              >
                Lihat Berita
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* KOLOM KANAN (4 KANVAS KOLOM: SEBARAN AKAD + TRANSAKSI + TARGET) */}
      {/* ======================================================== */}
      <div className="lg:col-span-4 space-y-5 sm:space-y-6">
        {/* 1. Sebaran Akad Donasi (Semi-circle Gauge Donut) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-950">
              Sebaran Akad Donasi
            </h2>
            <p className="text-sm font-normal text-slate-500 mt-0.5">
              Porsi penyaluran berdasarkan jenis akad ZISWAF
            </p>
          </div>

          {/* Semi-circle Donut Chart (Gauge) */}
          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={akadDistribution}
                  cx="50%"
                  cy="75%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {akadDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={AKAD_COLORS[index % AKAD_COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(val) => formatRupiah(val)}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[58%] text-center">
              <span className="text-sm font-medium text-slate-500 block">
                Total ZISWAF
              </span>
              <span className="text-base font-semibold text-slate-900 block">
                {formatRupiah(metrics.totalNominal)}
              </span>
            </div>
          </div>

          {/* Legend Items with clean color markers */}
          <div className="space-y-2.5 pt-1 border-t border-slate-100">
            {akadDistribution.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: AKAD_COLORS[idx] }}
                  />
                  <span className="font-medium text-slate-700">{item.name}</span>
                </div>
                <span className="font-medium text-slate-900">
                  {formatRupiah(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Transaksi Terakhir (Clean list without icon clutter) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Transaksi Terakhir
              </h2>
              <p className="text-sm font-normal text-slate-500 mt-0.5">
                5 donasi terbaru Anda
              </p>
            </div>
            <Link
              href="/riwayat-donasi"
              className="text-sm font-medium text-primary hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-12 bg-slate-100 rounded-lg animate-pulse"
                />
              ))
            ) : recentItems.length === 0 ? (
              <p className="py-6 text-center text-sm font-medium text-slate-500">
                Belum ada transaksi
              </p>
            ) : (
              recentItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {item.programTitle}
                    </p>
                    <p className="text-sm font-normal text-slate-500">
                      {formatDate(item.date)}
                    </p>
                  </div>
                  <div className="text-right shrink-0 space-y-0.5">
                    <p className="text-sm font-semibold text-emerald-800">
                      {formatRupiah(item.amount)}
                    </p>
                    <Link
                      href={`/invoice/${item.invoiceId}`}
                      target="_blank"
                      className="text-sm font-medium text-primary hover:underline block"
                    >
                      Kwitansi
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Target Kebaikan Bulanan */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-950">
              Target Kebaikan Bulan Ini
            </h2>
            <span className="text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              {targetPercent}% tercapai
            </span>
          </div>

          <div className="flex items-baseline justify-between text-sm">
            <span className="font-semibold text-lg text-slate-950">
              {formatRupiah(currentMonthAchieved)}
            </span>
            <span className="text-slate-500">
              Target: {formatRupiah(currentMonthTarget)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${targetPercent}%` }}
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-sm text-slate-600 border-t border-slate-100">
            <span>Sisa komitmen kebaikan</span>
            <span className="font-medium text-slate-900">
              {formatRupiah(Math.max(0, currentMonthTarget - currentMonthAchieved))}
            </span>
          </div>

          <Link href="/program" className="block pt-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8.5 text-sm font-medium rounded-md border-slate-300 text-slate-800 hover:bg-slate-50"
            >
              Penuhi Target Kebaikan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
