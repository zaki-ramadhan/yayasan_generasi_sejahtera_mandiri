import Link from "next/link";
import Image from "next/image";

export function CampaignCTA({ campaign }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-700/70 bg-slate-950 text-white p-5 sm:p-6 shadow-md mt-6">
      {/* Atmospheric Background image + radial gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {campaign.bannerUrl && (
          <Image
            src={campaign.bannerUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(29,78,216,0.5)_0%,_rgba(15,23,42,0.75)_55%,_rgba(2,6,23,0.92)_100%)]" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-white text-base sm:text-lg">
            Salurkan Sedekah &amp; Doa Terbaik Anda
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            Satu sedekah tulus Anda menghadirkan senyuman dan harapan bagi saudara yang membutuhkan.
          </p>
        </div>

        <Link
          href={`/campaign/${campaign.slug}/donate`}
          className="relative inline-flex items-center justify-center px-4 sm:px-4.5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm border-t border-white/25 shadow-[0_3.5px_0_0_#1e3a8a] active:shadow-[0_1px_0_0_#1e3a8a] active:translate-y-[2.5px] transition-all cursor-pointer shrink-0 whitespace-nowrap self-start sm:self-auto select-none"
        >
          Ikut Berdonasi Sekarang
        </Link>
      </div>
    </div>
  );
}
