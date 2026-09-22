/**
 * Molecule component: Top page header for Distribusi page
 * Symmetrical and identical style to Laporan Keuangan header.
 * @param {object} props
 * @param {string} [props.title="Distribusi"]
 * @param {string} [props.description]
 */
export function DistributionHeader({
  title = "Distribusi",
  description = "Transparansi audit keuangan independen, dinamika rekam jejak penyaluran bantuan berkala, serta kepatuhan fatwa Dewan Pengawas Syariah demi menjaga amanah umat secara profesional dan akuntabel.",
}) {
  return (
    <div className="border-b border-slate-200 pb-5 text-center">
      <div className="max-w-3xl mx-auto space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
