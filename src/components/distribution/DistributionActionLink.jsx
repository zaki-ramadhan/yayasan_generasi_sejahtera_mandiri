import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Atom component: Clean inline action link for reports and PDFs
 *
 * @param {object} props
 * @param {string} [props.href="#"]
 * @param {string} [props.label="Unduh PDF"]
 * @param {import("lucide-react").LucideIcon} [props.icon]
 * @param {string} [props.className]
 */
export function DistributionActionLink({
  href = "#",
  label = "Unduh PDF",
  icon: Icon = Download,
  className,
}) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors shrink-0 cursor-pointer pt-1 sm:pt-0",
        className
      )}
    >
      <Icon className="w-4 h-4 text-slate-500" />
      <span>{label}</span>
    </a>
  );
}
