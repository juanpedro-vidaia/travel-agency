'use client'

import { useEffect, useState } from 'react'
import { ShieldCheck, Settings2, X } from 'lucide-react'
import LangLink from '@/components/LangLink'
import { useConsent } from '@/lib/context/ConsentContext'
import type { ConsentPreferences } from '@/lib/consent/consent'

function Toggle({
  checked,
  disabled,
  onChange,
  label,
  description,
}: {
  checked: boolean
  disabled?: boolean
  onChange?: (next: boolean) => void
  label: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-vidaia-light p-4 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-vidaia-dark">{label}</p>
          <p className="text-xs text-vidaia-charcoal/65 mt-1 leading-relaxed">{description}</p>
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange?.(!checked)}
          aria-pressed={checked}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
            checked ? 'bg-vidaia-primary' : 'bg-gray-300'
          } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              checked ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default function CookieConsentManager() {
  const {
    consent,
    isReady,
    isBannerOpen,
    isPreferencesOpen,
    acceptAll,
    rejectOptional,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useConsent()

  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: false,
    marketing: false,
    personalization: false,
  })

  useEffect(() => {
    setPreferences({
      analytics: consent.analytics,
      marketing: consent.marketing,
      personalization: consent.personalization,
    })
  }, [consent])

  if (!isReady) return null

  return (
    <>
      {isBannerOpen && !isPreferencesOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-[250] mx-auto max-w-4xl rounded-2xl border border-vidaia-light bg-white shadow-2xl">
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-vidaia-light flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-vidaia-primary" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-vidaia-dark">Cookies y privacidad</p>
                <p className="text-sm text-vidaia-charcoal/70 mt-1 leading-relaxed">
                  Usamos cookies necesarias para el funcionamiento del sitio y, con tu permiso, cookies de analitica para mejorar nuestros servicios.
                  Puedes aceptar, rechazar o configurar tus preferencias.
                </p>
                <p className="text-xs text-vidaia-charcoal/60 mt-2">
                  Más información en nuestra <LangLink href="/cookies" className="underline hover:text-vidaia-primary">Política de cookies</LangLink>.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={rejectOptional}
                className="px-4 py-2.5 rounded-xl border border-vidaia-charcoal/25 text-vidaia-charcoal text-sm font-medium hover:bg-vidaia-light transition-colors"
              >
                Rechazar no necesarias
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="px-4 py-2.5 rounded-xl border border-vidaia-primary/35 text-vidaia-primary text-sm font-medium hover:bg-vidaia-light transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Settings2 className="w-4 h-4" />
                Configurar
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="px-4 py-2.5 rounded-xl bg-vidaia-earth hover:bg-vidaia-brown text-white text-sm font-semibold transition-colors"
              >
                Aceptar todo
              </button>
            </div>
          </div>
        </div>
      )}

      {isPreferencesOpen && (
        <div className="fixed inset-0 z-[260] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={closePreferences} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-vidaia-light shadow-2xl">
            <div className="p-5 sm:p-6 border-b border-vidaia-light">
              <button
                type="button"
                onClick={closePreferences}
                aria-label="Cerrar preferencias de cookies"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-vidaia-light hover:bg-vidaia-sand text-vidaia-charcoal flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-base font-semibold text-vidaia-dark">Preferencias de cookies</p>
              <p className="text-sm text-vidaia-charcoal/70 mt-1 leading-relaxed">
                Puedes decidir qué categorias de cookies no esenciales quieres permitir.
              </p>
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              <Toggle
                checked
                disabled
                label="Necesarias"
                description="Permiten funciones basicas de seguridad, navegacion y formulario. Siempre estan activas."
              />
              <Toggle
                checked={preferences.analytics}
                onChange={(next) => setPreferences(prev => ({ ...prev, analytics: next }))}
                label="Analitica"
                description="Nos ayuda a entender el uso de la web para mejorar contenidos y experiencia."
              />
              <Toggle
                checked={preferences.marketing}
                onChange={(next) => setPreferences(prev => ({ ...prev, marketing: next }))}
                label="Marketing"
                description="Reservada para futuras campañas y personalizacion publicitaria. Actualmente no se cargan scripts de esta categoria."
              />
              <Toggle
                checked={preferences.personalization}
                onChange={(next) => setPreferences(prev => ({ ...prev, personalization: next }))}
                label="Personalizacion"
                description="Preparada para futuras funciones del portal de clientes con experiencia personalizada no tecnica."
              />
            </div>

            <div className="p-5 sm:p-6 border-t border-vidaia-light flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={rejectOptional}
                className="px-4 py-2.5 rounded-xl border border-vidaia-charcoal/25 text-vidaia-charcoal text-sm font-medium hover:bg-vidaia-light transition-colors"
              >
                Rechazar no necesarias
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="px-4 py-2.5 rounded-xl border border-vidaia-primary/35 text-vidaia-primary text-sm font-medium hover:bg-vidaia-light transition-colors"
              >
                Aceptar todo
              </button>
              <button
                type="button"
                onClick={() => savePreferences(preferences)}
                className="px-4 py-2.5 rounded-xl bg-vidaia-earth hover:bg-vidaia-brown text-white text-sm font-semibold transition-colors"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

