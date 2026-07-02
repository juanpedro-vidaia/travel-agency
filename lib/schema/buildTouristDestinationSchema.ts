import type { Country } from '@/lib/data/countries'
import type { Destination } from '@/lib/data/destinations'
import { getAsset } from '@/lib/data/assets'

export function buildTouristDestinationSchema(country: Country, dests: Destination[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: country.content.es.name,
    description: country.content.es.metaDescription,
    geo: { '@type': 'GeoCoordinates', latitude: country.lat, longitude: country.lng },
    includesAttraction: dests.filter((d) => d.active).map((d) => ({
      '@type': 'TouristAttraction',
      name: d.content.es.name,
      ...(d.content.es.description && { description: d.content.es.description }),
      image: getAsset(d.imageKey).url,
      ...(d.lat != null && {
        geo: { '@type': 'GeoCoordinates', latitude: d.lat, longitude: d.lng },
      }),
    })),
  }
}
