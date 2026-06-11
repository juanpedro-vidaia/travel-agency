import type { Country } from '@/lib/data/countries'
import type { Destination } from '@/lib/data/destinations'
import { CONTACT } from '@/lib/config/contact'
import { BASE_URL } from '@/lib/config/site'

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
    '@id': `${BASE_URL}/#organization`,
    name: 'Viajes Vidaia',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo/viajes-vidaia-logo.png`,
    image: `${BASE_URL}/images/og-default.jpg`,
    telephone: CONTACT.phone,
    email: 'info@viajesvidaia.com',
    priceRange: '€€€',
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
