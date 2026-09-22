import { cn } from "@/lib/utils";

/**
 * Atomic component: Standardized metadata item (Icon + text label)
 * Uses text-slate-600 matching description color so it is not pale or washed out.
 * @param {object} props
 * @param {React.ComponentType} props.icon
 * @param {string|number} props.text
 * @param {"xs" | "sm"} [props.size="sm"]
 * @param {string} [props.className]
 * @param {string} [props.iconClassName]
 */
export function CareerMetaItem({
  icon: Icon,
  text,
  size = "sm",
  className = "",
  iconClassName = "",
}) {
  if (!text) return null;

  const isXs = size === "xs";

  return (
    <div
      className={cn(
        "inline-flex items-center",
        isXs ? "gap-1 text-xs text-slate-600 font-medium" : "gap-1.5 text-sm text-slate-600 font-normal",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "shrink-0 text-slate-500",
            isXs ? "w-3.5 h-3.5" : "w-4 h-4",
            iconClassName
          )}
          aria-hidden="true"
        />
      )}
      <span>{text}</span>
    </div>
  );
}
