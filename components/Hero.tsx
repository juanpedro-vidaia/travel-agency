'use client'

import React from 'react'
import Image from 'next/image'
import LangLink from '@/components/LangLink'
import { ArrowRight } from 'lucide-react'
import ContactModalTrigger from '@/components/ContactModalTrigger'
import { getAsset } from '@/lib/data/assets'
import { useLanguage } from '@/lib/hooks/useLanguage'

const regionContent: Record<string, { flagKey: string; countryName: string }[]> = {
  es: [
    { flagKey: 'FLAGS.AR', countryName: 'Argentina' },
    { flagKey: 'FLAGS.CL', countryName: 'Chile' },
    { flagKey: 'FLAGS.BO', countryName: 'Bolivia' },
  ],
}

export default function Hero() {
  const { content, ui, language } = useLanguage()
  const heroContent = content.home.hero
  const heroBgAsset = getAsset('HOME.HERO_BG')
  const regions = regionContent[language] ?? regionContent.es

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroBgAsset.url}
          alt={heroBgAsset.alt}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Region */}
        <p className="inline-flex flex-wrap justify-center items-center gap-2 text-vidaia-earth text-sm font-semibold uppercase tracking-wide sm:tracking-[0.25em] mb-7">
          {regions.map((region, index) => {
            const flagAsset = getAsset(region.flagKey)
            return (
              <span key={index} className="inline-flex items-center gap-1">
                <Image
                  src={flagAsset.url}
                  alt={flagAsset.alt}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                <span>{region.countryName}</span>
              </span>
            )
          })}
        </p>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance">
          {heroContent.title.split('{br}').map((part: string, index: number) => (
            <React.Fragment key={index}>
              {part.split('{span}').map((subPart: string, subIndex: number) => (
                <span key={subIndex} className={subIndex === 1 ? 'text-vidaia-earth' : ''}>
                  {subPart}
                </span>
              ))}
              {index === 0 && <br />}
            </React.Fragment>
          ))}
        </h1>

        <p className="text-white/75 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance px-2">
          {heroContent.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LangLink
            href="/presupuesto"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            {ui.buttons.requestQuote}
            <ArrowRight className="w-5 h-5" />
          </LangLink>
          <ContactModalTrigger className="inline-flex items-center gap-2 px-8 py-4 border border-white/40 text-white hover:bg-white/10 font-medium rounded-full text-base transition-all duration-200">
            {ui.buttons.talkToUs}
          </ContactModalTrigger>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  )
}
