"use client";

import { PrayerAvatar } from "@/components/modules/PrayerAvatar";
import { PrayerAminButton } from "@/components/modules/PrayerAminButton";
import { getRelativeTime } from "@/components/modules/PrayerCard";

export function PrayerChatBubble({ donor, isAmined, onToggleAmin }) {
  const cleanPrayer = (donor.prayer || "").replace(/\s+/g, " ").trim();

  return (
    <article className="flex flex-col items-end w-full group">
      {/* Nama Donatur di atas bubble (rata kanan sejajar bubble) */}
      <div className="text-xs font-semibold text-slate-700 text-right pr-9 mb-1 truncate max-w-full">
        {donor.name}
      </div>

      {/* Baris Chat Bubble + PFP Avatar di sisi kanan */}
      <div className="flex items-end justify-end gap-2 w-full">
        {/* Chat Bubble (Brand Primary Blue - Selaras dengan tema dan identitas web) */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-xs px-4 py-3 shadow-2xs max-w-[85%] sm:max-w-[80%]">
          {/* Isi Pesan Doa */}
          <p className="text-xs sm:text-sm text-white leading-relaxed font-normal break-words line-clamp-3">
            &ldquo;{cleanPrayer}&rdquo;
          </p>

          {/* Floating Aamiin Reaction Pill (Ala Reaksi Pesan Instagram/iMessage) */}
          <div className="absolute -bottom-2.5 right-2.5 z-10">
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

        {/* PFP / Avatar Donatur di sebelah kanan bubble */}
        <PrayerAvatar name={donor.name} size="sm" className="shrink-0 mb-0.5" />
      </div>

      {/* Posisi Angka Waktu di Bawah di Luar Bubble Chat */}
      <span className="text-[11px] text-slate-400 font-medium select-none mt-2.5 pr-9 text-right block">
        {getRelativeTime(donor.date)}
      </span>
    </article>
  );
}
