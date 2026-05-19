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
            title: 'Inicio del viaje: Madrid a Buenos Aires',
            description: 'Salida desde Madrid a las 23:10h. Llegada a Ezeiza (Buenos Aires) a las 06:45h. Recepción y traslado privado al hotel Mérit San Telmo.',
            schedule: '23:10',
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
            description: 'Desayuno en el hotel. Recorrido guiado por la ciudad: Plaza de Mayo, Teatro Colón, La Boca, San Telmo, Recoleta y Palermo. Una primera toma de contacto con la capital argentina.',
            duration: '3-4 horas',
            highlights: ['Plaza de Mayo', 'La Boca · San Telmo', 'Palermo · Puerto Madero · Obelisco'],
            included: 'Guía de turismo, pick up hotel',
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
            title: 'Buenos Aires a Ushuaia: el Fin del Mundo',
            description: 'Desayuno en el hotel. Vuelo a Ushuaia (JA3201, 18:05-21:43h). Recepción y traslado al hotel Altos Ushuaia. Llegada al extremo sur del mundo.',
            schedule: '18:05',
            included: 'Traslado aeropuerto',
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
            title: 'Ushuaia: Parque Nacional Tierra del Fuego y Tren del Fin del Mundo',
            description: 'Desayuno en el hotel. Excursión al Parque Nacional Tierra del Fuego con el Tren del Fin del Mundo. Bosques de lenga y coihue, lagos, turberas y asentamiento indígena. Tarde libre en Ushuaia.',
            schedule: '8:00',
            duration: '5 horas aprox.',
            highlights: ['Parque Nacional de Tierra de Fuego', 'Tren del fin del mundo'],
            included: 'Tren, traslados, entradas',
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
            title: 'Ushuaia: Aventura Almanza y pingüinera Isla Martillo',
            description: 'Desayuno en el hotel. Excursión a Puerto Almanza navegando por el Canal Beagle. Llegada a Isla Martillo para acercarse a los pingüinos de Magallanes y Papúa. Almuerzo de 3 pasos con centolla en Puerto Almanza.',
            schedule: '7:45',
            duration: 'Medio día, 6 horas',
            highlights: ['Isla Martillo', 'pingüinos Magallanes y Papúa', 'centolla'],
            included: 'Navegación, almuerzo 3 pasos, traslados',
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
            title: 'Ushuaia a El Calafate: los glaciares',
            description: 'Desayuno en el hotel. Mañana libre en Ushuaia. Vuelo a El Calafate (AR1899, 15:20-16:40h). Recepción y traslado al hotel Sierra Nevada. El Calafate, puerta al Parque Nacional Los Glaciares.',
            schedule: '15:20',
            included: 'Traslado aeropuerto',
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
            description: 'Desayuno en el hotel. Excursión al Parque Nacional Los Glaciares. Visita al Glaciar Perito Moreno con sus pasarelas y miradores. Un gigante vivo de hielo azul y blanco que avanza sobre el Lago Argentino. Posibilidad de presenciar espectaculares desprendimientos.',
            schedule: '09:00-17:00',
            duration: '8 horas',
            highlights: ['Parque Nacional Los Glaciares', 'Pasarelas con vistas al frente del glaciar', 'Safari Náutico (1 hora): navegación del Lago Rico', 'Pared sur del glaciar de 60 m de altura'],
            included: 'Traslados, guía bilingüe, entrada parque',
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
            title: 'El Calafate: día libre',
            description: 'Desayuno en el hotel. Día libre en El Calafate. Sugerencias: Glaciarium (museo del hielo), Reserva Laguna Nímez, Glacio Bar. Opcionales: Kayak al Atardecer en el Lago Argentino o Kayak y Trekking en el Río La Leona.',
            highlights: ['Glaciarium', 'Laguna Nímez', 'Lago Argentino'],
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
            title: 'El Calafate a Bariloche: la Patagonia norte',
            description: 'Desayuno en el hotel. Vuelo a Bariloche (AR1695, 09:20-11:05h). Recepción y traslado al hotel Nahuel Huapi. Tarde libre para explorar la ciudad y sus chocolaterías.',
            schedule: '9:20',
            included: 'Traslado aeropuerto',
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
            description: 'Desayuno en el hotel. Excursión guiada por el Circuito Chico. Ascenso en aerosilla al Cerro Campanario (1.050m) con panorámica de lagos, montañas y glaciares. Continuación por Llao Llao, Bahía López y Punto Panorámico. El paseo más emblemático de Bariloche.',
            highlights: ['Cerro Campanario', 'Llao Llao', 'Bahía Lopez'],
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
            title: 'Bariloche: Circuito de los Siete Lagos',
            description: 'Desayuno en el hotel. Excursión guiada por el Circuito Chico. Ascenso en aerosilla al Cerro Campanario (1.050m) con panorámica de lagos, montañas y glaciares. Continuación por Llao Llao, Bahía López y Punto Panorámico. El paseo más emblemático de Bariloche.',
            schedule: '08:30-12:30',
            duration: 'Medio día, 4 horas',
            highlights: ['Villa La Angostura', 'Lagos', 'San Martín de los Andes'],
            included: 'Guía, traslados, aerosilla',
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
            title: 'Bariloche a Puerto Iguazú: de los Andes a la selva',
            description: 'Desayuno en el hotel. Vuelo a Puerto Iguazú con escala en Buenos Aires (AR1695 12:00-14:05, AR1790 17:35-19:30h). Recepción y traslado al hotel. Llegada a la ciudad de las tres fronteras.',
            schedule: '12:00',
            included: 'Traslados aeropuerto',
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
            title: 'Cataratas del Iguazú: lado argentino y Gran Aventura',
            description: 'Desayuno en el hotel. Excursión al Parque Nacional Iguazú: Paseo Inferior, Paseo Superior y Garganta del Diablo en tren ecológico. Entrada incluida. Opcional: Gran Aventura en lancha por el cañón del río (2h15m, 150 escaleras).',
            schedule: '07:20-16:00',
            duration: '8 horas',
            highlights: ['Paseo Inferior (1.200 m)', 'Paseo Superior (1.100 m)', 'Garganta del Diablo en tren ecológico'],
            included: 'Traslados, guía bilingüe, entrada parque',
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
            description: 'Desayuno en el hotel. Mañana en el lado brasileño de las cataratas: 1.200m de pasarelas con vistas panorámicas a los 275 saltos. Por la tarde, vuelo a Buenos Aires (AR1791, 19:45-21:45h) y traslado privado al hotel.',
            schedule: '08:00-14:00',
            duration: '3 horas',
            included: 'Entrada parque brasileño',
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
            title: 'Buenos Aires a Madrid: vuelo de regreso',
            description: 'Desayuno en el hotel. Tiempo libre en Buenos Aires. Traslado privado al aeropuerto Ezeiza para el vuelo de regreso a Madrid (PU502, 13:25-05:30+1h).',
            schedule: '13:25',
            included: 'Traslado privado aeropuerto',
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
            title: 'Llegada a Madrid. Fin del viaje.',
            description: 'Llegada al aeropuerto de Madrid Adolfo Suárez-Barajas a las 05:30h. Fin de nuestros servicios.',
            schedule: '5:30',
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
            highlights: [],
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
            highlights: [],
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
            highlights: [],
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
          { imageKey: 'ITINERARIES.CAPITALES_VINO_CASABLANCA', location: 'Valle de Casablanca, Chile' },
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
            description: 'Llegada al Aeropuerto Internacional Arturo Merino Benítez de Santiago de Chile. Recepción con traslado privado al hotel en la exclusiva comuna de Vitacura. Tarde libre para un primer paseo por el Parque Bicentenario o el barrio de Providencia y sus cafés.',
            highlights: ['Traslado privado aeropuerto-hotel en Santiago'],
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
            title: 'Santiago de Chile: City Tour Panorámico',
            description: 'Mañana de exploración guiada por la capital chilena descubriendo sus contrastes entre el casco histórico y los modernos barrios del oriente. Visita al Palacio de La Moneda en la Alameda, la Plaza de Armas y sus edificios históricos, el Cerro Santa Lucía, el Barrio Bellavista y las comunas de Las Condes y Vitacura con el Parque Bicentenario. Tarde libre para gastronomía local o museos.',
            schedule: '08:30-13:30 hs',
            duration: '5 horas',
            highlights: ['Palacio de La Moneda y la Alameda', 'Plaza de Armas e Iglesia Catedral', 'Cerro Santa Lucía', 'Barrio Bellavista', 'Parque Bicentenario · Vitacura'],
            included: 'Traslados y guía bilingüe',
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
            title: 'Excursión al Valle de Casablanca: Viñas Bodega RE y Casas del Bosque',
            description: 'Día dedicado al mundo del vino en el reconocido Valle de Casablanca, a 90 km de Santiago. Primera visita a Viña Bodega RE, proyecto artesanal que elabora vinos únicos en tinajas de arcilla maulina bajo los principios de recrear, reinventar y revelar. Segunda parada en Viña Casas del Bosque, especialista en variedades de clima frío, para recorrer viñedos y bodegas y finalizar con degustación y almuerzo incluidos. Los viñedos están cerrados los días feriados de Chile.',
            schedule: '08:30 hs',
            duration: '9 horas',
            highlights: ['Valle de Casablanca · vinos de clima frío reconocidos internacionalmente', 'Viña Bodega RE · vinos artesanales en tinajas de arcilla maulina', 'Viña Casas del Bosque · viñedos, sala de barricas y degustación', 'Almuerzo maridado en entorno natural privilegiado'],
            included: 'Traslado privado, degustación de vinos y almuerzo en Casas del Bosque',
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
            title: 'De Santiago a Mendoza: cruzando los Andes',
            description: 'Traslado al aeropuerto internacional de Santiago. Vuelo a Mendoza cruzando la impresionante Cordillera de los Andes. Recepción en el aeropuerto mendocino y traslado al hotel en el microcentro. Tarde libre para un primer paseo por las plazas y la calle peatonal Sarmiento, epicentro de la vida social de la ciudad del sol y el buen vino.',
            highlights: ['Vuelo Santiago-Mendoza con vistas a la Cordillera de los Andes', 'Microcentro de Mendoza · Plazas y calle peatonal Sarmiento'],
            included: 'Traslados aeropuerto-hotel',
          }
        },
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
            description: 'Por la mañana, recorrido guiado por la encantadora ciudad de Mendoza, diseñada con un ingenioso sistema de acequias y arbolada. Visita al Área Fundacional, corazón del centro histórico de la Ciudad Vieja, las cinco plazas del centro cívico, la Bandera del Ejército de los Andes y el imponente Parque General San Martín. El tour culmina en el Cerro de la Gloria con el monumento libertador. Tarde libre para explorar bodegas del centro histórico.',
            schedule: '08:30-13:00 hs',
            duration: '4.5 horas',
            highlights: ['Área Fundacional · corazón histórico de la Ciudad Vieja', 'Cinco plazas del centro cívico', 'Parque General San Martín · pulmón verde de la ciudad', 'Cerro de la Gloria · Monumento al Ejército de los Andes'],
            included: 'Traslado y guía bilingüe',
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
            description: 'Día completo en el oasis vitivinícola del Valle de Uco, a unos 90 km de Mendoza, donde el paisaje andino a 1.000 metros de altura dota a los vinos de complejidad única. Acompañados por un guía especializado en enología, se visitan tres bodegas de alta gama para conocer sus instalaciones y disfrutar de degustaciones. El punto culminante es el almuerzo de pasos maridado en el restaurante de una bodega de prestigio, donde se practican las técnicas de cata aprendidas. Bodegas sujetas a disponibilidad y confirmación.',
            schedule: '08:30-18:00 hs',
            duration: '9 horas',
            highlights: ['Valle de Uco · a los pies de los Andes a 1.000 m de altura', 'Guía especializado en vinos durante todo el recorrido', 'Visita y degustación clásica en dos bodegas de alta gama', 'Almuerzo de pasos maridado en bodega de prestigio'],
            included: 'Traslado en unidades con A/C, guía especializado, visita y degustación en dos bodegas, almuerzo en tercera bodega',
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
            title: 'De Mendoza a Buenos Aires',
            description: 'Traslado al aeropuerto de Mendoza. Vuelo a Buenos Aires. Recepción en el aeropuerto doméstico con servicio de guía y traslado al hotel, a metros del Obelisco en el corazón de la ciudad. Tarde libre para un primer contacto con la vibrante Buenos Aires: el Obelisco, la Avenida Corrientes o los bares del microcentro porteño.',
            highlights: ['Aeropuerto doméstico de Buenos Aires', 'Hotel a metros del Obelisco · microcentro porteño'],
            included: 'Traslado aeropuerto-hotel con guía en español',
          }
        },
        activities: [],
        referenceHotelId: 'grand-brizo-buenos-aires',
      },
      {
        dayNumber: 8,
        destinationId: 'buenos-aires',
        dayType: 'activity',
        content: {
          es: {
            title: 'Buenos Aires: City Tour Clásico',
            description: 'Mañana de descubrimiento por los barrios más emblemáticos de Buenos Aires. Visita a la Plaza de Mayo, la Casa Rosada y la Floralis Genérica, antes de adentrarse en el colorido barrio de La Boca con el famoso Caminito. Exploración de San Telmo y Recoleta, Palermo y Puerto Madero. Tarde libre para disfrutar de la gastronomía porteña, el Teatro Colón o un café con historia.',
            schedule: 'Pick up 09:00 hs',
            duration: '3.5-4 horas',
            highlights: ['Floralis Genérica · Plaza de Mayo · Casa Rosada', 'La Boca · El Caminito', 'San Telmo · Recoleta', 'Palermo · Puerto Madero · Obelisco'],
            included: 'Guía de turismo y traslados',
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
            title: 'Buenos Aires: Degustación de Vinos y Noche de Tango en La Ventana',
            description: 'Jornada que combina dos grandes emblemas de la cultura argentina. Al final de la tarde, sesión de cata guiada por el sommelier de La Ventana: tres variedades entre Malbec, Torrontés, Chardonnay y Cabernet maridadas con tabla de quesos, jamón crudo y bruscheta. A continuación, cena show en el histórico conventillo de San Telmo: 32 artistas en escena con dos orquestas de tango, bailarines y cantantes de folclore. La experiencia más auténtica de la noche porteña desde 1982.',
            schedule: '18:30-23:30 hs',
            duration: '5 horas',
            highlights: ['Degustación guiada: Malbec, Torrontés, Chardonnay y Cabernet de bodegas premium', 'Maridaje con tabla de quesos, panes saborizados y jamón crudo', 'Cena en La Ventana · San Telmo', 'Show de tango con 32 artistas · dos orquestas y conjunto folklórico'],
            included: 'Degustación de vinos con maridaje, cena (entrada + principal + postre) y 1 botella de vino cada 2 personas',
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
            title: 'De Buenos Aires a Montevideo: el ferry del Río de la Plata',
            description: 'Traslado desde el hotel al Puerto de Buenos Aires con servicio de guía. Viaje en ferry Buquebus a Montevideo: 2 horas y 45 minutos cruzando el Río de la Plata en clase turista. Llegada al Puerto de Montevideo y traslado al hotel en el barrio de Punta Carretas. Tarde libre para un primer paseo por la rambla o el casco histórico de Ciudad Vieja.',
            highlights: ['Ferry Buquebus Buenos Aires → Montevideo · 2h 45min en clase turista', 'Llegada al barrio de Punta Carretas con vistas al Río de la Plata', 'Primera tarde en Montevideo · Rambla o Ciudad Vieja'],
            included: 'Traslados hotel-puerto-hotel, ticket de ferry en clase turista (equipaje incluido)',
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
            description: 'Por la mañana, recorrido panorámico guiado por los principales hitos de la capital uruguaya: la Plaza Independencia con el mausoleo de Artigas y el imponente Palacio Salvo, el Teatro Solís, el animado Mercado del Puerto, el Palacio Legislativo y el Estadio Centenario. Paradas para fotografías en el Mercado Agrícola, el Obelisco a los Constituyentes y el Monumento a la Carreta. Tarde libre para explorar la rambla o Ciudad Vieja.',
            schedule: 'AM · 09:00 hs',
            duration: '3-4 horas',
            highlights: ['Plaza Independencia · Palacio Salvo', 'Teatro Solís · Mercado del Puerto', 'Palacio Legislativo · Obelisco a los Constituyentes', 'Estadio Centenario · Mercado Agrícola'],
            included: 'Traslados y guía bilingüe',
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
            title: 'Montevideo: Tour Bodega Pizzorno con Almuerzo Maridado',
            description: 'Jornada dedicada a la vitivinicultura uruguaya en la histórica Bodega Pizzorno, cuarta generación de una familia que lleva más de un siglo cultivando la vid. Recorrido guiado por los viñedos, la bodega y la cava para conocer el proceso de elaboración del vino en todas sus etapas. En el Salón de Degustaciones, cata asistida de cuatro vinos y aceites de oliva, seguida de un almuerzo de tres pasos maridado. Los vinos de la Familia Pizzorno son representantes de una tierra rica y próspera.',
            schedule: '09:00-13:00 hs',
            duration: '4 horas',
            highlights: ['Viñedos y cava de Bodega Pizzorno · tradición familiar centenaria', 'Proceso completo de elaboración del vino en sus diferentes etapas', 'Degustación asistida de 4 vinos y aceites de oliva', 'Almuerzo de tres pasos maridado con vino incluido'],
            included: 'Traslado ida y vuelta a la bodega, visita guiada, degustación y almuerzo maridado',
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
            description: 'Desayuno en el hotel. Traslado al Aeropuerto Internacional de Carrasco (MVD). Fin de los servicios de Viajes Vidaia. Este itinerario habrá sido un recorrido sensorial único por las capitales del vino del Cono Sur: desde las viñas de Casablanca y el Valle de Uco hasta las bodegas boutique de Uruguay, pasando por las noches de tango y la parrilla de Buenos Aires.',
            highlights: ['Desayuno en el hotel', 'Traslado al Aeropuerto Internacional de Carrasco (MVD)'],
            included: 'Traslado hotel-aeropuerto',
          }
        },
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
            description: 'Presentación en el aeropuerto de origen y vuelo internacional a Lima. Arribo al Aeropuerto Internacional Jorge Chávez, asistencia y traslado al hotel seleccionado. Tarde libre para un primer contacto con la animada Lima: el malecón de Miraflores, la Huaca Pucllana iluminada o una primera cena de bienvenida con ceviche fresco.',
            highlights: ['Aeropuerto Internacional Jorge Chávez · Lima', 'Traslado privado al hotel'],
            included: 'Traslado aeropuerto-hotel',
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
            title: 'Lima: City Tour Colonial y Moderno + Museo Larco Herrera',
            description: 'Desayuno en el hotel. Visita del casco histórico Patrimonio de la Humanidad: la Catedral, la Plaza Mayor con el Palacio de Gobierno, el Palacio Municipal y el Arzobispal, el Convento de Santo Domingo y el Convento de San Francisco. Traslado a los barrios residenciales de San Isidro y Miraflores pasando por la Huaca Pucllana. Visita al Museo Larco Herrera con 3.000 años de historia peruana precolombina. Parada en el Parque del Amor con vistas al Océano Pacífico. Tarde libre para descubrir el barrio de Barranco y la gastronomía limeña.',
            highlights: ['Plaza Mayor y Catedral · casco histórico Patrimonio UNESCO', 'Convento de San Francisco · Convento de Santo Domingo', 'Huaca Pucllana · sitio arqueológico de adobe', 'Museo Larco Herrera · 3.000 años de historia precolombina', 'Parque del Amor · vistas a la Costa Verde del Pacífico'],
            included: 'Guía local y traslados',
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
            title: 'Lima → Paracas: Reserva Nacional y Buggies en las Dunas',
            description: 'Desayuno en el hotel. Traslado a la estación de autobuses para tomar el bus semi-cama hacia la Bahía de Paracas (aprox. 4 horas) con el Océano Pacífico como compañero de ruta. Llegada y traslado al hotel. Visita a la Reserva Nacional de Paracas con sus acantilados y paisaje marítimo-desértico, y al centro de interpretación de la Reserva. Por la tarde, recogida para la experiencia de Buggies y Sandboard en las dunas del Oasis Costa Rica siguiendo la ruta del Dakar, con atardecer entre dunas incluido.',
            highlights: ['Bus semi-cama Lima → Paracas · costa del Pacífico', 'Reserva Nacional de Paracas · acantilados y necrópolis', 'Buggies o Areneros en dunas · Oasis Costa Rica', 'Sandboard al atardecer en las dunas del desierto'],
            included: 'Bus regular Lima-Paracas, visita a la Reserva y Buggies en compartido',
            excluded: 'suplemento por transporte privado Lima-Paracas',
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
            description: 'Desayuno en el hotel. Traslado al embarcadero para zarpar en lancha compartida por el Océano Pacífico. De camino, avistamiento del enigmático geoglifo de "El Candelabro". Recorrido por las Islas Ballestas contemplando colonias de lobos marinos, pingüinos de Humboldt, pelícanos y decenas de especies de aves. Retorno al litoral. A la hora prevista, traslado a la estación de buses para regresar a Lima. Recepción y traslado al hotel. Tarde libre en Lima.',
            highlights: ['Lancha compartida · Islas Ballestas', 'El Candelabro · geoglifo costero pre-inca', 'Lobos marinos, pingüinos de Humboldt y aves marinas en hábitat natural', 'Bus de línea Paracas → Lima'],
            included: 'Lancha compartida Islas Ballestas, bus regular Paracas-Lima',
            excluded: 'sobrevuelo Líneas de Nazca (opcional con suplemento)',
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
            description: 'Desayuno en el hotel. Traslado al aeropuerto para tomar el vuelo a Arequipa (se sugiere vuelo sobre las 08:00 h). Llegada y traslado al hotel. Tiempo libre por la mañana para entrar en contacto con la ciudad, visitar el mercado de San Camilo o el Museo de los Altares Andinos con la réplica de la Momia Juanita. Por la tarde, visita guiada de la Ciudad Blanca incluyendo el Convento de Santa Catalina, la Plaza de Armas, los Claustros de la Compañía, los distritos de Yanahuara y Chilina con vistas al volcán Misti, y Mundo Alpaca.',
            highlights: ['Vuelo Lima → Arequipa · 1h 35min', 'Convento de Santa Catalina · ciudad dentro de la ciudad', 'Plaza de Armas y Claustros de la Compañía · cúpula de San Ignacio', 'Mirador Yanahuara · vistas al volcán Misti', 'Mundo Alpaca · proceso tradicional de la fibra andina'],
            included: 'Vuelo doméstico Lima-Arequipa (no incluido, ver tabla de precios), traslados, guía y visitas por la tarde',
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
            description: 'Desayuno en el hotel. Salida hacia el Cañón del Colca, uno de los cañones más profundos del planeta. El trayecto transcurre por la Pampa Cañahuas, cerca de la Reserva Nacional Salinas-Aguada Blanca con vizcachas y vicuñas, los Bofedales de Tocra con flamencos andinos y el Mirador de los Volcanes, punto más alto del trayecto con vistas a los principales volcanes de la zona. Llegada al pueblo de Chivay. Almuerzo. Traslado a los alojamientos. Por la tarde, opcionalmente las termas naturales de La Calera (los alojados en Colca Lodge y El Refugio tienen termas propias).',
            highlights: ['Pampa Cañahuas · Reserva Salinas-Aguada Blanca · vicuñas', 'Bofedales de Tocra · flamencos andinos', 'Mirador de los Volcanes · punto más alto del trayecto', 'Pueblo de Chivay · puerta del Cañón del Colca'],
            included: 'Traslado Arequipa-Chivay, almuerzo',
            excluded: 'Termas de La Calera (ingreso no incluido; los hoteles Colca Lodge y El Refugio tienen termas propias)',
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
            title: 'Cañón del Colca: Cruz del Cóndor → Puno',
            description: 'Desayuno en el hotel. Visita al Mirador Cruz del Cóndor, donde se aprecia la profundidad del cañón y el vuelo arrogante de los cóndores andinos. Visita a los pueblos coloniales de Yanque y Maca con sus iglesias y plazas características. De retorno a Chivay, vistas del valle del Colca. Almuerzo en Chivay. Continuación hacia Puno, con hermosos escenarios naturales y vista de la Laguna Lagunillas con flamencos andinos. Llegada a Puno al final de la tarde. Traslado al hotel.',
            highlights: ['Mirador Cruz del Cóndor · vuelo de cóndores andinos', 'Pueblo colonial de Yanque y su iglesia barroca', 'Pueblo de Maca · plaza e iglesia coloniales', 'Laguna Lagunillas · flamencos andinos de camino a Puno'],
            included: 'Traslado Chivay-Puno, almuerzo',
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
            description: 'Desayuno en el hotel. Embarcamos en el muelle de Puno para navegar el Lago Titicaca, el lago navegable más alto del planeta a 3.820 metros. Primera parada en las Islas Uros, islas flotantes construidas artesanalmente con totora, donde los descendientes de esta ancestral etnia reciben a los visitantes en sus embarcaciones de junco. Continuación hacia la Isla de Taquile, isla quechua donde los tejidos de los hombres son Patrimonio Inmaterial de la UNESCO. Almuerzo en restaurante local con vistas al lago. Paseo por la isla antes de regresar al puerto de Puno.',
            highlights: ['Navegación por el lago navegable más alto del planeta · 3.820 m', 'Islas Uros · islas flotantes de totora habitadas', 'Isla de Taquile · tejidos quechuas Patrimonio Inmaterial UNESCO', 'Almuerzo en restaurante local de la isla'],
            included: 'Lancha compartida, guía local, almuerzo',
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
            title: 'Puno → Cusco en Bus Turístico con Paradas Arqueológicas',
            description: 'Desayuno en el hotel. Traslado a la estación del bus turístico para iniciar el espectacular trayecto hacia Cusco con paradas culturales e históricas: Pukara y su interesante museo arqueológico; La Raya, punto más alto del trayecto (4.335 m) con vistas a los nevados; Raqchi con el impresionante Templo de Wiracocha; y Andahuaylillas, conocida como la Capilla Sixtina Andina por sus fastuosos frescos coloniales. Almuerzo en ruta. Llegada a Cusco al caer la tarde.',
            highlights: ['Pukara · museo arqueológico con monolitos líticos', 'La Raya · punto más alto · 4.335 m · nevados andinos', 'Raqchi · Templo de Wiracocha · mayor templo inca conocido', 'Andahuaylillas · "Capilla Sixtina Andina" · frescos barrocos del siglo XVII'],
            included: 'Bus turístico Puno-Cusco en compartido, guía, almuerzo',
            excluded: 'Suplemento por transporte privado opcional',
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
            description: 'Desayuno en el hotel. Recorrido peatonal exclusivo por el corazón de la antigua capital del Imperio Inca: la plaza del bohemio barrio de San Blas y sus artesanos; la calle Hatunrumiyoc con la célebre Piedra de los 12 Ángulos encastrada en el muro inca con precisión milimétrica; la plazoleta Nazarenas; la monumental Plaza de Armas con la Catedral barroca del siglo XVII; el Koricancha o Templo del Sol, el recinto más sagrado del Tahuantinsuyo; y el mercado de abastos de San Pedro. Tarde libre para explorar el barrio de San Blas, los talleres de artesanos o disfrutar de la cocina novoandina de Cusco.',
            highlights: ['Barrio de San Blas · artesanos y callejuelas coloniales', 'Calle Hatunrumiyoc · Piedra de los 12 Ángulos · muro inca perfecto', 'Plaza de Armas · Catedral barroca del siglo XVII', 'Koricancha · Templo del Sol · recinto más sagrado del Imperio Inca', 'Mercado de San Pedro · abastos andinos'],
            included: 'Guía local, entradas incluidas',
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
            title: 'Valle Sagrado: Chinchero, Maras, Moray y Ollantaytambo → Aguas Calientes',
            description: 'Desayuno. Visita al pueblo de Chinchero con su zona arqueológica, iglesia colonial y espectacular mercado (especialmente los domingos) y taller textil con demostración de tejidos con tintes naturales. Continuación a las Minas de Sal de Maras, salineras en explotación desde el Imperio Inca. Visita al Moray, asombroso laboratorio agrícola inca con sus andenerías concéntricas de distintos microclimas. Almuerzo. Por la tarde, visita de la fortaleza de Ollantaytambo. Traslado a la estación del tren Vistadome Observatory hacia Aguas Calientes. Llegada, traslado al hotel. Cena y alojamiento.',
            highlights: ['Chinchero · zona arqueológica y mercado dominical artesanal', 'Taller textil · tejidos y tintes naturales herederos del Imperio Inca', 'Minas de Sal de Maras · salineras en explotación desde época inca', 'Moray · laboratorio agrícola inca con microclimas concéntricos', 'Ollantaytambo · fortaleza inca y pueblo vivo del Valle Sagrado', 'Tren Vistadome Observatory Ollantaytambo → Aguas Calientes · 1h 30min'],
            included: 'Traslados, guía, visitas, almuerzo, tren Vistadome Observatory (ida) en compartido, cena',
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
            description: 'Desayuno. Madrugada para tomar el bus desde Aguas Calientes hasta la ciudadela inca de Machu Picchu, una de las Siete Maravillas Modernas del Mundo. Visita guiada del complejo arqueológico recorriendo sus andenes, plazas, el Templo del Sol, los templos de las Tres Ventanas y el Intihuatana. Posibilidad de subir al monte Huayna Picchu o monte Machu Picchu (previo suplemento, reserva al confirmar). Regreso en bus a Aguas Calientes para explorar el mercadillo del pueblo. A la hora prevista, tren Vistadome Panorámico de regreso a Ollantaytambo, donde espera la movilidad hacia el hotel en el Valle Sagrado. Cena y alojamiento.',
            highlights: ['Bus Aguas Calientes → Machu Picchu · 30 min', 'Machu Picchu · ciudadela inca · una de las 7 Maravillas Modernas', 'Andenes, plazas, Templo del Sol e Intihuatana', 'Mercadillo de Aguas Calientes · pueblo de montaña', 'Tren Vistadome Panorámico Aguas Calientes → Ollantaytambo · 1h 30min'],
            included: 'Bus Aguas Calientes-Machu Picchu-Aguas Calientes, guía, entradas, tren Vistadome Panorámico (vuelta), cena',
            excluded: 'ingreso monte Huayna Picchu o monte Machu Picchu (suplemento, confirmar al reservar)',
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
            title: 'Valle Sagrado: Pisac → Ruinas Aledañas de Cusco',
            description: "Desayuno en el hotel. Por la mañana traslado de regreso hacia Cusco visitando el camino el sitio arqueológico de Pisac en el sector de Kanturaquay con sus fuentes y cementerio inca, y una breve parada en el animado mercado artesanal de Pisac. Continuación hacia las Ruinas Aledañas de Cusco: Sacsayhuamán, fortaleza ceremonial de piedras monumentales de hasta 125 toneladas; Q'enqo, centro ritual con sacrificios; Tambomachay, templo al Dios Agua; y vista panorámica de Puka-Pukará. Llegada al hotel en Cusco. Tarde libre.",
            highlights: ['Pisac · sector Kanturaquay · fuentes y cementerio inca', 'Mercado artesanal de Pisac · tejidos y productos andinos', 'Sacsayhuamán · fortaleza ceremonial de megalitos de 125 toneladas', "Q'enqo · centro ritual y ceremonial inca", 'Tambomachay · templo inca del culto al agua', 'Puka-Pukará · tambo y puesto de vigilancia inca'],
            included: 'Traslados, guía, entradas a las ruinas aledañas de Cusco',
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
            description: 'Desayuno en el hotel. Traslado al aeropuerto de Cusco para tomar el vuelo regular de retorno a Lima (se recomienda un mínimo de 3 horas de diferencia con el vuelo internacional de regreso). Llegada a Lima, asistencia en aeropuerto y posterior conexión con el vuelo internacional de retorno a la ciudad de origen. Noche a bordo. Fin de los servicios de Viajes Vidaia en Perú.',
            highlights: ['Vuelo doméstico Cusco → Lima · 1h 35min', 'Asistencia en aeropuerto Lima para conexión internacional', 'Vuelo internacional Lima → Ciudad de origen'],
            included: 'Traslado hotel-aeropuerto Cusco, asistencia en Lima para vuelo internacional',
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
]

export default itineraries
