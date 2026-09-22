import { cn } from "@/lib/utils";

/**
 * Molecule: Checkbox pemenuhan haul (1 tahun)
 */
export function ZakatHaulCheckbox({
  id = "haul-checkbox",
  checked = true,
  onChange,
  label = "Harta telah memenuhi haul (1 tahun)",
  className,
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md bg-slate-50 border border-slate-200 cursor-pointer select-none hover:bg-slate-100/60 transition-colors",
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-primary rounded-sm border-slate-300 focus:ring-primary cursor-pointer accent-primary"
      />
      <span className="text-sm text-slate-700 font-medium">
        {label}
      </span>
    </label>
  );
}
