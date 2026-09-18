import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutVisionMission() {
  return (
    <section className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-950 border-b border-slate-200 pb-2.5">
        Visi &amp; Misi
      </h2>

      {/* Visi */}
      <div className="p-4 bg-slate-50 border-l-4 border-slate-300 rounded-r-lg space-y-1">
        <span className="text-xs sm:text-sm font-semibold text-primary">
          Visi
        </span>
        <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
          &quot;{ORG_PROFILE.vision}&quot;
        </p>
      </div>

      {/* Misi */}
      <div className="space-y-2.5 pt-1">
        <span className="text-xs sm:text-sm font-semibold text-primary">
          Misi
        </span>
        <ol className="space-y-2.5 list-decimal list-inside text-sm sm:text-base text-slate-800">
          {ORG_PROFILE.missions.map((m, idx) => (
            <li key={idx} className="leading-relaxed pl-1">
              <span className="font-normal">{m}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
