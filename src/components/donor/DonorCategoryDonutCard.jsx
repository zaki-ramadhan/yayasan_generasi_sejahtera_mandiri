"use client";

import { useMemo } from "react";
import { DonorCard } from "@/components/donor/DonorDashboardPrimitives";
import { DonorGaugeChartCanvas } from "@/components/donor/DonorGaugeChartCanvas";
import { DonorCategoryLegend } from "@/components/donor/DonorCategoryLegend";

const CATEGORY_COLORS = [
  "#059669", // emerald
  "#0284c7", // sky
  "#d97706", // amber
  "#7c3aed", // violet
  "#0d9488", // teal
  "#e11d48", // rose
];

export function DonorCategoryDonutCard({
  categoryDistribution = [],
  totalNominal = 0,
}) {
  const displayCategoryData = useMemo(() => {
    if (categoryDistribution.length === 0) {
      return [{ name: "Belum Ada Donasi", value: 1, isPlaceholder: true }];
    }
    return categoryDistribution;
  }, [categoryDistribution]);

  return (
    <DonorCard title="Kategori Donasi">
      <DonorGaugeChartCanvas
        data={displayCategoryData}
        totalNominal={totalNominal}
        colors={CATEGORY_COLORS}
      />
      <DonorCategoryLegend
        categories={categoryDistribution}
        colors={CATEGORY_COLORS}
      />
    </DonorCard>
  );
}
