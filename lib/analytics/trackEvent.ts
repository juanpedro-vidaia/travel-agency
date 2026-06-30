export type GtagParams = Record<string, string | number | boolean | undefined>

/**
 * Dispara un evento personalizado de GA4.
 * No-op silencioso si no hay `gtag` (p.ej. el usuario no ha dado consentimiento
 * de analítica y el script de GA no se ha cargado). Nunca lanza errores.
 */
export function trackEvent(eventName: string, params?: GtagParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}
