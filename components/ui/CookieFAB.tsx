'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useConsent } from '@/lib/hooks/useConsent'

export default function CookieFAB() {
  const { openPreferences } = useConsent()
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    if (expanded) {
      openPreferences()
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Gestionar preferencias de cookies"
      className={`hidden md:flex fixed bottom-6 right-0 z-[200] items-center justify-center rounded-l-xl bg-vidaia-primary hover:bg-vidaia-dark text-white shadow-md transition-transform duration-300 ease-in-out px-3 py-4 ${
        expanded ? 'translate-x-0' : 'translate-x-[calc(100%_-_10px)]'
      }`}
    >
      <ShieldCheck className="w-5 h-5" />
    </button>
  )
}
