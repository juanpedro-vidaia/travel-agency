'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  from: string | undefined
  lang: string
  label: string
}

export default function DestinationBackButton({ from, lang, label }: Props) {
  if (from !== 'home' && from !== 'viajes') return null

  const href =
    from === 'home'
      ? `/${lang}#destinations-section`
      : `/${lang}/viajes#destinations-section`

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-vidaia-charcoal/65 hover:text-vidaia-primary border border-gray-200 hover:border-vidaia-primary rounded-full px-4 py-2 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  )
}
