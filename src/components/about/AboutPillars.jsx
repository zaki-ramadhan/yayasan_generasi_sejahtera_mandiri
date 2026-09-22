import { ORG_PROFILE } from "@/data/orgProfile";
import { PillarCard } from "./PillarCard";

const PILLAR_VARIANTS = ["default", "blue", "slate", "default"];

export function AboutPillars() {
  return (
    <section className="p-4 sm:p-5 space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-950">
          4 Pilar Program Utama
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ORG_PROFILE.corePillars.map((pillar, idx) => (
          <PillarCard
            key={pillar.id}
            pillar={pillar}
            variant={PILLAR_VARIANTS[idx] || "default"}
          />
        ))}
      </div>
    </section>
  );
}

