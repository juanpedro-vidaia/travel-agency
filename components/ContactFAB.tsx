'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircle, X, Phone, PhoneCall, Calendar } from 'lucide-react'
import { useContactModal } from '@/lib/context/ContactModalContext'
import { CONTACT } from '@/lib/config/contact'

export default function ContactFAB() {
  const [isOpen,      setIsOpen]      = useState(false)
  const [copied,      setCopied]      = useState(false)
  const [comingSoon,  setComingSoon]  = useState(false)
  const { openContactModal } = useContactModal()
  const fabRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isOpen && fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleWhatsApp = useCallback(() => {
    const msg = encodeURIComponent('Hola! Me gustaría información sobre vuestros viajes a medida.')
    window.open(`https://wa.me/${CONTACT.phoneWhatsApp}?text=${msg}`, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }, [])

  const handlePhone = useCallback(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)
    if (isMobile) {
      window.location.href = `tel:${CONTACT.phoneClean}`
    } else {
      navigator.clipboard.writeText(CONTACT.phone).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      })
    }
    setIsOpen(false)
  }, [])

  const handleTeCallamos = useCallback(() => {
    setIsOpen(false)
    openContactModal()
  }, [openContactModal])

  const handleCitaPrevia = useCallback(() => {
    // TODO: Integrar widget de reuniones de Clientify cuando esté disponible.
    // Por ahora muestra un mensaje "Próximamente".
    setComingSoon(true)
    setTimeout(() => setComingSoon(false), 2500)
    setIsOpen(false)
  }, [])

  // Options ordered bottom→top (closest to FAB first = index 0)
  const options = [
    {
      id: 'whatsapp',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.228 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      label: 'WhatsApp',
      bg: 'bg-[#25D366] hover:bg-[#1fb954]',
      ariaLabel: 'Contactar por WhatsApp',
      action: handleWhatsApp,
    },
    {
      id: 'phone',
      icon: <Phone className="w-5 h-5 text-white" />,
      label: copied ? '¡Copiado!' : 'Llamar',
      bg: 'bg-sky-500 hover:bg-sky-600',
      ariaLabel: 'Llamar por teléfono',
      action: handlePhone,
    },
    {
      id: 'callback',
      icon: <PhoneCall className="w-5 h-5 text-white" />,
      label: 'Te llamamos',
      bg: 'bg-vidaia-earth hover:bg-vidaia-brown',
      ariaLabel: 'Solicitar que te llamemos',
      action: handleTeCallamos,
    },
    {
      id: 'appointment',
      // TODO: Conectar el widget de reuniones de Clientify aquí en el futuro.
      icon: <Calendar className="w-5 h-5 text-white" />,
      label: comingSoon ? 'Próximamente' : 'Cita previa',
      bg: 'bg-indigo-500 hover:bg-indigo-600',
      ariaLabel: 'Reservar cita previa',
      action: handleCitaPrevia,
    },
  ] as const

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/25 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* FAB container — grows upward from bottom-left */}
      <div
        ref={fabRef}
        className="fixed bottom-6 left-6 z-[100] flex flex-col items-start gap-3"
      >
        {/* Options (top = farthest from FAB, bottom = closest) */}
        {[...options].reverse().map((opt, reversedIndex) => {
          const delay = (options.length - 1 - reversedIndex) * 50
          return (
            <div
              key={opt.id}
              className={`flex items-center gap-3 transition-all duration-300 ${
                isOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${delay}ms`
                  : `${(options.length - 1 - reversedIndex) * 25}ms`,
              }}
            >
              {/* Label pill */}
              <span className="bg-vidaia-dark/90 text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm select-none">
                {opt.label}
              </span>
              {/* Action button */}
              <button
                onClick={opt.action}
                aria-label={opt.ariaLabel}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 ${opt.bg}`}
              >
                {opt.icon}
              </button>
            </div>
          )
        })}

        {/* Main FAB button */}
        <div className="relative group">
          {/* Tooltip (only when collapsed) */}
          {!isOpen && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-vidaia-dark text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
              ¿Hablamos?
            </span>
          )}

          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label="Opciones de contacto"
            aria-expanded={isOpen}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
              isOpen
                ? 'bg-vidaia-charcoal hover:bg-vidaia-dark rotate-0'
                : 'bg-[#25D366] hover:bg-[#1fb954] fab-pulse'
            }`}
          >
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
              {isOpen
                ? <X className="w-6 h-6 text-white" />
                : <MessageCircle className="w-6 h-6 text-white" />
              }
            </div>
          </button>
        </div>
      </div>

      {/* Copied-to-clipboard toast (desktop) */}
      {copied && (
        <div className="fixed bottom-24 left-6 z-[100] bg-vidaia-dark text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg pointer-events-none">
          📋 {CONTACT.phone} copiado
        </div>
      )}
    </>
  )
}
