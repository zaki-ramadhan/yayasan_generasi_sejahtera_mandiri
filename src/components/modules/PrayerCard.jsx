"use client";

import { Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/formatters";

/**
 * Helper to compute humanized relative time
 */
export function getRelativeTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Baru saja";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} jam lalu`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} hari lalu`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} bulan lalu`;
  return formatDate(dateString);
}

export function PrayerCard({ donor, isAmined, onToggleAmin, isCompact = false }) {
  const initial = (donor.name || "H").charAt(0).toUpperCase();
  const cleanPrayer = (donor.prayer || "").replace(/\s+/g, " ").trim();

  return (
    <article
      className={`relative bg-white rounded-xl sm:rounded-2xl border border-slate-300 shadow-2xs hover:border-slate-400 transition-all flex flex-col justify-between ${
        isCompact ? "pt-6 pb-4 px-4" : "pt-6.5 pb-4.5 px-4.5 sm:px-5"
      }`}
    >
      {/* Floating Top-Left Avatar */}
      <div className="absolute -top-3.5 left-4">
        <Avatar className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-300 shadow-xs bg-slate-100">
          <AvatarFallback className="bg-slate-100 text-slate-800 font-medium text-xs">
            {initial}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Prayer Message Body with 3-line max constraint */}
      <div className="space-y-1.5">
        <p
          className={`text-slate-800 leading-relaxed font-normal break-words line-clamp-3 ${
            isCompact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
          }`}
        >
          &ldquo;{cleanPrayer}&rdquo;
        </p>
      </div>

      {/* Card Footer with Divider */}
      <div className="pt-2.5 mt-2.5 border-t border-slate-200 flex items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-slate-900 truncate text-xs sm:text-sm line-clamp-1">
            {donor.name}
          </h4>
          <span className="text-[11px] sm:text-xs text-slate-500 block truncate mt-0.5">
            {getRelativeTime(donor.date)}
          </span>
        </div>

        {/* Interactive Aamiin Action Button */}
        <button
          type="button"
          disabled={isAmined}
          onClick={() => !isAmined && onToggleAmin(donor.id)}
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all shrink-0 select-none ${
            isAmined
              ? "cursor-default text-slate-700"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
          }`}
          aria-label={isAmined ? `Doa dari ${donor.name} telah diaminkan` : `Aamiinkan doa dari ${donor.name}`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isAmined
                ? "fill-rose-500 text-rose-500"
                : "text-rose-500 fill-transparent"
            }`}
          />
          <span>{donor.aminCount} Aamiin</span>
        </button>
      </div>
    </article>
  );
}
