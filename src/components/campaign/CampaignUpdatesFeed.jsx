import { Calendar } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/formatters";

export function CampaignUpdatesFeed({ updates = [] }) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm sm:text-base">
        Belum ada laporan penyaluran untuk program ini.
      </div>
    );
  }

  return (
    <div className="max-h-[580px] sm:max-h-[620px] overflow-y-auto pr-2 focus:outline-none">
      <div className="divide-y divide-slate-200">
        {updates.map((upd) => (
          <div key={upd.id} className="py-5 first:pt-0 last:pb-0 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{formatDate(upd.date)}</span>
              </span>
              {upd.disbursedAmount ? (
                <span className="text-slate-600">
                  Tersalurkan:{" "}
                  <span className="font-semibold text-emerald-700">
                    {formatRupiah(upd.disbursedAmount)}
                  </span>
                </span>
              ) : null}
            </div>
            <h4 className="font-semibold text-slate-950 text-base sm:text-lg">
              {upd.title}
            </h4>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
              {upd.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
