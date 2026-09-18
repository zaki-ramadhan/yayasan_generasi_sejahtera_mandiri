"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function CategoryTabs({
  categories = [],
  counts = {},
  selectedCategory = "all",
  onSelectCategory,
  basePath,
  categoryParam = "kategori",
  className,
  showBorder = true,
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 overflow-x-auto -mx-1 px-2.5 pt-1.5 pb-2.5 scrollbar-none",
        showBorder && "border-b border-slate-200",
        className
      )}
    >
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        const count = counts[cat.id];
        const hasCount = typeof count === "number";

        const baseClasses = cn(
          "whitespace-nowrap px-4 py-2 text-sm transition-all shrink-0 min-h-[40px] flex items-center justify-center -skew-x-12 rounded-md cursor-pointer",
          isActive
            ? "font-semibold text-white bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-t border-t-slate-500 border-x border-x-slate-700 border-b-2 border-b-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_3px_6px_rgba(0,0,0,0.25)] cursor-default"
            : "font-medium bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 hover:border-slate-400"
        );

        const content = (
          <span className="skew-x-12 flex items-center gap-2">
            <span>{cat.name}</span>
            {hasCount && (
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full font-semibold",
                  isActive
                    ? "bg-slate-950/60 text-slate-100 border border-slate-700/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                )}
              >
                {count}
              </span>
            )}
          </span>
        );

        if (basePath) {
          const href =
            cat.id === "all"
              ? basePath
              : `${basePath}${basePath.includes("?") ? "&" : "?"}${categoryParam}=${encodeURIComponent(cat.id)}`;
          return (
            <Link key={cat.id} href={href} className={baseClasses}>
              {content}
            </Link>
          );
        }

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory?.(cat.id)}
            className={baseClasses}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
