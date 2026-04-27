import type { Country } from './destinations'

// ── Tags ──────────────────────────────────────────────────────────────────────

export const TRIP_TAGS = {
  NATURALEZA: 'naturaleza',
  VIDA_SALVAJE: 'vida-salvaje',
  AVENTURA: 'aventura',
  RELAX: 'relax',
  CULTURA: 'cultura',
  GASTRONOMIA: 'gastronomia',
} as const

export type TripTag = typeof TRIP_TAGS[keyof typeof TRIP_TAGS]

export const TAG_CONFIG: Record<TripTag, { icon: string; label: string }> = {
  naturaleza:     { icon: '🌿', label: 'Naturaleza' },
  'vida-salvaje': { icon: '🐋', label: 'Vida salvaje' },
  aventura:       { icon: '🏔', label: 'Aventura' },
  relax:          { icon: '🌅', label: 'Relax' },
  cultura:        { icon: '🏛', label: 'Cultura' },
  gastronomia:    { icon: '🍷', label: 'Gastronomía' },
}

// ── Season & best months (future use — not rendered) ──────────────────────────

export type TripSeason =
  | 'all-year'
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'
  | 'avoid-summer'

export const MONTHS: Record<number, string> = {
  1: 'Enero',  2: 'Febrero',   3: 'Marzo',     4: 'Abril',
  5: 'Mayo',   6: 'Junio',     7: 'Julio',     8: 'Agosto',
  9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre',
}

// ── Related trips ─────────────────────────────────────────────────────────────

export type RelatedTrip = {
  slug: string
  reason: string
}

// ── Trip ──────────────────────────────────────────────────────────────────────

