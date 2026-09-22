"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SortDropdown } from "@/components/shared/SortDropdown";
import { formatRupiah, formatCompactNumber } from "@/lib/formatters";
import { TIME_RANGE_OPTIONS, VIEW_MODE_OPTIONS } from "@/data/chartOptions";
import { cn } from "@/lib/utils";

const chartConfig = {
  cumulativeAmount: {
    label: "Total Terkumpul",
    color: "#2563eb",
  },
  dailyAmount: {
    label: "Donasi Harian",
    color: "#10b981",
  },
};

function toDateKey(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function CampaignDonationGrowthChart({
  initialData = [],
  campaign = {},
}) {
  const [timeRange, setTimeRange] = React.useState("30d");
  const [viewMode, setViewMode] = React.useState("all"); // 'all' | 'daily' | 'cumulative'

  // Generate runtun tanggal harian kontinu (tanpa bolong) untuk rentang waktu terpilih
  const chartData = React.useMemo(() => {
    // 1. Map transaksi riil per tanggal
    const transactionMap = new Map();
    if (Array.isArray(initialData)) {
      initialData.forEach((item) => {
        if (item?.date) {
          transactionMap.set(item.date, {
            dailyAmount: Number(item.dailyAmount || 0),
            donationsCount: Number(item.donationsCount || 0),
          });
        }
      });
    }

    // 2. Tentukan rentang tanggal (startDate sampai today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate = new Date(today);

    if (timeRange === "7d") {
      startDate.setDate(today.getDate() - 6);
    } else if (timeRange === "90d") {
      startDate.setDate(today.getDate() - 89);
    } else {
      // Default: '30d'
      startDate.setDate(today.getDate() - 29);
    }

    // 3. Hitung akumulasi dana yang terkumpul SEBELUM startDate
    const startKey = toDateKey(startDate);
    let totalBeforeStart = 0;
    if (Array.isArray(initialData)) {
      initialData.forEach((item) => {
        if (item?.date && item.date < startKey) {
          totalBeforeStart += Number(item.dailyAmount || 0);
        }
      });
    }

    // 4. Generate setiap hari secara sekuensial dari startDate hingga today
    const continuousSeries = [];
    let runningCumulative = totalBeforeStart;
    const cursor = new Date(startDate);

    while (cursor <= today) {
      const dateKey = toDateKey(cursor);
      const tx = transactionMap.get(dateKey);

      const daily = tx ? tx.dailyAmount : 0;
      const count = tx ? tx.donationsCount : 0;
      runningCumulative += daily;

      continuousSeries.push({
        date: dateKey,
        dailyAmount: daily,
        cumulativeAmount: runningCumulative,
        donationsCount: count,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    // Fallback bila DB belum ada transaksi tetapi program sudah memiliki collectedAmount (misal data seed)
    if (
      transactionMap.size === 0 &&
      Number(campaign?.collectedAmount || 0) > 0 &&
      continuousSeries.length > 0
    ) {
      const total = Number(campaign.collectedAmount);
      const totalDonors = Number(campaign.donorCount || 1);
      continuousSeries[continuousSeries.length - 1].cumulativeAmount = total;
      continuousSeries[continuousSeries.length - 1].dailyAmount = total;
      continuousSeries[continuousSeries.length - 1].donationsCount = totalDonors;
    }

    return continuousSeries;
  }, [initialData, campaign, timeRange]);

  // Kalkulasi ringkasan metrik periode terpilih
  const summaryMetrics = React.useMemo(() => {
    const totalPeriod = chartData.reduce((acc, curr) => acc + (curr.dailyAmount || 0), 0);
    const totalTransactions = chartData.reduce((acc, curr) => acc + (curr.donationsCount || 0), 0);
    const avgPerDay = chartData.length > 0 ? Math.round(totalPeriod / chartData.length) : 0;
    const latestCumulative = chartData[chartData.length - 1]?.cumulativeAmount || campaign.collectedAmount || 0;

    return {
      totalPeriod,
      totalTransactions,
      avgPerDay,
      latestCumulative,
    };
  }, [chartData, campaign]);

  const currentChartConfig = React.useMemo(() => {
    if (viewMode === "all") {
      return {
        cumulativeAmount: {
          label: "Total Terkumpul (Kiri)",
          color: "#2563eb",
        },
        dailyAmount: {
          label: "Donasi Harian (Kanan)",
          color: "#10b981",
        },
      };
    }
    if (viewMode === "daily") {
      return {
        dailyAmount: {
          label: "Donasi Harian",
          color: "#10b981",
        },
      };
    }
    return {
      cumulativeAmount: {
        label: "Total Terkumpul",
        color: "#2563eb",
      },
    };
  }, [viewMode]);

  return (
    <div className="space-y-5">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h3 className="text-base sm:text-lg font-semibold text-slate-950">
            Grafik Perkembangan Donasi
          </h3>
          <p className="text-sm sm:text-base text-slate-600">
            Visualisasi akumulasi dana dan tren donasi harian yang terverifikasi sistem.
          </p>
        </div>

        {/* Controls: View Mode Selector + Range Selector */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto flex-wrap">
          <SortDropdown
            options={VIEW_MODE_OPTIONS}
            value={viewMode}
            onChange={setViewMode}
            label="Pilih Tampilan"
            align="end"
            className="h-9 text-xs sm:text-sm w-fit whitespace-nowrap"
          />
          <SortDropdown
            options={TIME_RANGE_OPTIONS}
            value={timeRange}
            onChange={setTimeRange}
            label="Pilih Rentang"
            align="end"
            className="h-9 text-xs sm:text-sm w-fit whitespace-nowrap"
          />
        </div>
      </div>

      {/* KPI Highlight Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border border-x-0 border-slate-200 bg-slate-50/70 text-xs sm:text-sm overflow-hidden">
        <div className="p-3.5 sm:p-4 space-y-0.5">
          <span className="text-slate-600 font-medium">Total Akumulasi</span>
          <p className="text-base sm:text-lg font-semibold text-slate-950">
            {formatRupiah(summaryMetrics.latestCumulative)}
          </p>
        </div>

        <div className="p-3.5 sm:p-4 space-y-0.5">
          <span className="text-slate-600 font-medium">Donasi Periode Ini</span>
          <p className="text-base sm:text-lg font-semibold text-slate-950">
            {formatRupiah(summaryMetrics.totalPeriod || summaryMetrics.latestCumulative)}
          </p>
        </div>

        <div className="p-3.5 sm:p-4 space-y-0.5">
          <span className="text-slate-600 font-medium">Donatur Berpartisipasi</span>
          <p className="text-base sm:text-lg font-semibold text-slate-950">
            {summaryMetrics.totalTransactions || campaign.donorCount || 0} donasi
          </p>
        </div>
      </div>

      {/* Interactive Dual-Axis Area Chart */}
      <div className="pt-2">
        <ChartContainer
          config={currentChartConfig}
          className="aspect-auto h-[260px] sm:h-[300px] w-full outline-none focus:outline-none select-none [&_*]:outline-none [&_*]:focus:outline-none"
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: viewMode === "all" ? -5 : 10,
              left: -15,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillDaily" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={28}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 400 }}
              tickFormatter={(value) => {
                if (!value) return "";
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            {/* Sumbu Y Kiri: Akumulasi Total */}
            {viewMode !== "daily" && (
              <YAxis
                yAxisId="cumulative"
                orientation="left"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 400 }}
                tickFormatter={(value) => formatCompactNumber(value)}
              />
            )}

            {/* Sumbu Y Kanan (atau Kiri jika single mode): Donasi Harian */}
            {viewMode !== "cumulative" && (
              <YAxis
                yAxisId="daily"
                orientation={viewMode === "all" ? "right" : "left"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 400 }}
                tickFormatter={(value) => formatCompactNumber(value)}
              />
            )}

            <ChartTooltip
              cursor={{ stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    if (!value) return "";
                    const date = new Date(value);
                    return date.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                  formatter={(value, name) => {
                    const isCum = name === "cumulativeAmount";
                    const label = isCum ? "Total Terkumpul" : "Donasi Harian";
                    return (
                      <div className="flex items-center justify-between w-full gap-4 text-xs">
                        <span className="text-slate-600">{label}:</span>
                        <span className="font-semibold text-slate-950">
                          {formatRupiah(Number(value))}
                        </span>
                      </div>
                    );
                  }}
                  indicator="dot"
                />
              }
            />

            {/* Area Donasi Harian (Sumbu Y Independen 'daily') */}
            {viewMode !== "cumulative" && (
              <Area
                yAxisId="daily"
                dataKey="dailyAmount"
                type="monotone"
                fill="url(#fillDaily)"
                stroke="#10b981"
                strokeWidth={2}
                name="dailyAmount"
              />
            )}

            {/* Area Total Akumulasi (Sumbu Y Independen 'cumulative') */}
            {viewMode !== "daily" && (
              <Area
                yAxisId="cumulative"
                dataKey="cumulativeAmount"
                type="monotone"
                fill="url(#fillCumulative)"
                stroke="#2563eb"
                strokeWidth={2.5}
                name="cumulativeAmount"
              />
            )}

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
