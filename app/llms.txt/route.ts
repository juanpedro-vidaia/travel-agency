import { getCountriesOrdered } from '@/lib/services/countriesService'
import { getDestinationsByCountry } from '@/lib/services/destinationsService'
import { getActiveTrips } from '@/lib/services/tripsService'
import type { CountrySlug } from '@/lib/data/countries'
import { BASE_URL } from '@/lib/config/site'
import { getStaticContent, renderTemplate } from '@/lib/helpers/contentHelpers'

// Todo el contenido es estático en build-time → prerenderizar como fichero estático.
export const dynamic = 'force-static'

export function GET() {
  const t = getStaticContent('es').llmsTxt
  const countries = getCountriesOrdered()
  const trips = getActiveTrips()
  const featured = trips.filter((tr) => tr.featured && tr.hasItinerary)
  const BASE = `${BASE_URL}/es`

  const destinationsSection = countries
    .map((c) => {
      const dests = getDestinationsByCountry(c.slug as CountrySlug).map((d) => d.content.es.name)
      const line = renderTemplate(t.destinationLineTemplate, { destinations: dests.join(', ') })
      return `- [${c.content.es.name}](${BASE}/destinos/${c.slug}): ${line}`
    })
    .join('\n')

  const itinerariesSection = featured
    .map((tr) => `- [${tr.content.es.title}](${BASE}/itinerarios/${tr.slug}): ${tr.content.es.subtitle}`)
    .join('\n')

  const countryNames = countries.map((c) => c.content.es.name).join(', ')

  const generalSection = t.generalLinks
    .map((l) => `- [${l.label}](${BASE}${l.path}): ${l.description}`)
    .join('\n')

  const content = `# ${t.title}

> ${renderTemplate(t.summaryTemplate, { countries: countryNames })}

${t.specialties}

## ${t.destinationsHeading}

${destinationsSection}

## ${t.itinerariesHeading}

${itinerariesSection}

## ${t.generalHeading}

${generalSection}

## ${t.optionalHeading}

- [${t.sitemapLabel}](${BASE_URL}/sitemap.xml)
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
