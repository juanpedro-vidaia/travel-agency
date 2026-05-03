import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getItinerary, getAllItineraries } from '@/lib/services/itinerariesService'
import { getTripBySlug } from '@/lib/services/tripsService'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import JsonLd from '@/components/JsonLd'
import ItineraryContent from './ItineraryContent'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const itinerary = getItinerary(slug)
  if (!itinerary) return {}
  const trip = getTripBySlug(slug)
  return buildMetadata({
    title: `${itinerary.content.es.title} — Viajes Vidaia`,
    description: trip?.content.es.subtitle ?? itinerary.content.es.title,
    path: `/${lang}/itinerarios/${slug}`,
    lang,
    ogType: 'article',
  })
}

export function generateStaticParams() {
  const itineraries = getAllItineraries()
  return ENABLED_LANGUAGES.flatMap(lang =>
    itineraries.map(i => ({ lang, slug: i.slug }))
  )
}

export default async function ItineraryPage({ params }: Props) {
  const { lang, slug } = await params
  const itinerary = getItinerary(slug)
  if (!itinerary) notFound()

  const trip = getTripBySlug(slug)
  const tourJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: itinerary.content.es.title,
    description: trip?.content.es.subtitle ?? itinerary.content.es.title,
    url: `https://www.viajesvidaia.com/${lang}/itinerarios/${slug}`,
    provider: {
      '@type': 'TravelAgency',
      name: 'Viajes Vidaia',
      url: 'https://www.viajesvidaia.com',
    },
    ...(trip && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: trip.priceFrom,
        availability: 'https://schema.org/InStock',
      },
    }),
  }

  return (
    <>
      <JsonLd data={tourJsonLd} />
      <ItineraryContent slug={slug} />
    </>
  )
}
