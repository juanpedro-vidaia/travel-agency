'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import LangLink from '@/components/ui/LangLink'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Wallet,
  CalendarRange,
  MapPin,
  Gauge,
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
import type { ResolvedItinerary } from '@/lib/services/itinerariesService'
import type { Trip } from '@/lib/data/trips'
import type { Country } from '@/lib/data/countries'
import type { ResolvedFAQ } from '@/lib/services/faqsService'
import { formatPrice, renderTemplate, formatBestMonths } from '@/lib/helpers/contentHelpers'
import { DIFFICULTY_CONFIG } from '@/lib/data/tagConfig'
import { useLanguage } from '@/lib/hooks/useLanguage'
import FaqSection from '@/components/sections/FaqSection'
import SectionHeader from '@/components/sections/SectionHeader'
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

interface Props {
  slug: string
  resolvedItinerary: ResolvedItinerary
  trip: Trip
  countries: Country[]
  relatedTrips: Trip[]
  optionals: { title: string; description: string; icon: string }[]
  destinationNames: Record<string, string>
  destCoords: Record<string, { name: string; lat: number; lng: number }>
  faqs: ResolvedFAQ[]
}

export default function ItineraryContent({
  slug,
  resolvedItinerary,
  trip,
  countries,
  relatedTrips,
  optionals,
  destinationNames,
  destCoords,
  faqs,
}: Props) {
  const { content: pageContent, ui } = useLanguage()
  const content = pageContent.itineraryPage

  const optionalsWithIcons = useMemo(
    () =>
      optionals.map(o => ({
        Icon: ACTIVITY_ICON_MAP[o.icon] ?? Star,
        title: o.title,
        description: o.description,
      })),
    [optionals]
  )

  const requestHref = `/itinerarios/${slug}/personalizar`

  const hasPrice = trip.priceFrom != null && trip.priceFrom > 0

  // ── Datos clave (bloque citable para GEO) ──────────────────────────────────
  const kf = content.keyFacts
  const bestSeason = formatBestMonths(trip.bestMonths)
  const countryNames = countries.map(c => c.content.es.name).join(' · ')
  const keyFacts: { Icon: LucideIcon; label: string; value: string }[] = [
    { Icon: Clock, label: kf.duration, value: renderTemplate(kf.durationValueTemplate, { days: trip.days, nights: trip.nights }) },
    ...(trip.priceFrom != null
      ? [{ Icon: Wallet, label: kf.priceFrom, value: trip.priceFrom > 0 ? `${formatPrice(trip.priceFrom)}€` : kf.priceConsult }]
      : []),
    ...(bestSeason ? [{ Icon: CalendarRange, label: kf.bestSeason, value: bestSeason }] : []),
    ...(countryNames ? [{ Icon: MapPin, label: kf.countries, value: countryNames }] : []),
    ...(trip.difficulty ? [{ Icon: Gauge, label: kf.difficulty, value: DIFFICULTY_CONFIG[trip.difficulty].es.label }] : []),
  ]

  return (
    <main className="min-h-screen bg-white pb-20 lg:pb-0">

      {/* ── HERO CAROUSEL ─────────────────────────────────────────────────────── */}
      <ItineraryHeroCarousel
        slug={slug}
        resolvedItinerary={resolvedItinerary}
        trip={trip}
        countries={countries}
      />

      {/* ── VOLVER AL PAÍS ────────────────────────────────────────────────────── */}
      {countries.length > 0 && (
        <section className="py-3 md:py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
            {countries.map((country) => (
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

      {/* ── DATOS CLAVE ───────────────────────────────────────────────────────── */}
      <section className="pt-8 md:pt-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full">
              {kf.overline}
            </span>
          </div>
          <dl className="flex flex-wrap gap-3 md:gap-4">
            {keyFacts.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-100 bg-vidaia-sand/50 px-4 py-3 flex-1 min-w-[150px]"
              >
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-vidaia-charcoal/55">
                  <Icon className="w-4 h-4 text-vidaia-primary shrink-0" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="text-sm font-semibold text-vidaia-dark mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── DESCRIPCIÓN ───────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base sm:text-xl text-vidaia-charcoal/80 leading-relaxed">
            <span className="md:hidden">{resolvedItinerary.content.es.descriptionMobile ?? resolvedItinerary.content.es.description}</span>
            <span className="hidden md:inline">{resolvedItinerary.content.es.description}</span>
          </p>
          <LangLink
            href={requestHref}
            className="hidden md:inline-flex items-center gap-2 mt-8 bg-vidaia-earthDark hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors text-base sm:text-lg"
          >
            {content.hero.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </LangLink>
        </div>
      </section>

      {/* ── ITINERARIO ACORDEÓN ───────────────────────────────────────────────── */}
      <ItineraryDayAccordion
        resolvedItinerary={resolvedItinerary}
        destinationNames={destinationNames}
      />

      {/* ── MAPA DEL ITINERARIO ───────────────────────────────────────────────── */}
      <section className="hidden md:block py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader overline={ui.map.overline} title={ui.map.title} subtitle={ui.map.subtitle} />
          <ItineraryMap
            accommodationStops={resolvedItinerary.accommodationStops}
            destCoords={destCoords}
            nightLabel={content.labels.night}
            nightsLabel={content.labels.nights}
          />
        </div>
      </section>

      {/* ── HOTELES ───────────────────────────────────────────────────────────── */}
      <ItineraryHotels
        resolvedItinerary={resolvedItinerary}
        destinationNames={destinationNames}
      />

      {/* ── OPCIONALES ────────────────────────────────────────────────────────── */}
      {optionalsWithIcons.length > 0 && (
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader overline={content.optionals.overline} title={content.optionals.title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {optionalsWithIcons.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-4 md:p-6 shadow-xs border border-amber-100 text-left hover:border-amber-300 hover:shadow-md transition-all"
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
      <ItineraryRelated relatedTrips={relatedTrips} mainTrip={trip} />

      {/* ── FAQs ──────────────────────────────────────────────────────────────── */}
      <FaqSection
        title={content.faqSection.title}
        subtitle={content.faqSection.subtitle}
        faqs={faqs}
      />

      {/* ── PRECIO ────────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 px-4 sm:px-6 lg:px-8 bg-vidaia-dark text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            {hasPrice ? content.price.overline : content.price.consultOverline}
          </span>
          {hasPrice ? (
            <>
              <p className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold mb-1">
                {renderTemplate(content.price.fromTemplate, { price: formatPrice(trip.priceFrom!) })}
              </p>
              <p className="text-white/75 text-sm mb-2">{content.price.perPersonLabel}</p>
              <p className="text-white/60 text-xs mb-12">{content.price.priceNote}</p>
            </>
          ) : (
            <p className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
              {content.price.consultText}
            </p>
          )}
          <LangLink
            href={requestHref}
            className="inline-flex items-center gap-2 bg-vidaia-earthDark hover:bg-vidaia-brown text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
          >
            {content.price.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </LangLink>
        </div>
      </section>

      <LangLink
        href={requestHref}
        className="fixed bottom-6 left-4 right-[80px] z-50 lg:hidden flex items-center justify-center gap-2 bg-vidaia-earthDark hover:bg-vidaia-brown text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-sm sm:text-base"
      >
        <span className="w-5 h-5 sm:hidden" /> {/* espaciador invisible */}
        <span>{content.hero.ctaButton}</span>
        <ArrowRight className="w-5 h-5 hidden sm:block" />
      </LangLink>
    </main>
  )
}
