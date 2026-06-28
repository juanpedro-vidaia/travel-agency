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

const MONTHS_SHORT_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

/**
 * Compacts a list of best months (1-12) into readable ranges, handling year wrap.
 * @example formatBestMonths([4,5,6,7,8,9,10,11]) → 'abr–nov'
 * @example formatBestMonths([10,11,12,1,2,3])    → 'oct–mar'
 * @example formatBestMonths([1..12])             → 'Todo el año'
 */
export function formatBestMonths(months: number[] | undefined): string {
  if (!months?.length) return ''
  const sorted = [...new Set(months)].filter(m => m >= 1 && m <= 12).sort((a, b) => a - b)
  if (sorted.length === 0) return ''
  if (sorted.length === 12) return 'Todo el año'

  const ranges: [number, number][] = []
  let start = sorted[0]
  let prev = sorted[0]
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === prev + 1) {
      prev = sorted[i]
    } else {
      ranges.push([start, prev])
      start = sorted[i]
      prev = sorted[i]
    }
  }
  ranges.push([start, prev])

  // Merge wrap-around: a range ending in December joins one starting in January.
  if (ranges.length > 1 && ranges[0][0] === 1 && ranges[ranges.length - 1][1] === 12) {
    const first = ranges.shift()!
    const last = ranges.pop()!
    ranges.push([last[0], first[1]])
  }

  return ranges
    .map(([a, b]) => (a === b ? MONTHS_SHORT_ES[a - 1] : `${MONTHS_SHORT_ES[a - 1]}–${MONTHS_SHORT_ES[b - 1]}`))
    .join(', ')
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

