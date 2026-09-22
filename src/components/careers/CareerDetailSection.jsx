/**
 * Molecule component: Detail content section with standardized heading
 * Font weight max medium for section title, text-sm font-normal for children to save vertical scroll.
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export function CareerDetailSection({ title, children, className = "" }) {
  if (!children) return null;

  return (
    <section className={`space-y-2 ${className}`}>
      <h2 className="text-base font-medium text-slate-900 tracking-tight">
        {title}
      </h2>
      <div className="text-sm font-normal text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
