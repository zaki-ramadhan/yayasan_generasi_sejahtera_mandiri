import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function RoutineDonationHero() {
  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="space-y-1.5 border-b border-slate-300 pb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
          Atur Jadwal Donasi Rutin
        </h1>
        <p className="text-sm sm:text-base text-slate-700">
          Atur pengingat WhatsApp atau jadwal sedekah rutin berkala untuk program kebaikan pilihan Anda.
        </p>
      </div>

      {/* Info Accordion */}
      <Accordion type="single" collapsible className="bg-sky-50/80 border border-sky-200 rounded-xl px-4">
        <AccordionItem value="cara-kerja" className="border-none">
          <AccordionTrigger className="text-sm font-semibold text-sky-950 py-3 hover:no-underline">
            <span className="flex items-center gap-2 text-left">
              <Info className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Panduan: Cara Kerja Donasi Rutin</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-xs sm:text-sm text-sky-900 leading-relaxed pt-1 pb-4 space-y-2">
            <p>
              1. Sistem YGSM akan mengirimkan notifikasi pengingat ramah disertai tautan invoice QRIS / Virtual Account langsung ke WhatsApp Anda pada waktu yang telah ditentukan.
            </p>
            <p>
              2. Anda tidak terikat kontrak paksaan; Anda dapat menunda, mengganti nominal, atau membatalkan jadwal donasi rutin kapan pun tanpa biaya tambahan.
            </p>
            <p>
              3. Seluruh sedekah tercatat dalam rekam jejak transparansi dan dapat diakses melalui portal donatur resmi.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
