import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutStory() {
  return (
    <section className="p-4 sm:p-5 space-y-3">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-950">
        Tentang Yayasan
      </h2>
      <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 whitespace-pre-line">
        {ORG_PROFILE.aboutStory}
      </div>
    </section>
  );
}

