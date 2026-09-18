import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatters";
import { CampaignPrayersSidebar } from "@/components/modules/CampaignPrayersSidebar";

export function CampaignSidebarDonate({ campaign, progress, daysLeft }) {
  return (
    <div className="lg:col-span-4 hidden lg:block sticky top-24 space-y-4">
      <div className="p-6 sm:p-7 bg-white rounded-xl border border-slate-300 space-y-6 shadow-xs">
        <div className="space-y-2.5">
          <span className="text-sm sm:text-base text-slate-700 block font-normal">Dana Terkumpul</span>
          <div className="text-3xl font-semibold text-slate-950 tracking-tight">
            {formatRupiah(campaign.collectedAmount)}
          </div>
          <div className="text-sm sm:text-base text-slate-700 flex justify-between items-center pt-1">
            <span>Target: <strong className="font-medium text-slate-900">{formatRupiah(campaign.targetAmount)}</strong></span>
            <span className="font-semibold text-slate-900">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* 2-Column Metrics with clean vertical divider */}
        <div className="grid grid-cols-2 divide-x divide-slate-200 py-3.5 border-y border-slate-200 text-center">
          <div className="pr-3">
            <span className="block font-bold text-slate-950 text-xl sm:text-2xl">{campaign.donorCount}</span>
            <span className="text-sm text-slate-700">Orang Baik</span>
          </div>
          <div className="pl-3">
            <span className="block font-bold text-slate-950 text-xl sm:text-2xl">
              {daysLeft > 0 ? daysLeft : 0}
            </span>
            <span className="text-sm text-slate-700">Hari Tersisa</span>
          </div>
        </div>

        <Link href={`/campaign/${campaign.slug}/donate`} className="block">
          <Button size="lg" className="w-full text-base font-semibold h-12 shadow-xs rounded-lg bg-primary hover:bg-primary-hover text-white cursor-pointer">
            Donasi Sekarang
          </Button>
        </Link>

        <div className="text-sm text-slate-700 text-center flex items-center justify-center gap-1.5 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Pembayaran aman &amp; terverifikasi otomatis</span>
        </div>
      </div>

      {/* 3-5 Titipan Doa Terbaru / Terpopuler Sidebar Widget */}
      <CampaignPrayersSidebar
        initialDonors={campaign.recentDonors || []}
        campaignSlug={campaign.slug}
      />
    </div>
  );
}
