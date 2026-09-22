"use client";

import { useState } from "react";
import { CampaignHeader } from "./CampaignHeader";
import { CampaignDetailTabs } from "./CampaignDetailTabs";
import { CampaignCTA } from "./CampaignCTA";
import { useCampaignDetailTour } from "@/hooks/useCampaignDetailTour";

/**
 * Client wrapper for campaign detail left column.
 * Manages controlled tab state and tour auto-start lifecycle.
 *
 * @param {object} props
 * @param {object} props.campaign
 * @param {number} props.progress
 * @param {object} props.donationStats
 * @param {number} props.prayersCount
 * @param {boolean} props.hasDonations
 */
export function CampaignDetailWrapper({
  campaign,
  progress,
  donationStats,
  prayersCount,
  hasDonations,
}) {
  const [activeTab, setActiveTab] = useState("detail");

  // Auto-start tour on first visit (global key). Manual trigger is in SidebarTourButton.
  useCampaignDetailTour({ slug: campaign.slug, hasDonations });

  return (
    <div className="lg:col-span-8 space-y-4">
      <div id="tour-campaign-header">
        <CampaignHeader campaign={campaign} progress={progress} />
      </div>

      <CampaignDetailTabs
        campaign={campaign}
        donationStats={donationStats}
        prayersCount={prayersCount}
        hasDonations={hasDonations}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <CampaignCTA campaign={campaign} />
    </div>
  );
}
