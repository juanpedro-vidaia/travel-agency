/**
 * CONFIGURACIÓN CENTRALIZADA DE IDIOMAS
 *
 * Para agregar un idioma:
 * 1. Añade la entrada en LANGUAGES_CONFIG con enabled: false
 * 2. Añade las traducciones en lib/data/staticContent.ts
 * 3. Cambia enabled a true
 * 4. Listo — el selector aparece automáticamente
 */

export interface LanguageConfig {
  code: string
  name: string
  nativeName: string
  flag: string
  enabled: boolean
  default: boolean
  locale: string
}

export const LANGUAGES_CONFIG: Record<string, LanguageConfig> = {
  es: {
    code: 'es',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇪🇸',
    enabled: true,
    default: true,
    locale: 'es-ES',
  },

  // Descomentar cuando las traducciones estén completas en staticContent.ts
  // en: {
  //   code: 'en',
  //   name: 'English',
  //   nativeName: 'English',
  //   flag: '🇬🇧',
  //   enabled: false,
  //   default: false,
  //   locale: 'en-US',
  // },

  // cat: {
  //   code: 'cat',
  //   name: 'Català',
  //   nativeName: 'Català',
  //   flag: '🏴',
  //   enabled: false,
  //   default: false,
  //   locale: 'ca-ES',
  // },
}

// ── Derivadas automáticas ─────────────────────────────────────────────────────

export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES_CONFIG) as string[]
export type SupportedLanguage = string

export const ENABLED_LANGUAGES = Object.entries(LANGUAGES_CONFIG)
  .filter(([, cfg]) => cfg.enabled)
  .map(([code]) => code)

export const DEFAULT_LANGUAGE = Object.entries(LANGUAGES_CONFIG)
  .find(([, cfg]) => cfg.default)?.[0] ?? 'es'

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getLanguageConfig(code: string): LanguageConfig | undefined {
  return LANGUAGES_CONFIG[code]
}

export function isLanguageEnabled(code: string): boolean {
  return ENABLED_LANGUAGES.includes(code)
}

export function getEnabledLanguages(): LanguageConfig[] {
  return ENABLED_LANGUAGES.map(code => LANGUAGES_CONFIG[code])
}
