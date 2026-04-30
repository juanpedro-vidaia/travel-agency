import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Calendar } from 'lucide-react'
import { getHoneymoonTrips } from '@/lib/services/tripsService'
import HoneymoonFaq from '@/components/HoneymoonFaq'
import { STATIC_CONTENT, COMMON_UI } from '@/lib/data/staticContent'
import { getAsset } from '@/lib/data/assets'
import React from 'react'

export const metadata: Metadata = {
  title: STATIC_CONTENT.es.honeymoonPage.metadata.title,
  description: STATIC_CONTENT.es.honeymoonPage.metadata.description,
}

export default function LunasDeMielPage() {
  const honeymoonTrips = getHoneymoonTrips()
  const content = STATIC_CONTENT.es.honeymoonPage
  const heroBg = getAsset('HONEYMOON_HERO_BG')

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src={heroBg.url}
          alt={heroBg.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/65" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-8">
          <p className="text-vidaia-earth font-medium tracking-widest uppercase text-sm mb-5">
            {content.hero.overline}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-5 text-balance">
            {content.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 max-w-xl font-light italic">
            {content.hero.subtitle.split('{br}').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="https://reuniones.clientify.com/#/viajesvidaia/hablemos30min?v2=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
            >
              {COMMON_UI.es.buttons.freeMeeting}
            </Link>
            <Link
              href="/presupuesto"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
            >
              {COMMON_UI.es.buttons.tellUsYourTrip}
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTRODUCCIÓN ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-8 h-8 text-vidaia-earth mx-auto mb-6" fill="currentColor" />
          <p className="text-vidaia-charcoal/80 text-lg sm:text-xl leading-relaxed">
            {content.introSection.paragraph.split('{br}').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>

      {/* ── SECCIÓN 1: QUÉ NOS DIFERENCIA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            {content.whatMakesUsDifferent.title}
          </h2>
          <p className="text-center text-vidaia-charcoal/55 text-sm mb-14">
            {content.whatMakesUsDifferent.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.whatMakesUsDifferent.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-vidaia-sand rounded-2xl p-7 border border-vidaia-light hover:border-vidaia-earth hover:shadow-md transition-all"
              >
                <span className="text-3xl mb-4 block">{feature.emoji}</span>
                <h3 className="font-heading font-bold text-vidaia-dark text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-vidaia-charcoal/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: CÓMO LO DISEÑAMOS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            {content.howWeDesignIt.title}
          </h2>
          <p className="text-center text-vidaia-charcoal/55 text-sm mb-16">
            {content.howWeDesignIt.subtitle}
          </p>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            <div className="absolute top-5 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px border-t-2 border-dashed border-vidaia-light" />
            <div className="grid grid-cols-4 gap-6">
              {content.howWeDesignIt.steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-vidaia-primary text-white flex items-center justify-center font-heading font-bold text-lg mb-5 shadow-sm">
                    {i + 1}
                  </div>
                  <h3 className="font-heading font-bold text-vidaia-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-vidaia-charcoal/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden space-y-0">
            {content.howWeDesignIt.steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-vidaia-primary text-white flex items-center justify-center font-heading font-bold text-lg shrink-0 shadow-sm">
                    {i + 1}
                  </div>
                  {i < content.howWeDesignIt.steps.length - 1 && (
                    <div className="w-px flex-1 bg-vidaia-light my-2 min-h-[2rem]" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-heading font-bold text-vidaia-dark mb-1 mt-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-vidaia-charcoal/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: POR QUÉ A MEDIDA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-12">
            {content.whyCustomHoneymoon.title}
          </h2>
          <ul className="space-y-5 text-left">
            {content.whyCustomHoneymoon.reasons.map((reason, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart
                  className="w-5 h-5 text-vidaia-earth shrink-0"
                  fill="currentColor"
                />
                <span className="text-lg text-vidaia-charcoal/80">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SECCIÓN 4: IDEAS DE LUNAS DE MIEL ── */}
      {honeymoonTrips.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-sand">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
              {content.honeymoonIdeas.title}
            </h2>
            <p className="text-center text-vidaia-charcoal/55 text-sm mb-14">
              {content.honeymoonIdeas.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {honeymoonTrips.map((trip) => {
                const infoHref = `/presupuesto-itinerario?titulo=${encodeURIComponent(trip.content.es.honeymoonTitle ?? trip.content.es.title)}`
                const itineraryHref = `/itinerarios/${trip.slug}`
                const displayTitle = trip.content.es.honeymoonTitle ?? trip.content.es.title
                const displayTagline = trip.content.es.honeymoonTagline ?? trip.content.es.subtitle
                const tripImage = getAsset(trip.imageKey)

                return (
                  <article
                    key={trip.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={tripImage.url}
                        alt={displayTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span className="absolute top-3 right-3 flex items-center gap-1 bg-vidaia-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
                        <Calendar className="w-3 h-3" />
                        {trip.days} {COMMON_UI.es.labels.days}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-vidaia-earth font-medium mb-1.5">
                        {displayTagline}
                      </p>
                      <h3 className="font-heading font-bold text-vidaia-dark text-base leading-snug mb-5 flex-1">
                        {displayTitle}
                      </h3>

                      <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-vidaia-light/60">
                        {trip.hasItinerary && (
                          <Link
                            href={itineraryHref}
                            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full bg-vidaia-primary hover:bg-vidaia-dark text-white transition-colors"
                          >
                            {COMMON_UI.es.buttons.itinerary}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={infoHref}
                          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full bg-vidaia-earth hover:bg-vidaia-brown text-white transition-colors"
                        >
                          {COMMON_UI.es.buttons.requestInfo}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── SECCIÓN 5: FAQ ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            {content.faqSection.title}
          </h2>
          <p className="text-center text-vidaia-charcoal/55 text-sm mb-12">
            {content.faqSection.subtitle}
          </p>
          <HoneymoonFaq />
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-vidaia-dark via-[#2a5060] to-vidaia-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Heart className="w-10 h-10 text-vidaia-earth mx-auto mb-6" fill="currentColor" />
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {content.finalCta.title}
          </h2>
          <p className="text-white/70 text-lg mb-10">
            {content.finalCta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://reuniones.clientify.com/#/viajesvidaia/hablemos30min?v2=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
            >
              {COMMON_UI.es.buttons.freeMeeting}
            </Link>
            <Link
              href="/presupuesto"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
            >
              {COMMON_UI.es.buttons.tellUsYourTrip}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
