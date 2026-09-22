import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutVisionMission() {
  return (
    <section className="p-4 sm:p-5 space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-950">
        Visi &amp; Misi
      </h2>

      {/* Visi */}
      <div className="p-3.5 sm:p-4 bg-slate-50 border-l-4 border-primary rounded-r-md space-y-1.5">
        <span className="text-xs sm:text-sm font-medium text-primary block">
          Visi
        </span>
        <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
          &quot;{ORG_PROFILE.vision}&quot;
        </p>
      </div>

      {/* Misi */}
      <div className="space-y-3 pt-1">
        <span className="text-xs sm:text-sm font-medium text-primary block">
          Misi
        </span>
        <ol className="space-y-2.5 list-decimal list-outside pl-5 text-sm sm:text-base text-slate-800">
          {ORG_PROFILE.missions.map((m, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="font-normal">{m}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

