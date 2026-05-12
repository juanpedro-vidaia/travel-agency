'use client'

import { useConsent } from '@/lib/hooks/useConsent'

export default function CookieFAB() {
  const { openPreferences } = useConsent()

  return (
    <button
      type="button"
      onClick={openPreferences}
      aria-label="Gestionar preferencias de cookies"
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 rounded-full bg-vidaia-earth hover:bg-vidaia-brown text-white text-sm font-medium px-4 py-2.5 shadow-lg transition-colors"
    >
      <span aria-hidden="true">🍪</span>
      <span className="hidden sm:inline">Gestionar cookies</span>
    </button>
  )
}
