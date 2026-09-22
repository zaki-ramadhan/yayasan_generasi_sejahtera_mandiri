import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/shared/CampaignCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { isCampaignClosed } from "@/lib/formatters";

/**
 * Featured campaigns showcase on home page
 * @param {object} props
 * @param {Array} props.campaigns
 * @param {number} props.totalCount
 */
export function HomeFeaturedPrograms({ campaigns = [], totalCount = 0 }) {
  const activeCampaigns = campaigns.filter((c) => !isCampaignClosed(c));

  if (activeCampaigns.length === 0) return null;

  return (
    <section className="bg-slate-100/80 border-y border-slate-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          title="Program Donasi Pilihan"
          subtitle="Salurkan kepedulian Anda untuk program pendidikan, kemanusiaan, dan pemberdayaan umat."
          align="center"
        />

        <div className="flex flex-wrap justify-center gap-2">
          {activeCampaigns.map((camp, index) => (
            <div
              key={camp.id}
              className="w-full sm:w-[calc(50%-4px)] lg:w-[calc((100%-16px)/3)] flex"
            >
              <CampaignCard campaign={camp} showDescription={false} priority={index === 0} />
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link href="/program">
            <Button
              variant="outline"
              className="h-10 px-6 text-sm font-medium border-slate-300 text-slate-900 bg-white hover:bg-slate-50 shadow-xs"
            >
              Lihat Seluruh Program ({totalCount})
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
