import type React from "react";

type CardProps = {
  title? : String,
  subtitle? : String,
  className? : String,
  titleClassName? : String,
  subtitleClassName?: String,
  children? : React.ReactNode,
  actions? : React.ReactNode
}

export default function Card({
  title,
  subtitle,
  className = '',
  children,
  actions,
  titleClassName = '',
  subtitleClassName = '',
} : CardProps) {
  return (
    <section className={`section-reveal rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-sm backdrop-blur-[1px] transition duration-300 hover:shadow-md ${className}`}>
      {(title || subtitle || actions) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title ? <h3 className={`text-base font-bold text-slate-900 ${titleClassName}`}>{title}</h3> : null}
            {subtitle ? <p className={`mt-1 text-sm text-slate-500 ${subtitleClassName}`}>{subtitle}</p> : null}
          </div>
          {actions ? <div>{actions}</div> : null}
        </header>
      )}
      {children}
    </section>
  );
}
