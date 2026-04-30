'use client'

import { createContext, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { DEFAULT_LANGUAGE, ENABLED_LANGUAGES, LANGUAGES_CONFIG } from '@/lib/config/languages.config'
import type { Language } from '@/lib/data/i18n'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const segments = (pathname ?? '').split('/')
  const langSegment = segments[1]
  const language: Language = ENABLED_LANGUAGES.includes(langSegment) ? langSegment : DEFAULT_LANGUAGE

  function setLanguage(newLang: Language) {
    if (!LANGUAGES_CONFIG[newLang]?.enabled) return
    const rest = segments.slice(2).join('/')
    router.push(`/${newLang}${rest ? '/' + rest : ''}`)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
