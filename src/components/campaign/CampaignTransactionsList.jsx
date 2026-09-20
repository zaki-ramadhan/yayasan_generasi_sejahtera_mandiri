"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Loader2, User } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { maskEmail } from "@/lib/security";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const INITIAL_PAGE_SIZE = 12;
const BATCH_SIZE = 10;

function getDateKey(dateInput) {
  if (!dateInput) return "unknown";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "unknown";
  const wibTime = new Date(date.getTime() + (7 * 60 + date.getTimezoneOffset()) * 60000);
  const y = wibTime.getFullYear();
  const m = String(wibTime.getMonth() + 1).padStart(2, "0");
  const d = String(wibTime.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDateBadgeLabel(dateInput) {
  if (!dateInput) return "Lainnya";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Lainnya";

  const now = new Date();
  const nowWIB = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
  const targetWIB = new Date(date.getTime() + (7 * 60 + date.getTimezoneOffset()) * 60000);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const yesterdayWIB = new Date(nowWIB);
  yesterdayWIB.setDate(yesterdayWIB.getDate() - 1);

  if (isSameDay(targetWIB, nowWIB)) {
    return "Hari Ini";
  }
  if (isSameDay(targetWIB, yesterdayWIB)) {
    return "Kemarin";
  }

  return formatDate(date, { month: "long", withDay: true });
}

function formatTimeOnly(dateInput) {
  if (!dateInput) return "Baru saja";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Baru saja";
  const wibTime = new Date(date.getTime() + (7 * 60 + date.getTimezoneOffset()) * 60000);
  const hours = String(wibTime.getHours()).padStart(2, "0");
  const minutes = String(wibTime.getMinutes()).padStart(2, "0");
  const seconds = String(wibTime.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds} WIB`;
}

export function CampaignTransactionsList({
  donors = [],
  totalDonorsCount = 0,
  campaignSlug = "",
}) {
  const [donorList, setDonorList] = useState(donors);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollRef = useRef(null);

  // Urutkan donatur berdasarkan tanggal terbaru
  const sortedDonors = useMemo(() => {
    return [...donorList].sort(
      (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
    );
  }, [donorList]);

  const visibleDonors = sortedDonors.slice(0, visibleCount);
  const hasLocalMore = sortedDonors.length > visibleCount;
  const canFetchRemote = Boolean(campaignSlug && donorList.length < totalDonorsCount);
  const hasMore = hasLocalMore || canFetchRemote;

  // Kelompokkan data yang tampil per tanggal (seperti WhatsApp)
  const groupedDonors = useMemo(() => {
    const groups = [];
    const groupMap = new Map();

    for (const item of visibleDonors) {
      const key = getDateKey(item.date);
      if (!groupMap.has(key)) {
        const groupObj = {
          key,
          label: getDateBadgeLabel(item.date),
          items: [],
        };
        groupMap.set(key, groupObj);
        groups.push(groupObj);
      }
      groupMap.get(key).items.push(item);
    }

    return groups;
  }, [visibleDonors]);

  // Listener scroll ke bawah untuk muat lebih banyak transaksi
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (el.scrollHeight - el.scrollTop - el.clientHeight >= 80) return;
      if (isLoadingMore || !hasMore) return;

      // 1. Prioritaskan tampilkan sisa data lokal terlebih dahulu
      if (hasLocalMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, donorList.length));
          setIsLoadingMore(false);
        }, 400);
        return;
      }

      // 2. Jika data lokal habis namun server masih ada data
      if (canFetchRemote) {
        setIsLoadingMore(true);
        fetch(
          `/api/donations?campaignSlug=${encodeURIComponent(campaignSlug)}&skip=${donorList.length}&limit=20`
        )
          .then((res) => res.json())
          .then((json) => {
            if (json?.success && Array.isArray(json?.data?.donations)) {
              const newItems = json.data.donations;
              setDonorList((prev) => {
                const existingIds = new Set(prev.map((d) => d.id));
                const filtered = newItems.filter((item) => !existingIds.has(item.id));
                return [...prev, ...filtered];
              });
              setVisibleCount((prev) => prev + (newItems.length || BATCH_SIZE));
            }
          })
          .catch((err) => {
            console.warn("Gagal memuat riwayat donasi tambahan:", err);
          })
          .finally(() => {
            setIsLoadingMore(false);
          });
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isLoadingMore, hasMore, hasLocalMore, canFetchRemote, donorList.length, campaignSlug]);

  if (!donorList || donorList.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 text-sm sm:text-base">
        Belum ada data
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-6 border-t border-slate-200">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-950">
            Riwayat Transaksi Donasi
          </h3>
          <p className="text-sm text-slate-600">
            Catatan mutasi donasi masuk yang telah berhasil terverifikasi oleh sistem.
          </p>
        </div>
        <span className="text-xs sm:text-sm font-medium text-slate-700">
          ({totalDonorsCount || donorList.length} Donasi Masuk)
        </span>
      </div>

      {/* Transaction List Container with Date Groups */}
      <div
        ref={scrollRef}
        className="max-h-[460px] sm:max-h-[520px] overflow-y-auto pr-1 sm:pr-2 focus:outline-none space-y-4"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}
      >
        {groupedDonors.map((group) => (
          <div key={group.key} className="space-y-2">
            {/* WhatsApp-Style Sticky Date Badge */}
            <div className="sticky top-0 z-10 flex justify-center py-1 pointer-events-none">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white border border-slate-800 shadow-xs pointer-events-auto select-none">
                {group.label}
              </span>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
              {group.items.map((item, index) => {
                const isAnon = !item.name || item.name.toLowerCase().includes("hamba allah");
                const initial = isAnon ? "HA" : item.name.slice(0, 2).toUpperCase();

                return (
                  <div
                    key={item.id || `tx-${group.key}-${index}`}
                    className="p-2 flex items-center justify-between gap-2.5 shadow-2xs"
                  >
                    {/* Left: Avatar & Donor Info */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 shrink-0 overflow-hidden">
                        {item.avatar && (
                          <AvatarImage src={item.avatar} alt={item.name || "Donatur"} className="object-cover" />
                        )}
                        <AvatarFallback className="text-xs font-medium bg-slate-100 text-slate-700">
                          {isAnon ? <User className="w-5 h-5 text-slate-500" /> : initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-medium text-slate-900 truncate block">
                          {item.name || "Hamba Allah"}
                        </span>
                        <span className="text-xs text-slate-600 block mt-0.5 font-normal truncate">
                          {maskEmail(item.email || (isAnon ? "hamba.allah***@gmail.com" : "donatur@ygsm.id"))}
                        </span>
                      </div>
                    </div>

                    {/* Right: Donation Amount & Time Details */}
                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-medium text-slate-950 block">
                        {formatRupiah(item.amount)}
                      </span>
                      <span className="text-xs text-slate-600 block mt-0.5 font-normal">
                        {formatTimeOnly(item.date)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Loading indicator saat scroll reload */}
        {isLoadingMore && (
          <div className="flex justify-center py-4">
            <Loader2 className="w-[18px] h-[18px] text-primary animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

