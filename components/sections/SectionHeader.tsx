import React from 'react'

interface SectionHeaderProps {
  /** Texto del pill (overline). Se muestra en mayúsculas vía CSS. */
  overline: string
  /** Título de la sección. Soporta el separador `{br}` → salto de línea. */
  title: string
  subtitle?: string
  /** 'dark' para secciones sobre fondo oscuro (CTAs). */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Cabecera de sección unificada (pill + título + subtítulo), centrada.
 * Fuente única del patrón usado en todas las secciones del sitio.
 */
export default function SectionHeader({ overline, title, subtitle, tone = 'light', className }: SectionHeaderProps) {
  const dark = tone === 'dark'
  return (
    <div className={`max-w-2xl mx-auto text-center mb-8 md:mb-16 ${className ?? ''}`}>
      <span
        className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full mb-5 ${
          dark ? 'bg-white/10 text-vidaia-earth' : 'bg-vidaia-light text-vidaia-primary'
        }`}
      >
        {overline}
      </span>
      <h2
        className={`font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight ${
          dark ? 'text-white' : 'text-vidaia-dark'
        }`}
      >
        {title.split('{br}').map((part, i, arr) => (
          <React.Fragment key={i}>
            {part}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
