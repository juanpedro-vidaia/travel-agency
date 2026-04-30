import {
  ENABLED_LANGUAGES,
  DEFAULT_LANGUAGE,
  isLanguageEnabled,
} from '@/lib/config/languages.config'

export type Language = string

export { ENABLED_LANGUAGES, DEFAULT_LANGUAGE }

export function isValidLanguage(code: unknown): code is Language {
  return typeof code === 'string' && isLanguageEnabled(code)
}

export function getValidLanguage(code: unknown): Language {
  if (isValidLanguage(code)) return code
  return DEFAULT_LANGUAGE
}
