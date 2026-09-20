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
  showBorder = false,
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-2.5",
        showBorder && "border-b border-slate-200 pb-3",
        className
      )}
    >
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        const count = counts[cat.id];
        const hasCount = typeof count === "number";

        const baseClasses = cn(
          "whitespace-nowrap px-4 py-2 text-sm font-medium transition-all shrink-0 min-h-[38px] flex items-center justify-center rounded-full cursor-pointer select-none",
          isActive
            ? "text-white bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-t border-t-slate-500 border-x border-x-slate-700 border-b-2 border-b-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_3px_6px_rgba(0,0,0,0.2)] cursor-default"
            : "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 hover:border-slate-400 shadow-2xs"
        );

        const content = (
          <span className="flex items-center gap-1.5">
            <span>{cat.name}</span>
            {hasCount && (
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-slate-300" : "text-slate-500"
                )}
              >
                ({count})
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
