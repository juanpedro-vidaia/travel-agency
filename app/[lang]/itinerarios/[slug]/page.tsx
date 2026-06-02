import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getItinerary, getItineraryWithDetails, getItineraryOptionals, getAllItineraries } from '@/lib/services/itinerariesService'
import { getTripBySlug, getRelatedTripsBySlug } from '@/lib/services/tripsService'
import { getCountryBySlug } from '@/lib/services/countriesService'
import { generateItineraryFAQs } from '@/lib/services/faqsService'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getDestinations } from '@/lib/services/destinationsService'
import { buildPageSchema, buildTouristTripSchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema'
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

  if (!trip || !resolvedItinerary) notFound()

  const allDestinations = getDestinations()

  // FAQs + JSON-LD (server-side)
  const itineraryFaqs = generateItineraryFAQs(trip, resolvedItinerary.days)
  const tripSchemas = [buildTouristTripSchema(trip, resolvedItinerary.days, allDestinations)]
  const faqSchemas = itineraryFaqs.length > 0 ? [buildFAQSchema(itineraryFaqs)] : []

  // Countries for back-links and hero
  const countrySlugs = Array.isArray(trip.country) ? trip.country : [trip.country]
  const countries = countrySlugs
    .map(s => getCountryBySlug(s))
    .filter((c): c is NonNullable<typeof c> => c !== undefined)

  // Related trips for ItineraryRelated
  const relatedTrips = getRelatedTripsBySlug(slug)

  // Optional activities (serializable — icon name as string, not Lucide component)
  const optionals = getItineraryOptionals(slug).map(a => ({
    title: a.content.es.name,
    description: a.content.es.description,
    icon: a.icon ?? '',
  }))

  // Destination name lookup (removes getDestinationById calls from client)
  const destinationNames: Record<string, string> = Object.fromEntries(
    allDestinations.map(d => [d.id, d.content.es.name])
  )

  // Destination coords lookup for ItineraryMap (removes allDestinations import from client)
  const destCoords: Record<string, { name: string; lat: number; lng: number }> = Object.fromEntries(
    allDestinations
      .filter((d): d is typeof d & { lat: number; lng: number } => d.lat != null && d.lng != null)
      .map(d => [d.id, { name: d.content.es.name, lat: d.lat, lng: d.lng }])
  )

  return (
    <>
      <JsonLd data={buildPageSchema(
        ...tripSchemas,
        ...faqSchemas,
        buildBreadcrumbSchema(lang, [
          { name: 'Inicio', path: '' },
          { name: 'Viajes', path: '/viajes' },
          { name: trip.content.es.title },
        ]),
      )} id="ld-itinerary" />
      <ItineraryContent
        slug={slug}
        resolvedItinerary={resolvedItinerary}
        trip={trip}
        countries={countries}
        relatedTrips={relatedTrips}
        optionals={optionals}
        destinationNames={destinationNames}
        destCoords={destCoords}
        faqs={itineraryFaqs}
      />
    </>
  )
}
