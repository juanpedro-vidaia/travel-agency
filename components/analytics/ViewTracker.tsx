'use client'

import { useEffect, useRef } from 'react'
import { trackEvent, type GtagParams } from '@/lib/analytics/trackEvent'

/**
 * Dispara un evento de vista de GA4 una sola vez por combinación evento+params.
 * El guard por ref evita el doble disparo de React Strict Mode (dev) y cualquier
 * remount espurio; vuelve a disparar cuando cambian los params (p.ej. al navegar
 * a otro slug). Pensado para páginas server sin componente cliente propio, y
 * reutilizado por las páginas cliente para centralizar el dedupe.
 */
export default function ViewTracker({ event, params }: { event: string; params?: GtagParams }) {
  const key = `${event}:${JSON.stringify(params)}`
  const firedKey = useRef<string | null>(null)

  useEffect(() => {
    if (firedKey.current === key) return
    firedKey.current = key
    trackEvent(event, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return null
}
