"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Phone, Share2, Check, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutHeader({ copiedProfile, onShareProfile, volunteerCount = 14 }) {
  const [internalCopied, setInternalCopied] = useState(false);
  const isCopied = copiedProfile !== undefined ? copiedProfile : internalCopied;
  const leadershipCount = ORG_PROFILE.leadership?.length || 4;
  const totalTeam = leadershipCount + volunteerCount;

  const handleShare = () => {
    if (onShareProfile) {
      onShareProfile();
      return;
    }
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setInternalCopied(true);
      toast.success("Tautan profil yayasan berhasil disalin.");
      setTimeout(() => setInternalCopied(false), 2500);
    }
  };
  return (
    <section className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-2xs">
      {/* Cover Banner Image */}
      <div className="relative h-40 sm:h-52 lg:h-60 w-full bg-slate-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&auto=format&fit=crop&q=80"
          alt="Kegiatan Pembinaan Santri Yayasan Generasi Sejahtera Mandiri"
          fill
          sizes="100vw"
          className="object-cover opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
      </div>

      {/* Profile Details & Overlapping Rounded-Full Avatar */}
      <div className="px-5 sm:px-8 pb-5 sm:pb-6 pt-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 -mt-12 sm:-mt-14 mb-3.5">
          {/* Logo Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-white shadow-md p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src="/logo_yayasan_GSM.png"
              alt="Logo Resmi Yayasan Generasi Sejahtera Mandiri (YGSM)"
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-contain p-1"
              priority
            />
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
            <Link href="/program">
              <Button className="h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 border-t border-t-blue-400 border-x border-x-blue-500 border-b-2 border-b-blue-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_6px_rgba(30,58,138,0.25)] active:translate-y-0.5 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all cursor-pointer">
                Salurkan Donasi
              </Button>
            </Link>
            <Link href="/kalkulator-zakat">
              <Button
                variant="outline"
                className="h-9 sm:h-10 px-3.5 sm:px-4 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border-slate-300 transition-colors shadow-2xs cursor-pointer"
              >
                Kalkulator Zakat
              </Button>
            </Link>
            <a
              href={`https://wa.me/${ORG_PROFILE.contacts.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Assalamu'alaikum YGSM, mohon info program yayasan.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="h-9 sm:h-10 px-3.5 sm:px-4 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border-slate-300 transition-colors shadow-2xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                Hubungi Kami
              </Button>
            </a>
            <Button
              type="button"
              variant="outline"
              onClick={handleShare}
              className="h-9 sm:h-10 w-9 sm:w-10 p-0 text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border-slate-300 transition-colors shadow-2xs shrink-0 flex items-center justify-center cursor-pointer"
              title="Bagikan Tautan Profil"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Title and Meta Information */}
        <div className="space-y-2.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 leading-tight">
                {ORG_PROFILE.name}
              </h1>
              <BadgeCheck
                className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-amber-500 shrink-0 inline-block drop-shadow-xs"
                title="Yayasan Terverifikasi Resmi (Official Organization)"
              />
            </div>
            <p className="text-sm sm:text-base text-slate-700">
              {ORG_PROFILE.tagline}
            </p>

            {/* Avatar Stack Pengurus & Relawan */}
            <div className="flex items-center gap-2.5 pt-1 my-2.5">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                {ORG_PROFILE.leadership.map((leader, i) => (
                  <div
                    key={i}
                    className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden ring-2 ring-white bg-slate-200 shrink-0 shadow-2xs"
                  >
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                <strong className="text-slate-900 font-semibold">+{totalTeam} pengurus</strong> &amp; relawan aktif
              </p>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-200">
            <span className="text-slate-800 font-medium">
              Cibinong, Kab. Bogor, Jawa Barat
            </span>
            <span className="text-slate-300 select-none hidden sm:inline" aria-hidden="true">
              |
            </span>
            <span className="text-slate-800 font-medium">
              SK Kemenkumham: {ORG_PROFILE.legal.skKemenkumham}
            </span>
            <span className="text-slate-300 select-none hidden sm:inline" aria-hidden="true">
              |
            </span>
            <span className="text-emerald-700 font-medium">
              Audit KAP: Opini Wajar Tanpa Pengecualian (WTP)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
