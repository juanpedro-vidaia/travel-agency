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
  heroTitleMobile?: string
  descriptionMobile?: string
  metaTitle?: string
  metaDescription?: string
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
        description: 'Argentina sorprende en cada etapa, y este viaje lo recorre de norte a sur. Las Cataratas del Iguazú desde el lado argentino y el brasileño, la Península Valdés con sus ballenas francas australes, el Glaciar Perito Moreno avanzando sobre el Lago Argentino y el Canal Beagle en Ushuaia, donde el continente se acaba. Trece días de paisajes que no se parecen entre sí.',
        heroTitleMobile: 'Viaje a los Paisajes Naturales de Argentina',
        descriptionMobile: '13 días por las Cataratas del Iguazú, las ballenas de Península Valdés, el Glaciar Perito Moreno y el Canal Beagle en Ushuaia.',
        metaTitle: 'Viaje a los Paisajes Naturales de Argentina — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje a Argentina a medida: Iguazú, Península de Valdés, Buenos Aires, El Calafate y Ushuaia. 13 días. Cuéntanos tu idea.',
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
            description: 'Llegada a Buenos Aires con vuelo interno a Puerto Iguazú. Recepción y traslado al hotel. Noche libre para un primer contacto con la selva subtropical. Alojamiento en Puerto Iguazú.',
            highlights: ['Llegada a Puerto Iguazú'],
            included: 'Vuelos internacional y doméstico · traslado hotel',
          }
        },
        flights: ['MAD → EZE', 'EZE → IGR'],
        activities: [{ activityId: 'cataratas-brasilenas', status: 'optional' }],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 2,
        destinationId: 'iguazu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Cataratas del Iguazú: lado argentino',
            description: 'Desayuno en el hotel. Jornada completa al Parque Nacional Iguazú. Alojamiento en Puerto Iguazú.',
            schedule: '07:20-16:00 hs',
            duration: '8 horas',
            highlights: ['Paseo Inferior · Garganta del Diablo', 'Tren ecológico hasta la Garganta'],
            included: 'Traslados · guía bilingüe · entrada Parque Nacional',
          }
        },
        activities: [
          { activityId: 'cataratas-argentinas', status: 'included' },
          { activityId: 'gran-aventura-iguazu', status: 'optional' },
        ],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 3,
        destinationId: 'puerto-madryn',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Puerto Iguazú a Puerto Madryn',
            description: 'Desayuno en el hotel. Vuelo a Puerto Madryn, puerta de entrada a la Península Valdés. Traslado al hotel. Tarde libre en la ciudad. Alojamiento en Puerto Madryn.',
            highlights: ['Llegada a Puerto Madryn · Patagonia atlántica'],
            included: 'Vuelos · traslados',
          }
        },
        flights: ['IGR → AEP → REL'],
        activities: [],
        referenceHotelId: 'yene-hue',
      },
      {
        dayNumber: 4,
        destinationId: 'peninsula-valdes',
        dayType: 'activity',
        content: {
          es: {
            title: 'Excursión Península de Valdés y ballena franca austral',
            description: 'Desayuno en el hotel. Excursión completa a la Península Valdés con avistaje de ballena franca austral en catamarán. Alojamiento en Puerto Madryn.',
            schedule: '07:30 hs',
            duration: '10 horas',
            highlights: ['Ballena franca austral · Puerto Pirámides', 'Elefantes marinos · Caleta Valdés'],
            included: 'Traslados · guía bilingüe · entrada reserva natural · navegación',
          }
        },
        activities: [{ activityId: 'peninsula-valdes-ballenas', status: 'included' }],
        referenceHotelId: 'yene-hue',
      },
      {
        dayNumber: 5,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Puerto Madryn a Buenos Aires',
            description: 'Desayuno en el hotel. Vuelo a Buenos Aires. Traslado al hotel. Tarde libre para explorar la ciudad. Alojamiento en Buenos Aires.',
            highlights: ['Llegada a Buenos Aires'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['REL → AEP'],
        activities: [],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 6,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: City Tour',
            description: 'Desayuno en el hotel. Por la mañana, city tour por los barrios y monumentos de Buenos Aires. Tarde libre para explorar la ciudad. Alojamiento en Buenos Aires.',
            schedule: 'Tour AM · Recogida 09:00 hs',
            duration: '3,5-4 horas',
            highlights: ['Plaza de Mayo · La Boca · San Telmo', 'Recoleta · Palermo · Puerto Madero'],
            included: 'Guía · traslados',
          }
        },
        activities: [{ activityId: 'city-tour-buenos-aires', status: 'included' }],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 7,
        destinationId: 'el-calafate',
        dayType: 'transit',
        content: {
          es: {
            title: 'De Buenos Aires a El Calafate',
            description: 'Desayuno en el hotel. Vuelo a El Calafate. Traslado al hotel. Tarde libre en la ciudad patagónica. Alojamiento en El Calafate.',
            highlights: ['Llegada a El Calafate · entrada a la Patagonia'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['AEP → FTE'],
        activities: [],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 8,
        destinationId: 'el-calafate',
        dayType: 'activity',
        content: {
          es: {
            title: 'Glaciar Perito Moreno y Safari Náutico',
            description: 'Desayuno en el hotel. Excursión al Glaciar Perito Moreno con Safari Náutico. Alojamiento en El Calafate.',
            schedule: '09:00-17:00 hs',
            duration: '8 horas',
            highlights: ['Glaciar Perito Moreno · pasarelas', 'Safari Náutico · pared sur del glaciar'],
            included: 'Traslados · guía bilingüe · navegación · entrada Parque Nacional',
          }
        },
        activities: [
          { activityId: 'glaciar-perito-moreno', status: 'included' },
          { activityId: 'perito-moreno-safari', status: 'included' },
        ],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 9,
        destinationId: 'el-calafate',
        dayType: 'free',
        content: {
          es: {
            title: 'El Calafate: Día libre',
            description: 'Desayuno en el hotel. Día libre en El Calafate. Alojamiento en El Calafate.',
            highlights: ['Glaciarium', 'Lago Argentino'],
          }
        },
        activities: [{ activityId: 'estancia-nibepo-aike', status: 'optional' }],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 10,
        destinationId: 'ushuaia',
        dayType: 'transit',
        content: {
          es: {
            title: 'De El Calafate a Ushuaia',
            description: 'Desayuno en el hotel. Vuelo a Ushuaia. Traslado al hotel. Tarde libre en el Fin del Mundo. Alojamiento en Ushuaia.',
            highlights: ['Llegada a Ushuaia · el Fin del Mundo'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['FTE → USH'],
        activities: [],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 11,
        destinationId: 'ushuaia',
        dayType: 'activity',
        content: {
          es: {
            title: 'Parque Nacional Tierra del Fuego y Canal Beagle',
            description: 'Desayuno en el hotel. Por la mañana, excursión al Parque Nacional Tierra del Fuego con el Tren del Fin del Mundo. Por la tarde, navegación por el Canal Beagle hasta la Isla de Lobos y el Faro Les Eclaireurs. Alojamiento en Ushuaia.',
            highlights: ['Parque Nacional · Tren del Fin del Mundo', 'Canal Beagle · Faro Les Eclaireurs'],
            included: 'Guía · ticket Tren del Fin del Mundo · entrada parque · tasa portuaria · cafetería a bordo · traslados',
          }
        },
        activities: [
          { activityId: 'parque-nacional-tierra-fuego', status: 'included' },
          { activityId: 'navegacion-canal-beagle', status: 'included' },
        ],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 12,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'De Ushuaia a Buenos Aires — Tango Show',
            description: 'Desayuno en el hotel. Vuelo a Buenos Aires. Por la noche, espectáculo de tango con cena en La Ventana. Alojamiento en Buenos Aires.',
            highlights: ['La Ventana · tango show con cena · San Telmo'],
            included: 'Vuelo · traslados · cena show en La Ventana',
          }
        },
        flights: ['USH → AEP'],
        activities: [{ activityId: 'tango-show-la-ventana', status: 'included' }],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 13,
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo de regreso a España',
            description: 'Desayuno en el hotel. Traslado al aeropuerto. Vuelo de regreso a Madrid.',
            included: 'Traslado aeropuerto · vuelo internacional',
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
        title: 'Chile e Isla de Pascua: de las viñas del Maipo a los moáis del Pacífico',
        description: 'Chile engaña en el mapa y sorprende en cada etapa. Santiago como puerta de entrada, las viñas del Maipo y Casablanca, el desierto de Atacama con sus salares, géiseres y cielos nocturnos, y al final del vuelo, una isla perdida en el Pacífico con moáis mirando al horizonte desde hace siglos. Trece días, tres paisajes que no tienen nada que ver entre sí.',
        heroTitleMobile: 'Viaje a Chile e Isla de Pascua',
        descriptionMobile: 'Santiago, las viñas del Maipo, el desierto de Atacama y los moáis de Rapa Nui. 13 días por tres paisajes completamente distintos.',
        metaTitle: 'Viaje a Chile e Isla de Pascua — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje a Chile a medida: Santiago, San Pedro de Atacama y Rapa Nui. 13 días por tres mundos distintos. Cuéntanos tu idea.',
        heroImages: [
          { imageKey: 'ITINERARIES.ESENCIAS_CHILE_MOAIS', location: 'Ahu Tongariki · Isla de Pascua' },
          { imageKey: 'ITINERARIES.ESENCIAS_CHILE_ATACAMA', location: 'Laguna Chaxa, Salar de Atacama' },
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
            description: 'Salida desde España hacia Santiago de Chile. Llegada por la noche, recepción y traslado al hotel. Alojamiento en Santiago.',
            highlights: ['Llegada a Santiago de Chile'],
            included: 'Traslado aeropuerto → hotel',
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
            title: 'Santiago: City Tour Panorámico',
            description: 'Desayuno en el hotel. Por la tarde, recorrido privado por los contrastes históricos y modernos de Santiago. Alojamiento en Santiago.',
            schedule: 'Tarde',
            duration: 'Medio día',
            highlights: ['Plaza de Armas · Cerro Santa Lucída', 'Barrio Bellavista · Lastarria'],
            included: 'Guía privado · traslados',
          }
        },
        activities: [{ activityId: 'city-tour-panoramico-santiago', status: 'included' }],
        referenceHotelId: 'cumbres-lastarria',
      },
      {
        dayNumber: 3,
        destinationId: 'santiago-chile',
        dayType: 'activity',
        content: {
          es: {
            title: 'Excursión a Viña Santa Rita',
            description: 'Desayuno en el hotel. Tarde en la Viña Santa Rita en el Valle del Maipo: viñedos, bodegas históricas y degustación. Alojamiento en Santiago.',
            schedule: '14:00',
            duration: '4 horas',
            highlights: ['Valle del Maipo · Viña Santa Rita', 'Bodega de los 120 Patriotas · Monumento Nacional'],
            included: 'Traslados · visita guiada · degustación de tres vinos',
          }
        },
        activities: [{ activityId: 'bodega-santa-rita-tour-clasico', status: 'included' }],
        referenceHotelId: 'cumbres-lastarria',
      },
      {
        dayNumber: 4,
        destinationId: 'san-pedro-atacama',
        dayType: 'transit',
        content: {
          es: {
            title: 'Santiago → San Pedro de Atacama',
            description: 'Desayuno en el hotel. Vuelo a Calama y traslado a San Pedro de Atacama. Tarde libre para aclimatarse a los 2.400 metros. Alojamiento en San Pedro.',
            highlights: ['Llegada a San Pedro de Atacama'],
            included: 'Vuelo · traslados',
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
            description: 'Desayuno en el hotel. Mañana libre en San Pedro. Por la tarde, excursión al Valle de la Luna con atardecer desde el Mirador de Licarantay. Alojamiento en San Pedro.',
            schedule: 'Tarde',
            duration: '4-5 horas',
            highlights: ['Valle de la Luna · Tres Marías', 'Atardecer · Mirador de Licarantay'],
            included: 'Guía · traslados · entrada Valle de la Luna',
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
            title: 'Lagunas Altiplánicas, Piedras Rojas y Laguna Chaxa',
            description: 'Desayuno en el hotel. Jornada completa al altiplano atacameño: Piedras Rojas, Lagunas Miscanti y Miñiques y Laguna Chaxa. Alojamiento en San Pedro.',
            duration: 'Día completo',
            highlights: ['Piedras Rojas · formaciones cobrizas', 'Laguna Chaxa · flamencos andinos'],
            included: 'Traslados · guía bilingüe · entradas · almuerzo',
          }
        },
        activities: [{ activityId: 'lagunas-altiplanicas-piedras-rojas-chaxa', status: 'included' }],
        referenceHotelId: 'cumbres-san-pedro',
      },
      {
        dayNumber: 7,
        destinationId: 'san-pedro-atacama',
        dayType: 'activity',
        content: {
          es: {
            title: 'Géiseres del Tatio → Vuelo a Santiago',
            description: 'Madrugada para la excursión a los Géiseres del Tatio a 4.200 metros. Regreso a San Pedro. Por la tarde, traslado a Calama y vuelo a Santiago. Alojamiento en hotel del aeropuerto.',
            schedule: '4:30',
            duration: 'Medio día',
            highlights: ['Géiseres del Tatio al amanecer · 4.200 m', 'Pueblo de Machuca'],
            included: 'Traslados · guía · entrada · desayuno en el Tatio · vuelo Calama → Santiago',
          }
        },
        flights: ['CJC → SCL'],
        activities: [{ activityId: 'geysers-tatio-machuca-putana', status: 'included' }],
        referenceHotelId: 'holiday-inn-santiago-airport',
      },
      {
        dayNumber: 8,
        destinationId: 'isla-pascua',
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo a Isla de Pascua',
            description: 'Vuelo matinal de cinco horas hasta Rapa Nui. Recepción en el aeropuerto de Mataveri y traslado al hotel en Hanga Roa. Tarde libre para un primer paseo por el pueblo. Alojamiento en Rapa Nui.',
            highlights: ['Llegada a Rapa Nui · Hanga Roa'],
            included: 'Vuelo · traslado semiprivado con guía',
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
            title: 'Rapa Nui: Orongo, Rano Kau y Ahu Akivi',
            description: 'Desayuno en el hotel. Por la mañana, visita al volcán Rano Kau y el Centro Ceremonial Orongo. Por la tarde, Ahu Akivi y los misterios de los moáis. Alojamiento en Rapa Nui.',
            schedule: 'AM · PM',
            duration: '6 horas',
            highlights: ['Centro Ceremonial Orongo · volcán Rano Kau', 'Ahu Akivi · siete moáis alineados'],
            included: 'Guía bilingüe · traslados',
          }
        },
        activities: [
          { activityId: 'orongo-rano-kau', status: 'included' },
          { activityId: 'ahu-akivi-misterios-moais', status: 'included' },
        ],
        referenceHotelId: 'takarua',
      },
      {
        dayNumber: 10,
        destinationId: 'isla-pascua',
        dayType: 'activity',
        content: {
          es: {
            title: 'Rapa Nui: Cantera de los Moáis y Playa Anakena',
            description: 'Desayuno en el hotel. Jornada completa por los sitios arqueológicos más importantes de la isla. Alojamiento en Rapa Nui.',
            duration: 'Día completo',
            highlights: ['Rano Raraku · 400 moáis en distintas fases', 'Playa Anakena · arena blanca'],
            included: 'Guía bilingüe · traslados · box lunch',
          }
        },
        activities: [{ activityId: 'cantera-moais-playa-anakena', status: 'included' }],
        referenceHotelId: 'takarua',
      },
      {
        dayNumber: 11,
        destinationId: 'isla-pascua',
        dayType: 'transit',
        content: {
          es: {
            title: 'Isla de Pascua → Santiago',
            description: 'Desayuno en el hotel. Mañana libre en la isla. Por la tarde, vuelo de regreso a Santiago. Alojamiento en hotel del aeropuerto.',
            highlights: ['Última mañana en Rapa Nui'],
            included: 'Vuelo · traslados',
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
            title: 'Vuelo de regreso a España',
            description: 'Traslado al aeropuerto de Santiago. Vuelo internacional de regreso. Noche a bordo.',
            included: 'Traslado aeropuerto · vuelo internacional',
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
        description: 'El viaje largo por Argentina, el que permite llegar a todos los rincones sin renunciar a nada. Buenos Aires como punto de partida, Ushuaia y el Canal Beagle, el Glaciar Perito Moreno y los picos del Chaltén en la Patagonia. Los lagos de Bariloche y San Martín de los Andes se recorren a vuestro aire, y las Cataratas del Iguazú como cierre. 22 días que demuestran que Argentina no se agota en un solo viaje.',
        heroTitleMobile: 'Viaje a los Grandes Escenarios de Argentina',
        descriptionMobile: '22 días por la Patagonia completa: Ushuaia, Perito Moreno, El Chaltén, Bariloche y las Cataratas del Iguazú.',
        metaTitle: 'Viaje a la Patagonia Argentina y a Iguazú — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje a Argentina a medida: Buenos Aires, Ushuaia, El Calafate, El Chaltén, Bariloche y las Cataratas del Iguazú. 22 días. Cuéntanos tu idea.',
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
            description: 'Llegada al Aeropuerto Internacional Ezeiza de Buenos Aires. Recepción y traslado privado con guía al hotel. Alojamiento en Buenos Aires.',
            highlights: ['Llegada a Buenos Aires'],
            included: 'Traslado privado con guía',
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
            title: 'Buenos Aires: City Tour',
            description: 'Desayuno en el hotel. Por la tarde, recorrido guiado por Buenos Aires. Alojamiento en Buenos Aires.',
            schedule: '14:00-18:00',
            duration: '3,5-4 horas',
            highlights: ['Plaza de Mayo · La Boca', 'Recoleta · Palermo · Puerto Madero'],
            included: 'Guía · traslados',
          }
        },
        activities: [{ activityId: 'city-tour-buenos-aires', status: 'included' }],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 3,
        destinationId: 'buenos-aires',
        dayType: 'free',
        content: {
          es: {
            title: 'Buenos Aires: Día libre',
            description: 'Desayuno en el hotel. Día libre para explorar Buenos Aires. Alojamiento en Buenos Aires.',
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
            description: 'Desayuno en el hotel. Vuelo a Ushuaia. Recepción y traslado al hotel. Alojamiento en Ushuaia.',
            highlights: ['Llegada a Ushuaia · el Fin del Mundo'],
            included: 'Vuelo · traslados',
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
            title: 'Ushuaia: Parque Nacional y Canal Beagle',
            description: 'Desayuno en el hotel. Por la mañana, excursión al Parque Nacional Tierra del Fuego con el Tren del Fin del Mundo. Por la tarde, navegación en catamarán por el Canal Beagle. Alojamiento en Ushuaia.',
            highlights: ['Parque Nacional · Tren del Fin del Mundo', 'Canal Beagle · Faro Les Eclaireurs'],
            included: 'Traslados · entrada parque · guía · ticket Tren · catamarán',
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
            title: 'Ushuaia: Día libre',
            description: 'Desayuno en el hotel. Día libre en Ushuaia. Alojamiento en Ushuaia.',
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
            title: 'De Ushuaia a El Calafate',
            description: 'Desayuno en el hotel. Vuelo a El Calafate. Traslado al hotel. Tarde libre. Alojamiento en El Calafate.',
            highlights: ['Llegada a El Calafate'],
            included: 'Vuelo · traslados',
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
            title: 'Glaciar Perito Moreno y Safari Náutico',
            description: 'Desayuno en el hotel. Excursión al Glaciar Perito Moreno con Safari Náutico. Alojamiento en El Calafate.',
            schedule: '09:00-17:00',
            duration: 'Día completo, 8 horas',
            highlights: ['Glaciar Perito Moreno · pasarelas', 'Safari Náutico · navegación frente al glaciar'],
            included: 'Traslados · guía · navegación · entrada Parque Nacional',
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
            title: 'De El Calafate a El Chaltén',
            description: 'Desayuno en el hotel. Traslado en autobús a El Chaltén, capital nacional del trekking. Alojamiento en El Chaltén.',
            highlights: ['El Chaltén · picos del Fitz Roy'],
            included: 'Traslado en autobús',
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
            description: 'Desayuno en el hotel. Jornada completa de trekking hasta la Laguna de los Tres con vistas al Fitz Roy. Alojamiento en El Chaltén.',
            schedule: '09:00-17:00',
            duration: '9 horas',
            highlights: ['Laguna de los Tres · Monte Fitz Roy', 'Laguna Capri · bosque nativo'],
            included: 'Guía · traslado al inicio del sendero',
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
            description: 'Desayuno en el hotel. Día libre para trekkings en El Chaltén. Alojamiento en El Chaltén.',
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
            title: 'De El Chaltén a Bariloche',
            description: 'Desayuno en el hotel. Traslado a El Calafate y vuelo a Bariloche. Recogida del coche de alquiler y primer recorrido por el Circuito Chico. Alojamiento en Bariloche.',
            highlights: ['Llegada a Bariloche · Lago Nahuel Huapi', 'Circuito Chico · Llao Llao'],
            included: 'Vuelo · coche de alquiler · seguro',
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
            title: 'Bariloche: Día libre en coche',
            description: 'Desayuno en el hotel. Día libre en Bariloche y alrededores en coche de alquiler. Alojamiento en Bariloche.',
            highlights: ['Cerro Catedral', 'Lago Gutierrez'],
            included: 'Coche de alquiler · seguro',
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
            title: 'Ruta de los Siete Lagos hacia San Martín de los Andes',
            description: 'Desayuno en el hotel. Conducción por la Ruta de los Siete Lagos hasta San Martín de los Andes. Parada en Villa La Angostura y los miradores del camino. Alojamiento en San Martín de los Andes.',
            duration: '3-4 horas conducción',
            highlights: ['Ruta de los Siete Lagos', 'Villa La Angostura'],
            included: 'Coche de alquiler · seguro',
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
            title: 'San Martín de los Andes: Día libre',
            description: 'Desayuno en el hotel. Día libre en San Martín de los Andes. Alojamiento en San Martín.',
            highlights: ['Volcán Lanín'],
            included: 'Coche de alquiler · seguro',
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
            title: 'San Martín de los Andes a Bariloche por el Valle Encantado',
            description: 'Desayuno en el hotel. Regreso a Bariloche por el Valle Encantado. Tarde libre en la ciudad. Alojamiento en Bariloche.',
            duration: '5-6 horas conducción',
            highlights: ['Valle Encantado', 'Villa Traful'],
            included: 'Coche de alquiler · seguro',
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
            description: 'Desayuno en el hotel. Vuelo a Puerto Iguazú con escala en Buenos Aires. Recepción y traslado al hotel. Alojamiento en Puerto Iguazú.',
            highlights: ['Llegada a Puerto Iguazú · la selva subtropical'],
            included: 'Vuelos · traslados',
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
            title: 'Cataratas del Iguazú: lado argentino',
            description: 'Desayuno en el hotel. Jornada completa al Parque Nacional Iguazú. Alojamiento en Puerto Iguazú.',
            schedule: '07:20-16:00',
            duration: '8 horas',
            highlights: ['Paseo Inferior · Garganta del Diablo', 'Tren ecológico'],
            included: 'Traslados · guía bilingüe · entrada parque',
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
            title: 'Cataratas del Iguazú: lado brasileño',
            description: 'Desayuno en el hotel. Por la mañana, visita al lado brasileño de las cataratas. Por la tarde, vuelo a Buenos Aires. Alojamiento en Buenos Aires.',
            schedule: '08:00-14:00',
            duration: '3 horas',
            highlights: ['1.200 m de pasarelas · vista panorámica'],
            included: 'Entrada parque brasileño · traslados',
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
            description: 'Regreso a Buenos Aires. Día libre para disfrutar de la ciudad. Alojamiento en Buenos Aires.',
            included: 'Traslados',
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
            title: 'Buenos Aires a Madrid: vuelo internacional',
            description: 'Desayuno en el hotel. Traslado privado al aeropuerto Ezeiza. Vuelo de regreso a Madrid.',
            included: 'Traslado privado aeropuerto · vuelo internacional',
          }
        },
        flights: ['EZE → MAD'],
        activities: [],
      },
    ],
  },
  {
    id: 'contrastes-argentinos-invierno',
    slug: 'contrastes-argentinos-invierno',
    content: {
      es: {
        title: 'Contrastes argentinos en invierno austral: del norte andino al Fin del Mundo',
        description: 'Argentina en invierno tiene una lógica propia. El norte andino de Salta y la Quebrada de Humahuaca con sus colores ocres y su cultura viva, la selva subtropical de Iguazú con las cataratas en pleno caudal, Buenos Aires con su ritmo urbano, y la Patagonia en su versión más austera: Ushuaia bajo la nieve y el Perito Moreno avanzando sobre el lago. 16 días que recorren los extremos del mismo país en su mejor temporada.',
        heroTitleMobile: 'Viaje a Argentina en invierno: de norte al Fin del mundo.',
        descriptionMobile: '16 días de contrastes: norte andino, cataratas, Buenos Aires, Ushuaia y glaciares.',
        metaTitle: 'Viaje a Argentina en Invierno Austral — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje a Argentina en invierno a medida: Salta, Purmamarca, Iguazú, Buenos Aires, Ushuaia y El Calafate. 16 días. Cuéntanos tu idea.',
        heroImages: [
          { imageKey: 'ITINERARIES.CONTRASTES_INVIERNO_SALTA', location: 'Cerro de los Siete Colores · Purmamarca' },
          { imageKey: 'ITINERARIES.CONTRASTES_INVIERNO_IGUAZU', location: 'Cataratas del Iguazú' },
          { imageKey: 'ITINERARIES.CONTRASTES_INVIERNO_USHUAIA', location: 'Canal Beagle · Ushuaia' },
          { imageKey: 'ITINERARIES.CONTRASTES_INVIERNO_MORENO', location: 'Glaciar Perito Moreno · El Calafate' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'hotel-del-virrey-salta' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'refugio-coquena-purmamarca' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-del-virrey-salta' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'city-falls-iguazu' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'esplendor-buenos-aires' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'altos-ushuaia' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'rh-rochester-calafate' }, nights: 2, defaultCategory: 3, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        dayType: 'transit',
        content: {
          es: {
            title: 'Inicio del viaje: Vuelo a Buenos Aires',
            description: 'Vuelo internacional a Buenos Aires. Noche a bordo.',
            included: 'Vuelo internacional',
          }
        },
        flights: ['MAD → EZE'],
        activities: [],
      },
      {
        dayNumber: 2,
        destinationId: 'salta',
        dayType: 'transit',
        content: {
          es: {
            title: 'Buenos Aires → Salta: el norte andino',
            description: 'Llegada a Buenos Aires y vuelo doméstico a Salta. Recepción y traslado al hotel. Por la tarde, city tour por el centro histórico de Salta. Alojamiento en Salta.',
            highlights: ['Salta · Plaza 9 de Julio · Catedral Basílica'],
            included: 'Vuelo doméstico · traslados · guía',
          }
        },
        flights: ['EZE → SLA'],
        activities: [{ activityId: 'city-tour-salta', status: 'included' }],
        referenceHotelId: 'hotel-del-virrey-salta',
      },
      {
        dayNumber: 3,
        destinationId: 'purmamarca',
        dayType: 'activity',
        content: {
          es: {
            title: 'Salta: Salinas Grandes y Purmamarca',
            description: 'Desayuno en el hotel. Excursión de día completo desde Salta: Salinas Grandes a 4.170 metros y Cerro de los Siete Colores en Purmamarca. Alojamiento en Purmamarca.',
            duration: '12 horas',
            highlights: ['Salinas Grandes · 4.170 m', 'Purmamarca · Cerro de los Siete Colores'],
            included: 'Traslados · guía · entrada a las Salinas',
          }
        },
        activities: [{ activityId: 'salinas-grandes-purmamarca', status: 'included' }],
        referenceHotelId: 'refugio-coquena-purmamarca',
      },
      {
        dayNumber: 4,
        destinationId: 'salta',
        dayType: 'activity',
        content: {
          es: {
            title: 'Purmamarca → Salta: Quebrada de Humahuaca',
            description: 'Desayuno en el hotel. Recorrido por la Quebrada de Humahuaca, Patrimonio de la Humanidad. Regreso a Salta. Alojamiento en Salta.',
            duration: 'Día completo',
            highlights: ['Quebrada de Humahuaca · Tilcara', 'Humahuaca · Monumento a la Independencia'],
            included: 'Traslados · guía',
          }
        },
        activities: [{ activityId: 'quebrada-humahuaca', status: 'included' }],
        referenceHotelId: 'hotel-del-virrey-salta',
      },
      {
        dayNumber: 5,
        destinationId: 'salta',
        dayType: 'activity',
        content: {
          es: {
            title: 'Salta: Excursión a Cafayate',
            description: 'Desayuno en el hotel. Excursión de día completo a Cafayate por la Quebrada del Río Las Conchas. Regreso a Salta al atardecer. Alojamiento en Salta.',
            duration: 'Día completo',
            highlights: ['Quebrada Las Conchas · Garganta del Diablo', 'Bodegas de Cafayate · Torrontés'],
            included: 'Traslados · guía · visita bodega',
          }
        },
        activities: [{ activityId: 'cafayate-excursion-salta', status: 'included' }],
        referenceHotelId: 'hotel-del-virrey-salta',
      },
      {
        dayNumber: 6,
        destinationId: 'iguazu',
        dayType: 'transit',
        content: {
          es: {
            title: 'Salta → Puerto Iguazú: la selva subtropical',
            description: 'Desayuno en el hotel. Vuelo a Puerto Iguazú. Recepción y traslado al hotel. Tarde libre en la ciudad de la triple frontera. Alojamiento en Puerto Iguazú.',
            highlights: ['Llegada a Puerto Iguazú · selva subtropical'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['SLA → IGR'],
        activities: [],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 7,
        destinationId: 'iguazu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Cataratas del Iguazú: lado argentino',
            description: 'Desayuno en el hotel. Jornada completa al Parque Nacional Iguazú. Alojamiento en Puerto Iguazú.',
            schedule: '07:20-16:00',
            duration: '8 horas',
            highlights: ['Paseo Inferior · Garganta del Diablo', 'Tren ecológico'],
            included: 'Traslados · guía bilingüe · entrada parque',
          }
        },
        activities: [
          { activityId: 'cataratas-argentinas', status: 'included' },
          { activityId: 'gran-aventura-iguazu', status: 'optional' },
        ],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 8,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Cataratas Brasileñas y vuelo a Buenos Aires',
            description: 'Desayuno en el hotel. Por la mañana, visita al lado brasileño de las cataratas. Por la tarde, vuelo a Buenos Aires. Alojamiento en Buenos Aires.',
            schedule: '08:00-14:00',
            duration: '3 horas',
            highlights: ['1.200 m de pasarelas · panorámica de los 275 saltos'],
            included: 'Entrada parque brasileño · vuelo · traslados',
          }
        },
        flights: ['IGR → AEP'],
        activities: [{ activityId: 'cataratas-brasilenas', status: 'included' }],
        referenceHotelId: 'esplendor-buenos-aires',
      },
      {
        dayNumber: 9,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: City Tour Premium',
            description: 'Desayuno en el hotel. Por la mañana, city tour premium por Buenos Aires. Alojamiento en Buenos Aires.',
            duration: '4 horas',
            highlights: ['Recoleta · Cementerio · Teatro Colón', 'La Boca · Caminito · Puerto Madero'],
            included: 'Guía · traslados',
          }
        },
        activities: [
          { activityId: 'city-tour-premium-buenos-aires', status: 'included' },
          { activityId: 'tango-show-la-ventana', status: 'optional' },
        ],
        referenceHotelId: 'esplendor-buenos-aires',
      },
      {
        dayNumber: 10,
        destinationId: 'buenos-aires',
        dayType: 'free',
        content: {
          es: {
            title: 'Buenos Aires: Día libre',
            description: 'Desayuno en el hotel. Día libre en Buenos Aires. Alojamiento en Buenos Aires.',
          }
        },
        activities: [{ activityId: 'delta-premium-buenos-aires', status: 'optional' }],
        referenceHotelId: 'esplendor-buenos-aires',
      },
      {
        dayNumber: 11,
        destinationId: 'ushuaia',
        dayType: 'transit',
        content: {
          es: {
            title: 'Buenos Aires → Ushuaia: Canal Beagle',
            description: 'Desayuno en el hotel. Vuelo a Ushuaia. Por la tarde, navegación por el Canal Beagle. Alojamiento en Ushuaia.',
            schedule: '15:00-18:00',
            duration: '3 horas',
            highlights: ['Canal Beagle · Faro Les Eclaireurs', 'Fauna marina · Isla de los Lobos'],
            included: 'Vuelo · catamarán · traslados',
          }
        },
        flights: ['EZE → USH'],
        activities: [{ activityId: 'navegacion-canal-beagle', status: 'included' }],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 12,
        destinationId: 'ushuaia',
        dayType: 'activity',
        content: {
          es: {
            title: 'Ushuaia: Parque Nacional y Nieve y Fuego',
            description: 'Desayuno en el hotel. Por la mañana, excursión al Parque Nacional con el Tren del Fin del Mundo. Por la tarde-noche, raquetas de nieve y trineos con huskies. Alojamiento en Ushuaia.',
            duration: 'Día completo',
            highlights: ['Parque Nacional · Tren del Fin del Mundo', 'Trineos con huskies · bosque fueguino'],
            included: 'Tren · traslados · raquetas · trineos · cena con bebidas',
          }
        },
        activities: [
          { activityId: 'parque-nacional-tierra-fuego', status: 'included' },
          { activityId: 'nieve-fuego-raquetas-trineos', status: 'included' },
        ],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 13,
        destinationId: 'el-calafate',
        dayType: 'transit',
        content: {
          es: {
            title: 'Ushuaia → El Calafate: los glaciares',
            description: 'Desayuno en el hotel. Vuelo a El Calafate. Traslado al hotel. Tarde libre. Alojamiento en El Calafate.',
            highlights: ['Llegada a El Calafate · Patagonia'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['USH → FTE'],
        activities: [],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 14,
        destinationId: 'el-calafate',
        dayType: 'activity',
        content: {
          es: {
            title: 'Glaciar Perito Moreno y Safari Náutico',
            description: 'Desayuno en el hotel. Excursión al Glaciar Perito Moreno con Safari Náutico. Alojamiento en El Calafate.',
            schedule: '09:00-17:00',
            duration: '8 horas',
            highlights: ['Glaciar Perito Moreno · pasarelas', 'Safari Náutico · pared sur del glaciar'],
            included: 'Traslados · guía bilingüe · Safari Náutico · entrada parque',
          }
        },
        activities: [
          { activityId: 'glaciar-perito-moreno', status: 'included' },
          { activityId: 'perito-moreno-safari', status: 'included' },
        ],
        referenceHotelId: 'rh-rochester-calafate',
      },
      {
        dayNumber: 15,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'El Calafate → Madrid: fin del viaje',
            description: 'Desayuno en el hotel. Mañana libre en El Calafate. Traslado privado al aeropuerto. Vuelo a Buenos Aires y conexión con vuelo internacional a Madrid.',
            included: 'Traslado privado aeropuerto · vuelos',
          }
        },
        flights: ['FTE → EZE', 'EZE → MAD'],
        activities: [],
      },
    ],
  },
  {
    id: 'argentina-sur-norte',
    slug: 'argentina-sur-norte',
    content: {
      es: {
        title: 'Argentina de sur a norte: de Tierra de Fuego a las Cataratas del Iguazú',
        description: 'Un recorrido de sur a norte que pone en perspectiva la dimensión real de Argentina. Buenos Aires como punto de partida, el Canal Beagle y el Parque Nacional en Ushuaia, el Glaciar Perito Moreno en El Calafate, los lagos y volcanes de Bariloche, y las Cataratas del Iguazú como destino final. 16 días en los que el país cambia de carácter en cada etapa.',
        heroTitleMobile: 'Viaje a Argentina de Sur a Norte',
        descriptionMobile: '16 días de Buenos Aires a Ushuaia, glaciares, Bariloche e Iguazú.',
        metaTitle: 'Viaje a Argentina de Sur a Norte — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje a Argentina a medida: Buenos Aires, Ushuaia, El Calafate, Bariloche y las Cataratas del Iguazú. 16 días de sur a norte. Cuéntanos tu idea.',
        heroImages: [
          { imageKey: 'ITINERARIES.SUR_NORTE_USHUAIA', location: 'Canal Beagle · Ushuaia' },
          { imageKey: 'ITINERARIES.SUR_NORTE_MORENO', location: 'Glaciar Perito Moreno · El Calafate' },
          { imageKey: 'ITINERARIES.SUR_NORTE_BARILOCHE', location: 'Lago Nahuel Huapi · Bariloche' },
          { imageKey: 'ITINERARIES.SUR_NORTE_IGUAZU', location: 'Cataratas del Iguazú' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'merit-san-telmo' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'altos-ushuaia' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'sierra-nevada-el-calafate' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'nahuel-huapi-bariloche' }, nights: 3, defaultCategory: 3, featured: false },
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
            title: 'Inicio del viaje: Madrid → Buenos Aires',
            description: 'Salida desde Madrid. Llegada a Buenos Aires. Recepción y traslado al hotel. Alojamiento en Buenos Aires.',
            highlights: ['Llegada a Buenos Aires'],
            included: 'Traslado privado aeropuerto',
          }
        },
        flights: ['MAD → EZE'],
        activities: [],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 2,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: City Tour',
            description: 'Desayuno en el hotel. Recorrido guiado por Buenos Aires. Alojamiento en Buenos Aires.',
            duration: '3-4 horas',
            highlights: ['Plaza de Mayo · La Boca', 'Recoleta · Palermo · Puerto Madero'],
            included: 'Guía · traslados',
          }
        },
        activities: [{ activityId: 'city-tour-buenos-aires', status: 'included' }],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 3,
        destinationId: 'ushuaia',
        dayType: 'transit',
        content: {
          es: {
            title: 'Buenos Aires → Ushuaia: el Fin del Mundo',
            description: 'Desayuno en el hotel. Vuelo a Ushuaia. Recepción y traslado al hotel. Alojamiento en Ushuaia.',
            highlights: ['Llegada a Ushuaia · Tierra del Fuego'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['EZE → USH'],
        activities: [],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 4,
        destinationId: 'ushuaia',
        dayType: 'activity',
        content: {
          es: {
            title: 'Ushuaia: Parque Nacional Tierra del Fuego',
            description: 'Desayuno en el hotel. Excursión al Parque Nacional Tierra del Fuego con el Tren del Fin del Mundo. Tarde libre en Ushuaia. Alojamiento en Ushuaia.',
            duration: '5 horas',
            highlights: ['Parque Nacional · Bahía Lapataia', 'Tren del Fin del Mundo'],
            included: 'Tren · traslados · entradas',
          }
        },
        activities: [{ activityId: 'parque-nacional-tierra-fuego', status: 'included' }],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 5,
        destinationId: 'ushuaia',
        dayType: 'activity',
        content: {
          es: {
            title: 'Ushuaia: Aventura Almanza y Pingüinera',
            description: 'Desayuno en el hotel. Excursión a Puerto Almanza: navegación hasta la Isla Martillo para ver los pingüinos y almuerzo de centolla en casa de pescadores locales. Alojamiento en Ushuaia.',
            duration: '6 horas',
            highlights: ['Isla Martillo · pingüinos Magallanes y Papúa', 'Centolla · almuerzo en Puerto Almanza'],
            included: 'Navegación · almuerzo de 3 pasos · traslados',
          }
        },
        activities: [{ activityId: 'aventura-almanza', status: 'included' }],
        referenceHotelId: 'altos-ushuaia',
      },
      {
        dayNumber: 6,
        destinationId: 'el-calafate',
        dayType: 'transit',
        content: {
          es: {
            title: 'Ushuaia → El Calafate',
            description: 'Desayuno en el hotel. Mañana libre en Ushuaia. Vuelo a El Calafate. Traslado al hotel. Alojamiento en El Calafate.',
            highlights: ['Llegada a El Calafate'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['USH → FTE'],
        activities: [],
        referenceHotelId: 'sierra-nevada-el-calafate',
      },
      {
        dayNumber: 7,
        destinationId: 'el-calafate',
        dayType: 'activity',
        content: {
          es: {
            title: 'El Calafate: Glaciar Perito Moreno',
            description: 'Desayuno en el hotel. Excursión al Glaciar Perito Moreno. Alojamiento en El Calafate.',
            schedule: '09:00-17:00',
            duration: '8 horas',
            highlights: ['Glaciar Perito Moreno · pasarelas', 'Safari Náutico · pared sur'],
            included: 'Traslados · guía bilingüe · entrada parque',
          }
        },
        activities: [
          { activityId: 'glaciar-perito-moreno', status: 'included' },
          { activityId: 'perito-moreno-minitrekking', status: 'optional' },
          { activityId: 'perito-moreno-safari', status: 'optional' },
        ],
        referenceHotelId: 'sierra-nevada-el-calafate',
      },
      {
        dayNumber: 8,
        destinationId: 'el-calafate',
        dayType: 'free',
        content: {
          es: {
            title: 'El Calafate: Día libre',
            description: 'Desayuno en el hotel. Día libre en El Calafate. Alojamiento en El Calafate.',
          }
        },
        activities: [
          { activityId: 'kayak-atardecer-lago-argentino', status: 'optional' },
          { activityId: 'kayak-trekking-rio-la-leona', status: 'optional' },
        ],
        referenceHotelId: 'sierra-nevada-el-calafate',
      },
      {
        dayNumber: 9,
        destinationId: 'bariloche',
        dayType: 'transit',
        content: {
          es: {
            title: 'El Calafate → Bariloche',
            description: 'Desayuno en el hotel. Vuelo a Bariloche. Recepción y traslado al hotel. Tarde libre para explorar la ciudad. Alojamiento en Bariloche.',
            highlights: ['Llegada a Bariloche · Lago Nahuel Huapi'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['FTE → BRC'],
        activities: [],
        referenceHotelId: 'nahuel-huapi-bariloche',
      },
      {
        dayNumber: 10,
        destinationId: 'bariloche',
        dayType: 'activity',
        content: {
          es: {
            title: 'Bariloche: Circuito Chico y Cerro Campanario',
            description: 'Desayuno en el hotel. Excursión por el Circuito Chico con ascenso en aerosilla al Cerro Campanario. Tarde libre. Alojamiento en Bariloche.',
            highlights: ['Cerro Campanario · vistas panorámicas', 'Llao Llao · Bahía López'],
            included: 'Guía · traslados · aerosilla',
          }
        },
        activities: [],
        referenceHotelId: 'nahuel-huapi-bariloche',
      },
      {
        dayNumber: 11,
        destinationId: 'bariloche',
        dayType: 'activity',
        content: {
          es: {
            title: 'Bariloche: Ruta de los Siete Lagos',
            description: 'Desayuno en el hotel. Excursión por la Ruta de los Siete Lagos hasta San Martín de los Andes. Regreso al atardecer. Alojamiento en Bariloche.',
            schedule: '8:30',
            duration: '10 horas',
            highlights: ['Ruta de los Siete Lagos · Villa La Angostura', 'San Martín de los Andes'],
            included: 'Guía · traslados',
          }
        },
        activities: [{ activityId: 'circuito-chico-bariloche', status: 'included' }],
        referenceHotelId: 'nahuel-huapi-bariloche',
      },
      {
        dayNumber: 12,
        destinationId: 'iguazu',
        dayType: 'transit',
        content: {
          es: {
            title: 'Bariloche → Puerto Iguazú',
            description: 'Desayuno en el hotel. Vuelo a Puerto Iguazú con escala en Buenos Aires. Recepción y traslado al hotel. Alojamiento en Puerto Iguazú.',
            highlights: ['Llegada a Puerto Iguazú · selva subtropical'],
            included: 'Vuelos · traslados',
          }
        },
        flights: ['BRC → AEP', 'AEP → IGR'],
        activities: [{ activityId: 'ruta-siete-lagos-san-martin', status: 'included' }],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 13,
        destinationId: 'iguazu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Cataratas del Iguazú: lado argentino',
            description: 'Desayuno en el hotel. Jornada completa al Parque Nacional Iguazú. Alojamiento en Puerto Iguazú.',
            schedule: '07:20-16:00',
            duration: '8 horas',
            highlights: ['Paseo Inferior · Garganta del Diablo', 'Tren ecológico'],
            included: 'Traslados · guía bilingüe · entrada parque',
          }
        },
        activities: [
          { activityId: 'cataratas-argentinas', status: 'included' },
          { activityId: 'gran-aventura-iguazu', status: 'optional' },
        ],
        referenceHotelId: 'city-falls-iguazu',
      },
      {
        dayNumber: 14,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Cataratas Brasileñas y vuelo a Buenos Aires',
            description: 'Desayuno en el hotel. Por la mañana, visita al lado brasileño de las cataratas. Por la tarde, vuelo a Buenos Aires. Alojamiento en Buenos Aires.',
            schedule: '08:00-14:00',
            duration: '3 horas',
            highlights: ['Pasarelas panorámicas · 275 saltos'],
            included: 'Entrada parque brasileño · traslados',
          }
        },
        flights: ['IGR → AEP'],
        activities: [{ activityId: 'cataratas-brasilenas', status: 'included' }],
        referenceHotelId: 'merit-san-telmo',
      },
      {
        dayNumber: 15,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Buenos Aires → Madrid: vuelo de regreso',
            description: 'Desayuno en el hotel. Traslado privado al aeropuerto. Vuelo de regreso a Madrid.',
            included: 'Traslado privado aeropuerto · vuelo internacional',
          }
        },
        flights: ['EZE → MAD'],
        activities: [],
      },
      {
        dayNumber: 16,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Llegada a Madrid',
            description: 'Llegada al aeropuerto de Madrid. Fin de los servicios de Viajes Vidaia.',
          }
        },
        flights: ['MAD'],
        activities: [],
      },
    ],
  },
  {
    id: 'contrastes-argentinos',
    slug: 'contrastes-argentinos',
    content: {
      es: {
        title: 'Contrastes argentinos: glaciares, selva y salares andinos',
        description: 'En 21 días Argentina cambia de cara en cada etapa: el bullicio de Buenos Aires, la quietud del noroeste andino por Tucumán, Cafayate, Salta y Purmamarca. El frío seco de la Patagonia en Ushuaia y El Calafate. Y el estruendo húmedo de las Cataratas del Iguazú. De los salares al Perito Moreno, de los viñedos a la selva subtropical. El viaje largo que lo tiene todo.',
        heroTitleMobile: 'Viaje a Argentina: glaciares, selva y salares.',
        descriptionMobile: '21 días del noroeste andino al Fin del Mundo y las Cataratas.',
        metaTitle: 'Viaje a Argentina: glaciares, selva y salares — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje a Argentina a medida: Buenos Aires, Salta, Purmamarca, Ushuaia, El Calafate e Iguazú. 21 días de contrastes. Cuéntanos tu idea.',
        heroImages: [
          { imageKey: 'ITINERARIES.CONTRASTES_SALINAS', location: 'Salinas Grandes · Jujuy' },
          { imageKey: 'ITINERARIES.CONTRASTES_CAFAYATE', location: 'Valles Calchaquíes · Cafayate' },
          { imageKey: 'ITINERARIES.CONTRASTES_USHUAIA', location: 'Faro Les Eclaireurs · Ushuaia' },
          { imageKey: 'ITINERARIES.CONTRASTES_MORENO', location: 'Glaciar Perito Moreno · El Calafate' },
          { imageKey: 'ITINERARIES.CONTRASTES_IGUAZU', location: 'Cataratas del Iguazú' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'huinid-obelisco-buenos-aires' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'amerian-tucuman' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'vinas-cafayate-wine-resort' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'hotel-salta' }, nights: 2, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'la-comarca-purmamarca' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-salta' }, nights: 2, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'cilene-del-faro-ushuaia' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'mirador-del-lago-el-calafate' }, nights: 3, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-saint-george-iguazu' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-dora-buenos-aires' }, nights: 1, defaultCategory: 3, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Inicio del viaje: Barcelona → Buenos Aires',
            description: 'Salida desde Barcelona hacia Buenos Aires. Llegada al aeropuerto de Ezeiza. Recepción y traslado al hotel. Alojamiento en Buenos Aires.',
            highlights: ['Llegada a Buenos Aires'],
            included: 'Traslado privado con guía',
          }
        },
        flights: ['BCN → EZE'],
        activities: [],
        referenceHotelId: 'huinid-obelisco-buenos-aires',
      },
      {
        dayNumber: 2,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: City Tour Premium',
            description: 'Desayuno en el hotel. Por la mañana, city tour premium por los barrios icónicos de Buenos Aires. Tarde libre. Alojamiento en Buenos Aires.',
            duration: '4 horas',
            highlights: ['Recoleta · Cementerio · Teatro Colón', 'La Boca · Caminito · Puerto Madero'],
            included: 'Guía · traslados',
          }
        },
        activities: [{ activityId: 'city-tour-premium-buenos-aires', status: 'included' }],
        referenceHotelId: 'huinid-obelisco-buenos-aires',
      },
      {
        dayNumber: 3,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: Delta del Tigre',
            description: 'Desayuno en el hotel. Excursión al Delta del Tigre navegando desde Buenos Aires. Alojamiento en Buenos Aires.',
            schedule: '09:00-14:00',
            duration: '5 horas',
            highlights: ['Delta del Paraná · casas isleñas', 'Tigre · Paseo Victorica · Puerto de Frutos'],
            included: 'Guía · navegación compartida · traslados',
          }
        },
        activities: [{ activityId: 'delta-premium-buenos-aires', status: 'included' }],
        referenceHotelId: 'huinid-obelisco-buenos-aires',
      },
      {
        dayNumber: 4,
        destinationId: 'tucuman',
        dayType: 'transit',
        content: {
          es: {
            title: 'Buenos Aires → Tucumán: el jardín de la República',
            description: 'Desayuno en el hotel. Vuelo a Tucumán. Recepción y traslado al hotel. Tarde libre para explorar el centro histórico. Alojamiento en Tucumán.',
            highlights: ['Llegada a Tucumán · capital histórica del noroeste'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['EZE → TUC'],
        activities: [],
        referenceHotelId: 'amerian-tucuman',
      },
      {
        dayNumber: 5,
        destinationId: 'cafayate',
        dayType: 'transit',
        content: {
          es: {
            title: 'Tucumán → Cafayate: Ruta Escénica Tafí-Amaicha-Quilmes',
            description: 'Desayuno en el hotel. Jornada de Tucumán a Cafayate por los Valles Calchaquíes: Menhires, Tafí del Valle, Abra del Infiernillo y Ruinas de Quilmes. Alojamiento en Cafayate.',
            duration: 'Día completo',
            highlights: ['Ruinas de Quilmes', 'Abra del Infiernillo · 3.042 m'],
            included: 'Guía · traslados · entradas',
          }
        },
        activities: [{ activityId: 'ruta-escenica-tafi-quilmes', status: 'included' }],
        referenceHotelId: 'vinas-cafayate-wine-resort',
      },
      {
        dayNumber: 6,
        destinationId: 'salta',
        dayType: 'transit',
        content: {
          es: {
            title: 'Cafayate → Salta: Bodegas y Quebrada de las Conchas',
            description: 'Desayuno en el hotel. Mañana en las bodegas de Cafayate. Por la tarde, Quebrada de las Conchas de vuelta a Salta. Alojamiento en Salta.',
            duration: 'Día completo',
            highlights: ['Bodegas de Cafayate · Torrontés', 'Quebrada de las Conchas · Garganta del Diablo'],
            included: 'Guía · transporte · visita bodega con degustación',
          }
        },
        activities: [{ activityId: 'bodegas-quebrada-conchas-cafayate', status: 'included' }],
        referenceHotelId: 'hotel-salta',
      },
      {
        dayNumber: 7,
        destinationId: 'salta',
        dayType: 'activity',
        content: {
          es: {
            title: 'Salta: City Tour por La Linda',
            description: 'Desayuno en el hotel. Por la tarde, recorrido guiado por el centro histórico de Salta. Alojamiento en Salta.',
            duration: 'Medio día',
            highlights: ['Plaza 9 de Julio · Catedral Basílica', 'Cerro San Bernardo · vistas panorámicas'],
            included: 'Guía · traslados',
          }
        },
        activities: [{ activityId: 'city-tour-salta', status: 'included' }],
        referenceHotelId: 'hotel-salta',
      },
      {
        dayNumber: 8,
        destinationId: 'purmamarca',
        dayType: 'activity',
        content: {
          es: {
            title: 'Salta → Purmamarca: Vuelta a las Alturas y Salinas Grandes',
            description: 'Desayuno en el hotel. Excursión de doce horas hasta las Salinas Grandes a 4.170 metros y descenso a Purmamarca. Alojamiento en Purmamarca.',
            duration: '12 horas',
            highlights: ['Salinas Grandes · 4.170 m', 'Purmamarca · Cerro de los Siete Colores'],
            included: 'Traslados · guía · entrada a las Salinas',
          }
        },
        activities: [{ activityId: 'salinas-grandes-purmamarca', status: 'included' }],
        referenceHotelId: 'la-comarca-purmamarca',
      },
      {
        dayNumber: 9,
        destinationId: 'salta',
        dayType: 'activity',
        content: {
          es: {
            title: 'Purmamarca → Salta: Quebrada de Humahuaca',
            description: 'Desayuno en el hotel. Recorrido por la Quebrada de Humahuaca, Patrimonio de la Humanidad. Regreso a Salta. Alojamiento en Salta.',
            duration: 'Día completo',
            highlights: ['Quebrada de Humahuaca · Tilcara', 'Humahuaca · Monumento a la Independencia'],
            included: 'Traslados · guía',
          }
        },
        activities: [{ activityId: 'quebrada-humahuaca', status: 'included' }],
        referenceHotelId: 'hotel-salta',
      },
      {
        dayNumber: 10,
        destinationId: 'salta',
        dayType: 'free',
        content: {
          es: {
            title: 'Salta: Día libre',
            description: 'Desayuno en el hotel. Día libre para explorar Salta. Alojamiento en Salta.',
          }
        },
        activities: [],
        referenceHotelId: 'hotel-salta',
      },
      {
        dayNumber: 11,
        destinationId: 'ushuaia',
        dayType: 'transit',
        content: {
          es: {
            title: 'Salta → Ushuaia: el Fin del Mundo',
            description: 'Desayuno en el hotel. Vuelo a Ushuaia con escala en Buenos Aires. Recepción y traslado al hotel. Alojamiento en Ushuaia.',
            highlights: ['Llegada a Ushuaia'],
            included: 'Vuelos · traslados',
          }
        },
        flights: ['SLA → EZE → USH'],
        activities: [],
        referenceHotelId: 'cilene-del-faro-ushuaia',
      },
      {
        dayNumber: 12,
        destinationId: 'ushuaia',
        dayType: 'activity',
        content: {
          es: {
            title: 'Ushuaia: Navegación Canal Beagle con Pingüinera',
            description: 'Desayuno en el hotel. Navegación de seis horas por el Canal Beagle hasta la Isla Martillo. Alojamiento en Ushuaia.',
            schedule: '08:30 o 15:00',
            duration: '6 horas',
            highlights: ['Canal Beagle · Faro Les Eclaireurs', 'Isla Martillo · pingüinos Magallanes y Papúa'],
            included: 'Navegación · traslados',
          }
        },
        activities: [
          { activityId: 'navegacion-canal-beagle', status: 'included' },
          { activityId: 'aventura-almanza', status: 'optional' },
        ],
        referenceHotelId: 'cilene-del-faro-ushuaia',
      },
      {
        dayNumber: 13,
        destinationId: 'ushuaia',
        dayType: 'activity',
        content: {
          es: {
            title: 'Ushuaia: Parque Nacional Tierra del Fuego',
            description: 'Desayuno en el hotel. Excursión al Parque Nacional Tierra del Fuego con el Tren del Fin del Mundo. Tarde libre. Alojamiento en Ushuaia.',
            duration: '5 horas',
            highlights: ['Parque Nacional · Bahía Lapataia', 'Tren del Fin del Mundo'],
            included: 'Tren · traslados · entradas',
          }
        },
        activities: [{ activityId: 'parque-nacional-tierra-fuego', status: 'included' }],
        referenceHotelId: 'cilene-del-faro-ushuaia',
      },
      {
        dayNumber: 14,
        destinationId: 'el-calafate',
        dayType: 'transit',
        content: {
          es: {
            title: 'Ushuaia → El Calafate',
            description: 'Desayuno en el hotel. Mañana libre en Ushuaia. Vuelo a El Calafate. Traslado al hotel. Alojamiento en El Calafate.',
            highlights: ['Llegada a El Calafate'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['USH → FTE'],
        activities: [],
        referenceHotelId: 'mirador-del-lago-el-calafate',
      },
      {
        dayNumber: 15,
        destinationId: 'el-calafate',
        dayType: 'activity',
        content: {
          es: {
            title: 'El Calafate: Glaciar Perito Moreno y Safari Náutico',
            description: 'Desayuno en el hotel. Excursión al Glaciar Perito Moreno con Safari Náutico. Alojamiento en El Calafate.',
            schedule: '09:00-17:00',
            duration: '8 horas',
            highlights: ['Glaciar Perito Moreno · pasarelas', 'Safari Náutico · pared sur del glaciar'],
            included: 'Traslados · guía bilingüe · Safari Náutico · entrada parque',
          }
        },
        activities: [
          { activityId: 'glaciar-perito-moreno', status: 'included' },
          { activityId: 'perito-moreno-safari', status: 'included' },
        ],
        referenceHotelId: 'mirador-del-lago-el-calafate',
      },
      {
        dayNumber: 16,
        destinationId: 'el-calafate',
        dayType: 'free',
        content: {
          es: {
            title: 'El Calafate: Día libre',
            description: 'Desayuno en el hotel. Día libre en El Calafate. Alojamiento en El Calafate.',
          }
        },
        activities: [
          { activityId: 'estancia-cristina-calafate', status: 'optional' },
          { activityId: 'estancia-nibepo-aike', status: 'optional' },
        ],
        referenceHotelId: 'mirador-del-lago-el-calafate',
      },
      {
        dayNumber: 17,
        destinationId: 'iguazu',
        dayType: 'transit',
        content: {
          es: {
            title: 'El Calafate → Puerto Iguazú',
            description: 'Desayuno en el hotel. Vuelo a Puerto Iguazú con escala en Buenos Aires. Traslado al hotel. Alojamiento en Puerto Iguazú.',
            highlights: ['Llegada a Puerto Iguazú'],
            included: 'Vuelos · traslados',
          }
        },
        flights: ['FTE → EZE → IGR'],
        activities: [],
        referenceHotelId: 'hotel-saint-george-iguazu',
      },
      {
        dayNumber: 18,
        destinationId: 'iguazu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Cataratas del Iguazú: lado argentino',
            description: 'Desayuno en el hotel. Jornada completa al Parque Nacional Iguazú. Alojamiento en Puerto Iguazú.',
            schedule: '07:20-16:00',
            duration: '8 horas',
            highlights: ['Paseo Inferior · Garganta del Diablo', 'Tren ecológico'],
            included: 'Traslados · guía bilingüe · entrada parque',
          }
        },
        activities: [
          { activityId: 'cataratas-argentinas', status: 'included' },
          { activityId: 'gran-aventura-iguazu', status: 'optional' },
        ],
        referenceHotelId: 'hotel-saint-george-iguazu',
      },
      {
        dayNumber: 19,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Cataratas Brasileñas y vuelo a Buenos Aires',
            description: 'Desayuno en el hotel. Por la mañana, visita al lado brasileño de las cataratas. Por la tarde, vuelo a Buenos Aires. Alojamiento en Buenos Aires.',
            schedule: '08:00-14:00',
            duration: '3 horas',
            highlights: ['1.200 m de pasarelas · panorámica de los 275 saltos'],
            included: 'Entrada parque brasileño · vuelo · traslados',
          }
        },
        flights: ['IGR → AEP'],
        activities: [{ activityId: 'cataratas-brasilenas', status: 'included' }],
        referenceHotelId: 'hotel-dora-buenos-aires',
      },
      {
        dayNumber: 20,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Buenos Aires → Barcelona: vuelo de regreso',
            description: 'Desayuno en el hotel. Traslado privado al aeropuerto Ezeiza. Vuelo de regreso a Barcelona.',
            included: 'Traslado privado aeropuerto · vuelo internacional',
          }
        },
        flights: ['EZE → BCN'],
        activities: [],
      },
    ],
  },
  {
    id: 'capitales-del-vino',
    slug: 'capitales-del-vino',
    content: {
      es: {
        title: 'El Cono Sur en copa: viñedos, bodegas y ciudades',
        description: 'Tres países, tres culturas del vino y tres ciudades con carácter propio. Santiago con los valles de Casablanca y Maipo a menos de una hora, Mendoza con sus bodegas frente a la cordillera y el Valle de Uco como gran argumento, Buenos Aires con su vida porteña y sus noches de tango, y Montevideo con su rambla y sus bodegas boutique junto al Río de la Plata. Trece días que se recorren despacio, con tiempo para sentarse a la mesa.',
        heroTitleMobile: 'Viaje por los viñedos del Cono Sur',
        descriptionMobile: '13 días por Santiago, Mendoza, Buenos Aires y Montevideo: viñedos, bodegas boutique, cenas maridadas y cultura porteña.',
        metaTitle: 'Viaje por los Viñedos del Cono Sur — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje por Chile, Argentina y Uruguay a medida: Santiago, Mendoza, Buenos Aires y Montevideo. 13 días de vino y gastronomía. Cuéntanos tu idea.',
        heroImages: [
          { imageKey: 'ITINERARIES.CAPITALES_VINO_MENDOZA', location: 'Valle de Uco, Mendoza' },
          { imageKey: 'ITINERARIES.CAPITALES_VINO_SANTIAGO', location: 'Santiago de Chile' },
          { imageKey: 'ITINERARIES.CAPITALES_VINO_BUENOS_AIRES', location: 'Buenos Aires' },
          { imageKey: 'ITINERARIES.CAPITALES_VINO_MONTEVIDEO', location: 'Montevideo, Uruguay' },
          { imageKey: 'ITINERARIES.CAPITALES_VINO_COLCHAGUA', location: 'Valle de Colchagua, Chile' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '4': 'pullman-santiago-vitacura' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '4': 'nh-cordillera-mendoza' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '4': 'grand-brizo-buenos-aires' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '4': 'own-montevideo' }, nights: 3, defaultCategory: 4, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'santiago-chile',
        dayType: 'transit',
        content: {
          es: {
            title: 'Llegada a Santiago de Chile',
            description: 'Llegada al aeropuerto de Santiago. Traslado privado al hotel. Tarde libre para un primer paseo por el Parque Bicentenario o Providencia. Alojamiento en Santiago.',
            highlights: ['Llegada a Santiago de Chile'],
            included: 'Traslado privado',
          }
        },
        flights: ['MAD → SCL'],
        activities: [],
        referenceHotelId: 'pullman-santiago-vitacura',
      },
      {
        dayNumber: 2,
        destinationId: 'santiago-chile',
        dayType: 'activity',
        content: {
          es: {
            title: 'Santiago: City Tour Panorámico',
            description: 'Desayuno en el hotel. Por la mañana, city tour por Santiago. Tarde libre. Alojamiento en Santiago.',
            schedule: '08:30-13:30',
            duration: '5 horas',
            highlights: ['Palacio de La Moneda · Plaza de Armas', 'Cerro Santa Lucía · Barrio Bellavista'],
            included: 'Traslados · guía bilingüe',
          }
        },
        activities: [
          { activityId: 'city-tour-panoramico-santiago', status: 'included' },
          { activityId: 'bodega-santa-rita-tour-clasico', status: 'optional' },
        ],
        referenceHotelId: 'pullman-santiago-vitacura',
      },
      {
        dayNumber: 3,
        destinationId: 'santiago-chile',
        dayType: 'activity',
        content: {
          es: {
            title: 'Valle de Casablanca: Viñas Bodega RE y Casas del Bosque',
            description: 'Desayuno en el hotel. Jornada completa en el Valle de Casablanca visitando dos bodegas con estilos distintos y almuerzo maridado. Alojamiento en Santiago.',
            schedule: '8:30',
            duration: '9 horas',
            highlights: ['Bodega RE · vinos artesanales en tinajas de arcilla', 'Casas del Bosque · Sauvignon Blanc y Pinot Noir'],
            included: 'Traslado privado · degustación · almuerzo',
          }
        },
        activities: [
          { activityId: 'valle-casablanca-vinas-bodega-re-casas-bosque', status: 'included' },
          { activityId: 'vina-del-mar-valparaiso', status: 'optional' },
        ],
        referenceHotelId: 'pullman-santiago-vitacura',
      },
      {
        dayNumber: 4,
        destinationId: 'mendoza',
        dayType: 'transit',
        content: {
          es: {
            title: 'Santiago → Mendoza: cruzando los Andes',
            description: 'Desayuno en el hotel. Vuelo a Mendoza cruzando la Cordillera de los Andes. Recepción y traslado al hotel. Tarde libre en el centro de Mendoza. Alojamiento en Mendoza.',
            highlights: ['Vuelo sobre la Cordillera de los Andes', 'Llegada a Mendoza'],
            included: 'Vuelo · traslados',
          }
        },
        flights: ['SCL → MDZ'],
        activities: [],
        referenceHotelId: 'nh-cordillera-mendoza',
      },
      {
        dayNumber: 5,
        destinationId: 'mendoza',
        dayType: 'activity',
        content: {
          es: {
            title: 'Mendoza: City Tour',
            description: 'Desayuno en el hotel. Por la mañana, city tour por Mendoza. Tarde libre para explorar bodegas del centro. Alojamiento en Mendoza.',
            schedule: '08:30-13:00',
            duration: '4,5 horas',
            highlights: ['Área Fundacional · Parque General San Martín', 'Cerro de la Gloria · Monumento libertador'],
            included: 'Traslado · guía bilingüe',
          }
        },
        activities: [
          { activityId: 'city-tour-mendoza', status: 'included' },
          { activityId: 'rafting-los-arboles-mendoza', status: 'optional' },
        ],
        referenceHotelId: 'nh-cordillera-mendoza',
      },
      {
        dayNumber: 6,
        destinationId: 'mendoza',
        dayType: 'activity',
        content: {
          es: {
            title: 'Mendoza: Caminos del Vino en el Valle de Uco',
            description: 'Desayuno en el hotel. Jornada completa en el Valle de Uco: visita a tres bodegas de alta gama con degustaciones y almuerzo maridado. Alojamiento en Mendoza.',
            schedule: '08:30-18:00',
            duration: '9 horas',
            highlights: ['Valle de Uco · a los pies de los Andes', 'Almuerzo maridado en bodega de prestigio'],
            included: 'Traslado · guía especializado · visita y degustación en dos bodegas · almuerzo en tercera bodega',
          }
        },
        activities: [
          { activityId: 'caminos-del-vino-valle-de-uco', status: 'included' },
          { activityId: 'vinos-sabores-maipu', status: 'optional' },
        ],
        referenceHotelId: 'nh-cordillera-mendoza',
      },
      {
        dayNumber: 7,
        destinationId: 'buenos-aires',
        dayType: 'transit',
        content: {
          es: {
            title: 'Mendoza → Buenos Aires',
            description: 'Desayuno en el hotel. Vuelo a Buenos Aires. Recepción y traslado al hotel. Tarde libre. Alojamiento en Buenos Aires.',
            highlights: ['Llegada a Buenos Aires'],
            included: 'Vuelo · traslado con guía',
          }
        },
        flights: ['MDZ → BUE'],
        activities: [],
        referenceHotelId: 'grand-brizo-buenos-aires',
      },
      {
        dayNumber: 8,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: City Tour',
            description: 'Desayuno en el hotel. Por la mañana, city tour por Buenos Aires. Tarde libre para gastronomía o el Teatro Colón. Alojamiento en Buenos Aires.',
            schedule: '9:00',
            duration: '3,5-4 horas',
            highlights: ['Plaza de Mayo · La Boca · San Telmo', 'Palermo · Recoleta · Puerto Madero'],
            included: 'Guía · traslados',
          }
        },
        activities: [
          { activityId: 'city-tour-buenos-aires', status: 'included' },
          { activityId: 'delta-premium-buenos-aires', status: 'optional' },
          { activityId: 'fiesta-gaucha-estancia-susana', status: 'optional' },
        ],
        referenceHotelId: 'grand-brizo-buenos-aires',
      },
      {
        dayNumber: 9,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: Degustación de Vinos y Tango Show en La Ventana',
            description: 'Desayuno en el hotel. Por la tarde, degustación de vinos con el sommelier de La Ventana. A continuación, cena show con tango y folclore. Alojamiento en Buenos Aires.',
            schedule: '18:30-23:30',
            duration: '5 horas',
            highlights: ['Degustación · Malbec, Torrontés y Chardonnay', 'Cena show en La Ventana · 32 artistas · San Telmo'],
            included: 'Degustación con maridaje · cena show con vino',
            excluded: 'Traslados',
          }
        },
        activities: [
          { activityId: 'degustacion-vinos-la-ventana-buenos-aires', status: 'included' },
          { activityId: 'tango-show-la-ventana', status: 'included' },
          { activityId: 'fogon-asado-experience', status: 'optional' },
          { activityId: 'secreto-tango-society', status: 'optional' },
        ],
        referenceHotelId: 'grand-brizo-buenos-aires',
      },
      {
        dayNumber: 10,
        destinationId: 'montevideo',
        dayType: 'transit',
        content: {
          es: {
            title: 'Buenos Aires → Montevideo: el ferry del Río de la Plata',
            description: 'Desayuno en el hotel. Traslado al puerto y ferry a Montevideo. Llegada y traslado al hotel. Tarde libre para la rambla o Ciudad Vieja. Alojamiento en Montevideo.',
            highlights: ['Ferry Buquebus · Buenos Aires a Montevideo', 'Llegada a Montevideo'],
            included: 'Traslados hotel-puerto-hotel · ticket ferry',
          }
        },
        activities: [],
        referenceHotelId: 'own-montevideo',
      },
      {
        dayNumber: 11,
        destinationId: 'montevideo',
        dayType: 'activity',
        content: {
          es: {
            title: 'Montevideo: City Tour',
            description: 'Desayuno en el hotel. Por la mañana, city tour por Montevideo. Tarde libre para explorar la rambla. Alojamiento en Montevideo.',
            schedule: '9:00',
            duration: '3-4 horas',
            highlights: ['Plaza Independencia · Palacio Salvo', 'Mercado del Puerto · Palacio Legislativo'],
            included: 'Traslados · guía bilingüe',
          }
        },
        activities: [
          { activityId: 'city-tour-montevideo', status: 'included' },
          { activityId: 'tour-bodega-bouza-montevideo', status: 'optional' },
        ],
        referenceHotelId: 'own-montevideo',
      },
      {
        dayNumber: 12,
        destinationId: 'montevideo',
        dayType: 'activity',
        content: {
          es: {
            title: 'Montevideo: Bodega Pizzorno con Almuerzo Maridado',
            description: 'Desayuno en el hotel. Jornada en la Bodega Pizzorno: recorrido por viñedos y cava, degustación y almuerzo de tres pasos maridado. Alojamiento en Montevideo.',
            schedule: '09:00-13:00',
            duration: '4 horas',
            highlights: ['Bodega Pizzorno · tradición familiar centenaria', 'Degustación · almuerzo maridado'],
            included: 'Traslados · visita guiada · degustación · almuerzo',
          }
        },
        activities: [{ activityId: 'bodega-pizzorno-almuerzo-maridado', status: 'included' }],
        referenceHotelId: 'own-montevideo',
      },
      {
        dayNumber: 13,
        destinationId: 'montevideo',
        dayType: 'transit',
        content: {
          es: {
            title: 'Regreso a España',
            description: 'Desayuno en el hotel. Traslado al aeropuerto internacional de Carrasco. Vuelo de regreso a España.',
            included: 'Traslado aeropuerto',
          }
        },
        flights: ['MVD → MAD'],
        activities: [],
      },
    ],
  },
  {
    id: 'lo-mejor-de-peru',
    slug: 'lo-mejor-de-peru',
    content: {
      es: {
        title: 'Lo Mejor de Perú: de Lima al Machu Picchu',
        description: 'Perú tiene una profundidad histórica y natural que pocas rutas consiguen abarcar en 14 días. Lima como puerta de entrada — con su centro colonial, Miraflores sobre el Pacífico y una cocina que merece el viaje por sí sola. Paracas y las Islas Ballestas para ver la fauna marina de cerca, con la opción de sobrevolar las Líneas de Nazca. Arequipa y el Cañón del Colca, con sus pueblos andinos y el vuelo de los cóndores. El Lago Titicaca y las islas flotantes de los Uros. Y el final que todo viajero a Perú termina queriendo: Cusco, el Valle Sagrado y Machu Picchu.',
        heroTitleMobile: 'Viaje a lo mejor de Perú: de Lima al Machu Picchu',
        descriptionMobile: '14 días por lo mejor del Perú: Lima, las Islas Ballestas, el Cañón del Colca, el Lago Titicaca, Cusco y Machu Picchu.',
        metaTitle: 'Viaje a lo mejor de Perú — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje a Perú a medida: Lima, Paracas, Arequipa, Cañón del Colca, Lago Titicaca, Cusco y Machu Picchu. 14 días. Cuéntanos tu idea.',
        heroImages: [
          { imageKey: 'ITINERARIES.PERU_MACHU_PICCHU', location: 'Ciudadela Inca de Machu Picchu' },
          { imageKey: 'ITINERARIES.PERU_CANON_COLCA', location: 'Cañón del Colca · Arequipa' },
          { imageKey: 'ITINERARIES.PERU_LAGO_TITICACA', location: 'Lago Titicaca · Puno' },
          { imageKey: 'ITINERARIES.PERU_CUSCO', location: 'Cusco · Capital del Imperio Inca' },
          { imageKey: 'ITINERARIES.PERU_PARACAS', location: 'Reserva Nacional de Paracas' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'hotel-britania-lima', '4': 'dazzler-miraflores-lima', '5': 'pullman-lima-miraflores' }, nights: 2, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'el-condor-paracas', '4': 'casa-andina-select-paracas', '5': 'la-hacienda-paracas' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'hotel-britania-lima', '4': 'dazzler-miraflores-lima', '5': 'pullman-lima-miraflores' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'majestad-arequipa', '4': 'san-agustin-posada-monasterio-arequipa', '5': 'costa-del-sol-wyndham-arequipa' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'pozo-del-cielo-colca', '4': 'el-refugio-colca', '5': 'colca-lodge-spa' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'la-hacienda-plaza-armas-puno', '4': 'jose-antonio-puno', '5': 'casa-andina-premium-puno' }, nights: 2, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'san-agustin-internacional-cusco', '4': 'san-agustin-el-dorado-cusco', '5': 'casa-andina-premium-cusco' }, nights: 2, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'flowers-house-machupicchu', '4': 'el-mapi-machupicchu', '5': 'sumaq-machu-picchu' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'san-agustin-urubamba-spa', '4': 'hacienda-del-valle-sagrado', '5': 'inkaterra-hacienda-urubamba' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'san-agustin-internacional-cusco', '4': 'san-agustin-el-dorado-cusco', '5': 'casa-andina-premium-cusco' }, nights: 1, defaultCategory: 4, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'lima',
        dayType: 'transit',
        content: {
          es: {
            title: 'Llegada a Lima — Ciudad de los Reyes',
            description: 'Vuelo internacional a Lima. Llegada al aeropuerto Jorge Chávez. Recepción y traslado al hotel. Tarde libre para un primer contacto con Miraflores. Alojamiento en Lima.',
            highlights: ['Llegada a Lima'],
            included: 'Traslado aeropuerto → hotel',
          }
        },
        flights: ['MAD → LIM'],
        activities: [],
        referenceHotelId: 'dazzler-miraflores-lima',
      },
      {
        dayNumber: 2,
        destinationId: 'lima',
        dayType: 'activity',
        content: {
          es: {
            title: 'Lima: City Tour Colonial y Moderno + Museo Larco',
            description: 'Desayuno en el hotel. Visita del casco histórico Patrimonio de la Humanidad y el Museo Larco Herrera. Tarde libre en Barranco o Miraflores. Alojamiento en Lima.',
            highlights: ['Plaza Mayor · Convento de San Francisco', 'Museo Larco Herrera · 3.000 años de historia'],
            included: 'Guía · traslados',
          }
        },
        activities: [{ activityId: 'city-tour-lima-colonial-museo-larco', status: 'included' }],
        referenceHotelId: 'dazzler-miraflores-lima',
      },
      {
        dayNumber: 3,
        destinationId: 'paracas',
        dayType: 'activity',
        content: {
          es: {
            title: 'Lima → Paracas: Reserva Nacional y Buggies',
            description: 'Desayuno en el hotel. Bus a Paracas. Visita a la Reserva Nacional de Paracas. Por la tarde, buggies y sandboard en las dunas al atardecer. Alojamiento en Paracas.',
            highlights: ['Reserva Nacional de Paracas · acantilados', 'Buggies en las dunas · sandboard al atardecer'],
            included: 'Bus Lima-Paracas · visita Reserva · buggies compartidos',
          }
        },
        activities: [
          { activityId: 'reserva-nacional-paracas', status: 'included' },
          { activityId: 'buggies-sandboard-dunas-paracas', status: 'included' },
        ],
        referenceHotelId: 'casa-andina-select-paracas',
      },
      {
        dayNumber: 4,
        destinationId: 'lima',
        dayType: 'activity',
        content: {
          es: {
            title: 'Paracas: Islas Ballestas → Regreso a Lima',
            description: 'Desayuno en el hotel. Navegación a las Islas Ballestas. Bus de regreso a Lima. Alojamiento en Lima.',
            highlights: ['Islas Ballestas · lobos marinos y pingüinos de Humboldt', 'Geoglifo del Candelabro'],
            included: 'Lancha compartida · bus Paracas-Lima · traslados',
          }
        },
        activities: [
          { activityId: 'islas-ballestas-paracas', status: 'included' },
          { activityId: 'sobrevuelo-lineas-nazca', status: 'optional' },
        ],
        referenceHotelId: 'dazzler-miraflores-lima',
      },
      {
        dayNumber: 5,
        destinationId: 'arequipa',
        dayType: 'transit',
        content: {
          es: {
            title: 'Lima → Arequipa: City Tour de la Ciudad Blanca',
            description: 'Desayuno en el hotel. Vuelo a Arequipa. Por la tarde, visita guiada de la Ciudad Blanca: Convento de Santa Catalina, Plaza de Armas, Yanahuara y Mundo Alpaca. Alojamiento en Arequipa.',
            highlights: ['Convento de Santa Catalina · ciudad dentro de la ciudad', 'Mirador Yanahuara · volcán Misti'],
            included: 'Traslados · guía',
          }
        },
        flights: ['LIM → AQP'],
        activities: [{ activityId: 'city-tour-arequipa', status: 'included' }],
        referenceHotelId: 'san-agustin-posada-monasterio-arequipa',
      },
      {
        dayNumber: 6,
        destinationId: 'canon-del-colca',
        dayType: 'transit',
        content: {
          es: {
            title: 'Arequipa → Cañón del Colca',
            description: 'Desayuno en el hotel. Traslado al Cañón del Colca con paradas en la Pampa Cañahuas y el Mirador de los Volcanes. Almuerzo en Chivay. Tarde libre. Alojamiento en el Colca.',
            highlights: ['Pampa Cañahuas · vicuñas', 'Mirador de los Volcanes'],
            included: 'Traslado Arequipa-Chivay · almuerzo',
            excluded: 'Termas de La Calera (los hoteles Colca Lodge y El Refugio tienen termas propias)',
          }
        },
        activities: [{ activityId: 'canon-del-colca-cruz-condor', status: 'included' }],
        referenceHotelId: 'el-refugio-colca',
      },
      {
        dayNumber: 7,
        destinationId: 'puno',
        dayType: 'transit',
        content: {
          es: {
            title: 'Cruz del Cóndor → Puno',
            description: 'Desayuno en el hotel. Visita al Mirador Cruz del Cóndor y los pueblos coloniales de Yanque y Maca. Almuerzo en Chivay. Traslado a Puno. Alojamiento en Puno.',
            highlights: ['Cruz del Cóndor · vuelo del cóndor andino', 'Laguna Lagunillas · flamencos andinos'],
            included: 'Traslado Chivay-Puno · almuerzo',
          }
        },
        activities: [],
        referenceHotelId: 'jose-antonio-puno',
      },
      {
        dayNumber: 8,
        destinationId: 'puno',
        dayType: 'activity',
        content: {
          es: {
            title: 'Puno: Lago Titicaca — Islas Uros e Isla Taquile',
            description: 'Desayuno en el hotel. Navegación por el Lago Titicaca hasta las Islas Uros y la Isla de Taquile con almuerzo local. Alojamiento en Puno.',
            highlights: ['Islas Uros · islas flotantes de totora', 'Isla Taquile · tejidos Patrimonio Inmaterial UNESCO'],
            included: 'Lancha compartida · guía · almuerzo',
          }
        },
        activities: [{ activityId: 'lago-titicaca-uros-taquile', status: 'included' }],
        referenceHotelId: 'jose-antonio-puno',
      },
      {
        dayNumber: 9,
        destinationId: 'cusco',
        dayType: 'transit',
        content: {
          es: {
            title: 'Puno → Cusco en Bus Turístico',
            description: 'Desayuno en el hotel. Traslado a Cusco en bus turístico con paradas en Pukara, La Raya, Raqchi y Andahuaylillas. Almuerzo en ruta. Alojamiento en Cusco.',
            highlights: ['Raqchi · Templo de Wiracocha', 'Andahuaylillas · la Capilla Sixtina Andina'],
            included: 'Bus turístico · guía · almuerzo',
          }
        },
        activities: [],
        referenceHotelId: 'san-agustin-el-dorado-cusco',
      },
      {
        dayNumber: 10,
        destinationId: 'cusco',
        dayType: 'activity',
        content: {
          es: {
            title: 'Cusco: City Tour Peatonal',
            description: 'Desayuno en el hotel. Recorrido peatonal por el corazón de la antigua capital inca. Tarde libre en San Blas. Alojamiento en Cusco.',
            highlights: ['Plaza de Armas · Catedral barroca', 'Koricancha · Templo del Sol'],
            included: 'Guía · entradas',
          }
        },
        activities: [{ activityId: 'city-tour-peatonal-cusco', status: 'included' }],
        referenceHotelId: 'san-agustin-el-dorado-cusco',
      },
      {
        dayNumber: 11,
        destinationId: 'machu-picchu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Valle Sagrado → Aguas Calientes',
            description: 'Desayuno en el hotel. Jornada por el Valle Sagrado: Chinchero, Minas de Sal de Maras, Moray y Ollantaytambo. Por la tarde, tren Vistadome a Aguas Calientes. Cena y alojamiento en Aguas Calientes.',
            highlights: ['Maras · salineras en explotación desde el Imperio Inca', 'Ollantaytambo · fortaleza inca'],
            included: 'Traslados · guía · visitas · almuerzo · tren Vistadome Observatory · cena',
          }
        },
        activities: [{ activityId: 'valle-sagrado-chinchero-maras-moray-ollantaytambo', status: 'included' }],
        referenceHotelId: 'el-mapi-machupicchu',
      },
      {
        dayNumber: 12,
        destinationId: 'machu-picchu',
        dayType: 'activity',
        content: {
          es: {
            title: 'Machu Picchu → Valle Sagrado',
            description: 'Desayuno en el hotel. Visita guiada a la ciudadela inca de Machu Picchu. Tren de regreso y traslado al hotel en el Valle Sagrado. Cena y alojamiento en el Valle.',
            highlights: ['Machu Picchu · una de las 7 Maravillas Modernas', 'Aguas Calientes · pueblo de montaña'],
            included: 'Bus Aguas Calientes-Machu Picchu · guía · entradas · tren Vistadome Panorámico · cena',
            excluded: 'Ingreso monte Huayna Picchu o monte Machu Picchu (suplemento, confirmar al reservar)',
          }
        },
        activities: [{ activityId: 'machu-picchu-visita-guiada', status: 'included' }],
        referenceHotelId: 'hacienda-del-valle-sagrado',
      },
      {
        dayNumber: 13,
        destinationId: 'cusco',
        dayType: 'activity',
        content: {
          es: {
            title: 'Valle Sagrado: Pisac y Ruinas Aledañas de Cusco',
            description: "Desayuno en el hotel. Por la mañana, visita a Pisac. Por la tarde, ruinas aledañas de Cusco: Sacsayhuamán, Q'enqo y Tambomachay. Alojamiento en Cusco.",
            highlights: ['Pisac · sitio arqueológico y mercado artesanal', 'Sacsayhuamán · fortaleza de piedras monumentales'],
            included: 'Traslados · guía · entradas ruinas de Cusco',
          }
        },
        activities: [
          { activityId: 'pisac-ruinas-mercado', status: 'included' },
          { activityId: 'ruinas-aledanas-cusco', status: 'included' },
        ],
        referenceHotelId: 'san-agustin-el-dorado-cusco',
      },
      {
        dayNumber: 14,
        destinationId: 'cusco',
        dayType: 'transit',
        content: {
          es: {
            title: 'Cusco → Lima → Vuelo de Regreso',
            description: 'Desayuno en el hotel. Traslado al aeropuerto de Cusco y vuelo a Lima para la conexión con el vuelo internacional de regreso. Noche a bordo.',
            included: 'Traslado hotel-aeropuerto Cusco · asistencia en Lima',
          }
        },
        flights: ['CUZ → LIM'],
        activities: [],
      },
    ],
  },
  {
    id: 'chile-completo',
    slug: 'chile-completo',
    content: {
      es: {
        title: 'Chile de punta a punta: Patagonia, Lagos, Atacama y Rapa Nui',
        description: 'Pocos países concentran tanta variedad en tan poco ancho de tierra. Este viaje de 17 días recorre Chile de sur a norte y termina en mitad del Pacífico: Torres del Paine y los glaciares de Puerto Natales, los lagos y volcanes de Puerto Varas con una parada en Chiloé, el desierto de Atacama con sus salares y géiseres, y al final un vuelo de cinco horas hasta Rapa Nui y sus moáis. Cuatro destinos diferentes, unidos por el mismo país.',
        heroTitleMobile: 'Viaje a Chile de punta a punta.',
        descriptionMobile: '17 días por lo mejor de Chile: Santiago, Torres del Paine, los lagos del sur, Atacama y los moais de Rapa Nui.',
        metaTitle: 'Viaje a Chile Completo: Patagonia, Lagos, Atacama y Rapa Nui — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos tu viaje a Chile a medida: Santiago, Torres del Paine, Puerto Varas, San Pedro de Atacama y Rapa Nui. 17 días. Cuéntanos tu idea.',
        heroImages: [
          { imageKey: 'ITINERARIES.CHILE_COMPLETO_TORRES', location: 'Torres del Paine, Patagonia' },
          { imageKey: 'ITINERARIES.CHILE_COMPLETO_RAPA_NUI', location: 'Moais · Rapa Nui' },
          { imageKey: 'ITINERARIES.CHILE_COMPLETO_ATACAMA', location: 'Valle de la Luna · Atacama' },
          { imageKey: 'ITINERARIES.CHILE_COMPLETO_LAGO_LLANQUIHUE', location: 'Lago Llanquihue · Puerto Varas' },
          { imageKey: 'ITINERARIES.CHILE_COMPLETO_SANTIAGO', location: 'Santiago de Chile' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'nh-ciudad-de-santiago', '4': 'cumbres-lastarria' }, nights: 2, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'costaustralis-puerto-natales', '4': 'altiplanico-sur-puerto-natales' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'solace-puerto-varas', '4': 'cabana-del-lago-puerto-varas' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'casa-solcor-san-pedro', '4': 'cumbres-san-pedro' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'hilton-garden-inn-aeropuerto-santiago', '4': 'holiday-inn-santiago-airport' }, nights: 1, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'hare-nua-rapa-nui', '4': 'altiplanico-rapa-nui' }, nights: 3, defaultCategory: 4, featured: false },
      { hotelsByCategory: { '3': 'nh-ciudad-de-santiago', '4': 'cumbres-lastarria' }, nights: 1, defaultCategory: 4, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'santiago-chile',
        dayType: 'transit',
        content: {
          es: {
            title: 'Llegada a Santiago de Chile',
            description: 'Llegada al aeropuerto de Santiago por la tarde. Traslado privado al hotel. Noche libre para un primer contacto con la ciudad. Alojamiento en Santiago.',
            highlights: ['Llegada a Santiago de Chile'],
            included: 'Traslado privado aeropuerto → hotel',
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
            title: 'Santiago: City Tour Panorámico',
            description: 'Desayuno en el hotel. Hoy, city tour panorámico por el centro histórico y los barrios modernos de Santiago. Tarde libre para gastronomía o pasear por el barrio de Lastarria. Alojamiento en Santiago.',
            schedule: '08:30-14:00',
            duration: '5 horas',
            highlights: ['Palacio de La Moneda', 'Cerro Santa Lucía', 'Barrio Bellavista'],
            included: 'Guía trilingüe · traslados',
          }
        },
        activities: [{ activityId: 'city-tour-panoramico-santiago', status: 'included' }],
        referenceHotelId: 'cumbres-lastarria',
      },
      {
        dayNumber: 3,
        destinationId: 'puerto-natales',
        dayType: 'transit',
        content: {
          es: {
            title: 'Santiago → Puerto Natales: Entrada a la Patagonia',
            description: 'Desayuno en el hotel. Traslado al aeropuerto para el vuelo matinal a Puerto Natales. Llegada al mediodía y traslado al hotel. Tarde libre para recorrer la costanera y el puerto pesquero. Alojamiento en Puerto Natales.',
            highlights: ['Primeras vistas al Seno de Última Esperanza'],
            included: 'Vuelo Santiago → Puerto Natales · traslado hotel',
          }
        },
        flights: ['SCL → PNT'],
        activities: [],
        referenceHotelId: 'altiplanico-sur-puerto-natales',
      },
      {
        dayNumber: 4,
        destinationId: 'puerto-natales',
        dayType: 'activity',
        content: {
          es: {
            title: 'Parque Nacional de Torres del Paine',
            description: 'Desayuno en el hotel. Jornada completa en el Parque Nacional Torres del Paine con almuerzo incluido. Alojamiento en Puerto Natales.',
            schedule: '07:00-18:00',
            duration: '11 horas',
            highlights: ['Cuernos del Paine', 'Lago Grey · témpanos del Glaciar Grey · macizo Paine Grande'],
            included: 'Guía · traslados · almuerzo',
          }
        },
        activities: [{ activityId: 'torres-del-paine-excursion', status: 'included' }],
        referenceHotelId: 'altiplanico-sur-puerto-natales',
      },
      {
        dayNumber: 5,
        destinationId: 'puerto-natales',
        dayType: 'activity',
        content: {
          es: {
            title: 'Glaciares Balmaceda y Serrano — Navegando los Fiordos del Sur',
            description: 'Desayuno en el hotel. Navegación por el Fiordo de Última Esperanza hasta los Glaciares Balmaceda y Serrano. Alojamiento en Puerto Natales.',
            schedule: '07:00-13:00',
            duration: '6 horas navegación',
            highlights: ['Fiordo de Última Esperanza', 'Glaciar Serrano', 'Campos de Hielo Sur'],
            included: 'Embarcación compartida · guía',
          }
        },
        activities: [{ activityId: 'glaciares-balmaceda-serrano', status: 'included' }],
        referenceHotelId: 'altiplanico-sur-puerto-natales',
      },
      {
        dayNumber: 6,
        destinationId: 'puerto-varas',
        dayType: 'transit',
        content: {
          es: {
            title: 'Puerto Natales → Puerto Varas: Los Lagos del Sur',
            description: 'Desayuno en el hotel. Mañana libre en Puerto Natales. Por la tarde, vuelo a Puerto Montt y traslado a Puerto Varas. Alojamiento en Puerto Varas.',
            highlights: ['Lago Llanquihue con el volcán Osorno al fondo'],
            included: 'Vuelo Puerto Natales → Puerto Montt · traslado hotel',
          }
        },
        flights: ['PNT → PMC'],
        activities: [],
        referenceHotelId: 'cabana-del-lago-puerto-varas',
      },
      {
        dayNumber: 7,
        destinationId: 'puerto-varas',
        dayType: 'activity',
        content: {
          es: {
            title: 'Vuelta al Lago Llanquihue: Frutillar, Puerto Octay y Ensenada',
            description: 'Desayuno en el hotel. Vuelta al Lago Llanquihue por Frutillar, Puerto Octay y Ensenada con almuerzo incluido. Alojamiento en Puerto Varas.',
            schedule: '09:00-18:00',
            duration: '9 horas',
            highlights: ['Frutillar · arquitectura bávara · Teatro del Lago', 'Puerto Octay · Mirador Peninsual de Centinela'],
            included: 'Guía · traslados · almuerzo',
          }
        },
        activities: [{ activityId: 'vuelta-lago-llanquihue', status: 'included' }],
        referenceHotelId: 'cabana-del-lago-puerto-varas',
      },
      {
        dayNumber: 8,
        destinationId: 'puerto-varas',
        dayType: 'activity',
        content: {
          es: {
            title: 'Castro y Dalcahue — Un día en la Isla de Chiloé',
            description: 'Desayuno en el hotel. Jornada completa en la Isla de Chiloé: Castro y Dalcahue con almuerzo incluido. Alojamiento en Puerto Varas.',
            schedule: '08:00-20:00',
            duration: '12 horas',
            highlights: ['Palafitos de Castro · Iglesia San Francisco UNESCO', 'Dalcahue · Mercado Artesanal'],
            included: 'Guía · ticket ferry · almuerzo',
          }
        },
        activities: [{ activityId: 'castro-dalcahue-chiloe', status: 'included' }],
        referenceHotelId: 'cabana-del-lago-puerto-varas',
      },
      {
        dayNumber: 9,
        destinationId: 'san-pedro-atacama',
        dayType: 'transit',
        content: {
          es: {
            title: 'Puerto Varas → San Pedro de Atacama: Del Sur al Norte',
            description: 'Desayuno en el hotel. Mañana libre en Puerto Varas. Por la tarde, vuelos con escala en Santiago hasta Calama y traslado nocturno a San Pedro de Atacama. Alojamiento en San Pedro.',
            highlights: ['De los volcanes del sur al desierto del norte'],
            included: 'Vuelos Puerto Montt → Santiago → Calama · traslado hotel',
          }
        },
        flights: ['PMC → SCL', 'SCL → CJC'],
        activities: [],
        referenceHotelId: 'cumbres-san-pedro',
      },
      {
        dayNumber: 10,
        destinationId: 'san-pedro-atacama',
        dayType: 'activity',
        content: {
          es: {
            title: 'San Pedro de Atacama: Valle de la Luna al Atardecer',
            description: 'Desayuno en el hotel. Mañana libre para explorar el pueblo. Por la tarde, excursión al Valle de la Luna al atardecer. Alojamiento en San Pedro.',
            schedule: '14:30-18:30',
            duration: '4 horas',
            highlights: ['Las Tres Marías', 'Atardecer desde el Mirador de Licarantay'],
            included: 'Guía · traslados · entrada Valle de la Luna · cocktail',
          }
        },
        activities: [{ activityId: 'valle-de-la-luna', status: 'included' }],
        referenceHotelId: 'cumbres-san-pedro',
      },
      {
        dayNumber: 11,
        destinationId: 'san-pedro-atacama',
        dayType: 'activity',
        content: {
          es: {
            title: 'Lagunas Altiplánicas, Piedras Rojas y Laguna Chaxa',
            description: 'Desayuno en el hotel. Jornada completa a las Lagunas Altiplánicas, Piedras Rojas y Laguna Chaxa. Alojamiento en San Pedro.',
            schedule: '06:00-17:00',
            duration: '11 horas',
            highlights: ['Piedras Rojas', 'Lagunas Miscanti y Miñiques', 'Laguna Chaxa · flamencos andinos'],
            included: 'Guía · traslados · entradas · box lunch y almuerzo',
          }
        },
        activities: [{ activityId: 'lagunas-altiplanicas-piedras-rojas-chaxa', status: 'included' }],
        referenceHotelId: 'cumbres-san-pedro',
      },
      {
        dayNumber: 12,
        destinationId: 'san-pedro-atacama',
        dayType: 'activity',
        content: {
          es: {
            title: 'Géiseres del Tatio → Vuelo a Santiago · Noche en hotel en el aeropuerto',
            description: 'Madrugada para la excursión a los Géiseres del Tatio. Desayuno al amanecer junto a los Géiseres. Regreso a San Pedro y tarde libre. Por la noche, traslado a Calama y vuelo a Santiago. Traslado a pie al hotel. Alojamiento en hotel del aeropuerto.',
            schedule: '04:30-12:00',
            duration: '7 horas',
            highlights: ['Géiseres del Tatio · 4.200 m'],
            included: 'Guía · traslados · desayuno en el Tatio · vuelo Calama → Santiago',
          }
        },
        flights: ['CJC → SCL'],
        activities: [{ activityId: 'geysers-tatio-machuca-putana', status: 'included' }],
        referenceHotelId: 'holiday-inn-santiago-airport',
      },
      {
        dayNumber: 13,
        destinationId: 'isla-pascua',
        dayType: 'transit',
        content: {
          es: {
            title: 'Santiago → Isla de Pascua',
            description: 'Vuelo matinal a Rapa Nui. Llegada al mediodía y traslado al hotel en Hanga Roa. Tarde libre para un primer paseo por el pueblo. Alojamiento en Rapa Nui.',
            highlights: ['Llegada a Hanga Roa'],
            included: 'Vuelo Santiago → Rapa Nui · traslado semiprivado con guía',
          }
        },
        flights: ['SCL → IPC'],
        activities: [],
        referenceHotelId: 'altiplanico-rapa-nui',
      },
      {
        dayNumber: 14,
        destinationId: 'isla-pascua',
        dayType: 'activity',
        content: {
          es: {
            title: 'Rapa Nui: Orongo, Rano Kau y los Misterios de los Moais',
            description: 'Desayuno en el hotel. Por la mañana, visita al volcán Rano Kau y el Centro Ceremonial Orongo. Por la tarde, Ahu Akivi y los misterios de los moáis. Alojamiento en Rapa Nui.',
            schedule: 'AM 09:00-12:00 · PM 15:00-18:00',
            duration: '6 horas',
            highlights: ['Centro Ceremonial Orongo', 'Ahu Akivi'],
            included: 'Guía bilingüe · traslados',
          }
        },
        activities: [
          { activityId: 'orongo-rano-kau', status: 'included' },
          { activityId: 'ahu-akivi-misterios-moais', status: 'included' },
        ],
        referenceHotelId: 'altiplanico-rapa-nui',
      },
      {
        dayNumber: 15,
        destinationId: 'isla-pascua',
        dayType: 'activity',
        content: {
          es: {
            title: 'Rapa Nui: Cantera de los Moais y Playa Anakena',
            description: 'Desayuno en el hotel. Jornada completa por la Cantera de los Moáis y la Playa Anakena con box lunch incluido. Alojamiento en Rapa Nui.',
            schedule: '08:00-17:00',
            duration: '9 horas',
            highlights: ['Rano Raraku', 'Playa Anakena'],
            included: 'Guía bilingüe · traslados · box lunch',
          }
        },
        activities: [{ activityId: 'cantera-moais-playa-anakena', status: 'included' }],
        referenceHotelId: 'altiplanico-rapa-nui',
      },
      {
        dayNumber: 16,
        destinationId: 'santiago-chile',
        dayType: 'transit',
        content: {
          es: {
            title: 'Rapa Nui → Santiago: Última Noche en la Capital',
            description: 'Desayuno en el hotel. Mañana libre en Hanga Roa. Por la tarde, vuelo de regreso a Santiago. Alojamiento en Santiago.',
            highlights: ['Último amanecer en Rapa Nui'],
            included: 'Vuelo Rapa Nui → Santiago · traslado hotel',
          }
        },
        flights: ['IPC → SCL'],
        activities: [],
        referenceHotelId: 'cumbres-lastarria',
      },
      {
        dayNumber: 17,
        destinationId: 'santiago-chile',
        dayType: 'activity',
        content: {
          es: {
            title: 'Valparaíso y Viña del Mar → Vuelo de regreso.',
            description: 'Desayuno en el hotel. Excursión a Valparaíso y Viña del Mar. Regreso a Santiago para el vuelo nocturno de regreso.',
            schedule: 'AM 08:30',
            duration: 'Día completo',
            highlights: ['Valparaíso · Cerros Alegre y Concepción', 'La Sebastiana · casa-museo de Pablo Neruda'],
            included: 'Guía privado · traslados · ascensores en Valparaíso · vuelo Santiago → Madrid',
            excluded: 'Entrada La Sebastiana',
          }
        },
        flights: ['SCL → MAD'],
        activities: [{ activityId: 'vina-del-mar-valparaiso', status: 'included' }],
      },
    ],
  },
  {
    id: 'bolivia-infinita',
    slug: 'bolivia-infinita',
    content: {
      es: {
        title: 'Bolivia Infinita: Colores que Cuentan Historias',
        description: 'Bolivia de arriba abajo y sin prisas. Santa Cruz y sus tierras bajas tropicales, las ciudades coloniales de Sucre y Potosí, el altiplano extremo de la Reserva Eduardo Avaroa con sus lagunas de colores, el Salar de Uyuni y sus doce mil kilómetros cuadrados de sal, La Paz con la ceremonia de la Pachamama, y el Lago Titicaca con la Isla del Sol. Trece días que atraviesan Bolivia de este a oeste y de las tierras bajas a los cuatro mil ochocientos metros.',
        heroTitleMobile: 'Bolivia Infinita: Colores que Cuentan Historias',
        descriptionMobile: '13 días desde Santa Cruz hasta el Lago Titicaca, pasando por el Salar de Uyuni, las lagunas del Lípez y La Paz.',
        metaTitle: 'Bolivia Infinita: Salar, Sucre y Lago Titicaca — Viajes Vidaia',
        metaDescription: 'En Viajes Vidaia diseñamos viajes a Bolivia completamente a medida: Salar de Uyuni, Sucre, La Paz, Lago Titicaca y mucho más. Cuéntanos tu idea.',
        heroImages: [
          { imageKey: 'ITINERARIES.BOLIVIA_INFINITA_SALAR', location: 'Salar de Uyuni, Bolivia' },
          { imageKey: 'ITINERARIES.BOLIVIA_INFINITA_LAGUNA_COLORADA', location: 'Laguna Colorada, Reserva Eduardo Avaroa' },
          { imageKey: 'ITINERARIES.BOLIVIA_INFINITA_SUCRE', location: 'Sucre, capital constitucional de Bolivia' },
          { imageKey: 'ITINERARIES.BOLIVIA_INFINITA_TITICACA', location: 'Lago Titicaca, Isla del Sol' },
          { imageKey: 'ITINERARIES.BOLIVIA_INFINITA_LA_PAZ', location: 'La Paz, Valle de la Luna' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'hotel-cosmopolitano-santa-cruz', '4': 'hotel-eco-chairu-santa-cruz' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-independencia-sucre', '4': 'villa-antigua-sucre' }, nights: 2, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'samay-wasi-uyuni', '4': 'jardines-de-uyuni' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'tayka-del-desierto', '4': 'tayka-del-desierto' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'tayka-de-piedra', '4': 'tayka-de-piedra' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'samay-wasi-uyuni', '4': 'jardines-de-uyuni' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'apart-hotel-ritz-la-paz', '4': 'hotel-europa-la-paz' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'jacha-inti-hostal', '4': 'winay-inti-lodge' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'apart-hotel-ritz-la-paz', '4': 'hotel-europa-la-paz' }, nights: 1, defaultCategory: 3, featured: false },
      { hotelsByCategory: { '3': 'hotel-cosmopolitano-santa-cruz', '4': 'hotel-eco-chairu-santa-cruz' }, nights: 1, defaultCategory: 3, featured: false },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'santa-cruz',
        dayType: 'transit',
        content: {
          es: {
            title: 'Llegada a Santa Cruz de la Sierra',
            description: 'Llegada al aeropuerto internacional Viru Viru de Santa Cruz. Recepción y traslado al hotel. Por la tarde, city tour panorámico por el centro histórico: Plaza 24 de Septiembre, Artecampo y mercado La Recoba. Tarde libre. Alojamiento en Santa Cruz.',
            highlights: ['Santa Cruz · Plaza 24 de Septiembre'],
            included: 'Traslado aeropuerto · guía',
          }
        },
        flights: ['MAD → VVI'],
        activities: [{ activityId: 'city-tour-santa-cruz', status: 'included' }],
        referenceHotelId: 'hotel-cosmopolitano-santa-cruz',
      },
      {
        dayNumber: 2,
        destinationId: 'santa-cruz',
        dayType: 'activity',
        content: {
          es: {
            title: 'Samaipata: Patrimonio de la Humanidad',
            description: 'Desayuno en el hotel. Jornada completa de excursión a Samaipata y El Fuerte, el mayor petroglifo precolombino del mundo. Por la tarde, paseo por el pueblo antes del regreso a Santa Cruz. Alojamiento en Santa Cruz.',
            schedule: 'Salida temprano',
            duration: 'Día completo',
            highlights: ['El Fuerte · Samaipata · Patrimonio UNESCO 1998', 'Roca tallada · mirador natural sobre el valle'],
            included: 'Transporte privado · guía hispanohablante · entradas',
          }
        },
        activities: [{ activityId: 'excursion-full-day-samaipata', status: 'included' }],
        referenceHotelId: 'hotel-cosmopolitano-santa-cruz',
      },
      {
        dayNumber: 3,
        destinationId: 'sucre',
        dayType: 'transit',
        content: {
          es: {
            title: 'Santa Cruz → Sucre: La Ciudad Blanca',
            description: 'Desayuno en el hotel. Traslado al aeropuerto para el vuelo a Sucre. Llegada a la capital constitucional de Bolivia. Paseo panorámico por el centro histórico y la Plaza Principal. Tarde libre. Alojamiento en Sucre.',
            schedule: '08:35 VVI · 09:20 SRE',
            highlights: ['Llegada a Sucre · Patrimonio de la Humanidad UNESCO'],
            included: 'Vuelo SCZ → Sucre · traslados',
          }
        },
        flights: ['VVI → SRE'],
        activities: [{ activityId: 'city-tour-sucre', status: 'included' }],
        referenceHotelId: 'hotel-independencia-sucre',
      },
      {
        dayNumber: 4,
        destinationId: 'sucre',
        dayType: 'activity',
        content: {
          es: {
            title: 'Sucre: Circuito Cultural',
            description: 'Desayuno en el hotel. Mañana libre. Por la tarde, circuito cultural: Casa de la Libertad, Fundación ASUR y pausa en el café colonial de la Iglesia San Francisco. Alojamiento en Sucre.',
            schedule: 'Tarde',
            duration: '4 horas',
            highlights: ['Casa de la Libertad · Independencia de Bolivia 1825', "Fundación ASUR · tejidos jalq'a y tarabuco"],
            included: 'Guía · entradas',
          }
        },
        activities: [{ activityId: 'circuito-cultural-sucre', status: 'included' }],
        referenceHotelId: 'hotel-independencia-sucre',
      },
      {
        dayNumber: 5,
        destinationId: 'uyuni',
        dayType: 'transit',
        content: {
          es: {
            title: 'Sucre → Potosí → Uyuni',
            description: 'Desayuno en el hotel. Traslado a Potosí: visita del centro histórico y la Real Casa de la Moneda. Almuerzo incluido. Continuación hacia Uyuni. Alojamiento en Uyuni.',
            highlights: ['Potosí · Real Casa de la Moneda', 'Cerro Rico · 4.090 m'],
            included: 'Guía · traslados · entradas · almuerzo',
          }
        },
        activities: [{ activityId: 'city-tour-potosi-casa-moneda', status: 'included' }],
        referenceHotelId: 'samay-wasi-uyuni',
      },
      {
        dayNumber: 6,
        destinationId: 'ojo-de-perdiz',
        dayType: 'activity',
        content: {
          es: {
            title: 'Lagunas Joyas de los Andes y Desierto de Siloli',
            description: 'Desayuno en el hotel. Jornada completa por el altiplano sur: Laguna Turquiri, las Lagunas Joyas de los Andes y el Desierto de Siloli. Picnic incluido en ruta. Cena en el hotel.',
            schedule: 'Salida desde Uyuni',
            duration: 'Día completo',
            highlights: ['Lagunas Joyas de los Andes · 4.000-4.200 m', 'Laguna Turquiri · 4.261 m'],
            included: 'Guía · transporte 4x4 · picnic · cena',
          }
        },
        activities: [{ activityId: 'lagunas-joyas-andes-siloli', status: 'included' }],
        referenceHotelId: 'tayka-del-desierto',
      },
      {
        dayNumber: 7,
        destinationId: 'san-pedro-quemez',
        dayType: 'activity',
        content: {
          es: {
            title: 'Reserva Eduardo Avaroa: Laguna Verde y Laguna Colorada',
            description: 'Desayuno en el hotel. Jornada completa por la Reserva Eduardo Avaroa: Árbol de Piedra, géiseres del Sol de Mañana, termas de Polques, Desierto de Dalí, Laguna Verde y Laguna Colorada con sus flamencos. Cena en el hotel.',
            schedule: 'Salida temprano',
            duration: 'Día completo',
            highlights: ['Laguna Colorada · flamencos andinos · volcán Ollagüe', 'Sol de Mañana · 4.850 m · géiseres'],
            included: 'Guía · transporte 4x4 · entradas REA · cena',
          }
        },
        activities: [{ activityId: 'reserva-eduardo-avaroa-lagunas', status: 'included' }],
        referenceHotelId: 'tayka-de-piedra',
      },
      {
        dayNumber: 8,
        destinationId: 'uyuni',
        dayType: 'activity',
        content: {
          es: {
            title: 'Pastoreo de Llamas, Salar de Uyuni e Isla Incahuasi',
            description: 'Desayuno en el hotel. Mañana con el llamero Edwin en los corrales del altiplano. Visita de la Cueva de las Galaxias. Entrada al Salar de Uyuni y picnic al aire libre. Tarde en la Isla Incahuasi. Alojamiento en Uyuni.',
            duration: 'Día completo',
            highlights: ['Salar de Uyuni · 12.000 km²', 'Isla Incahuasi · cactus de hasta 8 metros'],
            included: 'Guía · transporte 4x4 · entradas · picnic',
          }
        },
        activities: [{ activityId: 'pastoreo-llamas-cueva-galaxias-incahuasi', status: 'included' }],
        referenceHotelId: 'samay-wasi-uyuni',
      },
      {
        dayNumber: 9,
        destinationId: 'la-paz',
        dayType: 'activity',
        content: {
          es: {
            title: 'Uyuni → La Paz: Ceremonia Andina y City Tour',
            description: 'Desayuno en el hotel. Vuelo a La Paz. Ceremonia de agradecimiento a la Pachamama con yatiris locales. City tour: teleférico, mercados, Catedral San Francisco y Valle de la Luna. Alojamiento en La Paz.',
            schedule: '09:15 UYU · 10:15 LPB',
            duration: 'Día completo',
            highlights: ['Ceremonia andina · Pachamama · yatiris', 'Teleférico · vistas sobre La Paz · 3.600 m'],
            included: 'Vuelo Uyuni → La Paz · guía · traslados · entradas',
          }
        },
        flights: ['UYU → LPB'],
        activities: [{ activityId: 'ceremonia-andina-city-tour-la-paz', status: 'included' }],
        referenceHotelId: 'apart-hotel-ritz-la-paz',
      },
      {
        dayNumber: 10,
        destinationId: 'isla-del-sol',
        dayType: 'activity',
        content: {
          es: {
            title: 'La Paz → Copacabana → Isla de la Luna → Isla del Sol',
            description: 'Desayuno en el hotel. Salida hacia el Lago Titicaca. Cruce del Estrecho de Tiquina. Desde Copacabana, navegación hasta la Isla de la Luna y su Templo de las Vírgenes del Sol. Continuación hasta la Isla del Sol. Cena incluida. Alojamiento en la Isla del Sol.',
            schedule: 'Salida mañana',
            duration: 'Día completo',
            highlights: ['Isla de la Luna · Templo de las Vírgenes del Sol', 'Isla del Sol · Lago Titicaca · 3.800 m'],
            included: 'Guía · traslados · navegación privada · cena',
          }
        },
        activities: [{ activityId: 'navegacion-titicaca-isla-luna-sol', status: 'included' }],
        referenceHotelId: 'jacha-inti-hostal',
      },
      {
        dayNumber: 11,
        destinationId: 'la-paz',
        dayType: 'activity',
        content: {
          es: {
            title: 'Isla del Sol, Pilkokaina y Basílica de Copacabana',
            description: 'Desayuno en el alojamiento. Visita del sitio arqueológico de Pilkokaina en la Isla del Sol. Almuerzo Apthapi incluido. Regreso a Copacabana y visita de la Basílica. Traslado a La Paz. Alojamiento en La Paz.',
            duration: 'Día completo',
            highlights: ['Pilkokaina · palacio inca · Isla del Sol', 'Almuerzo Apthapi · tradición comunitaria andina'],
            included: 'Guía · navegación · traslados · almuerzo Apthapi',
          }
        },
        activities: [{ activityId: 'isla-del-sol-pilkokaina-copacabana', status: 'included' }],
        referenceHotelId: 'apart-hotel-ritz-la-paz',
      },
      {
        dayNumber: 12,
        destinationId: 'santa-cruz',
        dayType: 'activity',
        content: {
          es: {
            title: 'La Paz → Santa Cruz: Ecoparque La Rinconada',
            description: 'Desayuno en el hotel. Vuelo a Santa Cruz. Traslado al hotel. Por la tarde, visita del Ecoparque La Rinconada. Alojamiento en Santa Cruz.',
            schedule: '11:00 LPB · 12:05 VVI',
            highlights: ['Ecoparque La Rinconada · Victoria Regia', 'Fauna tropical · tucanes · lagunas'],
            included: 'Vuelo La Paz → Santa Cruz · guía · entradas · traslados',
          }
        },
        flights: ['LPB → VVI'],
        activities: [{ activityId: 'ecoparque-rinconada-santa-cruz', status: 'included' }],
        referenceHotelId: 'hotel-cosmopolitano-santa-cruz',
      },
      {
        dayNumber: 13,
        destinationId: 'santa-cruz',
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo de Regreso a España',
            description: 'Desayuno en el hotel. Traslado al aeropuerto para el vuelo de regreso a España.',
            schedule: '12:20 VVI',
            highlights: [],
            included: 'Traslado aeropuerto · vuelo internacional',
          }
        },
        flights: ['VVI → MAD'],
        activities: [],
      },
    ],
  },
]

export default itineraries
