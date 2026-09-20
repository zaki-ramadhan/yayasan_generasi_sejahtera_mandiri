"use client";

import { PrayerAvatar } from "@/components/modules/PrayerAvatar";
import { PrayerAminButton } from "@/components/modules/PrayerAminButton";
import { getRelativeTime } from "@/components/modules/PrayerCard";
import { cn } from "@/lib/utils";

export function PrayerChatBubble({ donor, isAmined, onToggleAmin, isOwn = false }) {
  const cleanPrayer = (donor.prayer || "").replace(/\s+/g, " ").trim();

  // Avatar width (size="sm" ~32px) + gap-2 (8px) = ~40px → pl/pr-10
  const avatarOffset = isOwn ? "pr-10" : "pl-10";

  return (
    <article className={cn("flex flex-col w-full", isOwn ? "items-end" : "items-start")}>
      {/* Nama donatur */}
      <div className={cn("text-xs font-semibold text-slate-700 mb-1 truncate max-w-full", avatarOffset)}>
        {donor.name}
      </div>

      {/* Row: avatar bottom-aligned dengan bubble (timestamp TIDAK ikut di sini) */}
      <div className={cn("flex items-end gap-2 w-full", isOwn ? "flex-row-reverse" : "flex-row")}>
        {/* Avatar — items-end pada parent sudah align ini ke bottom bubble */}
        <PrayerAvatar name={donor.name} size="sm" className="shrink-0" />

        {/* Bubble saja, tanpa timestamp */}
        <div
          className={cn(
            "relative bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xs px-4 pt-3 pb-5 max-w-[82%] sm:max-w-[78%]",
            isOwn ? "rounded-2xl rounded-br-xs" : "rounded-2xl rounded-bl-xs"
          )}
        >
          <p className="text-xs sm:text-sm text-white leading-relaxed font-normal break-words line-clamp-4">
            &ldquo;{cleanPrayer}&rdquo;
          </p>

          {/* Amin button — setengah dalam setengah luar di sudut bawah */}
          <div className={cn("absolute -bottom-3.5", isOwn ? "left-2.5" : "right-2.5")}>
            <PrayerAminButton
              donorId={donor.id}
              donorName={donor.name}
              aminCount={donor.aminCount}
              isAmined={isAmined}
              onToggleAmin={onToggleAmin}
              variant="reaction"
            />
          </div>
        </div>
      </div>

      {/* Timestamp — baris terpisah di bawah row, kanan bawah sejajar tepi bubble */}
      <div className={cn("mt-0.5", avatarOffset)}>
        <span className="text-[11px] text-slate-600 font-normal select-none">
          {getRelativeTime(donor.date)}
        </span>
      </div>
    </article>
  );
}
