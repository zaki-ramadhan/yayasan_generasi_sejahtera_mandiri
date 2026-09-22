import { cn } from "@/lib/utils";

/**
 * Atomic Section Header for Report Dashboard.
 * Consistent vertical accent line + heading.
 *
 * @param {object} props
 * @param {string} props.title - Heading title text
 * @param {string} [props.className] - Optional container class
 */
export function ReportSectionHeader({ title, className = "" }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="w-1 h-5 rounded-xs bg-primary shrink-0" />
      <h2 className="text-lg sm:text-xl font-semibold text-slate-950 tracking-tight">
        {title}
      </h2>
    </div>
  );
}
