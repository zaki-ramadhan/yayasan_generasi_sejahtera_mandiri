import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Filter toggle switch for Instagram feed (Terbaru vs Terpopuler)
 *
 * @param {object} props
 * @param {"latest" | "popular"} props.filterType - Active filter type
 * @param {Function} props.onFilterChange - (type: "latest" | "popular") => void
 */
export function InstagramFeedFilter({ filterType, onFilterChange }) {
  const isPopular = filterType === "popular";

  return (
    <div className="flex justify-center -mt-2">
      <div className="inline-flex items-center gap-3 sm:gap-4 select-none">
        {/* Label Kiri: Terbaru */}
        <button
          type="button"
          onClick={() => onFilterChange("latest")}
          className={cn(
            "inline-flex items-center text-sm sm:text-base transition-colors cursor-pointer",
            !isPopular
              ? "text-slate-950 font-medium"
              : "text-slate-500 hover:text-slate-700 font-normal"
          )}
        >
          <span>Terbaru</span>
        </button>

        {/* Switch Toggle Slider */}
        <button
          type="button"
          role="switch"
          aria-checked={isPopular}
          onClick={() => onFilterChange(isPopular ? "latest" : "popular")}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-hidden",
            isPopular ? "bg-primary" : "bg-slate-300"
          )}
        >
          <span className="sr-only">Toggle urutan postingan</span>
          <span
            className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out",
              isPopular ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>

        {/* Label Kanan: Terpopuler */}
        <button
          type="button"
          onClick={() => onFilterChange("popular")}
          className={cn(
            "inline-flex items-center gap-1.5 text-sm sm:text-base transition-colors cursor-pointer",
            isPopular
              ? "text-slate-950 font-medium"
              : "text-slate-500 hover:text-slate-700 font-normal"
          )}
        >
          <span>Terpopuler</span>
          <Flame
            className={cn(
              "w-4 h-4 sm:w-5 sm:h-5 -ml-0.5",
              isPopular
                ? "text-amber-600 fill-amber-500"
                : "text-slate-300 fill-slate-300"
            )}
          />
        </button>
      </div>
    </div>
  );
}
