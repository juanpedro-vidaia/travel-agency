import type { CountrySlug as Country } from './countries'
import type { TripTag } from './tagConfig'

// ── Tags (re-exported from tagConfig for server-side use) ─────────────────────
export { TRIP_TAGS, type TripTag, TAG_CONFIG } from './tagConfig'

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
  priceFrom?: number
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
        honeymoonTitle: 'Luna de Miel - Paisajes Naturales de Argentina',
        honeymoonTagline: 'De las cataratas al fin del mundo, juntos',
      }
    },
    country: 'argentina',
    days: 13,
    nights: 11,
    priceFrom: 0,
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
    season: 'summer',
    bestMonths: [9, 10, 11, 12],
    ranking: 100,
  },
  {
    id: 'contrastes-argentinos',
    slug: 'contrastes-argentinos',
    content: {
      es: {
        title: 'Contrastes argentinos: glaciares, selva y salares andinos',
        subtitle: 'Buenos Aires · Tucumán · Cafayate · Salta · Purmamarca · Ushuaia · El Calafate · Iguazú',
      }
    },
    country: 'argentina',
    days: 20,
    nights: 19,
    priceFrom: 0,
    imageKey: 'TRIPS.CONTRASTES_ARGENTINOS',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['nature', 'adventure', 'culture', 'wildlife'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'contrastes-argentinos-invierno', es: { reason: 'Itinerario similar en invierno con extensión al norte' } },
      { slug: 'paisajes-naturales-argentina', es: { reason: 'Combina con la Patagonia argentina' } },
    ],
    season: 'all-year',
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    ranking: 85,
  },
  {
    id: 'esencias-chile-isla-pascua',
    slug: 'esencias-chile-isla-pascua',
    content: {
      es: {
        title: 'Chile e Isla de Pascua: de las viñas del Maipo a los moáis del Pacífico',
        subtitle: 'Santiago · Valle de Casablanca · San Pedro de Atacama · Rapa Nui',
        honeymoonTitle: 'Luna de Miel en Chile e Isla de Pascua',
        honeymoonTagline: 'Vino, un desierto y una isla para vosotros solos',
      }
    },
    country: 'chile',
    days: 12,
    nights: 10,
    priceFrom: 0,
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
    honeymoonFeatured: true,
    season: 'all-year',
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
    days: 21,
    nights: 20,
    priceFrom: 0,
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
  {
    id: 'contrastes-argentinos-invierno',
    slug: 'contrastes-argentinos-invierno',
    content: {
      es: {
        title: 'Contrastes argentinos en invierno austral: del norte andino al Fin del Mundo',
        subtitle: 'Salta · Purmamarca · Iguazú · Buenos Aires · Ushuaia · El Calafate',
      }
    },
    country: 'argentina',
    days: 15,
    nights: 13,
    priceFrom: 0,
    imageKey: 'TRIPS.CONTRASTES_ARGENTINOS_INVIERNO',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['nature', 'adventure', 'culture'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'contrastes-argentinos', es: { reason: 'Itinerario similar en verano' } },
      { slug: 'grandes-escenarios-argentina', es: { reason: 'Otra visión de la Patagonia argentina' } },
    ],
    season: 'winter',
    bestMonths: [6, 7, 8, 9],
    ranking: 80,
  },
  {
    id: 'argentina-sur-norte',
    slug: 'argentina-sur-norte',
    content: {
      es: {
        title: 'Argentina de sur a norte: de Tierra de Fuego a las Cataratas del Iguazú',
        subtitle: 'Buenos Aires · Ushuaia · El Calafate · Bariloche · Puerto Iguazú',
      }
    },
    country: 'argentina',
    days: 15,
    nights: 14,
    priceFrom: 0,
    imageKey: 'TRIPS.ARGENTINA_SUR_NORTE',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['nature', 'adventure', 'wildlife'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [],
    season: 'all-year',
    bestMonths: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    ranking: 90,
  },
  {
    id: 'capitales-del-vino',
    slug: 'capitales-del-vino',
    content: {
      es: {
        title: 'El Cono Sur en copa: viñedos, bodegas y ciudades',
        subtitle: 'Santiago de Chile · Mendoza · Buenos Aires · Montevideo',
      }
    },
    country: ['chile', 'argentina', 'uruguay'],
    days: 13,
    nights: 12,
    priceFrom: 0,
    imageKey: 'TRIPS.CAPITALES_DEL_VINO',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['gastronomy', 'culture', 'relax'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [],
    season: 'all-year',
    bestMonths: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    ranking: 75,
  },
  {
    id: 'lo-mejor-de-peru',
    slug: 'lo-mejor-de-peru',
    content: {
      es: {
        title: 'Lo Mejor de Perú: de Lima al Machu Picchu',
        subtitle: 'Lima · Paracas · Arequipa · Cañón del Colca · Puno · Cusco · Valle Sagrado · Machu Picchu',
      }
    },
    country: 'peru',
    days: 14,
    nights: 13,
    priceFrom: 0,
    imageKey: 'TRIPS.LO_MEJOR_DE_PERU',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['nature', 'culture', 'adventure'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [],
    season: 'winter',
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    ranking: 95,
  },
  {
    id: 'chile-completo',
    slug: 'chile-completo',
    content: {
      es: {
        title: 'Chile de punta a punta: Patagonia, Lagos, Atacama y Rapa Nui',
        subtitle: 'Santiago · Puerto Natales · Puerto Varas · San Pedro de Atacama · Rapa Nui',
      }
    },
    country: 'chile',
    days: 17,
    nights: 16,
    priceFrom: 0,
    imageKey: 'TRIPS.CHILE_COMPLETO',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['nature', 'adventure', 'culture'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [
      { slug: 'esencias-chile-isla-pascua', es: { reason: 'Itinerario mas corto Chile e Isla de Pascua' } },
    ],
    honeymoonFeatured: true,
    season: 'summer',
    bestMonths: [10, 11, 12, 1, 2, 3],
    ranking: 90,
  },
  {
    id: 'bolivia-infinita',
    slug: 'bolivia-infinita',
    content: {
      es: {
        title: 'Bolivia Infinita: Colores que Cuentan Historias',
        subtitle: 'Santa Cruz · Sucre · Potosí · Salar de Uyuni · Lípez · La Paz · Copacabana',
      }
    },
    country: 'bolivia',
    days: 13,
    nights: 12,
    priceFrom: 0,
    imageKey: 'TRIPS.BOLIVIA_INFINITA',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['culture', 'nature', 'adventure'],
    includesInternationalFlights: true,
    includesDomesticFlights: true,
    relatedTrips: [],
    honeymoonFeatured: false,
    season: 'all-year',
    bestMonths: [4, 5, 6, 7, 8, 9, 10, 11],
    ranking: 80,
  },
  {
    id: 'bolivia-chile-salar-pascua',
    slug: 'bolivia-chile-salar-pascua',
    content: {
      es: {
        title: 'Bolivia y Chile: del Salar de Uyuni a la Isla de Pascua',
        subtitle: 'Santa Cruz · Sucre · Salar de Uyuni · Atacama · Rapa Nui · Santiago',
      }
    },
    country: ['bolivia', 'chile'],
    days: 15,
    nights: 14,
    priceFrom: 4818,
    imageKey: 'TRIPS.BOLIVIA_CHILE_SALAR_PASCUA',
    featured: true,
    active: true,
    hasItinerary: true,
    tags: ['culture', 'nature', 'adventure'],
    includesInternationalFlights: false,
    includesDomesticFlights: false,
    relatedTrips: [],
    honeymoonFeatured: false,
    season: 'all-year',
    bestMonths: [4, 5, 6, 7, 8, 9, 10, 11],
    ranking: 85,
  },
]

export default trips
