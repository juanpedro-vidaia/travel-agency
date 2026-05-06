import type { Country } from './destinations'

// ── Tags ──────────────────────────────────────────────────────────────────────

export const TRIP_TAGS = {
  NATURE: 'nature',
  WILDLIFE: 'wildlife',
  ADVENTURE: 'adventure',
  RELAX: 'relax',
  CULTURE: 'culture',
  GASTRONOMY: 'gastronomy',
} as const

export type TripTag = typeof TRIP_TAGS[keyof typeof TRIP_TAGS]

export const TAG_CONFIG: Record<TripTag, { icon: string; es: { label: string }; en?: { label: string } }> = {
  nature: { icon: '🌿', es: { label: 'Naturaleza' } },
  wildlife: { icon: '🐋', es: { label: 'Vida salvaje' } },
  adventure: { icon: '🏔', es: { label: 'Aventura' } },
  relax: { icon: '🌅', es: { label: 'Relax' } },
  culture: { icon: '🏛', es: { label: 'Cultura' } },
  gastronomy: { icon: '🍷', es: { label: 'Gastronomía' } },
}

// ── Season & best months (future use — not rendered) ──────────────────────────

export type TripSeason =
  | 'all-year'
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'
  | 'avoid-summer'

export const MONTHS: Record<number, { es: string; en?: string }> = {
  1: { es: 'Enero' },  2: { es: 'Febrero' },   3: { es: 'Marzo' },     4: { es: 'Abril' },
  5: { es: 'Mayo' },   6: { es: 'Junio' },     7: { es: 'Julio' },     8: { es: 'Agosto' },
  9: { es: 'Septiembre' }, 10: { es: 'Octubre' }, 11: { es: 'Noviembre' }, 12: { es: 'Diciembre' },
}

// ── Related trips ─────────────────────────────────────────────────────────────

export interface RelatedTrip {
  slug: string
  es: { reason: string }
  en?: { reason: string }
}

// ── Trip ──────────────────────────────────────────────────────────────────────

export interface TripContent {
  title: string
  subtitle: string
  honeymoonTitle?: string
  honeymoonTagline?: string
}

export interface Trip {
  id: string
  slug: string
  content: {
    es: TripContent
    en?: TripContent
  }
  /** Single country or multiple for multi-country itineraries. */
  country: Country | Country[]
  days: number
  nights: number
  priceFrom: number
  imageKey: string
  featured: boolean
  active: boolean
  hasItinerary: boolean
  tags: TripTag[]
  includesInternationalFlights: boolean
  includesDomesticFlights: boolean
  relatedTrips: RelatedTrip[]
  honeymoonFeatured?: boolean
  /** Future use — best season to travel. */
  season?: TripSeason
  /** Future use — best months (1-12). */
  bestMonths?: number[]
  /**
   * Sort order for the /viajes grid (higher = first).
   * Trips without a value are treated as 0.
   */
  ranking?: number
}

