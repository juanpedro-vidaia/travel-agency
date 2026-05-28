import type { Country } from '@/lib/data/countries'
import type { Destination } from '@/lib/data/destinations'

const SOCIAL_LINKS = [
  'https://www.instagram.com/viajesvidaia',
  'https://www.facebook.com/viajesvidaia',
]

export function buildOrganizationSchema(countries: Country[], destinations: Destination[]) {
  const countryNames = countries.map((c) => c.content.es.name)
  const destNames = destinations.filter((d) => d.active).map((d) => d.content.es.name)
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Viajes Vidaia',
    url: 'https://www.viajesvidaia.com',
    logo: 'https://www.viajesvidaia.com/images/logo/viajes-vidaia-logo.png',
    email: 'info@viajesvidaia.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle de la Bahía de Algeciras 1',
      addressLocality: 'Madrid',
      postalCode: '28033',
      addressCountry: 'ES',
    },
    description: `Especialistas en viajes a medida a ${countryNames.join(', ')}`,
    areaServed: countryNames,
    knowsAbout: [...countryNames, ...destNames],
    sameAs: SOCIAL_LINKS,
  }
}
