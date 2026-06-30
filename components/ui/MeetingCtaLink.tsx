'use client'

import { CONTACT } from '@/lib/config/contact'
import { trackEvent } from '@/lib/analytics/trackEvent'

/**
 * Enlace a la reunión de Clientify (cita previa) con tracking de GA4.
 * Enlace directo de cliente: la URL lleva fragmento #/ que un redirect del servidor perdería.
 */
export default function MeetingCtaLink({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={CONTACT.meetingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('cita_previa_click', { click_location: window.location.pathname })}
      className={className}
    >
      {children}
    </a>
  )
}
