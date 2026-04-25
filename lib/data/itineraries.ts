import type { Country } from './destinations'

export type DayType = 'transit' | 'free' | 'activity'

/** Reference to an activity within a day, with the context-specific status. */
export interface DayActivity {
  activityId: string
  status: 'included' | 'optional'
}

/**
 * Hotel options per category for a destination stop.
 * The service resolves these IDs to full Hotel objects.
 */
export interface HotelStopDef {
  /** Hotel IDs mapped by star category (from hotels.ts). */
  hotelByCategory: { '3'?: string; '4'?: string; '5'?: string }
  /** Number of nights at this stop. */
  nights: number
  /** Example reference dates for display (e.g. "17-19 sep"). */
  dates?: string
  /** The category used to calculate the reference/base price. */
  defaultCategory: 3 | 4 | 5
}

export interface ItineraryDay {
  dayNumber: number
  /** ID from destinations catalog. Undefined for transit-only days (e.g. return flight). */
  destinationId?: string
  dayType: DayType
  title: string
  description: string
  schedule?: string
  duration?: string
  flights?: string[]
  highlights?: string[]
  /** Activity assignments for this day — status is itinerary-specific. */
  activities: DayActivity[]
  /**
   * ID of the reference hotel shown in the day accordion.
   * Should match one of the hotel IDs in the corresponding HotelStopDef.
   */
  referenceHotelId?: string
  /** Text summary of what is included in the scheduled activity. */
  includes?: string
  /** Text summary of what is not included. */
  notIncludes?: string
}

export interface Itinerary {
  id: string
  slug: string
  title: string
  subtitle: string
  country: Country
  totalDays: number
  totalNights: number
  priceFrom: number
  heroImages: { src: string; alt: string; location: string }[]
  description: string
  featured: boolean
  active: boolean
  days: ItineraryDay[]
  /**
   * Explicit hotel stop definitions for the hotel-cards section.
   * Each stop = one destination / accommodation cluster.
   */
  hotelStops: HotelStopDef[]
}

// ─── Itinerary data ───────────────────────────────────────────────────────────

