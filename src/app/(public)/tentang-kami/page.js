"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutVisionMission } from "@/components/about/AboutVisionMission";
import { AboutPillars } from "@/components/about/AboutPillars";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutBankAccounts } from "@/components/about/AboutBankAccounts";
import { AboutSidebarInfo } from "@/components/about/AboutSidebarInfo";

export default function TentangKamiPage() {
  const [copiedProfile, setCopiedProfile] = useState(false);

  const handleShareProfile = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedProfile(true);
    toast.success("Tautan profil yayasan berhasil disalin.");
    setTimeout(() => setCopiedProfile(false), 2500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6">
      {/* 1. Profile Header */}
      <AboutHeader
        copiedProfile={copiedProfile}
        onShareProfile={handleShareProfile}
      />

      {/* 2. Editorial 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <AboutStory />
          <AboutVisionMission />
          <AboutPillars />
          <AboutLeadership />
          <AboutBankAccounts />
        </div>

        {/* Sidebar Column (4 Cols): Unified Sidebar Card */}
        <aside className="lg:col-span-4 sticky top-24">
          <AboutSidebarInfo />
        </aside>
      </div>
    </main>
  );
}
