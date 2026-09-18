import { getVolunteerCount } from "@/services/volunteerService";
import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutVisionMission } from "@/components/about/AboutVisionMission";
import { AboutPillars } from "@/components/about/AboutPillars";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutBankAccounts } from "@/components/about/AboutBankAccounts";
import { AboutSidebarInfo } from "@/components/about/AboutSidebarInfo";

export const metadata = {
  title: "Tentang Kami",
  description: "Profil lengkap, struktur dewan pengurus, legalitas resmi, dan visi misi Yayasan Generasi Sejahtera Mandiri (YGSM).",
};

export default async function TentangKamiPage() {
  const volunteerCount = await getVolunteerCount();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4">
      {/* 1. Profile Header with Real Team Count */}
      <AboutHeader volunteerCount={volunteerCount} />

      {/* 2. Editorial 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
        {/* Main Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <AboutStory />
          <AboutVisionMission />
          <AboutPillars />
          <AboutLeadership />
          <AboutBankAccounts />
        </div>

        {/* Sidebar Column (4 Cols): Unified Sidebar Card */}
        <aside className="lg:col-span-4 sticky top-20">
          <AboutSidebarInfo />
        </aside>
      </div>
    </main>
  );
}
