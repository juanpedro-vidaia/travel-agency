'use client'

import { createContext, useContext, useEffect, useMemo, useState, startTransition, type ReactNode } from 'react'
import {
  CONSENT_VERSION,
  DEFAULT_PREFERENCES,
  createConsentState,
  readStoredConsent,
  type ConsentCategory,
  type ConsentPreferences,
  type ConsentState,
  writeStoredConsent,
} from '@/lib/consent/consent'

interface ConsentContextValue {
  consent: ConsentState
  isReady: boolean
  isBannerOpen: boolean
  isPreferencesOpen: boolean
  consentVersion: string
  acceptAll: () => void
  rejectOptional: () => void
  savePreferences: (preferences: ConsentPreferences) => void
  openPreferences: () => void
  closePreferences: () => void
  canUseCategory: (category: ConsentCategory) => boolean
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [isBannerOpen, setIsBannerOpen] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [consent, setConsent] = useState<ConsentState>(
    createConsentState(DEFAULT_PREFERENCES, CONSENT_VERSION)
  )

  useEffect(() => {
    const stored = readStoredConsent(CONSENT_VERSION)
    startTransition(() => {
      if (stored) {
        setConsent(stored)
        setIsBannerOpen(false)
      } else {
        setConsent(createConsentState(DEFAULT_PREFERENCES, CONSENT_VERSION))
        setIsBannerOpen(true)
      }
      setIsReady(true)
    })
  }, [])

  const saveAndClose = (next: ConsentState) => {
    setConsent(next)
    writeStoredConsent(next)
    setIsBannerOpen(false)
    setIsPreferencesOpen(false)
  }

  const value = useMemo<ConsentContextValue>(() => ({
    consent,
    isReady,
    isBannerOpen,
    isPreferencesOpen,
    consentVersion: CONSENT_VERSION,
    acceptAll: () => {
      const next = createConsentState(
        { analytics: true, marketing: true, personalization: true },
        CONSENT_VERSION
      )
      saveAndClose(next)
    },
    rejectOptional: () => {
      const next = createConsentState(DEFAULT_PREFERENCES, CONSENT_VERSION)
      saveAndClose(next)
    },
    savePreferences: (preferences: ConsentPreferences) => {
      const next = createConsentState(preferences, CONSENT_VERSION)
      saveAndClose(next)
    },
    openPreferences: () => setIsPreferencesOpen(true),
    closePreferences: () => setIsPreferencesOpen(false),
    canUseCategory: (category: ConsentCategory) => consent[category],
  }), [consent, isBannerOpen, isPreferencesOpen, isReady])

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be used inside ConsentProvider')
  return ctx
}

