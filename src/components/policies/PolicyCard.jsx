/**
 * Standard policy & legal term card with step/section number badge
 * @param {number|string} number - Step or section index
 * @param {string} title - Section title
 * @param {React.ReactNode} children - Detailed terms content
 */
export function PolicyCard({ number, title, children }) {
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold shrink-0">
          {number}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-950">
          {title}
        </h2>
      </div>
      <div className="text-slate-700 space-y-3">
        {children}
      </div>
    </section>
  );
}
