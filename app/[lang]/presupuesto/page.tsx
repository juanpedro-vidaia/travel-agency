import type { Metadata } from 'next'
import Image from 'next/image'
import PresupuestoForm from '@/components/PresupuestoForm'
import { getStaticContent } from '@/lib/helpers/contentHelpers'
import { getAsset } from '@/lib/data/assets'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import React from 'react'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const content = getStaticContent(lang)
  return {
    title: content.quotePage.metadata.title,
    description: content.quotePage.metadata.description,
  }
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function PresupuestoPage({ params }: Props) {
  const { lang } = await params
  const content = getStaticContent(lang).quotePage
  const heroBg = getAsset('QUOTE_HERO_BG')

  return (
    <div className="min-h-screen bg-vidaia-sand">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroBg.url}
            alt={heroBg.alt}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vidaia-dark/85 via-vidaia-dark/70 to-vidaia-dark/85" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-24">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full mb-7">
            {content.header.overline}
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 text-balance">
            {content.header.title}
          </h1>

          <p className="font-heading text-lg sm:text-xl text-vidaia-earth/90 italic mb-5">
            {content.header.quote.split('{br}').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </p>

          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {content.header.description}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-12 pb-24 relative z-10">
        <PresupuestoForm />
      </div>
    </div>
  )
}
