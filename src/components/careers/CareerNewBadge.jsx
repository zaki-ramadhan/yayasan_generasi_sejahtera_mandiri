import { cn } from "@/lib/utils";

/**
 * Atomic component: 'Baru' badge chip for vacancies posted today
 * Clean, no dots, accessible, reusable across cards and detail view.
 * @param {object} props
 * @param {string} [props.className]
 */
export function CareerNewBadge({ className = "" }) {
  return (
    <span
      className={cn(
        "shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/70 select-none",
        className
      )}
    >
      Baru
    </span>
  );
}
