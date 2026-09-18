export function AuthFormHeader({ title, subtitle }) {
  return (
    <div className="space-y-1.5">
      <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
