import type { Trip } from '@/lib/data/trips'
import type { Destination } from '@/lib/data/destinations'
import type { ResolvedDay } from '@/lib/services/itinerariesService'
import { BASE_URL } from '@/lib/config/site'
import { getAsset } from '@/lib/data/assets'
import { DIFFICULTY_CONFIG } from '@/lib/data/tagConfig'
import { formatBestMonths } from '@/lib/helpers/contentHelpers'

export function buildTouristTripSchema(
  trip: Trip,
  days: ResolvedDay[],
  allDestinations: Destination[]
) {
  const subTrip = days.map((day) => {
    const dest = day.destinationId
      ? allDestinations.find((d) => d.id === day.destinationId)
      : undefined

    const activities = day.activities
      .filter((a) => a.status === 'included')
      .map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'TouristAttraction',
          name: a.activity.content.es.name,
          description: a.activity.content.es.description,
        },
      }))

    return {
      '@type': 'TouristTrip',
      name: day.content.es.title,
      description: day.content.es.description,
      ...(dest && {
        itinerary: {
          '@type': 'Place',
          name: dest.content.es.name,
          ...(dest.lat != null && {
            geo: { '@type': 'GeoCoordinates', latitude: dest.lat, longitude: dest.lng },
          }),
        },
      }),
      ...(activities.length > 0 && {
        subjectOf: { '@type': 'ItemList', itemListElement: activities },
      }),
    }
  })

  // Citable facts without a native schema.org property → additionalProperty (GEO).
  const bestSeason = formatBestMonths(trip.bestMonths)
  const additionalProperty = [
    { '@type': 'PropertyValue', name: 'Duración', value: `${trip.days} días` },
    ...(bestSeason ? [{ '@type': 'PropertyValue', name: 'Mejor época', value: bestSeason }] : []),
    ...(trip.difficulty
      ? [{ '@type': 'PropertyValue', name: 'Dificultad', value: DIFFICULTY_CONFIG[trip.difficulty].es.label }]
      : []),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trip.content.es.title,
    description: trip.content.es.subtitle,
    image: getAsset(trip.imageKey).url,
    url: `${BASE_URL}/es/itinerarios/${trip.slug}`,
    provider: { '@id': `${BASE_URL}/#organization` },
    additionalProperty,
    subTrip,
    ...(trip.priceFrom != null && trip.priceFrom > 0 && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: trip.priceFrom,
        availability: 'https://schema.org/MadeToOrder',
        seller: {
          '@type': 'TravelAgency',
          name: 'Viajes Vidaia',
        },
      },
    }),
  }
}
