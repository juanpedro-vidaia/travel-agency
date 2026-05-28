import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getItinerary, getItineraryWithDetails, getAllItineraries } from '@/lib/services/itinerariesService'
import { getTripBySlug } from '@/lib/services/tripsService'
import { generateItineraryFAQs } from '@/lib/services/faqsService'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getDestinations } from '@/lib/services/destinationsService'
import { buildPageSchema, buildTouristTripSchema, buildFAQSchema } from '@/lib/schema'
import JsonLd from '@/components/scripts/JsonLd'
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
    title: itinerary.content.es.metaTitle ?? `${itinerary.content.es.title} — Viajes Vidaia`,
    description: itinerary.content.es.metaDescription ?? trip?.content.es.subtitle ?? itinerary.content.es.title,
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
  const resolvedItinerary = getItineraryWithDetails(slug)
  const itineraryFaqs = resolvedItinerary && trip
    ? generateItineraryFAQs(trip, resolvedItinerary.days)
    : []

  const allDestinations = getDestinations()
  const tripSchemas = trip && resolvedItinerary
    ? [buildTouristTripSchema(trip, resolvedItinerary.days, allDestinations)]
    : []
  const faqSchemas = itineraryFaqs.length > 0 ? [buildFAQSchema(itineraryFaqs)] : []

  return (
    <>
      {(tripSchemas.length > 0 || faqSchemas.length > 0) && (
        <JsonLd data={buildPageSchema(...tripSchemas, ...faqSchemas)} id="ld-itinerary" />
      )}
      <ItineraryContent slug={slug} faqs={itineraryFaqs} />
    </>
  )
}
