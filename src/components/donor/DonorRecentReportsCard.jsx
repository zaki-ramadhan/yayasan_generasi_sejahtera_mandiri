"use client";

import {
  DonorCard,
  DonorListSkeleton,
  DonorEmptyText,
} from "@/components/donor/DonorDashboardPrimitives";
import { DonorReportItem } from "@/components/donor/DonorReportItem";

export function DonorRecentReportsCard({ recentReports = [], isLoading = false }) {
  return (
    <DonorCard
      title="Kabar Penyaluran Terbaru"
      actionText={recentReports.length > 0 ? "Semua Laporan" : undefined}
      actionHref="/laporan"
    >
      <div className="space-y-3">
        {isLoading ? (
          <DonorListSkeleton count={2} height="h-20" />
        ) : recentReports.length === 0 ? (
          <DonorEmptyText message="Belum ada kabar penyaluran dari program yang Anda dukung" />
        ) : (
          recentReports.map((rep) => (
            <DonorReportItem key={rep.id} report={rep} />
          ))
        )}
      </div>
    </DonorCard>
  );
}
