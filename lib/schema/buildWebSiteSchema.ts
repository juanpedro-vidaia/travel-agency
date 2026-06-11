import { BASE_URL } from '@/lib/config/site'

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Viajes Vidaia',
    url: BASE_URL,
    inLanguage: 'es',
    publisher: { '@id': `${BASE_URL}/#organization` },
  }
}