const trips: Trip[] = [
  {
    id: 'paisajes-naturales-argentina',
    slug: 'paisajes-naturales-argentina',
    content: {
      es: {
        title: 'Paisajes naturales de Argentina: ballenas, glaciares, cataratas y el Fin del Mundo',
        subtitle: 'Iguazú · Península de Valdés · Buenos Aires · El Calafate · Ushuaia',
        honeymoonTitle: 'Luna de Miel Patagonia e Iguazú',
        honeymoonTagline: 'Naturaleza en estado puro',
      }
    },
    country: 'argentina',
    days: 13,
    nights: 12,
    priceFrom: 4412,
    imageKey: 'TRIPS.ARGENTINA_NATURAL_PAISAJES',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['nature', 'wildlife'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'esencias-chile-isla-pascua', es: { reason: 'Combina con paisajes únicos del Cono Sur' } },
      { slug: 'patagonia-sur-a-norte', es: { reason: 'Profundiza en la Patagonia argentina' } },
    ],
    honeymoonFeatured: true,
    bestMonths: [3, 4, 9, 10, 11],
    ranking: 100,
  },
  {
    id: 'latitudes-australes',
    slug: 'latitudes-australes',
    content: {
      es: {
        title: 'Latitudes Australes: Patagonia Argentina & Chilena',
        subtitle: 'El Calafate · Torres del Paine · Ushuaia · Puerto Natales',
      }
    },
    country: ['argentina', 'chile'],
    days: 14,
    nights: 13,
    priceFrom: 3900,
    imageKey: 'TRIPS.LATITUDES_AUSTRALES',
    featured: true,
    active: true,
    hasItinerary: false,
    tags: ['nature', 'adventure'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'paisajes-naturales-argentina', es: { reason: 'Patagonia argentina con ballenas e Iguazú' } },
    ],
    ranking: 90,
  },
  {
    id: 'patagonia-sur-a-norte',
    slug: 'patagonia-sur-a-norte',
    content: {
      es: {
        title: 'Patagonia de sur a norte, con Iguazú opcional',
        subtitle: 'Ushuaia · El Chaltén · El Calafate · Buenos Aires',
      }
    },
    country: 'argentina',
    days: 12,
    nights: 11,
    priceFrom: 3500,
    imageKey: 'TRIPS.PATAGONIA_SUR_NORTE',
    featured: true,
    active: true,
    hasItinerary: false,
    tags: ['nature', 'adventure'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'paisajes-naturales-argentina', es: { reason: 'Añade ballenas e Iguazú a la misma ruta' } },
    ],
    ranking: 80,
  },
  {
    id: 'fin-de-ano-argentina',
    slug: 'fin-de-ano-argentina',
    content: {
      es: {
        title: 'Fin de año de esencia argentina: cataratas, glaciares y Buenos Aires',
        subtitle: 'Buenos Aires · Iguazú · El Calafate · Ushuaia',
      }
    },
    country: 'argentina',
    days: 13,
    nights: 12,
    priceFrom: 4200,
    imageKey: 'TRIPS.FIN_DE_ANO_ARGENTINA',
    featured: false,
    active: true,
    hasItinerary: false,
    tags: ['nature', 'culture', 'adventure'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'paisajes-naturales-argentina', es: { reason: 'Ruta similar con avistaje de ballenas' } },
    ],
    season: 'summer',
    bestMonths: [12, 1],
    ranking: 40,
  },
  {
    id: 'argentina-esencial',
    slug: 'argentina-esencial',
    content: {
      es: {
        title: 'Argentina Esencial de Norte a Sur',
        subtitle: 'Salta · Jujuy · Buenos Aires · El Calafate · Ushuaia',
        honeymoonTitle: 'Luna de Miel Argentina',
        honeymoonTagline: 'Cultura, gastronomía y aventura',
      }
    },
    country: 'argentina',
    days: 15,
    nights: 14,
    priceFrom: 3800,
    imageKey: 'TRIPS.ARGENTINA_ESENCIAL',
    featured: false,
    active: true,
    hasItinerary: false,
    tags: ['nature', 'culture', 'gastronomy'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'contrastes-argentinos', es: { reason: 'Similar ruta norte-sur con más Patagonia' } },
    ],
    honeymoonFeatured: true,
    ranking: 60,
  },
  {
    id: 'contrastes-argentinos',
    slug: 'contrastes-argentinos',
    content: {
      es: {
        title: 'Contrastes Argentinos: Salares, selva y hielo',
        subtitle: 'Jujuy · Salta · Iguazú · Buenos Aires · Patagonia',
      }
    },
    country: 'argentina',
    days: 14,
    nights: 13,
    priceFrom: 4100,
    imageKey: 'TRIPS.CONTRASTES_ARGENTINOS',
    featured: false,
    active: true,
    hasItinerary: false,
    tags: ['nature', 'culture', 'adventure'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'argentina-esencial', es: { reason: 'Misma esencia norte-sur con variante Patagonia' } },
    ],
    ranking: 50,
  },
  {
    id: 'chile-bolivia-salares',
    slug: 'chile-bolivia-salares',
    content: {
      es: {
        title: 'Chile y Bolivia: Desiertos, salares y paisajes únicos',
        subtitle: 'Santiago · San Pedro de Atacama · Salar de Uyuni · La Paz',
        honeymoonTitle: 'Luna de Miel Chile y Bolivia',
        honeymoonTagline: 'Desiertos, salares y paisajes de otro planeta',
      }
    },
    country: ['chile', 'bolivia'],
    days: 12,
    nights: 11,
    priceFrom: 3800,
    imageKey: 'TRIPS.CHILE_BOLIVIA_SALARES',
    featured: false,
    active: true,
    hasItinerary: false,
    tags: ['nature', 'adventure', 'culture'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'esencias-chile-isla-pascua', es: { reason: 'Más Chile con el misterio de Isla de Pascua' } },
    ],
    honeymoonFeatured: true,
    ranking: 70,
  },
  {
    id: 'esencias-chile-isla-pascua',
    slug: 'esencias-chile-isla-pascua',
    content: {
      es: {
        title: 'Esencias de Chile con Isla de Pascua: viñas, moáis y salares',
        subtitle: 'Santiago · San Pedro de Atacama · Isla de Pascua',
      }
    },
    country: 'chile',
    days: 13,
    nights: 11,
    priceFrom: 4699,
    imageKey: 'TRIPS.CHILE_ISLA_PASCUA',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['nature', 'culture', 'adventure'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'paisajes-naturales-argentina', es: { reason: 'Combina con la Patagonia argentina' } },
      { slug: 'chile-bolivia-salares', es: { reason: 'Amplía la ruta con el Salar de Uyuni' } },
    ],
    ranking: 95,
  },
  {
    id: 'grandes-escenarios-argentina',
    slug: 'grandes-escenarios-argentina',
    content: {
      es: {
        title: 'Grandes Escenarios de Argentina: del Fin del Mundo a las Cataratas del Iguazú',
        subtitle: 'Buenos Aires · Ushuaia · El Calafate · El Chaltén · Bariloche · San Martín de los Andes · Iguazú',
      }
    },
    country: 'argentina',
    days: 22,
    nights: 21,
    priceFrom: 4628,
    imageKey: 'TRIPS.GRANDES_ESCENARIOS_ARGENTINA',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['nature', 'adventure', 'wildlife'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [],
    season: 'summer',
    bestMonths: [1, 2, 3, 10, 11, 12],
    ranking: 95,
  },
]

export default trips
