import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutPillars() {
  return (
    <section className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-950">
          4 Pilar Program Utama
        </h2>
        <Link href="/program" className="group text-sm sm:text-base font-medium text-primary hover:underline flex items-center gap-1">
          Lihat Katalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ORG_PROFILE.corePillars.map((pillar, idx) => {
          if (idx === 1) {
            return (
              <div
                key={pillar.id}
                className="p-4 sm:p-5 rounded-lg border border-blue-900/60 bg-[radial-gradient(ellipse_at_bottom_right,_#1e40af_0%,_#1e3a8a_50%,_#090e1a_100%)] text-white space-y-2 shadow-xs"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-white/95 leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="pt-1 text-xs sm:text-sm font-medium text-blue-100">
                  Jangkauan: {pillar.beneficiaries}
                </div>
              </div>
            );
          }

          if (idx === 2) {
            return (
              <div
                key={pillar.id}
                className="p-4 sm:p-5 rounded-lg border border-slate-700/60 bg-[radial-gradient(ellipse_at_bottom_right,_#475569_0%,_#1e293b_55%,_#020617_100%)] text-white space-y-2 shadow-xs"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="pt-1 text-xs sm:text-sm font-medium text-slate-200">
                  Jangkauan: {pillar.beneficiaries}
                </div>
              </div>
            );
          }

          return (
            <div
              key={pillar.id}
              className="p-4 sm:p-5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-950">
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {pillar.desc}
              </p>
              <div className="pt-1 text-xs sm:text-sm font-medium text-slate-700">
                Jangkauan: {pillar.beneficiaries}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
