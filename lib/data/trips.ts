import type { Country } from './destinations'

/**
 * Trip: summary card shown in /destinos/[country] listings.
 * If hasItinerary is true, links to /itinerarios/[slug] (full page).
 * Otherwise links to /presupuesto-itinerario?titulo=...
 */
export interface Trip {
  id: string
  slug: string
  title: string
  subtitle: string
  country: Country
  days: number
  priceFrom: number         // reference price per person in double room
  image: string
  featured: boolean         // shown in FeaturedDestinations on home page
  active: boolean
  hasItinerary: boolean     // true = full itinerary page exists at /itinerarios/[slug]
}

const trips: Trip[] = [
  // ── Argentina ────────────────────────────────────────────────────────────────
  {
    id: 'paisajes-naturales-argentina',
    slug: 'paisajes-naturales-argentina',
    title: 'Paisajes naturales de Argentina: ballenas, glaciares, cataratas y el Fin del Mundo',
    subtitle: 'Iguazú · Península de Valdés · Buenos Aires · El Calafate · Ushuaia',
    country: 'argentina',
    days: 13,
    priceFrom: 4412,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    featured: true,
    active: true,
    hasItinerary: true,
  },
  {
    id: 'latitudes-australes',
    slug: 'latitudes-australes',
    title: 'Latitudes Australes: Patagonia Argentina & Chilena',
    subtitle: 'El Calafate · Torres del Paine · Ushuaia · Puerto Natales',
    country: 'argentina',
    days: 14,
    priceFrom: 3900,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    featured: true,
    active: true,
    hasItinerary: false,
  },
  {
    id: 'patagonia-sur-a-norte',
    slug: 'patagonia-sur-a-norte',
    title: 'Patagonia de sur a norte, con Iguazú opcional',
    subtitle: 'Ushuaia · El Chaltén · El Calafate · Buenos Aires',
    country: 'argentina',
    days: 12,
    priceFrom: 3500,
    image: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=800&q=80',
    featured: true,
    active: true,
    hasItinerary: false,
  },
  {
    id: 'fin-de-ano-argentina',
    slug: 'fin-de-ano-argentina',
    title: 'Fin de año de esencia argentina: cataratas, glaciares y Buenos Aires',
    subtitle: 'Buenos Aires · Iguazú · El Calafate · Ushuaia',
    country: 'argentina',
    days: 13,
    priceFrom: 4200,
    image: 'https://images.unsplash.com/photo-1589993624-d5e0e6a27fd8?w=800&q=80',
    featured: false,
    active: true,
    hasItinerary: false,
  },
  {
    id: 'argentina-esencial',
    slug: 'argentina-esencial',
    title: 'Argentina Esencial de Norte a Sur',
    subtitle: 'Salta · Jujuy · Buenos Aires · El Calafate · Ushuaia',
    country: 'argentina',
    days: 15,
    priceFrom: 3800,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    featured: false,
    active: true,
    hasItinerary: false,
  },
  {
    id: 'contrastes-argentinos',
    slug: 'contrastes-argentinos',
    title: 'Contrastes Argentinos: Salares, selva y hielo',
    subtitle: 'Jujuy · Salta · Iguazú · Buenos Aires · Patagonia',
    country: 'argentina',
    days: 14,
    priceFrom: 4100,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    featured: false,
    active: true,
    hasItinerary: false,
  },
  // ── Chile ────────────────────────────────────────────────────────────────────
  // Añadir viajes de Chile aquí cuando estén disponibles.
  // ── Bolivia ──────────────────────────────────────────────────────────────────
  // Añadir viajes de Bolivia aquí cuando estén disponibles.
]

export default trips
