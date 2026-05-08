export const CONSENT_COOKIE_NAME = 'vidaia_consent'
export const CONSENT_VERSION = '2026-05-v1'
export const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export type ConsentCategory = 'analytics' | 'marketing' | 'personalization'

export type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  personalization: boolean
  version: string
  updatedAt: string
}

export type ConsentPreferences = {
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

export const DEFAULT_PREFERENCES: ConsentPreferences = {
  analytics: false,
  marketing: false,
  personalization: false,
}

export function createConsentState(
  preferences: ConsentPreferences,
  version: string = CONSENT_VERSION
): ConsentState {
  return {
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    personalization: preferences.personalization,
    version,
    updatedAt: new Date().toISOString(),
  }
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

function isValidConsentShape(value: unknown): value is ConsentState {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    candidate.necessary === true &&
    isBoolean(candidate.analytics) &&
    isBoolean(candidate.marketing) &&
    isBoolean(candidate.personalization) &&
    typeof candidate.version === 'string' &&
    typeof candidate.updatedAt === 'string'
  )
}

function getCookieValue(cookieName: string): string | null {
  if (typeof document === 'undefined') return null
  const prefix = `${cookieName}=`
  const parts = document.cookie.split(';').map(part => part.trim())
  const row = parts.find(part => part.startsWith(prefix))
  return row ? row.slice(prefix.length) : null
}

export function readStoredConsent(version: string = CONSENT_VERSION): ConsentState | null {
  const raw = getCookieValue(CONSENT_COOKIE_NAME)
  if (!raw) return null

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as unknown
    if (!isValidConsentShape(parsed)) return null
    if (parsed.version !== version) return null
    return parsed
  } catch {
    return null
  }
}

export function writeStoredConsent(consent: ConsentState) {
  if (typeof document === 'undefined') return
  const payload = encodeURIComponent(JSON.stringify(consent))
  document.cookie = `${CONSENT_COOKIE_NAME}=${payload}; path=/; max-age=${CONSENT_COOKIE_MAX_AGE}; samesite=lax`
}

