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
  heroImages: { src: string; alt: string; location: string }[]
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
        description:
          'Argentina tiene una capacidad única para dejarte sin palabras. Este viaje lo demuestra en cada etapa: las cataratas más impresionantes del mundo, ballenas francas australes, el glaciar Perito Moreno en movimiento y el mítico Fin del Mundo en Ushuaia. 13 días de naturaleza pura y experiencias únicas.',
        heroImages: [
          { src: 'https://images.unsplash.com/photo-1682597465277-ffffd1341731?q=80&w=1920', alt: 'Cataratas del Iguazú, Argentina', location: 'Cataratas del Iguazú' },
          { src: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=1920', alt: 'Ballena Franca Austral · Península de Valdés', location: 'Península de Valdés' },
          { src: 'https://images.unsplash.com/photo-1706170421190-48b12aa10f5e?q=80&w=1920', alt: 'Buenos Aires', location: 'Buenos Aires' },
          { src: 'https://images.unsplash.com/photo-1552751753-0fc84ae5b6c8?q=80&w=1920', alt: 'Glaciar Perito Moreno', location: 'Glaciar Perito Moreno · El Calafate' },
          { src: 'https://images.unsplash.com/photo-1553363437-e236983485c2?q=80&w=1920', alt: 'Canal Beagle, Ushuaia', location: 'Canal Beagle · Ushuaia' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'city-falls-iguazu', '4': 'panoramic-iguazu', '5': 'gran-melia-iguazu' }, nights: 2, dates: '17-19 sep', defaultCategory: 3 },
      { hotelsByCategory: { '3': 'hotel-muelle-viejo', '4': 'yene-hue', '5': 'hotel-territorio' }, nights: 2, dates: '19-21 sep', defaultCategory: 4 },
      { hotelsByCategory: { '3': 'merit-san-telmo', '4': 'hotel-madero', '5': 'alvear-palace' }, nights: 2, dates: '21-23 sep', defaultCategory: 3 },
      { hotelsByCategory: { '3': 'hotel-los-alamos', '4': 'rh-rochester-calafate', '5': 'eolo-patagonia' }, nights: 3, dates: '23-26 sep', defaultCategory: 4 },
      { hotelsByCategory: { '3': 'altos-ushuaia', '4': 'los-cauquenes', '5': 'arakur-ushuaia' }, nights: 2, dates: '26-28 sep', defaultCategory: 3 },
      { hotelsByCategory: { '3': 'merit-san-telmo', '4': 'hotel-madero', '5': 'alvear-palace' }, nights: 1, dates: '28-29 sep', defaultCategory: 3 },
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
        flights: ['BCN → MAD: IB412 · 13:35-15:00', 'MAD → EZE: AR1133 · 20:05', 'EZE → IGR: AR1774 · 06:45-08:40'],
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
            highlights: [
              'Ruta provincial 1 y 2 hasta el Istmo Carlos Ameghino',
              'Puerto Pirámides · Lobería de Punta Pirámide',
              'Caleta Valdés (elefantes marinos)',
              'Avistaje de ballena franca austral en catamarán desde Puerto Pirámides',
            ],
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
        flights: ['AEP → FTE: AR1850 · 15:15-19:50'],
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
            highlights: [
              'Ruta asfaltada hasta el Parque Nacional Los Glaciares (50 km)',
              'Pasarelas del Perito Moreno con vistas al frente del glaciar',
              'Safari Náutico (1 hora): navegación del Lago Rico',
              'Pared sur del glaciar de 60 m de altura',
            ],
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
        flights: ['FTE → USH: AR1896 · 16:30-17:50'],
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
            highlights: [
              'Mañana: Parque Nacional Tierra del Fuego (salida 08:00 hs · 5 horas)',
              'Tren del Fin del Mundo · Bahía Ensenada · Lago Acigami',
              'Bahía Lapataia — fin de la Ruta Panamericana',
              'Tarde: Navegación Canal Beagle (15:00-18:00 hs · 30 km)',
            ],
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
            highlights: [
              'Espectáculo de tango con cena en La Ventana (San Telmo)',
              'Cena: 20:00-21:30 hs / Show: 21:30-23:30 hs',
            ],
            included: 'Entrada, plato principal, postre y 1 botella de vino cada 2 personas',
          }
        },
        flights: ['USH → AEP: AR1873 · 09:30-13:00'],
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
        flights: ['EZE → MAD: AR1134 · 15:05'],
        activities: [],
      },
      {
        dayNumber: 15,
        dayType: 'transit',
        content: {
          es: {
            title: 'Llegada a Madrid y vuelo a Barcelona',
            description: 'Llegada a Madrid a las 08:20 hs. Conexión a Barcelona. Fin de nuestros servicios.',
          }
        },
        flights: ['MAD → BCN: IB413 · 12:40-14:00'],
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
        description:
          'Chile en su máxima esencia: la energía cosmopolita de Santiago, las viñas del valle del Maipo, el desierto más árido del planeta con sus salares y géiseres, y el misterio milenario de los moáis en Isla de Pascua. 13 días recorriendo tres mundos completamente distintos en un solo viaje.',
        heroImages: [
          { src: 'https://images.unsplash.com/photo-1671155282127-a23795b7b46a?w=1920&q=80', alt: 'Moáis de Isla de Pascua', location: 'Ahu Tongariki · Isla de Pascua' },
          { src: 'https://images.unsplash.com/photo-1620824175623-930d7a980da8?w=1920&q=80', alt: 'Desierto de Atacama', location: 'San Pedro de Atacama' },
          { src: 'https://images.unsplash.com/photo-1631850033735-b4c7853b16df?w=1920&q=80', alt: 'Santiago de Chile', location: 'Santiago de Chile' },
          { src: 'https://images.unsplash.com/photo-1662239091066-51f01a402516?w=1920&q=80', alt: 'Valle de la Luna', location: 'Valle de la Luna · Atacama' },
        ],
      }
    },
    featured: true,
    active: true,

    accommodationStops: [
      { hotelsByCategory: { '3': 'hotel-plaza-san-francisco-santiago', '4': 'cumbres-lastarria', '5': 'mandarin-oriental-santiago' }, nights: 3, dates: '24-27 ago', defaultCategory: 4 },
      { hotelsByCategory: { '3': 'hotel-poblado-kimal', '4': 'cumbres-san-pedro', '5': 'tierra-atacama' }, nights: 3, dates: '27-30 ago', defaultCategory: 4 },
      { hotelsByCategory: { '3': 'holiday-inn-santiago-airport', '4': 'holiday-inn-santiago-airport', '5': 'holiday-inn-santiago-airport' }, nights: 1, dates: '30-31 ago', defaultCategory: 3 },
      { hotelsByCategory: { '3': 'hotel-otai-rapa-nui', '4': 'takarua', '5': 'explora-rapa-nui' }, nights: 3, dates: '31 ago - 3 sep', defaultCategory: 4 },
      { hotelsByCategory: { '3': 'holiday-inn-santiago-airport', '4': 'holiday-inn-santiago-airport', '5': 'holiday-inn-santiago-airport' }, nights: 1, dates: '3-4 sep', defaultCategory: 3 },
    ],

    days: [
      {
        dayNumber: 1,
        destinationId: 'santiago-chile',
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo Barcelona · Madrid · Santiago de Chile',
            description: 'Salida desde Barcelona vía Madrid hacia Santiago. Llegada por la noche, recepción en aeropuerto y traslado al hotel.',
          }
        },
        flights: ['BCN → MAD: IB408 · 10:35-12:00', 'MAD → SCL: IB113 · 13:20-20:40'],
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
            highlights: [
              'Plaza de Armas y centro histórico',
              'Barrio Lastarria y cerro Santa Lucía',
              'Bellavista y miradores de la ciudad',
            ],
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
            highlights: [
              'Recorrido por los viñedos del valle del Maipo',
              'Visita a las bodegas históricas',
              'Cata de vinos premium chilenos',
            ],
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
        flights: ['SCL → CJC: H2252 · 08:00-10:07'],
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
            highlights: [
              'Dunas, cuevas de sal y formaciones rocosas',
              'Anfiteatro y las Tres Marías',
              'Atardecer con vistas a los Andes',
            ],
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
            highlights: [
              'Laguna Chaxa con flamencos andinos',
              'Lagunas Miscanti y Miñiques (4.200 m)',
              'Pueblos de Toconao y Socaire',
            ],
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
            highlights: [
              'Campo geotérmico a 4.320 m de altura',
              'Fumarolas al amanecer',
              'Baño en aguas termales',
              'Pueblo andino de Machuca',
            ],
            included: 'Traslados, desayuno y entrada',
          }
        },
        flights: ['CJC → SCL: H2255 · 19:52-21:57'],
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
        flights: ['SCL → IPC: LA841 · 09:30-13:00'],
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
            highlights: [
              'Cantera de Rano Raraku con cientos de moáis sin terminar',
              'Ahu Tongariki: 15 moáis monumentales frente al océano',
              'Playa de Anakena y Ahu Nau Nau',
            ],
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
            highlights: [
              'Cráter del volcán Rano Kau',
              'Aldea ceremonial de Orongo en el borde del acantilado',
              'Petroglifos del culto al Tangata Manu',
            ],
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
        flights: ['IPC → SCL: LA842 · 14:45-21:20'],
        activities: [],
        referenceHotelId: 'holiday-inn-santiago-airport',
      },
      {
        dayNumber: 12,
        dayType: 'transit',
        content: {
          es: {
            title: 'Vuelo de regreso a Barcelona',
            description: 'Traslado al aeropuerto de Santiago. Vuelo internacional vía Madrid. Noche en vuelo.',
          }
        },
        flights: ['SCL → MAD: IB118 · 10:40 (+1) 05:20'],
        activities: [],
      },
      {
        dayNumber: 13,
        dayType: 'transit',
        content: {
          es: {
            title: 'Llegada a Barcelona · Fin del viaje',
            description: 'Conexión en Madrid y llegada a Barcelona. Fin de nuestros servicios.',
          }
        },
        flights: ['MAD → BCN: IB403 · 07:05-08:25'],
        activities: [],
      },
    ],
  },
]

export default itineraries

