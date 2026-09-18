import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatters";

export function CampaignStickyMobileBar({ campaign }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-300 p-3.5 shadow-lg flex items-center justify-between gap-4">
      <div>
        <span className="text-sm text-slate-700 block">Dana Terkumpul</span>
        <span className="font-semibold text-base sm:text-lg text-primary">
          {formatRupiah(campaign.collectedAmount)}
        </span>
      </div>

      <Link href={`/campaign/${campaign.slug}/donate`} className="flex-1 max-w-xs">
        <Button className="w-full font-medium h-11">
          Donasi Sekarang
        </Button>
      </Link>
    </div>
  );
}
