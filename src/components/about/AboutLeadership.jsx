import Image from "next/image";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutLeadership() {
  return (
    <section className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-950">
        Dewan Pengurus &amp; Pengawas Syariah
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 pt-1">
        {ORG_PROFILE.leadership.map((leader) => (
          <div key={leader.name} className="flex items-start gap-3.5 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 shadow-2xs">
              <Image
                src={leader.image}
                alt={leader.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <h3
                  className="text-sm sm:text-base font-semibold text-slate-950 leading-snug truncate"
                  title={leader.name}
                >
                  {leader.name}
                </h3>
                <BadgeCheck
                  className="w-4 h-4 text-white fill-primary shrink-0"
                  title="Profil Pengurus Terverifikasi"
                />
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
                <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                <span
                  className="text-xs sm:text-sm font-medium text-slate-700 truncate"
                  title={leader.role}
                >
                  {leader.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {leader.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
