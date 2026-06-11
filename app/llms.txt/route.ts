import { getCountriesOrdered } from '@/lib/services/countriesService'
import { getDestinationsByCountry } from '@/lib/services/destinationsService'
import { getActiveTrips } from '@/lib/services/tripsService'
import type { CountrySlug } from '@/lib/data/countries'
import { BASE_URL } from '@/lib/config/site'

export function GET() {
  const countries = getCountriesOrdered()
  const trips = getActiveTrips()
  const featured = trips.filter((t) => t.featured && t.hasItinerary)
  const BASE = `${BASE_URL}/es`

  const destinationsSection = countries
    .map((c) => {
      const dests = getDestinationsByCountry(c.slug as CountrySlug)
        .map((d) => d.content.es.name)
      return `- [${c.content.es.name}](${BASE}/destinos/${c.slug}): Viajes personalizados a ${dests.join(', ')} | Viajes Vidaia`
    })
    .join('\n')

  const itinerariesSection = featured
    .map((t) => `- [${t.content.es.title}](${BASE}/itinerarios/${t.slug}): ${t.content.es.subtitle}`)
    .join('\n')

  const countryNames = countries.map((c) => c.content.es.name).join(', ')

  const content = `# Viajes Vidaia

> Agencia de viajes especializada en Sudamérica. Diseñamos viajes a medida a ${countryNames} para viajeros españoles. No vendemos paquetes cerrados: cada viaje se construye desde cero según las fechas, el ritmo y los intereses del cliente.

Especialistas en: Patagonia, Cataratas del Iguazú, Salar de Uyuni, Machu Picchu, Atacama, Buenos Aires, lunas de miel en Sudamérica.

## Destinos

${destinationsSection}

## Itinerarios destacados

${itinerariesSection}

## Información general

- [Sobre nosotros](${BASE}#quienes-somos): el equipo de Viajes Vidaia
- [Cómo trabajabamos](${BASE}/viajes): proceso de reserva paso a paso
- [Viajes de luna de miel](${BASE}/lunas-de-miel): propuestas especiales para parejas
- [Blog](${BASE}/blog): experiencias y consejos de viaje

## Optional

- [Sitemap](${BASE_URL}/sitemap.xml)
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
