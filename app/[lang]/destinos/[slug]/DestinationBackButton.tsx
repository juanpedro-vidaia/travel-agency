'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  lang: string
  label: string
}

export default function DestinationBackButton({ lang, label }: Props) {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  if (from !== 'home' && from !== 'viajes') return null

  const href =
    from === 'home'
      ? `/${lang}#destinations-section`
      : `/${lang}/viajes#destinations-section`

  return (
    <section className="py-3 md:py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-vidaia-charcoal/65 hover:text-vidaia-primary border border-gray-200 hover:border-vidaia-primary rounded-full px-4 py-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {label}
        </Link>
      </div>
    </section>
  )
}
