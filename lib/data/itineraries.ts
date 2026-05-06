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
export interface AccommodationStop {
  /** Hotel IDs mapped by star category (from hotels.ts). */
  hotelsByCategory: { '3'?: string; '4'?: string; '5'?: string }
  /** Number of nights at this stop. */
  nights: number
  /** Example reference dates for display (e.g. "17-19 sep"). */
  dates?: string
  /** The category used to calculate the reference/base price. */
  defaultCategory: 3 | 4 | 5
  /** Whether to display this hotel stop in the itinerary page hotels section. */
  featured: boolean
}

export interface ItineraryDayContent {
  title: string
  description: string
  schedule?: string
  duration?: string
  highlights?: string[]
  /** Text summary of what is included in the scheduled activity. */
  included?: string
  /** Text summary of what is not included. */
  excluded?: string
}

export interface ItineraryDay {
  dayNumber: number
  /** ID from destinations catalog. Undefined for transit-only days (e.g. return flight). */
  destinationId?: string
  dayType: DayType
  content: {
    es: ItineraryDayContent
    en?: ItineraryDayContent
  }
  flights?: string[]
  /** Activity assignments for this day — status is itinerary-specific. */
  activities: DayActivity[]
  /**
   * ID of the reference hotel shown in the day accordion.
   * Should match one of the hotel IDs in the corresponding AccommodationStop.
   */
  referenceHotelId?: string
}

export interface ItineraryContent {
  title: string
  description: string
  heroImages: { imageKey: string; location: string }[]
}

/**
 * Itinerary: full day-by-day content for /itinerarios/[slug].
 * Commercial data (subtitle, priceFrom, days, nights) lives in the
 * matching Trip entry in trips.ts (same slug).
 */
export interface Itinerary {
  id: string
  slug: string
  content: {
    es: ItineraryContent
    en?: ItineraryContent
  }
  featured: boolean
  active: boolean
  days: ItineraryDay[]
  accommodationStops: AccommodationStop[]
}

// ─── Itinerary data ───────────────────────────────────────────────────────────

