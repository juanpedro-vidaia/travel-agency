'use client'

import { useLanguage } from '@/lib/hooks/useLanguage'
import { LANGUAGES_CONFIG, getEnabledLanguages } from '@/lib/config/languages.config'

// Maps language code → flagcdn.com country code (Windows doesn't render flag emojis)
const LANG_FLAG_CODES: Record<string, string> = {
  es: 'es',
  en: 'gb',
  cat: 'es-ct',
}

function FlagImg({ langCode, alt }: { langCode: string; alt: string }) {
  const code = LANG_FLAG_CODES[langCode] ?? langCode
  return (
    <img
      src={`https://flagcdn.com/20x15/${code}.png`}
      alt={alt}
      width={20}
      height={15}
      className="rounded-sm inline-block flex-shrink-0"
    />
  )
}

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
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-vidaia-primary text-white select-none"
      >
        <FlagImg langCode={current.code} alt={current.nativeName} />
        {current.code.toUpperCase()}
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
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-vidaia-primary text-white'
                : isEnabled
                  ? 'text-vidaia-charcoal/60 hover:text-vidaia-primary cursor-pointer'
                  : 'text-vidaia-charcoal/25 cursor-not-allowed'
            }`}
          >
            <FlagImg langCode={lang.code} alt={lang.nativeName} />
            {lang.code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
