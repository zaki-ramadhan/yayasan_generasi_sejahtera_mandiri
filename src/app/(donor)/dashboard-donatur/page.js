"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { DonorOverviewDashboard } from "@/components/donor/DonorOverviewDashboard";

export default function DashboardDonaturPage() {
  const { currentUser } = useCurrentUser();

  return (
    <div className="space-y-6">
      <DonorOverviewDashboard currentUser={currentUser} />
    </div>
  );
}
