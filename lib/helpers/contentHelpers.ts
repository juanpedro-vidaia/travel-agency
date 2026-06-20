import { STATIC_CONTENT, COMMON_UI } from '@/lib/data/staticContent'

export function getStaticContent(lang: string): typeof STATIC_CONTENT.es {
  return (STATIC_CONTENT[lang as keyof typeof STATIC_CONTENT] ?? STATIC_CONTENT.es) as typeof STATIC_CONTENT.es
}

export function getCommonUI(lang: string): typeof COMMON_UI.es {
  return (COMMON_UI[lang as keyof typeof COMMON_UI] ?? COMMON_UI.es) as typeof COMMON_UI.es
}

/**
 * Replaces {variable} placeholders in a template string.
 * @example renderTemplate('Viajes a {country}', { country: 'Argentina' }) → 'Viajes a Argentina'
 */
export function renderTemplate(
  template: string,
  variables: Record<string, string | number>
): string {
  return Object.entries(variables).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template
  )
}

export function formatPrice(price: number, locale = 'es-ES'): string {
  return price.toLocaleString(locale)
}

/**
 * Returns the part of an itinerary title before the colon (without it), trimmed.
 * Useful to keep metadata titles within length limits.
 * @example getShortTitle('Chile e Isla de Pascua: de las viñas del Maipo…') → 'Chile e Isla de Pascua'
 * Falls back to the full title when there is no ':'.
 */
export function getShortTitle(title: string): string {
  const idx = title.indexOf(':')
  return idx === -1 ? title : title.slice(0, idx).trim()
}

