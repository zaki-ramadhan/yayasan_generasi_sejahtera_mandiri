import { notFound } from "next/navigation";
import Link from "next/link";
import { getCampaignBySlug, getCampaignDonationStats } from "@/services/campaignService";
import { calculateProgress, calculateDaysLeft } from "@/lib/formatters";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CampaignPrayersFeed } from "@/components/modules/CampaignPrayersFeed";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { CampaignMedia } from "@/components/campaign/CampaignMedia";
import { CampaignStory } from "@/components/campaign/CampaignStory";
import { CampaignUpdatesFeed } from "@/components/campaign/CampaignUpdatesFeed";
import { CampaignCTA } from "@/components/campaign/CampaignCTA";
import { CampaignSidebarDonate } from "@/components/campaign/CampaignSidebarDonate";
import { CampaignStickyMobileBar } from "@/components/campaign/CampaignStickyMobileBar";
import { CampaignDonationGrowthChart } from "@/components/campaign/CampaignDonationGrowthChart";
import { CampaignTransactionsList } from "@/components/campaign/CampaignTransactionsList";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);
  if (!campaign) return { title: "Program Tidak Ditemukan" };
  return {
    title: campaign.title,
    description: campaign.excerpt,
  };
}

export default async function CampaignDetailPage({ params }) {
  const { slug } = await params;
  const [campaign, donationStats] = await Promise.all([
    getCampaignBySlug(slug),
    getCampaignDonationStats(slug),
  ]);

  if (!campaign) {
    notFound();
  }

  const progress = calculateProgress(campaign.collectedAmount, campaign.targetAmount);
  const daysLeft = calculateDaysLeft(campaign.endDate);
  const prayersCount = (campaign.recentDonors || []).filter(
    (d) => Boolean(d.prayer && d.prayer.trim())
  ).length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 pb-24 lg:pb-12">
      {/* Breadcrumb */}
      <nav className="text-sm sm:text-base text-slate-800 flex items-center gap-2 flex-wrap font-normal">
        <Link href="/" className="hover:text-primary hover:underline transition-colors">Beranda</Link>
        <span className="text-slate-400">/</span>
        <Link href="/program" className="hover:text-primary hover:underline transition-colors">Program</Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-950 font-medium truncate max-w-sm sm:max-w-md">{campaign.title}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Media, Header, Tabs, CTA */}
        <div className="lg:col-span-8 space-y-8">
          <CampaignMedia bannerUrl={campaign.bannerUrl} title={campaign.title} />
          <CampaignHeader campaign={campaign} progress={progress} />

          {/* Tabs: Seamless Editorial Layout */}
          <Tabs defaultValue="detail" className="w-full">
            <TabsList className="w-full justify-start border-b border-slate-300 pb-0 rounded-none bg-transparent h-auto p-0 gap-6 overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="detail"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-semibold pb-3 px-1 text-sm sm:text-base text-slate-700 hover:text-slate-950 transition-colors shrink-0"
              >
                Detail Program
              </TabsTrigger>
              <TabsTrigger
                value="penyaluran"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-semibold pb-3 px-1 text-sm sm:text-base text-slate-700 hover:text-slate-950 transition-colors shrink-0"
              >
                Laporan Penyaluran ({campaign.updates?.length || 0})
              </TabsTrigger>
              <TabsTrigger
                value="doa"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-semibold pb-3 px-1 text-sm sm:text-base text-slate-700 hover:text-slate-950 transition-colors shrink-0"
              >
                Doa &amp; Dukungan ({prayersCount})
              </TabsTrigger>
              <TabsTrigger
                value="riwayat"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-semibold pb-3 px-1 text-sm sm:text-base text-slate-700 hover:text-slate-950 transition-colors shrink-0"
              >
                Riwayat Donasi ({campaign.donorCount || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detail" className="mt-4 focus:outline-none">
              <CampaignStory story={campaign.story} />
            </TabsContent>

            <TabsContent value="penyaluran" className="mt-4 focus:outline-none">
              <CampaignUpdatesFeed updates={campaign.updates} />
            </TabsContent>

            <TabsContent value="doa" className="mt-4 focus:outline-none">
              <CampaignPrayersFeed
                initialDonors={campaign.recentDonors || []}
                campaignSlug={campaign.slug}
                campaignTitle={campaign.title}
              />
            </TabsContent>

            <TabsContent value="riwayat" className="mt-4 focus:outline-none space-y-6">
              <CampaignDonationGrowthChart
                initialData={donationStats}
                campaign={campaign}
              />
              <CampaignTransactionsList
                donors={campaign.recentDonors || []}
                totalDonorsCount={campaign.donorCount || 0}
                campaignSlug={campaign.slug}
              />
            </TabsContent>
          </Tabs>

          <CampaignCTA campaign={campaign} />
        </div>

        {/* Right Column: Sticky Donation Panel */}
        <CampaignSidebarDonate
          campaign={campaign}
          progress={progress}
          daysLeft={daysLeft}
        />
      </div>

      {/* Mobile Fixed Bottom Donation Bar */}
      <CampaignStickyMobileBar campaign={campaign} />
    </main>
  );
}
