"use client";

import { useState } from "react";
import { DistributionSectionHeader } from "./DistributionSectionHeader";
import { DistributionYearFilter } from "./DistributionYearFilter";
import { DistributionAreaChart } from "./DistributionAreaChart";
import { DistributionStatGrid } from "./DistributionStatGrid";
import { DISTRIBUTION_YEAR_OPTIONS } from "@/data/distributionData";
import { formatRupiah, formatNumber } from "@/lib/formatters";

/**
 * Organism component: Section 2 - Laporan Distribusi
 * Visual area chart with year filter in header and horizontal key metrics bar below.
 * @param {object} props
 * @param {Record<string, Array>} props.trendData
 */
export function DistributionTrendSection({ trendData = {} }) {
  const [selectedYear, setSelectedYear] = useState(DISTRIBUTION_YEAR_OPTIONS[0]);

  const activeSeries = trendData[selectedYear] || trendData[DISTRIBUTION_YEAR_OPTIONS[0]] || [];

  const totalPeriodAmount = activeSeries.reduce((acc, item) => acc + (item.amount || 0), 0);
  const totalPeriodBeneficiaries = activeSeries.reduce(
    (acc, item) => acc + (item.beneficiaries || 0),
    0
  );
  const avgMonthlyAmount =
    activeSeries.length > 0 ? Math.round(totalPeriodAmount / activeSeries.length) : 0;

  const peakItem = activeSeries.reduce(
    (max, item) => ((item.amount || 0) > (max.amount || 0) ? item : max),
    activeSeries[0] || { month: "-", fullMonth: "-", amount: 0 }
  );

  const metrics = [
    { label: "Akumulasi Penyaluran", value: formatRupiah(totalPeriodAmount) },
    {
      label: "Total Penerima Manfaat",
      value: `${formatNumber(totalPeriodBeneficiaries)} Jiwa`,
    },
    {
      label: "Rata-rata Bulanan",
      value: `${formatRupiah(avgMonthlyAmount)} / bln`,
    },
    {
      label: `Puncak Distribusi (${selectedYear})`,
      value: `${peakItem.month} (${formatRupiah(peakItem.amount)})`,
      title: `${peakItem.fullMonth || peakItem.month} (${formatRupiah(peakItem.amount)})`,
    },
  ];

  return (
    <section className="space-y-4">
      <DistributionSectionHeader
        title="Laporan Distribusi"
        description="Grafik realisasi penyaluran dana donasi dan jumlah penerima manfaat per bulan."
        action={
          <DistributionYearFilter
            selectedYear={selectedYear}
            options={DISTRIBUTION_YEAR_OPTIONS}
            onYearChange={setSelectedYear}
          />
        }
      />

      <div className="w-full">
        <DistributionAreaChart data={activeSeries} />
      </div>

      <DistributionStatGrid items={metrics} cols="grid-cols-2" />
    </section>
  );
}
