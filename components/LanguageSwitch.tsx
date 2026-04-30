'use client'

import { useLanguage } from '@/lib/hooks/useLanguage'
import { LANGUAGES_CONFIG, getEnabledLanguages } from '@/lib/config/languages.config'

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()
  const allLanguages = Object.values(LANGUAGES_CONFIG)
  const enabled = getEnabledLanguages()

  // Single enabled language: show it as a static badge (no interaction).
  if (enabled.length <= 1) {
    const current = LANGUAGES_CONFIG[language]
    if (!current) return null
    return (
      <span
        title={current.nativeName}
        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-vidaia-primary text-white select-none"
      >
        {current.flag} {current.code.toUpperCase()}
      </span>
    )
  }

  // Multiple enabled languages: full interactive selector.
  return (
    <div className="flex items-center gap-1">
      {allLanguages.map(lang => {
        const isActive = language === lang.code
        const isEnabled = lang.enabled

        return (
          <button
            key={lang.code}
            onClick={() => isEnabled ? setLanguage(lang.code) : undefined}
            title={isEnabled ? lang.nativeName : `${lang.nativeName} — próximamente`}
            disabled={!isEnabled}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-vidaia-primary text-white'
                : isEnabled
                  ? 'text-vidaia-charcoal/60 hover:text-vidaia-primary cursor-pointer'
                  : 'text-vidaia-charcoal/25 cursor-not-allowed'
            }`}
          >
            {lang.flag} {lang.code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
