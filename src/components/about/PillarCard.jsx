import { cn } from "@/lib/utils";

const VARIANTS = {
  default: {
    container: "border border-slate-200 bg-slate-50/70 text-slate-950",
    title: "text-slate-950",
    desc: "text-slate-800",
    beneficiaries: "text-slate-700",
  },
  blue: {
    container: "border border-blue-900/60 bg-[radial-gradient(ellipse_at_bottom_right,_#1e40af_0%,_#1e3a8a_50%,_#090e1a_100%)] text-white shadow-xs",
    title: "text-white",
    desc: "text-white/95",
    beneficiaries: "text-blue-100",
  },
  slate: {
    container: "border border-slate-700/60 bg-[radial-gradient(ellipse_at_bottom_right,_#475569_0%,_#1e293b_55%,_#020617_100%)] text-white shadow-xs",
    title: "text-white",
    desc: "text-slate-100",
    beneficiaries: "text-slate-200",
  },
};

/**
 * Individual core pillar card
 *
 * @param {object} props
 * @param {object} props.pillar - Pillar data object { title, desc, beneficiaries }
 * @param {"default" | "blue" | "slate"} [props.variant="default"]
 * @param {string} [props.className]
 */
export function PillarCard({ pillar, variant = "default", className = "" }) {
  if (!pillar) return null;
  const styles = VARIANTS[variant] || VARIANTS.default;

  return (
    <div className={cn("p-4 sm:p-5 rounded-md space-y-2", styles.container, className)}>
      <h3 className={cn("text-base sm:text-lg font-semibold", styles.title)}>
        {pillar.title}
      </h3>
      <p className={cn("text-sm sm:text-base leading-relaxed", styles.desc)}>
        {pillar.desc}
      </p>
      <div className={cn("pt-1 text-xs sm:text-sm font-medium", styles.beneficiaries)}>
        Jangkauan: {pillar.beneficiaries}
      </div>
    </div>
  );
}