const itineraries: Itinerary[] = [
  {
    id: 'paisajes-naturales-argentina',
    slug: 'paisajes-naturales-argentina',
    content: {
      es: {
        title: 'Paisajes naturales de Argentina: ballenas, glaciares, cataratas y el Fin del Mundo',
        description: 'Argentina tiene una capacidad única para dejarte sin palabras. Este viaje lo demuestra en cada etapa: las cataratas más impresionantes del mundo, ballenas francas australes, el glaciar Perito Moreno en movimiento y el mítico Fin del Mundo en Ushuaia. 13 días de naturaleza pura y experiencias únicas.',
        heroImages: [
          { imageKey: 'ITINERARIES.PAISAJES_NATURALES_IGUAZU', location: 'Cataratas del Iguazú' },
          { imageKey: 'ITINERARIES.PAISAJES_NATURALES_VALDES', location: 'Península de Valdés' },
          { imageKey: 'ITINERARIES.PAISAJES_NATURALES_BA', location: 'Buenos Aires' },
          { imageKey: 'ITINERARIES.PAISAJES_NATURALES_MORENO', location: 'Glaciar Perito Moreno · El Calafate' },
          { imageKey: 'ITINERARIES.PAISAJES_NATURALES_BEAGLE', location: 'Canal Beagle · Ushuaia' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'city-falls-iguazu', '4': 'panoramic-iguazu', '5': 'gran-melia-iguazu' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-muelle-viejo', '4': 'yene-hue', '5': 'hotel-territorio' }, nights: 2, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'merit-san-telmo', '4': 'hotel-madero', '5': 'alvear-palace' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-los-alamos', '4': 'rh-rochester-calafate', '5': 'eolo-patagonia' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'altos-ushuaia', '4': 'los-cauquenes', '5': 'arakur-ushuaia' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'merit-san-telmo', '4': 'hotel-madero', '5': 'alvear-palace' }, nights: 1, defaultCategory: 3, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'iguazu',
        dayType: 'transit',
        content: {
          es: {
            title: 'Llegada a Buenos Aires y vuelo a Puerto Iguazú',
            description: 'Llegada a Buenos Aires y vuelo interno a Puerto Iguazú. Recepción en aeropuerto y traslado al hotel.',
          }
        },
        flights: ['MAD → EZE', 'EZE → IGR'],
        activities: [],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 2,
        destinationId: 'iguazu',
        dayType: 'free',
        content: {
          es: {
            title: 'Cataratas Brasileñas · Día libre',
            description: 'Día libre en Iguazú para disfrutar a vuestro ritmo.',
          }
        },
        activities: [{ activityId: 'cataratas-brasilenas', status: 'optional' }],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 3,
        destinationId: 'iguazu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Cataratas Argentinas',
            description: 'Visita al Parque Nacional Iguazú con las pasarelas sobre el agua.',
            schedule: '07:20-16:00 hs',
            duration: '8 horas',
            highlights: ['Paseo Inferior (1.200 m)', 'Paseo Superior (1.100 m)', 'Garganta del Diablo en tren ecológico'],
            included: 'Traslados y guía bilingüe',
            excluded: 'Almuerzo',
          }
        },
        activities: [{ activityId: 'cataratas-argentinas', status: 'included' }],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 4,
        destinationId: 'puerto-madryn',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Puerto Iguazú a Puerto Madryn',
            description: 'Traslado al aeropuerto. Vuelo a Puerto Madryn, puerta de entrada a la Península Valdés y el avistaje de ballena franca austral.',
          }
        },
        flights: ['IGR → AEP → REL'],
        activities: [],
        referenceHotelId: 'yene-hue',
      },
      {
        dayNumber: 5,
        destinationId: 'peninsula-valdes',
        dayType: 'activity',
        content: {
          es: {
            title: 'Excursión Península de Valdés y Ballena Franca Austral',
            description: 'Temporada: Junio a principios de Diciembre.',
            schedule: '07:30 hs',
            duration: '10 horas',
            highlights: ['Ruta provincial 1 y 2 hasta el Istmo Carlos Ameghino', 'Puerto Pirámides · Lobería de Punta Pirámide', 'Caleta Valdés (elefantes marinos)', 'Avistaje de ballena franca austral en catamarán desde Puerto Pirámides'],
            included: 'Entrada reserva natural',
            excluded: 'Almuerzo',
          }
        },
        activities: [{ activityId: 'peninsula-valdes-ballenas', status: 'included' }],
        referenceHotelId: 'yene-hue',
      },
      {
        dayNumber: 6,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Puerto Madryn a Buenos Aires',
            description: 'Vuelo a Buenos Aires. Tarde libre para explorar la ciudad: Tango, Teatro Colón, San Telmo, La Boca, Recoleta, Palermo, Puerto Madero.',
          }
        },
        flights: ['REL → AEP'],
        activities: [],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 7,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: Visita de la ciudad con guía',
            description: 'Tarde libre en Buenos Aires.',
            schedule: 'Tour AM · Recogida 09:00 hs',
            duration: '3,5-4 horas',
            highlights: ['Floralis Genérica · Plaza de Mayo', 'La Boca · San Telmo', 'Palermo · Puerto Madero · Obelisco'],
            included: 'Guía de turismo y recogida en hoteles del centro',
          }
        },
        activities: [{ activityId: 'city-tour-buenos-aires', status: 'included' }],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 8,
        destinationId: 'el-calafate',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Buenos Aires a El Calafate',
            description: 'Vuelo a El Calafate, puerta al Parque Nacional Los Glaciares y al Glaciar Perito Moreno.',
          }
        },
        flights: ['AEP → FTE'],
        activities: [],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 9,
        destinationId: 'el-calafate',
        dayType: 'activity',
        content: {
          es: {
            title: 'Glaciar Perito Moreno y Safari Náutico',
            description: '',
            schedule: '09:00-17:00 hs',
            duration: '8 horas',
            highlights: ['Ruta asfaltada hasta el Parque Nacional Los Glaciares (50 km)', 'Pasarelas del Perito Moreno con vistas al frente del glaciar', 'Safari Náutico (1 hora): navegación del Lago Rico', 'Pared sur del glaciar de 60 m de altura'],
            included: 'Traslados y guía bilingüe',
          }
        },
        activities: [{ activityId: 'perito-moreno-safari', status: 'included' }],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 10,
        destinationId: 'el-calafate',
        dayType: 'free',
        content: {
          es: {
            title: 'El Calafate: Día libre',
            description: 'Opciones: Glaciarium (museo del hielo), centro de El Calafate, contemplar el Lago Argentino.',
          }
        },
        activities: [{ activityId: 'estancia-nibepo-aike', status: 'optional' }],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 11,
        destinationId: 'ushuaia',
        dayType: 'transit',
        content: {
          es: {
            title: 'De El Calafate a Ushuaia',
            description: 'Ushuaia, el Fin del Mundo entre el Canal Beagle y la Sierra del Martial.',
          }
        },
        flights: ['FTE → USH'],
        activities: [],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 12,
        destinationId: 'ushuaia',
        dayType: 'activity',
        content: {
          es: {
            title: 'Parque Nacional Tierra del Fuego y Canal Beagle',
            description: '',
            highlights: ['Mañana: Parque Nacional Tierra del Fuego (salida 08:00 hs · 5 horas)', 'Tren del Fin del Mundo · Bahía Ensenada · Lago Acigami', 'Bahía Lapataia — fin de la Ruta Panamericana', 'Tarde: Navegación Canal Beagle (15:00-18:00 hs · 30 km)'],
            included: 'Guía, ticket Tren del Fin del Mundo, traslados, tasa portuaria y cafetería a bordo',
          }
        },
        activities: [
          { activityId: 'tierra-del-fuego-parque', status: 'included' },
          { activityId: 'canal-beagle-navegacion', status: 'included' },
          { activityId: 'catamaran-canal-beagle-tarde', status: 'optional' },
        ],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 13,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'De Ushuaia a Buenos Aires · Cena Tango Show',
            description: '',
            highlights: ['Espectáculo de tango con cena en La Ventana (San Telmo)', 'Cena: 20:00-21:30 hs / Show: 21:30-23:30 hs'],
            included: 'Entrada, plato principal, postre y 1 botella de vino cada 2 personas',
          }
        },
        flights: ['USH → AEP'],
        activities: [{ activityId: 'tango-show-la-ventana', status: 'optional' }],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 14,
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo de regreso a España',
            description: 'Traslado privado al Aeropuerto Ezeiza. Noche en vuelo.',
          }
        },
        flights: ['EZE → MAD'],
        activities: [],
      },
    ],
  },
  {
    id: 'esencias-chile-isla-pascua',
    slug: 'esencias-chile-isla-pascua',
    content: {
      es: {
        title: 'Esencias de Chile con Isla de Pascua: viñas, moáis y salares',
        description: 'Chile en su máxima esencia: la energía cosmopolita de Santiago, las viñas del valle del Maipo, el desierto más árido del planeta con sus salares y géiseres, y el misterio milenario de los moáis en Isla de Pascua. 13 días recorriendo tres mundos completamente distintos en un solo viaje.',
        heroImages: [
          { imageKey: 'ITINERARIES.ESENCIAS_CHILE_MOAIS', location: 'Ahu Tongariki · Isla de Pascua' },
          { imageKey: 'ITINERARIES.ESENCIAS_CHILE_ATACAMA', location: 'San Pedro de Atacama' },
          { imageKey: 'ITINERARIES.ESENCIAS_CHILE_SANTIAGO', location: 'Santiago de Chile' },
          { imageKey: 'ITINERARIES.ESENCIAS_CHILE_VALLE_LUNA', location: 'Valle de la Luna · Atacama' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'hotel-plaza-san-francisco-santiago', '4': 'cumbres-lastarria', '5': 'mandarin-oriental-santiago' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'hotel-poblado-kimal', '4': 'cumbres-san-pedro', '5': 'tierra-atacama' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'holiday-inn-santiago-airport', '4': 'holiday-inn-santiago-airport', '5': 'holiday-inn-santiago-airport' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-otai-rapa-nui', '4': 'takarua', '5': 'explora-rapa-nui' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'holiday-inn-santiago-airport', '4': 'holiday-inn-santiago-airport', '5': 'holiday-inn-santiago-airport' }, nights: 1, defaultCategory: 3, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'santiago-chile',
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo internacional a Santiago de Chile',
            description: 'Salida desde Barcelona vía Madrid hacia Santiago. Llegada por la noche, recepción en aeropuerto y traslado al hotel.',
          }
        },
        flights: ['MAD → SCL'],
        activities: [],
        referenceHotelId: 'cumbres-lastarria',
      },
      {
        dayNumber: 2,
        destinationId: 'santiago-chile',
        dayType: 'activity',
        content: {
          es: {
            title: 'Santiago: City Tour privado',
            description: 'Recorrido privado por la capital chilena para conocer la mezcla de historia y modernidad de la ciudad.',
            schedule: 'Tarde',
            duration: 'Medio día',
            highlights: ['Plaza de Armas y centro histórico', 'Barrio Lastarria y cerro Santa Lucía', 'Bellavista y miradores de la ciudad'],
            included: 'Guía privado y traslados',
          }
        },
        activities: [{ activityId: 'city-tour-santiago-privado', status: 'included' }],
        referenceHotelId: 'cumbres-lastarria',
      },
      {
        dayNumber: 3,
        destinationId: 'santiago-chile',
        dayType: 'activity',
        content: {
          es: {
            title: 'Excursión a Viña Santa Rita',
            description: 'Día dedicado a la cultura del vino chileno en una de las bodegas más emblemáticas del valle del Maipo.',
            duration: 'Día completo',
            highlights: ['Recorrido por los viñedos del valle del Maipo', 'Visita a las bodegas históricas', 'Cata de vinos premium chilenos'],
            included: 'Traslados, visita guiada y degustación',
          }
        },
        activities: [{ activityId: 'vina-santa-rita', status: 'included' }],
        referenceHotelId: 'cumbres-lastarria',
      },
      {
        dayNumber: 4,
        destinationId: 'san-pedro-atacama',
        dayType: 'transit',
        content: {
          es: {
            title: 'Santiago · San Pedro de Atacama',
            description: 'Vuelo a Calama y traslado a San Pedro de Atacama. Tarde libre para aclimatarse a la altura (2.400 m).',
          }
        },
        flights: ['SCL → CJC'],
        activities: [],
        referenceHotelId: 'cumbres-san-pedro',
      },
      {
        dayNumber: 5,
        destinationId: 'san-pedro-atacama',
        dayType: 'activity',
        content: {
          es: {
            title: 'Valle de la Luna al atardecer',
            description: 'Tarde explorando uno de los paisajes más sobrenaturales del planeta, con la puesta de sol sobre la Cordillera de la Sal.',
            schedule: 'Tarde',
            duration: '4-5 horas',
            highlights: ['Dunas, cuevas de sal y formaciones rocosas', 'Anfiteatro y las Tres Marías', 'Atardecer con vistas a los Andes'],
          }
        },
        activities: [
          { activityId: 'valle-de-la-luna', status: 'included' },
          { activityId: 'valle-arcoiris-atacama', status: 'optional' },
          { activityId: 'laguna-cejar-tebenquinche', status: 'optional' },
        ],
        referenceHotelId: 'cumbres-san-pedro',
      },
      {
        dayNumber: 6,
        destinationId: 'san-pedro-atacama',
        dayType: 'activity',
        content: {
          es: {
            title: 'Salar de Atacama y Lagunas Altiplánicas',
            description: 'Día completo recorriendo los paisajes más icónicos del altiplano chileno.',
            duration: 'Día completo',
            highlights: ['Laguna Chaxa con flamencos andinos', 'Lagunas Miscanti y Miñiques (4.200 m)', 'Pueblos de Toconao y Socaire'],
            included: 'Traslados, guía bilingüe y entradas',
            excluded: 'Almuerzo',
          }
        },
        activities: [{ activityId: 'salar-atacama-lagunas-altiplanicas', status: 'included' }],
        referenceHotelId: 'cumbres-san-pedro',
      },
      {
        dayNumber: 7,
        destinationId: 'san-pedro-atacama',
        dayType: 'activity',
        content: {
          es: {
            title: 'Géiseres del Tatio · Vuelo a Santiago',
            description: 'Madrugón mítico para ver el campo geotérmico al amanecer. Por la tarde, traslado al aeropuerto y vuelo a Santiago.',
            schedule: 'Salida 04:30 hs',
            duration: 'Medio día',
            highlights: ['Campo geotérmico a 4.320 m de altura', 'Fumarolas al amanecer', 'Baño en aguas termales', 'Pueblo andino de Machuca'],
            included: 'Traslados, desayuno y entrada',
          }
        },
        flights: ['CJC → SCL'],
        activities: [{ activityId: 'geysers-tatio', status: 'included' }],
        referenceHotelId: 'holiday-inn-santiago-airport',
      },
      {
        dayNumber: 8,
        destinationId: 'isla-pascua',
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo a Isla de Pascua',
            description: 'Vuelo de 5 horas hasta el ombligo del mundo. Recepción en aeropuerto con collar de flores y traslado al hotel.',
          }
        },
        flights: ['SCL → IPC'],
        activities: [],
        referenceHotelId: 'takarua',
      },
      {
        dayNumber: 9,
        destinationId: 'isla-pascua',
        dayType: 'activity',
        content: {
          es: {
            title: 'Rano Raraku y Ahu Tongariki',
            description: 'Visita imprescindible al corazón de la isla, donde nacieron los moáis.',
            duration: 'Día completo',
            highlights: ['Cantera de Rano Raraku con cientos de moáis sin terminar', 'Ahu Tongariki: 15 moáis monumentales frente al océano', 'Playa de Anakena y Ahu Nau Nau'],
            included: 'Guía bilingüe y entrada al Parque Nacional Rapa Nui',
          }
        },
        activities: [
          { activityId: 'rano-raraku-tongariki', status: 'included' },
          { activityId: 'anakena-playa-moai', status: 'included' },
        ],
        referenceHotelId: 'takarua',
      },
      {
        dayNumber: 10,
        destinationId: 'isla-pascua',
        dayType: 'activity',
        content: {
          es: {
            title: 'Orongo y volcán Rano Kau',
            description: 'Mañana visitando la aldea ceremonial del culto al hombre pájaro. Tarde libre para descansar o explorar Hanga Roa.',
            duration: 'Medio día',
            highlights: ['Cráter del volcán Rano Kau', 'Aldea ceremonial de Orongo en el borde del acantilado', 'Petroglifos del culto al Tangata Manu'],
          }
        },
        activities: [{ activityId: 'orongo-rano-kau', status: 'included' }],
        referenceHotelId: 'takarua',
      },
      {
        dayNumber: 11,
        destinationId: 'isla-pascua',
        dayType: 'transit',
        content: {
          es: {
            title: 'Isla de Pascua · Santiago',
            description: 'Mañana libre en la isla. Por la tarde, vuelo de regreso a Santiago. Hotel cerca del aeropuerto.',
          }
        },
        flights: ['IPC → SCL'],
        activities: [],
        referenceHotelId: 'holiday-inn-santiago-airport',
      },
      {
        dayNumber: 12,
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo de regreso',
            description: 'Traslado al aeropuerto de Santiago. Vuelo internacional de regreso. Noche en vuelo.',
          }
        },
        flights: ['SCL → MAD'],
        activities: [],
      },
    ],
  },
  {
    id: 'grandes-escenarios-argentina',
    slug: 'grandes-escenarios-argentina',
    content: {
      es: {
        title: 'Grandes Escenarios de Argentina: del Fin del Mundo a las Cataratas del Iguazú',
        description: 'Argentina tiene una capacidad única para dejarte sin palabras. Este viaje de 22 días lo demuestra en cada etapa: desde la cosmopolita Buenos Aires hasta el mítico Fin del Mundo en Ushuaia, pasando por el Glaciar Perito Moreno, el trekking en El Chaltén, los circuitos de Bariloche y San Martín, hasta las majestuosas Cataratas del Iguazú. Naturaleza pura, aventura y experiencias únicas en Patagonia.',
        heroImages: [
          { imageKey: 'ITINERARIES.GRANDES_ESCENARIOS_FITZ_ROY', location: 'Fitz Roy · El Chaltén' },
          { imageKey: 'ITINERARIES.GRANDES_ESCENARIOS_USHUAIA', location: 'Canal Beagle · Ushuaia' },
          { imageKey: 'ITINERARIES.GRANDES_ESCENARIOS_MORENO', location: 'Glaciar Perito Moreno · El Calafate' },
          { imageKey: 'ITINERARIES.GRANDES_ESCENARIOS_BARILOCHE', location: 'Lago Nahuel Huapi · Bariloche' },
          { imageKey: 'ITINERARIES.GRANDES_ESCENARIOS_IGUAZU', location: 'Cataratas del Iguazú' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'merit-san-telmo' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'altos-ushuaia' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'sierra-nevada-el-calafate' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'senderos-aparts-suites-el-chalten' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'nahuel-huapi-bariloche' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hosteria-casa-eugenia-san-martin' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'city-falls-iguazu' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'merit-san-telmo' }, nights: 1, defaultCategory: 3, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Inicio del viaje: vuelo internacional a Buenos Aires',
            description: 'Llegada al Aeropuerto Internacional Ezeiza de Buenos Aires. Recepción y traslado privado con guía al hotel.',
            included: 'Traslado privado con guía.',
          }
        },
        flights: ['MAD → EZE'],
        activities: [],
        referenceHotelId: 'merit-san-telmo-buenos-aires',
      },
      {
        dayNumber: 2,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: City Tour Clásico',
            description: 'Desayuno en el hotel. Por la tarde, recorrido guiado por los principales atractivos de Buenos Aires: Plaza de Mayo, Teatro Colón, La Boca, San Telmo, Recoleta y Palermo.',
            schedule: '14:00-18:00',
            duration: '3.5-4 horas',
            highlights: ['Floralis Genérica · Plaza de Mayo', 'La Boca · San Telmo', 'Palermo · Puerto Madero · Obelisco'],
            included: 'Guía turístico, recogida en hotel, regreso al hotel',
          }
        },
        activities: [{ activityId: 'buenos-aires-city-tour', status: 'included' }],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 3,
        destinationId: 'buenos-aires',
        dayType: 'free',
        content: {
          es: {
            title: 'Buenos Aires: Día libre',
            description: 'Día libre para explorar Buenos Aires a tu ritmo. Sugerencias: Visita al Teatro Colón, Palacio Barolo, Café Tortoni, Librería El Ateneo, Parrilla Don Julio en Palermo.',
          }
        },
        activities: [
          { activityId: 'delta-premium-buenos-aires', status: 'optional' },
          { activityId: 'tango-show-la-ventana', status: 'optional' },
        ],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 4,
        destinationId: 'ushuaia',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Buenos Aires a Ushuaia: el Fin del Mundo',
            description: 'Desayuno en el hotel. Vuelo doméstico a Ushuaia. Recepción en aeropuerto y traslado al hotel.',
          }
        },
        flights: ['EZE → USH'],
        activities: [],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 5,
        destinationId: 'ushuaia',
        dayType: 'activity',
        content: {
          es: {
            title: 'Ushuaia: Parque Nacional de Tierra de Fuego & Navegación Canal Beagle en Catamarán',
            description: 'Desayuno en hotel. \nPor la mañana, excursión guiada al Parque Nacional de Tierra de Fuego con Tren del Fin del Mundo.\nPor la tarde, navegación en catamarán por el histórico Canal Beagle. Observación de lobos marinos, cormoranes y aves patagónicas. Recorrido de 30 km, vistas al Faro Les Eclaireurs y la Isla de los Pájaros.',
            highlights: ['Parque Nacional de Tierra de Fuego', 'Tren del fin del mundo', 'Fauna marina', 'Faro Les Eclaireurs', 'Isla de los Lobos'],
            included: 'Traslados, Entrada al parque, guía especializado, ticket del Tren del Fin del Mundo, Catamarán con guía.',
          }
        },
        activities: [
          { activityId: 'parque-nacional-tierra-fuego', status: 'included' },
          { activityId: 'tren-fin-del-mundo', status: 'included' },
          { activityId: 'navegacion-canal-beagle', status: 'included' },
        ],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 6,
        destinationId: 'ushuaia',
        dayType: 'free',
        content: {
          es: {
            title: 'Ushuaia: Día libre de exploración',
            description: 'Día libre en Ushuaia. Opciones: Visita al Presidio (museo histórico), Travesía de los Lagos Fueguinos en 4x4, Laguna Esmeralda (trekking), Glaciar Martial (trekking), o simplemente disfrutar del ambiente austral.',
          }
        },
        activities: [
          { activityId: 'travesia-lagos-4x4-verano', status: 'optional' },
          { activityId: 'trekking-martial-by-sunset', status: 'optional' },
        ],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 7,
        destinationId: 'el-calafate',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Ushuaia a El Calafate: Parque Nacional de los Glaciares',
            description: 'Desayuno en hotel. Vuelo doméstico a El Calafate. Recepción y traslado al hotel.',
            highlights: ['Glaciarium'],
          }
        },
        flights: ['USH → FTE'],
        activities: [],
        referenceHotelId: 'sierra-nevada-el-calafate',
      },
      {
        dayNumber: 8,
        destinationId: 'el-calafate',
        dayType: 'activity',
        content: {
          es: {
            title: 'Glaciar Perito Moreno: excursión completa + Safari Náutico',
            description: 'Desayuno en hotel. Excursión al Parque Nacional Los Glaciares. Visita al Glaciar Perito Moreno: pasarelas con vistas panorámicas a este coloso de hielo. Por la tarde, navegación en barco Yagán por el Lago Rico, con aproximación a 200m del frente del glaciar. Safari náutico con vistas espectaculares.',
            schedule: '09:00-17:00',
            duration: 'Día completo, 8 horas',
            highlights: ['Perito Moreno', 'Navegación frente al glaciar'],
            included: 'Traslados, guía especializado, navegación, entrada al parque',
          }
        },
        activities: [
          { activityId: 'glaciar-perito-moreno', status: 'included' },
          { activityId: 'perito-moreno-safari', status: 'included' },
        ],
        referenceHotelId: 'sierra-nevada-el-calafate',
      },
      {
        dayNumber: 9,
        destinationId: 'el-chalten',
        dayType: 'transit',
        content: {
          es: {
            title: 'De El Calafate a El Chaltén: Capital Nacional del Trekking',
            description: 'Desayuno en hotel. Vuelo a Bariloche. Traslado regular en autobús hacia El Chaltén (4 horas aprox). Llegada al hotel.',
            highlights: ['El Chaltén'],
          }
        },
        activities: [],
        referenceHotelId: 'senderos-aparts-suites-el-chalten',
      },
      {
        dayNumber: 10,
        destinationId: 'el-chalten',
        dayType: 'activity',
        content: {
          es: {
            title: 'El Chaltén: Trekking Laguna de los Tres',
            description: 'Desayuno en hotel. Embárcate en la caminata más emblemática de la Capital Nacional del Trekking.Tras superar el ascenso más desafiante del recorrido, serás recompensado con la vista más cercana y espectacular del Monte Fitz Roy reflejado en las aguas turquesas de la Laguna de los Tres. Aventura épica de 23 km.  Se puede sustutuir por otro trekking más relajado en El Chaltén.',
            schedule: '09:00-17:00',
            duration: 'Día completo, 9 horas',
            highlights: ['Laguna Capri', 'Laguna de los Tres', 'Fizt Roy', 'Glaciares y aguas turquesas'],
            included: 'Guía y almuerzo.',
          }
        },
        activities: [{ activityId: 'trekking-laguna-de-los-tres', status: 'included' }],
        referenceHotelId: 'senderos-aparts-suites-el-chalten',
      },
      {
        dayNumber: 11,
        destinationId: 'el-chalten',
        dayType: 'free',
        content: {
          es: {
            title: 'El Chaltén: Día libre de trekking',
            description: 'Día libre para trekkings en El Chaltén. Opciones clásicas: Laguna de los Tres (Fitz Roy, exigente), Laguna Torre (suave), Miradores de los Cóndores y Águilas, Chorrillo del Salto (cascada fácil), Loma del Piegue Tumbado (360° panorámica). Todos pueden hacerse con guía opcional.',
          }
        },
        activities: [],
        referenceHotelId: 'senderos-aparts-suites-el-chalten',
      },
      {
        dayNumber: 12,
        destinationId: 'bariloche',
        dayType: 'transit',
        content: {
          es: {
            title: 'De El Chaltén a El Calafate y vuelo a Bariloche',
            description: 'Desayuno en hotel. Traslado a El Calafate para tomar vuelo a Bariloche. Llegada y recogida del coche de alquiler. Circuito Chico en coche: Miradores de Postal, Bahía López, Lago Llao Llao.',
            highlights: ['Circuto Chico', 'Cerro Campanario', 'Colonia Suiza'],
            included: 'Coche alquilado (categoría estándar), combustible, seguro',
          }
        },
        flights: ['FTE → BRC'],
        activities: [],
        referenceHotelId: 'nahuel-huapi-bariloche',
      },
      {
        dayNumber: 13,
        destinationId: 'bariloche',
        dayType: 'free',
        content: {
          es: {
            title: 'Bariloche: por libre en coche.',
            description: 'Desayuno en hotel.  Cerro Catedral y Lago Gutierrez. Gastronomía y cervecerías artesanales de Bariloche.',
            highlights: ['Cerro Catedral', 'Cerro Otto', 'Lago Gutierrez'],
            included: 'Coche alquilado (categoría estándar), combustible, seguro',
          }
        },
        activities: [],
        referenceHotelId: 'nahuel-huapi-bariloche',
      },
      {
        dayNumber: 14,
        destinationId: 'san-martin-de-los-andes',
        dayType: 'free',
        content: {
          es: {
            title: 'Ruta a San Martin de los Andes: por libre en coche.',
            description: 'Salida hacia San Martín de los Andes por Ruta Siete Lagos (150 km, 3-4 horas). Visita a Villa La Angostura y parada en los miradores de los siete lagos.Llegada y alojamiento.',
            highlights: ['Ruta de los Siete Lagos', 'Villa La Angostura'],
            included: 'Coche alquilado (categoría estándar), combustible, seguro',
          }
        },
        activities: [],
        referenceHotelId: 'hosteria-casa-eugenia-san-martin',
      },
      {
        dayNumber: 15,
        destinationId: 'san-martin-de-los-andes',
        dayType: 'free',
        content: {
          es: {
            title: 'San Martín de los Andes: por libre en coche.',
            description: 'Día libre en San Martín.',
            highlights: ['Volcan Lanin', 'Junin de los Andes'],
            included: 'Coche alquilado (categoría estándar), combustible, seguro',
          }
        },
        activities: [],
        referenceHotelId: 'hosteria-casa-eugenia-san-martin',
      },
      {
        dayNumber: 16,
        destinationId: 'bariloche',
        dayType: 'free',
        content: {
          es: {
            title: 'San Martín de los Andes a Bariloche: por libre en coche',
            description: 'Desayuno. Regreso a Bariloche por la espectacular Ruta del Valle Encantado. Tarde libre en Bariloche.',
            duration: '3-4 horas conducción',
            highlights: ['Valle encantado', 'Villa Traful'],
            included: 'Devolución coche, combustible',
          }
        },
        activities: [],
        referenceHotelId: 'nahuel-huapi-bariloche',
      },
      {
        dayNumber: 17,
        destinationId: 'iguazu',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Bariloche a Puerto Iguazú',
            description: 'Desayuno. Devolución del coche de alquiler. Vuelo a Puerto Iguazú. Recepción en aeropuerto y traslado al hotel.',
          }
        },
        flights: ['BRC →  AEP', 'AEP →  IGR'],
        activities: [],
        referenceHotelId: 'city-falls-iguazu-puerto',
      },
      {
        dayNumber: 18,
        destinationId: 'iguazu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Iguazú: Cataratas Argentinas (Lado Argentino)',
            description: 'Desayuno en hotel. Excursión al Parque Nacional Iguazú. Paseo Inferior (1.200m): vistas de la Garganta del Diablo desde abajo. Paseo Superior (1.100m): panorámicas elevadas. Garganta del Diablo en tren ecológico. Uno de los espectáculos naturales más impresionantes del mundo. Gran Aventura.',
            schedule: '07:20-16:00',
            duration: 'Día completo, 8 horas',
            highlights: ['Garganta del Diablo', '275 saltos de agua', 'naturaleza subtropical', 'Gran Aventura'],
            included: 'Entrada al parque, guía bilingüe, tren ecológico, gran aventura, traslados',
          }
        },
        activities: [
          { activityId: 'cataratas-argentinas', status: 'included' },
          { activityId: 'gran-aventura-iguazu', status: 'optional' },
        ],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 19,
        destinationId: 'iguazu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Iguazú: Cataratas Brasileñas (Lado Brasileño)',
            description: 'Desayuno. Continuación de la experiencia con la visita al lado brasileño de las Cataratas. Pasarelas panorámicas de 1.200m con vistas espectaculares a los 275 saltos desde otra perspectiva. Tarde: vuelo a Buenos Aires.',
            schedule: '08:00-14:00',
            duration: '3 horas (aproximadamente)',
            highlights: ['275 saltos desde perspectiva brasileña', 'arcoiris de agua'],
            included: 'Entrada parque brasileño, pasarelas, traslado',
          }
        },
        activities: [{ activityId: 'cataratas-brasilenas', status: 'included' }],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 20,
        destinationId: 'buenos-aires',
        dayType: 'free',
        content: {
          es: {
            title: 'Buenos Aires: Último día libre',
            description: 'Regreso a Buenos Aires. Día libre para compras, museos, gastronomía o simplemente pasear por los barrios favoritos.',
          }
        },
        flights: ['IGR→BUE'],
        activities: [],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 21,
        dayType: 'transit',
        content: {
          es: {
            title: 'Buenos Aires a Madrid: Vuelo internacional',
            description: 'Desayuno en hotel. Traslado privado al aeropuerto Ezeiza para el vuelo internacional.',
            included: 'Traslado privado hotel-aeropuerto',
          }
        },
        flights: ['EZE → MAD'],
        activities: [],
      },
    ],
  },
]

export default itineraries
