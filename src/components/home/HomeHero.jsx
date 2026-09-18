"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuickDonateBar } from "@/components/modules/QuickDonateBar";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&auto=format&fit=crop&q=80",
    label: "Pendidikan Al-Qur'an",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80",
    label: "Pemberdayaan Yatim & Dhuafa",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&auto=format&fit=crop&q=80",
    label: "Musyawarah & Halaqah",
  },
];

export function HomeHero({ defaultCampaignSlug }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden border-b border-slate-300 py-14 sm:py-20">
      {/* Background Image Slideshow Layer */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
            />
          </div>
        ))}

        {/* Directional Light Overlay: Solid enough on left so text is 100% crisp & non-faint, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20 sm:to-white/10" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-950 tracking-tight leading-tight">
              Penyaluran Zakat, Infak, dan Sedekah untuk Santri &amp; Dhuafa
            </h1>

            <p className="text-base sm:text-lg text-slate-800 leading-relaxed max-w-xl">
              Yayasan Generasi Sejahtera Mandiri mengelola dan menyalurkan dana amanah untuk pembinaan hafalan Al-Qur&apos;an, kemandirian anak yatim, dan bantuan kemanusiaan secara transparan.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/program">
                <Button
                  size="lg"
                  className="h-12 px-6 rounded-lg text-base font-semibold text-white bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 border-t border-t-blue-400 border-x border-x-blue-500 border-b-2 border-b-blue-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_6px_rgba(30,58,138,0.25)] active:translate-y-0.5 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all cursor-pointer"
                >
                  Lihat Program Donasi
                </Button>
              </Link>
              <Link href="/kalkulator-zakat">
                <Button
                  size="lg"
                  className="h-12 px-6 rounded-lg text-base font-semibold text-slate-900 bg-gradient-to-b from-white via-slate-50 to-slate-100 hover:from-slate-50 hover:to-slate-200 border-t border-t-white border-x border-x-slate-200 border-b-2 border-b-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_3px_6px_rgba(0,0,0,0.06)] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  Kalkulator ZISWAF
                </Button>
              </Link>
            </div>

            {/* Verified Metrics Summary */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-300/80 text-sm text-slate-700">
              <div>
                <span className="block font-semibold text-slate-950 text-base">Opini WTP</span>
                <span className="text-xs sm:text-sm">Audit KAP Independen</span>
              </div>
              <div>
                <span className="block font-semibold text-slate-950 text-base">32.400+ Jiwa</span>
                <span className="text-xs sm:text-sm">Penerima Manfaat</span>
              </div>
              <div>
                <span className="block font-semibold text-slate-950 text-base">QRIS &amp; VA</span>
                <span className="text-xs sm:text-sm">Verifikasi Otomatis</span>
              </div>
            </div>
          </div>

          {/* Right Quick Donation Box */}
          <div className="lg:col-span-5">
            <QuickDonateBar defaultCampaignSlug={defaultCampaignSlug} />
          </div>
        </div>
      </div>
    </section>
  );
}
