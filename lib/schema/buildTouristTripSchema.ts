import type { Trip } from '@/lib/data/trips'
import type { Destination } from '@/lib/data/destinations'
import type { ResolvedDay } from '@/lib/services/itinerariesService'

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

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trip.content.es.title,
    description: trip.content.es.subtitle,
    url: `https://www.viajesvidaia.com/es/itinerarios/${trip.slug}`,
    provider: { '@id': 'https://www.viajesvidaia.com/#organization' },
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
