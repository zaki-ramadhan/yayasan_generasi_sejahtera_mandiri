import { CampaignUpdateItem } from "@/components/campaign/CampaignUpdateItem";

export function CampaignUpdatesFeed({ updates = [] }) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm sm:text-base">
        Belum ada data
      </div>
    );
  }

  return (
    <div className="max-h-[580px] sm:max-h-[620px] overflow-y-auto pr-2 focus:outline-none">
      <div className="divide-y divide-slate-200">
        {updates.map((upd) => (
          <CampaignUpdateItem key={upd.id} update={upd} />
        ))}
      </div>
    </div>
  );
}
