import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import { formatRupiah, calculateProgress, calculateDaysLeft } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SafeImage } from "@/components/ui/safe-image";
import { RibbonBadge } from "@/components/ui/ribbon-badge";
import { HighlightText } from "@/components/shared/HighlightText";
import { cn } from "@/lib/utils";

export function CampaignCard({ campaign, highlightQuery = "", className }) {
  const progress = calculateProgress(campaign.collectedAmount, campaign.targetAmount);
  const daysLeft = calculateDaysLeft(campaign.endDate);
  const totalDonors = campaign.donorCount || 0;

  return (
    <div className={cn("flex flex-col h-full w-full rounded-xl border border-slate-300 bg-white hover:border-slate-400 transition-colors overflow-hidden", className)}>
      {/* Visual Header / Thumbnail with SafeImage & Category RibbonBadge */}
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-200">
        <SafeImage
          src={campaign.bannerUrl}
          alt={campaign.title}
          fallbackText={campaign.categoryName || "Program Donasi"}
        />
        {campaign.categoryName && (
          <div className="absolute top-2.5 left-0 z-10 drop-shadow-xs">
            <RibbonBadge variant="primary" size="card">
              {campaign.categoryName}
            </RibbonBadge>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 space-y-2.5">
        {/* Title (Uniform 2-line height) */}
        <h3 className="text-base sm:text-lg font-semibold text-slate-950 leading-snug line-clamp-2 min-h-[2.6rem] flex items-start">
          <HighlightText text={campaign.title} highlight={highlightQuery} />
        </h3>

        {/* Location */}
        {campaign.location && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 min-w-0 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{campaign.location}</span>
          </div>
        )}

        {/* Excerpt */}
        {campaign.excerpt && (
          <p className="text-sm sm:text-base text-slate-700 line-clamp-2 leading-relaxed">
            {campaign.excerpt}
          </p>
        )}

        {/* Progress Bar & Amounts */}
        <div className="space-y-1.5 pt-1 mt-auto">
          <Progress value={progress} className="h-2" />

          <div className="flex justify-between items-baseline text-sm">
            <div>
              <span className="text-xs sm:text-sm text-slate-600 font-medium block">Terkumpul</span>
              <span className="font-bold text-slate-950 text-base sm:text-lg">
                {formatRupiah(campaign.collectedAmount)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs sm:text-sm text-slate-600 font-medium block">Target ({progress}%)</span>
              <span className="text-slate-900 font-semibold text-sm sm:text-base">
                {formatRupiah(campaign.targetAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Meta: Donor Count with Users Icon & CTA */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-1.5 min-w-0">
            <Users className="w-4 h-4 text-slate-600 shrink-0" />
            <span className="text-sm text-slate-800 font-medium truncate">
              <strong className="text-slate-950 font-bold">{totalDonors}</strong> donasi
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5 shrink-0">
              <Clock className="w-4 h-4 text-slate-700 shrink-0 stroke-[2]" />
              <span>{daysLeft > 0 ? `${daysLeft} hr` : "Selesai"}</span>
            </span>
            <Link href={`/campaign/${campaign.slug}/donate`}>
              <Button
                size="sm"
                className="h-8.5 px-4 rounded-md text-sm font-semibold bg-primary hover:bg-primary-hover text-white shadow-none cursor-pointer"
              >
                Donasi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
