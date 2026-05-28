'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import LangLink from '@/components/ui/LangLink'
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Waves,
  UtensilsCrossed,
  Music,
  Mountain,
  Binoculars,
  Snowflake,
  Wine,
  CableCar,
  Building2,
  TreePine,
  MountainSnow,
  Fish,
  Landmark,
  Shell,
  TreePalm,
  type LucideIcon,
} from 'lucide-react'
import { getItineraryWithDetails, getItineraryOptionals } from '@/lib/services/itinerariesService'
import { getTripBySlug } from '@/lib/services/tripsService'
import { getCountryBySlug } from '@/lib/services/countriesService'
import type { ResolvedFAQ } from '@/lib/services/faqsService'
import { formatPrice, renderTemplate } from '@/lib/helpers/contentHelpers'
import { useLanguage } from '@/lib/hooks/useLanguage'
import FaqSection from '@/components/sections/FaqSection'
import ItineraryHeroCarousel from './ItineraryHeroCarousel'
import ItineraryDayAccordion from './ItineraryDayAccordion'
import ItineraryHotels from './ItineraryHotels'
import ItineraryRelated from './ItineraryRelated'

const ItineraryMap = dynamic(() => import('@/components/ui/ItineraryMap'), { ssr: false })

const ACTIVITY_ICON_MAP: Record<string, LucideIcon> = {
  Waves,
  UtensilsCrossed,
  Music,
  Mountain,
  Binoculars,
  Snowflake,
  Wine,
  CableCar,
  Building2,
  TreePine,
  MountainSnow,
  Fish,
  Landmark,
  Shell,
  TreePalm,
}

export default function ItineraryContent({ slug, faqs }: { slug: string; faqs: ResolvedFAQ[] }) {
  const itinerary = getItineraryWithDetails(slug)
  const trip = getTripBySlug(slug)
  const optionalActivities = getItineraryOptionals(slug)
  const { content: pageContent, ui } = useLanguage()
  const content = pageContent.itineraryPage

  const tripCountries = useMemo(() => {
    if (!trip) return []
    const slugs = Array.isArray(trip.country) ? trip.country : [trip.country]
    return slugs
      .map((s) => getCountryBySlug(s))
      .filter((c): c is NonNullable<ReturnType<typeof getCountryBySlug>> => c !== undefined)
  }, [trip])

  const optionals = useMemo(
    () =>
      optionalActivities.map((activity) => ({
        Icon: ACTIVITY_ICON_MAP[activity.icon ?? ''] ?? Star,
        title: activity.content.es.name,
        description: activity.content.es.description,
      })),
    [optionalActivities]
  )

  if (!itinerary || !trip) return null

  const requestHref = `/itinerarios/${slug}/personalizar`

  return (
    <main className="min-h-screen bg-white pb-20 lg:pb-0">

      {/* ── HERO CAROUSEL ─────────────────────────────────────────────────────── */}
      <ItineraryHeroCarousel slug={slug} />

      {/* ── VOLVER AL PAÍS ────────────────────────────────────────────────────── */}
      {tripCountries.length > 0 && (
        <section className="py-3 md:py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
            {tripCountries.map((country) => (
              <LangLink
                key={country.slug}
                href={`/destinos/${country.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-vidaia-charcoal/65 hover:text-vidaia-primary border border-gray-200 hover:border-vidaia-primary rounded-full px-4 py-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {renderTemplate(content.backToCountryTemplate, { country: country.content.es.name })}
              </LangLink>
            ))}
          </div>
        </section>
      )}

      {/* ── DESCRIPCIÓN ───────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base sm:text-xl text-vidaia-charcoal/80 leading-relaxed">
            <span className="md:hidden">{itinerary.content.es.descriptionMobile ?? itinerary.content.es.description}</span>
            <span className="hidden md:inline">{itinerary.content.es.description}</span>
          </p>
          <LangLink
            href={requestHref}
            className="hidden md:inline-flex items-center gap-2 mt-8 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors text-base sm:text-lg"
          >
            {content.hero.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </LangLink>
        </div>
      </section>

      {/* ── ITINERARIO ACORDEÓN ───────────────────────────────────────────────── */}
      <ItineraryDayAccordion slug={slug} />

      {/* ── MAPA DEL ITINERARIO ───────────────────────────────────────────────── */}
      <section className="hidden md:block py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-vidaia-dark mb-2 text-center">
            {ui.map.title}
          </h2>
          <p className="text-center text-vidaia-charcoal/55 text-sm mb-8">{ui.map.subtitle}</p>
          <ItineraryMap
            accommodationStops={itinerary.accommodationStops}
            nightLabel={content.labels.night}
            nightsLabel={content.labels.nights}
          />
        </div>
      </section>

      {/* ── HOTELES ───────────────────────────────────────────────────────────── */}
      <ItineraryHotels slug={slug} />

      {/* ── OPCIONALES ────────────────────────────────────────────────────────── */}
      {optionals.length > 0 && (
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-amber-700 font-semibold tracking-widest uppercase text-xs mb-3">
              {content.optionals.overline}
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-vidaia-dark mb-6 md:mb-12">
              {content.optionals.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {optionals.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-amber-100 text-left hover:border-amber-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-amber-700" />
                  </div>
                  <h3 className="font-semibold text-vidaia-dark mb-2">⭐ {title}</h3>
                  <p className="text-sm text-vidaia-charcoal/70 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── VIAJES RELACIONADOS ───────────────────────────────────────────────── */}
      <ItineraryRelated slug={slug} />

      {/* ── FAQs ──────────────────────────────────────────────────────────────── */}
      <FaqSection
        title={content.faqSection.title}
        subtitle={content.faqSection.subtitle}
        faqs={faqs}
      />

      {/* ── PRECIO ────────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 px-4 sm:px-6 lg:px-8 bg-vidaia-dark text-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-vidaia-earth uppercase tracking-widest text-xs font-semibold mb-4">
            {content.price.overline}
          </p>
          {trip.priceFrom != null && trip.priceFrom > 0 && (
            <p className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold mb-1">
              {renderTemplate(content.price.fromTemplate, { price: formatPrice(trip.priceFrom) })}
            </p>
          )}
          <p className="text-white/55 text-sm mb-2">{content.price.perPersonLabel}</p>
          <p className="text-white/40 text-xs mb-12">{content.price.priceNote}</p>
          <LangLink
            href={requestHref}
            className="inline-flex items-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
          >
            {content.price.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </LangLink>
        </div>
      </section>

      {/* ── STICKY CTA (mobile) ───────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-sm border-t border-vidaia-light px-4 py-3 shadow-2xl">
        <LangLink
          href={requestHref}
          className="flex items-center justify-center gap-2 w-full bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-base"
        >
          {content.hero.ctaButton}
          <ArrowRight className="w-5 h-5" />
        </LangLink>
      </div>
    </main>
  )
}
