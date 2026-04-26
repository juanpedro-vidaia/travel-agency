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
  honeymoonFeatured?: boolean   // shown in /lunas-de-miel ideas section
  honeymoonTitle?: string       // short display title for the honeymoon card
  honeymoonTagline?: string     // romantic tagline shown under the title
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
    image: 'https://images.unsplash.com/photo-1615656637621-5aa19f1ef847?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
    active: true,
    hasItinerary: true,
    honeymoonFeatured: true,
    honeymoonTitle: 'Luna de Miel Patagonia e Iguazú',
    honeymoonTagline: 'Naturaleza en estado puro',
  },
  {
    id: 'latitudes-australes',
    slug: 'latitudes-australes',
    title: 'Latitudes Australes: Patagonia Argentina & Chilena',
    subtitle: 'El Calafate · Torres del Paine · Ushuaia · Puerto Natales',
    country: 'argentina',
    days: 14,
    priceFrom: 3900,
    image: 'https://images.unsplash.com/photo-1684790761209-a49f6d6ef7df?q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1520641082665-df9ec00b0953?q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1709426197175-ea5577067e5d?q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1582727867856-46e3951fd3ff?q=80&w=800',
    featured: false,
    active: true,
    hasItinerary: false,
    honeymoonFeatured: true,
    honeymoonTitle: 'Luna de Miel Argentina',
    honeymoonTagline: 'Cultura, gastronomía y aventura',
  },
  {
    id: 'contrastes-argentinos',
    slug: 'contrastes-argentinos',
    title: 'Contrastes Argentinos: Salares, selva y hielo',
    subtitle: 'Jujuy · Salta · Iguazú · Buenos Aires · Patagonia',
    country: 'argentina',
    days: 14,
    priceFrom: 4100,
    image: 'https://images.unsplash.com/photo-1603155376270-6ad9b9b4fa59?q=80&w=800',
    featured: false,
    active: true,
    hasItinerary: false,
  },
  // ── Chile ────────────────────────────────────────────────────────────────────
  {
    id: 'chile-bolivia-salares',
    slug: 'chile-bolivia-salares',
    title: 'Chile y Bolivia: Desiertos, salares y paisajes únicos',
    subtitle: 'Santiago · San Pedro de Atacama · Salar de Uyuni · La Paz',
    country: 'chile',
    days: 12,
    priceFrom: 3800,
    image: 'https://images.unsplash.com/photo-1573502059387-0848782c6956',
    featured: false,
    active: true,
    hasItinerary: false,
    honeymoonFeatured: true,
    honeymoonTitle: 'Luna de Miel Chile y Bolivia',
    honeymoonTagline: 'Desiertos, salares y paisajes de otro planeta',
  },
  {
    id: 'esencias-chile-isla-pascua',
    slug: 'esencias-chile-isla-pascua',
    title: 'Esencias de Chile con Isla de Pascua: viñas, moáis y salares',
    subtitle: 'Santiago · San Pedro de Atacama · Isla de Pascua',
    country: 'chile',
    days: 13,
    priceFrom: 4699,
    image: 'https://images.unsplash.com/photo-1600754047212-0cf91397fbc6',
    featured: true,
    active: true,
    hasItinerary: true,
  },
  // ── Bolivia ──────────────────────────────────────────────────────────────────
  // Añadir viajes de Bolivia aquí cuando estén disponibles.
]

export default trips