const itineraries: Itinerary[] = [
  {
    id: 'paisajes-naturales-argentina',
    slug: 'paisajes-naturales-argentina',
    title: 'Paisajes naturales de Argentina: ballenas, glaciares, cataratas y el Fin del Mundo',
    subtitle: 'Iguazú · Península de Valdés · Buenos Aires · El Calafate · Ushuaia',
    country: 'argentina',
    totalDays: 13,
    totalNights: 12,
    priceFrom: 4412,
    heroImages: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80', alt: 'Cataratas del Iguazú, Argentina', location: 'Cataratas del Iguazú' },
      { src: 'https://images.unsplash.com/photo-1499343628900-f45a080d42d4?w=1920&q=80', alt: 'Ballena franca austral · Península de Valdés', location: 'Península de Valdés' },
      { src: 'https://images.unsplash.com/photo-1589993624-d5e0e6a27fd8?w=1920&q=80', alt: 'Buenos Aires', location: 'Buenos Aires' },
      { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80', alt: 'Glaciar Perito Moreno', location: 'Glaciar Perito Moreno · El Calafate' },
      { src: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=1920&q=80', alt: 'Canal Beagle, Ushuaia', location: 'Canal Beagle · Ushuaia' },
    ],
    description:
      'Argentina tiene una capacidad única para dejarte sin palabras. Este viaje lo demuestra en cada etapa: las cataratas más impresionantes del mundo, ballenas francas australes, el glaciar Perito Moreno en movimiento y el mítico Fin del Mundo en Ushuaia. 13 días de naturaleza pura y experiencias únicas.',
    featured: true,
    active: true,

    hotelStops: [
      { hotelByCategory: { '3': 'city-falls-iguazu', '4': 'panoramic-iguazu', '5': 'gran-melia-iguazu' }, nights: 2, dates: '17-19 sep', defaultCategory: 3 },
      { hotelByCategory: { '3': 'hotel-muelle-viejo', '4': 'yene-hue', '5': 'hotel-territorio' }, nights: 2, dates: '19-21 sep', defaultCategory: 4 },
      { hotelByCategory: { '3': 'merit-san-telmo', '4': 'hotel-madero', '5': 'alvear-palace' }, nights: 2, dates: '21-23 sep', defaultCategory: 3 },
      { hotelByCategory: { '3': 'hotel-los-alamos', '4': 'rh-rochester-calafate', '5': 'eolo-patagonia' }, nights: 3, dates: '23-26 sep', defaultCategory: 4 },
      { hotelByCategory: { '3': 'altos-ushuaia', '4': 'los-cauquenes', '5': 'arakur-ushuaia' }, nights: 2, dates: '26-28 sep', defaultCategory: 3 },
      { hotelByCategory: { '3': 'merit-san-telmo', '4': 'hotel-madero', '5': 'alvear-palace' }, nights: 1, dates: '28-29 sep', defaultCategory: 3 },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'iguazu',
        dayType: 'transit',
        title: 'Llegada a Buenos Aires y vuelo a Puerto Iguazú',
        description: 'Llegada a Buenos Aires y vuelo interno a Puerto Iguazú. Recepción en aeropuerto y traslado al hotel.',
        flights: ['BCN → MAD: IB412 · 13:35-15:00', 'MAD → EZE: AR1133 · 20:05', 'EZE → IGR: AR1774 · 06:45-08:40'],
        activities: [],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 2,
        destinationId: 'iguazu',
        dayType: 'free',
        title: 'Cataratas Brasileñas · Día libre',
        description: 'Día libre en Iguazú para disfrutar a vuestro ritmo.',
        activities: [{ activityId: 'cataratas-brasilenas', status: 'optional' }],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 3,
        destinationId: 'iguazu',
        dayType: 'activity',
        title: 'Cataratas Argentinas',
        description: 'Visita al Parque Nacional Iguazú con las pasarelas sobre el agua.',
        schedule: '07:20-16:00 hs',
        duration: '8 horas',
        highlights: ['Paseo Inferior (1.200 m)', 'Paseo Superior (1.100 m)', 'Garganta del Diablo en tren ecológico'],
        activities: [{ activityId: 'cataratas-argentinas', status: 'included' }],
        referenceHotelId: 'city-falls-iguazu',
        includes: 'Traslados y guía bilingüe',
        notIncludes: 'Almuerzo',
      },
      {
        dayNumber: 4,
        destinationId: 'puerto-madryn',
        dayType: 'transit',
        title: 'De Puerto Iguazú a Puerto Madryn',
        description: 'Traslado al aeropuerto. Vuelo a Puerto Madryn, puerta de entrada a la Península Valdés y el avistaje de ballena franca austral.',
        flights: ['IGR → AEP → REL'],
        activities: [],
        referenceHotelId: 'yene-hue',
      },
      {
        dayNumber: 5,
        destinationId: 'peninsula-valdes',
        dayType: 'activity',
        title: 'Excursión Península de Valdés y Ballena Franca Austral',
        description: 'Temporada: Junio a principios de Diciembre.',
        schedule: '07:30 hs',
        duration: '10 horas',
        highlights: [
          'Ruta provincial 1 y 2 hasta el Istmo Carlos Ameghino',
          'Puerto Pirámides · Lobería de Punta Pirámide',
          'Caleta Valdés (elefantes marinos)',
          'Avistaje de ballena franca austral en catamarán desde Puerto Pirámides',
        ],
        activities: [{ activityId: 'peninsula-valdes-ballenas', status: 'included' }],
        referenceHotelId: 'yene-hue',
        includes: 'Entrada reserva natural',
        notIncludes: 'Almuerzo',
      },
      {
        dayNumber: 6,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        title: 'De Puerto Madryn a Buenos Aires',
        description: 'Vuelo a Buenos Aires. Tarde libre para explorar la ciudad: Tango, Teatro Colón, San Telmo, La Boca, Recoleta, Palermo, Puerto Madero.',
        flights: ['REL → AEP'],
        activities: [],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 7,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        title: 'Buenos Aires: Visita de la ciudad con guía',
        description: 'Tarde libre en Buenos Aires.',
        schedule: 'Tour AM · Recogida 09:00 hs',
        duration: '3,5-4 horas',
        highlights: ['Floralis Genérica · Plaza de Mayo', 'La Boca · San Telmo', 'Palermo · Puerto Madero · Obelisco'],
        activities: [{ activityId: 'city-tour-buenos-aires', status: 'included' }],
        referenceHotelId: 'merit-san-telmo',
        includes: 'Guía de turismo y recogida en hoteles del centro',
      },
      {
        dayNumber: 8,
        destinationId: 'el-calafate',
        dayType: 'transit',
        title: 'De Buenos Aires a El Calafate',
        description: 'Vuelo a El Calafate, puerta al Parque Nacional Los Glaciares y al Glaciar Perito Moreno.',
        flights: ['AEP → FTE: AR1850 · 15:15-19:50'],
        activities: [],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 9,
        destinationId: 'el-calafate',
        dayType: 'activity',
        title: 'Glaciar Perito Moreno y Safari Náutico',
        description: '',
        schedule: '09:00-17:00 hs',
        duration: '8 horas',
        highlights: [
          'Ruta asfaltada hasta el Parque Nacional Los Glaciares (50 km)',
          'Pasarelas del Perito Moreno con vistas al frente del glaciar',
          'Safari Náutico (1 hora): navegación del Lago Rico',
          'Pared sur del glaciar de 60 m de altura',
        ],
        activities: [{ activityId: 'perito-moreno-safari', status: 'included' }],
        referenceHotelId: 'rh-rochester-calafate',
        includes: 'Traslados y guía bilingüe',
      },
      {
        dayNumber: 10,
        destinationId: 'el-calafate',
        dayType: 'free',
        title: 'El Calafate: Día libre',
        description: 'Opciones: Glaciarium (museo del hielo), centro de El Calafate, contemplar el Lago Argentino.',
        activities: [{ activityId: 'estancia-nibepo-aike', status: 'optional' }],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 11,
        destinationId: 'ushuaia',
        dayType: 'transit',
        title: 'De El Calafate a Ushuaia',
        description: 'Ushuaia, el Fin del Mundo entre el Canal Beagle y la Sierra del Martial.',
        flights: ['FTE → USH: AR1896 · 16:30-17:50'],
        activities: [],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 12,
        destinationId: 'ushuaia',
        dayType: 'activity',
        title: 'Parque Nacional Tierra del Fuego y Canal Beagle',
        description: '',
        highlights: [
          'Mañana: Parque Nacional Tierra del Fuego (salida 08:00 hs · 5 horas)',
          'Tren del Fin del Mundo · Bahía Ensenada · Lago Acigami',
          'Bahía Lapataia — fin de la Ruta Panamericana',
          'Tarde: Navegación Canal Beagle (15:00-18:00 hs · 30 km)',
        ],
        activities: [
          { activityId: 'tierra-del-fuego-parque', status: 'included' },
          { activityId: 'canal-beagle-navegacion', status: 'included' },
          { activityId: 'catamaran-canal-beagle-tarde', status: 'optional' },
        ],
        referenceHotelId: 'altos-ushuaia',
        includes: 'Guía, ticket Tren del Fin del Mundo, traslados, tasa portuaria y cafetería a bordo',
      },
      {
        dayNumber: 13,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        title: 'De Ushuaia a Buenos Aires · Cena Tango Show',
        description: '',
        flights: ['USH → AEP: AR1873 · 09:30-13:00'],
        highlights: [
          'Espectáculo de tango con cena en La Ventana (San Telmo)',
          'Cena: 20:00-21:30 hs / Show: 21:30-23:30 hs',
        ],
        activities: [{ activityId: 'tango-show-la-ventana', status: 'optional' }],
        referenceHotelId: 'merit-san-telmo',
        includes: 'Entrada, plato principal, postre y 1 botella de vino cada 2 personas',
      },
      {
        dayNumber: 14,
        dayType: 'transit',
        title: 'Vuelo de regreso a España',
        description: 'Traslado privado al Aeropuerto Ezeiza. Noche en vuelo.',
        flights: ['EZE → MAD: AR1134 · 15:05'],
        activities: [],
      },
      {
        dayNumber: 15,
        dayType: 'transit',
        title: 'Llegada a Madrid y vuelo a Barcelona',
        description: 'Llegada a Madrid a las 08:20 hs. Conexión a Barcelona. Fin de nuestros servicios.',
        flights: ['MAD → BCN: IB413 · 12:40-14:00'],
        activities: [],
      },
    ],
  },
]

export default itineraries
