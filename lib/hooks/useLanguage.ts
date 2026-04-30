'use client'

import { useContext } from 'react'
import { LanguageContext } from '@/lib/context/LanguageContext'
import { STATIC_CONTENT, COMMON_UI } from '@/lib/data/staticContent'
import type { Language } from '@/lib/data/i18n'

export function useLanguage() {
  const { language, setLanguage } = useContext(LanguageContext)

  return {
    language,
    setLanguage,
    content: (STATIC_CONTENT[language as keyof typeof STATIC_CONTENT] ?? STATIC_CONTENT.es) as typeof STATIC_CONTENT.es,
    ui: (COMMON_UI[language as keyof typeof COMMON_UI] ?? COMMON_UI.es) as typeof COMMON_UI.es,
    getContent: (lang: Language) =>
      (STATIC_CONTENT[lang as keyof typeof STATIC_CONTENT] ?? STATIC_CONTENT.es) as typeof STATIC_CONTENT.es,
  }
}
