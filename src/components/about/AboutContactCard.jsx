import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutContactCard() {
  const whatsappUrl = `https://wa.me/${ORG_PROFILE.contacts.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Assalamu'alaikum YGSM, mohon info program yayasan.")}`;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-300 space-y-3.5">
      <h3 className="font-semibold text-slate-950 text-base">
        Kantor &amp; Layanan Donatur
      </h3>

      <div className="space-y-3 text-sm text-slate-700">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{ORG_PROFILE.contacts.address}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Phone className="w-4 h-4 text-slate-500 shrink-0" />
          <span>{ORG_PROFILE.contacts.phone}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-slate-500 shrink-0" />
          <span>{ORG_PROFILE.contacts.email}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-slate-500 shrink-0" />
          <span>{ORG_PROFILE.contacts.officeHours}</span>
        </div>

        <div className="pt-2 border-t border-slate-200">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>Hubungi Layanan WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
