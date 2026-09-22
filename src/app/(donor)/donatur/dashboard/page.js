"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { DonorOverviewDashboard } from "@/components/donor/DonorOverviewDashboard";

export default function DonaturDashboardPage() {
  const { currentUser } = useCurrentUser();

  return <DonorOverviewDashboard currentUser={currentUser} />;
}
