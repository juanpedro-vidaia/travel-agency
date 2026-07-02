'use client'

import { useEffect } from 'react'
import { CircleAlert } from 'lucide-react'
import { useLanguage } from '@/lib/hooks/useLanguage'
import LangLink from '@/components/ui/LangLink'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { content } = useLanguage()
  const t = content.errorPage

  useEffect(() => {
    console.error('[error-boundary]', error)
  }, [error])

  return (
    <main className="min-h-screen bg-linear-to-b from-vidaia-charcoal to-vidaia-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto pt-28 pb-20">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CircleAlert className="w-10 h-10 text-vidaia-earth" strokeWidth={2} />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
          {t.title}
        </h1>
        <p className="text-white/70 text-base leading-relaxed mb-8">
          {t.subtitle}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-vidaia-earthDark hover:bg-vidaia-brown text-white font-bold text-sm rounded-2xl transition-all shadow-xs hover:shadow-md"
        >
          {t.retry}
        </button>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <LangLink href="/" className="text-white/80 font-medium hover:text-white hover:underline">
            {t.cta}
          </LangLink>
        </div>
      </div>
    </main>
  )
}
