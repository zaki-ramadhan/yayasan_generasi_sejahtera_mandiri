import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutStory() {
  return (
    <section className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-3.5">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-950 border-b border-slate-200 pb-2.5">
        Tentang Yayasan
      </h2>
      <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 whitespace-pre-line">
        {ORG_PROFILE.aboutStory}
      </div>
    </section>
  );
}
