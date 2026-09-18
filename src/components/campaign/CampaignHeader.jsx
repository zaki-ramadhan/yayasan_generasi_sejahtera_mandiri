import Link from "next/link";
import { MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatRupiah } from "@/lib/formatters";

export function CampaignHeader({ campaign, progress }) {
  return (
    <div className="space-y-3">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-950 leading-tight">
        {campaign.title}
      </h1>

      {/* Category & Location Metadata */}
      <div className="flex items-center gap-2.5 text-sm sm:text-base text-slate-800 flex-wrap pt-0.5">
        <span className="font-semibold text-slate-950">{campaign.categoryName}</span>
        {campaign.location && (
          <>
            <span className="text-slate-400">/</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-500 shrink-0" />
              <span>{campaign.location}</span>
            </span>
          </>
        )}
      </div>

      {/* Mobile-only Progress summary */}
      <div className="lg:hidden space-y-3 pt-3 border-t border-slate-200">
        <Progress value={progress} className="h-2.5" />
        <div className="flex justify-between items-baseline text-sm sm:text-base">
          <div>
            <span className="text-sm text-slate-700 block">Dana Terkumpul</span>
            <span className="text-lg sm:text-xl font-semibold text-primary">
              {formatRupiah(campaign.collectedAmount)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm text-slate-700 block">Target ({progress}%)</span>
            <span className="text-slate-900 font-medium text-sm sm:text-base">
              {formatRupiah(campaign.targetAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
