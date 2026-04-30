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