export interface Trip {
  id: string
  slug: string
  title: string
  subtitle: string
  /** Single country or multiple for multi-country itineraries. */
  country: Country | Country[]
  days: number
  nights: number
  priceFrom: number
  image: string
  featured: boolean
  active: boolean
  hasItinerary: boolean
  tags: TripTag[]
  includesFlightsInternational: boolean
  includesFlightsInternal: boolean
  relatedTrips: RelatedTrip[]
  honeymoonFeatured?: boolean
  honeymoonTitle?: string
  honeymoonTagline?: string
  /** Future use — best season to travel. */
  season?: TripSeason
  /** Future use — best months (1-12). */
  bestMonths?: number[]
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
    nights: 12,
    priceFrom: 4412,
    image: 'https://images.unsplash.com/photo-1615656637621-5aa19f1ef847?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['naturaleza', 'vida-salvaje', 'aventura'],
    includesFlightsInternational: true,
    includesFlightsInternal: true,
    relatedTrips: [
      { slug: 'esencias-chile-isla-pascua', reason: 'Combina con paisajes únicos del Cono Sur' },
      { slug: 'patagonia-sur-a-norte',      reason: 'Profundiza en la Patagonia argentina' },
    ],
    honeymoonFeatured: true,
    honeymoonTitle: 'Luna de Miel Patagonia e Iguazú',
    honeymoonTagline: 'Naturaleza en estado puro',
    bestMonths: [3, 4, 9, 10, 11],
  },
  {
    id: 'latitudes-australes',
    slug: 'latitudes-australes',
    title: 'Latitudes Australes: Patagonia Argentina & Chilena',
    subtitle: 'El Calafate · Torres del Paine · Ushuaia · Puerto Natales',
    country: ['argentina', 'chile'],
    days: 14,
    nights: 13,
    priceFrom: 3900,
    image: 'https://images.unsplash.com/photo-1684790761209-a49f6d6ef7df?q=80&w=800',
    featured: true,
    active: true,
    hasItinerary: false,
    tags: ['naturaleza', 'aventura'],
    includesFlightsInternational: true,
    includesFlightsInternal: true,
    relatedTrips: [
      { slug: 'paisajes-naturales-argentina', reason: 'Patagonia argentina con ballenas e Iguazú' },
    ],
  },
  {
    id: 'patagonia-sur-a-norte',
    slug: 'patagonia-sur-a-norte',
    title: 'Patagonia de sur a norte, con Iguazú opcional',
    subtitle: 'Ushuaia · El Chaltén · El Calafate · Buenos Aires',
    country: 'argentina',
    days: 12,
    nights: 11,
    priceFrom: 3500,
    image: 'https://images.unsplash.com/photo-1520641082665-df9ec00b0953?q=80&w=800',
    featured: true,
    active: true,
    hasItinerary: false,
    tags: ['naturaleza', 'aventura'],
    includesFlightsInternational: true,
    includesFlightsInternal: true,
    relatedTrips: [
      { slug: 'paisajes-naturales-argentina', reason: 'Añade ballenas e Iguazú a la misma ruta' },
    ],
  },
  {
    id: 'fin-de-ano-argentina',
    slug: 'fin-de-ano-argentina',
    title: 'Fin de año de esencia argentina: cataratas, glaciares y Buenos Aires',
    subtitle: 'Buenos Aires · Iguazú · El Calafate · Ushuaia',
    country: 'argentina',
    days: 13,
    nights: 12,
    priceFrom: 4200,
    image: 'https://images.unsplash.com/photo-1709426197175-ea5577067e5d?q=80&w=800',
    featured: false,
    active: true,
    hasItinerary: false,
    tags: ['naturaleza', 'cultura', 'aventura'],
    includesFlightsInternational: true,
    includesFlightsInternal: true,
    relatedTrips: [
      { slug: 'paisajes-naturales-argentina', reason: 'Ruta similar con avistaje de ballenas' },
    ],
    season: 'summer',
    bestMonths: [12, 1],
  },
  {
    id: 'argentina-esencial',
    slug: 'argentina-esencial',
    title: 'Argentina Esencial de Norte a Sur',
    subtitle: 'Salta · Jujuy · Buenos Aires · El Calafate · Ushuaia',
    country: 'argentina',
    days: 15,
    nights: 14,
    priceFrom: 3800,
    image: 'https://images.unsplash.com/photo-1582727867856-46e3951fd3ff?q=80&w=800',
    featured: false,
    active: true,
    hasItinerary: false,
    tags: ['naturaleza', 'cultura', 'gastronomia'],
    includesFlightsInternational: true,
    includesFlightsInternal: true,
    relatedTrips: [
      { slug: 'contrastes-argentinos', reason: 'Similar ruta norte-sur con más Patagonia' },
    ],
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
    nights: 13,
    priceFrom: 4100,
    image: 'https://images.unsplash.com/photo-1603155376270-6ad9b9b4fa59?q=80&w=800',
    featured: false,
    active: true,
    hasItinerary: false,
    tags: ['naturaleza', 'cultura', 'aventura'],
    includesFlightsInternational: true,
    includesFlightsInternal: true,
    relatedTrips: [
      { slug: 'argentina-esencial', reason: 'Misma esencia norte-sur con variante Patagonia' },
    ],
  },
  // ── Chile ─────────────────────────────────────────────────────────────────────
  {
    id: 'chile-bolivia-salares',
    slug: 'chile-bolivia-salares',
    title: 'Chile y Bolivia: Desiertos, salares y paisajes únicos',
    subtitle: 'Santiago · San Pedro de Atacama · Salar de Uyuni · La Paz',
    country: ['chile', 'bolivia'],
    days: 12,
    nights: 11,
    priceFrom: 3800,
    image: 'https://images.unsplash.com/photo-1573502059387-0848782c6956',
    featured: false,
    active: true,
    hasItinerary: false,
    tags: ['naturaleza', 'aventura', 'cultura'],
    includesFlightsInternational: true,
    includesFlightsInternal: true,
    relatedTrips: [
      { slug: 'esencias-chile-isla-pascua', reason: 'Más Chile con el misterio de Isla de Pascua' },
    ],
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
    nights: 11,
    priceFrom: 4699,
    image: 'https://images.unsplash.com/photo-1600754047212-0cf91397fbc6',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['naturaleza', 'cultura', 'aventura'],
    includesFlightsInternational: true,
    includesFlightsInternal: true,
    relatedTrips: [
      { slug: 'paisajes-naturales-argentina', reason: 'Combina con la Patagonia argentina' },
      { slug: 'chile-bolivia-salares',        reason: 'Amplía la ruta con el Salar de Uyuni' },
    ],
  },
  // ── Bolivia ───────────────────────────────────────────────────────────────────
  // Añadir viajes de Bolivia aquí cuando estén disponibles.
]

export default trips
