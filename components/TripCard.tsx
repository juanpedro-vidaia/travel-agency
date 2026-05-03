import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { getAsset } from '@/lib/data/assets'
import { TAG_CONFIG, type Trip } from '@/lib/data/trips'
import { renderTemplate, formatPrice } from '@/lib/helpers/contentHelpers'

// ── Shared strings passed by the parent ──────────────────────────────────────

interface DefaultStrings {
  variant: 'default'
  durationTemplate: string  // '{days} días / {nights} noches'
  priceTemplate: string     // 'Desde {price}€'
  ctaHasItinerary: string
  ctaNoItinerary: string
}

interface HoneymoonStrings {
  variant: 'honeymoon'
  daysLabel: string         // 'días'
  itineraryLabel: string
  requestInfoLabel: string
}

type TripCardStrings = DefaultStrings | HoneymoonStrings

interface TripCardProps {
  trip: Trip
  lang: string
  strings: TripCardStrings
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TripCard({ trip, lang, strings }: TripCardProps) {
  const tripT = (trip.content[lang as keyof typeof trip.content] ?? trip.content.es)
  const tripImage = getAsset(trip.imageKey)

  if (strings.variant === 'honeymoon') {
    const displayTitle   = tripT.honeymoonTitle ?? tripT.title
    const displayTagline = tripT.honeymoonTagline ?? tripT.subtitle
    const itineraryHref  = `/${lang}/itinerarios/${trip.slug}`
    const infoHref       = `/${lang}/presupuesto-itinerario?titulo=${encodeURIComponent(displayTitle)}`

    return (
      <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
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
            {trip.days} {strings.daysLabel}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <p className="text-xs text-vidaia-earth font-medium mb-1.5">{displayTagline}</p>
          <h3 className="font-heading font-bold text-vidaia-dark text-base leading-snug mb-5 flex-1">{displayTitle}</h3>
          <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-vidaia-light/60">
            {trip.hasItinerary && (
              <Link
                href={itineraryHref}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full bg-vidaia-primary hover:bg-vidaia-dark text-white transition-colors"
              >
                {strings.itineraryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href={infoHref}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full bg-vidaia-earth hover:bg-vidaia-brown text-white transition-colors"
            >
              {strings.requestInfoLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // ── default variant (destinos + viajes) ───────────────────────────────────

  const tripTitle    = tripT.title
  const tripSubtitle = tripT.subtitle
  const href = trip.hasItinerary
    ? `/${lang}/itinerarios/${trip.slug}`
    : `/${lang}/presupuesto-itinerario?titulo=${encodeURIComponent(tripTitle)}&subtitulo=${encodeURIComponent(tripSubtitle)}`
  const ctaLabel = trip.hasItinerary ? strings.ctaHasItinerary : strings.ctaNoItinerary

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={tripImage.url}
          alt={tripImage.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 bg-vidaia-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
          <Calendar className="w-3 h-3" />
          {renderTemplate(strings.durationTemplate, { days: trip.days, nights: trip.nights })}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-vidaia-charcoal/50 mb-2 leading-snug">{tripSubtitle}</p>
        <h3 className="font-heading font-bold text-vidaia-dark text-base leading-snug mb-3">{tripTitle}</h3>
        {trip.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {trip.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-vidaia-light text-vidaia-dark px-2 py-0.5 rounded-full">
                {TAG_CONFIG[tag].icon} {TAG_CONFIG[tag].es.label}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-vidaia-light/60">
          <span className="text-vidaia-primary font-bold text-base">
            {renderTemplate(strings.priceTemplate, { price: formatPrice(trip.priceFrom) })}
          </span>
          <Link
            href={href}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
              trip.hasItinerary
                ? 'bg-vidaia-primary hover:bg-vidaia-dark text-white'
                : 'bg-vidaia-earth hover:bg-vidaia-brown text-white'
            }`}
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
