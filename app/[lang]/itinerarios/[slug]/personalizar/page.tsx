import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { STATIC_CONTENT } from '@/lib/data/staticContent'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getItinerary, getAllItineraries } from '@/lib/services/itinerariesService'
import { getTripBySlug } from '@/lib/services/tripsService'
import { getCountriesOrdered, getCountryBySlug } from '@/lib/services/countriesService'
import { getFeaturedDestinationsGrouped } from '@/lib/services/destinationsService'
import JsonLd from '@/components/scripts/JsonLd'
import FormularioPersonalizado from '@/components/forms/FormularioPersonalizado'
import { getShortTitle } from '@/lib/helpers/contentHelpers'
import { getAsset } from '@/lib/data/assets'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

import { BASE_URL } from '@/lib/config/site'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const itinerary = getItinerary(slug)
  const t = STATIC_CONTENT[lang as keyof typeof STATIC_CONTENT]?.formularioPersonalizado
  if (!itinerary || !t) return {}
  const shortTitle = getShortTitle(itinerary.content.es.title)
  const title = t.metadata.itineraryTitleTemplate.replace('{shortTitle}', shortTitle)
  const description = t.metadata.itineraryDescriptionTemplate.replace('{shortTitle}', shortTitle)
  const trip = getTripBySlug(slug)
  return buildMetadata({
    title,
    description,
    path: `/${lang}/itinerarios/${slug}/personalizar`,
    lang,
    ogImage: trip ? getAsset(trip.imageKey).url : undefined,
    robots: { index: false, follow: true },
  })
}

export function generateStaticParams() {
  const itineraries = getAllItineraries()
  return ENABLED_LANGUAGES.flatMap(lang =>
    itineraries.map(i => ({ lang, slug: i.slug }))
  )
}

export default async function PersonalizarItinerarioPage({ params }: Props) {
  const { lang, slug } = await params

  const itinerary = getItinerary(slug)
  const trip = getTripBySlug(slug)
  const t = STATIC_CONTENT[lang as keyof typeof STATIC_CONTENT]?.formularioPersonalizado
  if (!itinerary || !trip || !t) notFound()

  // Resolve primary country (for breadcrumb display)
  const primaryCountryId = Array.isArray(trip.country) ? trip.country[0] : trip.country
  const country = getCountryBySlug(primaryCountryId)
  const countryIds = Array.isArray(trip.country) ? trip.country : [trip.country]

  // Extract unique destination IDs from itinerary days (skip transit-only days without destination)
  const destinationIds = [...new Set(
    itinerary.days.filter(d => d.destinationId).map(d => d.destinationId!)
  )]

  const itineraryData = {
    id: itinerary.id,
    slug: itinerary.slug,
    title: itinerary.content.es.title,
    countryIds,
    countryName: country?.content.es.name ?? primaryCountryId,
    countrySlug: country?.slug ?? primaryCountryId,
    countryFlagCode: country?.flagCode ?? '',
    duration: trip.days,
    tags: trip.tags,
    destinationIds,
  }

  const countries = getCountriesOrdered()
  const featuredDestinations = getFeaturedDestinationsGrouped()

  const reserveActionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ReserveAction',
    name: `${t.hero.customizingLabel}: ${itinerary.content.es.title}`,
    object: {
      '@type': 'TouristTrip',
      name: itinerary.content.es.title,
      url: `${BASE_URL}/${lang}/itinerarios/${slug}`,
      provider: {
        '@type': 'TravelAgency',
        name: 'Viajes Vidaia',
        url: BASE_URL,
      },
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Viajes Vidaia',
      url: BASE_URL,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: itineraryData.countryName, item: `${BASE_URL}/${lang}/destinos/${itineraryData.countrySlug}` },
      { '@type': 'ListItem', position: 3, name: itinerary.content.es.title, item: `${BASE_URL}/${lang}/itinerarios/${slug}` },
      { '@type': 'ListItem', position: 4, name: t.hero.personalizar, item: `${BASE_URL}/${lang}/itinerarios/${slug}/personalizar` },
    ],
  }

  return (
    <>
      <JsonLd data={reserveActionJsonLd} id="ld-trip-personalizar-action" />
      <JsonLd data={breadcrumbJsonLd} id="ld-trip-personalizar-breadcrumb" />
      <FormularioPersonalizado
        origin="itinerary"
        itineraryData={itineraryData}
        countries={countries}
        featuredDestinations={featuredDestinations}
        t={t}
        successPath={`/${lang}/itinerarios/personalizar/exito`}
      />
    </>
  )
}
