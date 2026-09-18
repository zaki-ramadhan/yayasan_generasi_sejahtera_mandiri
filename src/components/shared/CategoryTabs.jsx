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
          "whitespace-nowrap px-4 py-2 text-sm font-medium transition-all shrink-0 min-h-[40px] flex items-center justify-center -skew-x-12 rounded-md border cursor-pointer",
          isActive
            ? "bg-primary text-white font-semibold border-primary shadow-xs"
            : "bg-white text-slate-800 hover:bg-slate-50 border-slate-300 hover:border-slate-400"
        );

        const content = (
          <span className="skew-x-12 flex items-center gap-2">
            <span>{cat.name}</span>
            {hasCount && (
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full font-semibold",
                  isActive
                    ? "bg-white/25 text-white"
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
