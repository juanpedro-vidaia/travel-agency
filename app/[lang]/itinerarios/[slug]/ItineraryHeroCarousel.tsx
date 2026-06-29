'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import LangLink from '@/components/ui/LangLink'
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react'
import { TAG_CONFIG } from '@/lib/data/tagConfig'
import { getAsset } from '@/lib/data/assets'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import type { ResolvedItinerary } from '@/lib/services/itinerariesService'
import type { Trip } from '@/lib/data/trips'
import type { Country } from '@/lib/data/countries'

const PILL_CLASS =
  'flex items-center gap-1.5 bg-white/20 backdrop-blur-xs border border-white/30 rounded-full px-4 py-2 text-sm font-medium text-white'

interface Props {
  slug: string
  resolvedItinerary: ResolvedItinerary
  trip: Trip
  countries: Country[]
}

export default function ItineraryHeroCarousel({ slug, resolvedItinerary, trip, countries }: Props) {
  const { content: pageContent, ui } = useLanguage()
  const content = pageContent.itineraryPage

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isMobile = useIsMobile()

  const slides = useMemo(
    () =>
      (resolvedItinerary.content.es.heroImages ?? []).map((h) => {
        const asset = getAsset(h.imageKey)
        const src = isMobile ? (asset.url_mobile ?? asset.url) : asset.url
        return { src, alt: asset.alt || h.location, location: h.location }
      }),
    [resolvedItinerary, isMobile]
  )

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (isPaused || slides.length === 0) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide, slides.length])

  const requestHref = `/itinerarios/${slug}/personalizar`

  return (
    <section
      className="relative h-[calc(100dvh-72px)] min-h-[600px] md:h-screen md:min-h-[620px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/70" />
        </div>
      ))}

      <div className="relative z-10 h-full flex flex-col items-center justify-center pt-24 md:pt-28 pb-12 text-white text-center px-6 sm:px-8">
        <p className="text-vidaia-earth font-semibold tracking-widest uppercase text-xs mb-2 sm:mb-5">
          {content.hero.eyebrowPrefix}
          {countries.length > 0 && (
            <> · {countries.map((c) => c.content.es.name).join(' + ')}</>
          )}
        </p>

        <h1 className="font-heading text-3xl sm:text-4xl 2xl:text-6xl font-bold max-w-4xl leading-tight mb-2 sm:mb-3 text-balance">
          <span className="md:hidden">{resolvedItinerary.content.es.heroTitleMobile ?? trip.content.es.title}</span>
          <span className="hidden md:inline">{trip.content.es.title}</span>
        </h1>

        <p className="text-base sm:text-xl text-white/90 max-w-2xl mb-1 sm:mb-2">
          {trip.content.es.subtitle}
        </p>

        <p className="text-white/65 text-sm sm:text-base mb-0 sm:mb-8">
          🗓 {trip.days} {ui.labels.days} · 🌙 {trip.nights} {content.labels.nights}
        </p>

        <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-2xl">
          {trip.tags.map((tag) => (
            <span key={tag} className={PILL_CLASS}>
              {TAG_CONFIG[tag].icon} {TAG_CONFIG[tag].es.label}
            </span>
          ))}
          {trip.includesInternationalFlights && (
            <span className={PILL_CLASS}>✈️ {content.hero.internationalFlightsLabel}</span>
          )}
          {trip.includesDomesticFlights && (
            <span className={PILL_CLASS}>✈️ {content.hero.domesticFlightsLabel}</span>
          )}
        </div>

        <LangLink
          href={requestHref}
          className="hidden lg:inline-flex items-center gap-2 mt-10 bg-vidaia-earthDark hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
        >
          {content.hero.ctaButton}
          <ArrowRight className="w-5 h-5" />
        </LangLink>
      </div>

      <div className="absolute bottom-16 sm:bottom-8 left-6 sm:left-8 z-10 pointer-events-none">
        <span className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {slides[currentSlide]?.location}
        </span>
      </div>

      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-xs rounded-full items-center justify-center text-white transition-colors"
        aria-label={content.hero.ariaLabelPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-xs rounded-full items-center justify-center text-white transition-colors"
        aria-label={content.hero.ariaLabelNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-6 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 p-3 -m-3 md:p-0 md:m-0 ${
              index === currentSlide ? 'bg-vidaia-earth w-6' : 'bg-white/50 w-2 hover:bg-white/80'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
