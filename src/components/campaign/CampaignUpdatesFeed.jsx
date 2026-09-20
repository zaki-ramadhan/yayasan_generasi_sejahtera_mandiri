import { Calendar } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { SafeImage } from "@/components/ui/safe-image";

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
        {updates.map((upd) => {
          let photos = [];
          if (Array.isArray(upd.images)) {
            photos = upd.images.filter(Boolean);
          } else if (typeof upd.images === "string" && upd.images.trim()) {
            try {
              const parsed = JSON.parse(upd.images);
              photos = Array.isArray(parsed) ? parsed.filter(Boolean) : [upd.images];
            } catch {
              photos = [upd.images];
            }
          } else if (upd.image) {
            photos = [upd.image];
          }

          return (
            <div key={upd.id} className="py-5 first:pt-0 last:pb-0 space-y-2.5">
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

              <div className="space-y-1">
                <h4 className="font-semibold text-slate-950 text-base sm:text-lg leading-snug">
                  {upd.title}
                </h4>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  {upd.content}
                </p>
              </div>

              {/* Dokumentasi Foto Penyaluran (Ukuran terkalibrasi: 3 foto berdampingan = 3/4 lebar parent) */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5 mt-2">
                  {photos.map((imgUrl, idx) => (
                    <a
                      key={idx}
                      href={imgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Lihat foto dokumentasi"
                      className={`block relative w-full aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100 hover:opacity-90 transition-opacity ${
                        photos.length === 1 ? "col-span-2 sm:col-span-1" : ""
                      }`}
                    >
                      <SafeImage
                        src={imgUrl}
                        alt={`Dokumentasi ${upd.title} ${idx + 1}`}
                        fallbackText="Dokumentasi"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
