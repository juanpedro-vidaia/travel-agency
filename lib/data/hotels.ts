export interface HotelContent {
  name: string
  categoryLabel?: string   // e.g. "Superior", "Boutique", "Lodge"
  description?: string
}

export interface Hotel {
  id: string
  destinationId: string
  content: {
    es: HotelContent
    en?: HotelContent
  }
  category: 3 | 4 | 5
  imageKey: string
  active: boolean
}

const hotels: Hotel[] = [
  {
    id: 'nahuel-huapi-bariloche',
    destinationId: 'bariloche',
    content: {
      es: {
        name: 'Nahuel Huapi',
      }
    },
    category: 3,
    imageKey: 'HOTELS.NAHUEL_HUAPI_BARILOCHE',
    active: true,
  },
  {
    id: 'merit-san-telmo',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Mérit San Telmo',
      }
    },
    category: 3,
    imageKey: 'HOTELS.MERIT_SAN_TELMO',
    active: true,
  },
  {
    id: 'hotel-madero',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Hotel Madero Buenos Aires',
      }
    },
    category: 4,
    imageKey: 'HOTELS.HOTEL_MADERO',
    active: true,
  },
  {
    id: 'alvear-palace',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Alvear Palace Hotel',
      }
    },
    category: 5,
    imageKey: 'HOTELS.ALVEAR_PALACE',
    active: true,
  },
  {
    id: 'hotel-los-alamos',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Hotel Los Álamos',
      }
    },
    category: 3,
    imageKey: 'HOTELS.LOS_ALAMOS',
    active: true,
  },
  {
    id: 'sierra-nevada-el-calafate',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Sierra Nevada',
      }
    },
    category: 3,
    imageKey: 'HOTELS.SIERRA_NEVADA_CALAFATE',
    active: true,
  },
  {
    id: 'rh-rochester-calafate',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'RH Rochester Calafate',
      }
    },
    category: 4,
    imageKey: 'HOTELS.ROCHESTER_CALAFATE',
    active: true,
  },
  {
    id: 'eolo-patagonia',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: "Eolo Patagonia's Spirit",
        categoryLabel: 'Relais & Châteaux',
      }
    },
    category: 5,
    imageKey: 'HOTELS.EOLO_PATAGONIA',
    active: true,
  },
  {
    id: 'senderos-aparts-suites-el-chalten',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Senderos Aparts & Suites',
      }
    },
    category: 3,
    imageKey: 'HOTELS.SENDEROS_APARTS_SUITES',
    active: true,
  },
  {
    id: 'city-falls-iguazu',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'City Falls Iguazú',
      }
    },
    category: 3,
    imageKey: 'HOTELS.CITY_FALLS_IGUAZU',
    active: true,
  },
  {
    id: 'panoramic-iguazu',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Panoramic Hotel Iguazú',
      }
    },
    category: 4,
    imageKey: 'HOTELS.PANORAMIC_IGUAZU',
    active: true,
  },
  {
    id: 'gran-melia-iguazu',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Gran Meliá Iguazú',
        categoryLabel: 'Lujo',
      }
    },
    category: 5,
    imageKey: 'HOTELS.GRAN_MELIA_IGUAZU',
    active: true,
  },
  {
    id: 'hotel-otai-rapa-nui',
    destinationId: 'isla-pascua',
    content: {
      es: {
        name: 'Hotel Otai',
        categoryLabel: 'Tradicional',
      }
    },
    category: 3,
    imageKey: 'HOTELS.OTAI_RAPA_NUI',
    active: true,
  },
  {
    id: 'takarua',
    destinationId: 'isla-pascua',
    content: {
      es: {
        name: 'Hotel Takarua',
        categoryLabel: 'Boutique',
      }
    },
    category: 4,
    imageKey: 'HOTELS.TAKARUA',
    active: true,
  },
  {
    id: 'explora-rapa-nui',
    destinationId: 'isla-pascua',
    content: {
      es: {
        name: 'Explora Rapa Nui',
        categoryLabel: 'Lujo todo incluido',
      }
    },
    category: 5,
    imageKey: 'HOTELS.EXPLORA_RAPA_NUI',
    active: true,
  },
  {
    id: 'hotel-muelle-viejo',
    destinationId: 'puerto-madryn',
    content: {
      es: {
        name: 'Hotel Muelle Viejo',
      }
    },
    category: 3,
    imageKey: 'HOTELS.MUELLE_VIEJO',
    active: true,
  },
  {
    id: 'yene-hue',
    destinationId: 'puerto-madryn',
    content: {
      es: {
        name: 'Yene Hue',
      }
    },
    category: 4,
    imageKey: 'HOTELS.YENE_HUE',
    active: true,
  },
  {
    id: 'hotel-territorio',
    destinationId: 'puerto-madryn',
    content: {
      es: {
        name: 'Hotel Territorio',
      }
    },
    category: 5,
    imageKey: 'HOTELS.TERRITORIO',
    active: true,
  },
  {
    id: 'hosteria-casa-eugenia-san-martin',
    destinationId: 'san-martin-de-los-andes',
    content: {
      es: {
        name: 'Hostería La Casa de Eugenia Boutique',
        categoryLabel: 'Boutique',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HOSTERIA_CASA_EUGENIA',
    active: true,
  },
  {
    id: 'hotel-poblado-kimal',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Hotel Poblado Kimal',
        categoryLabel: 'Boutique',
      }
    },
    category: 3,
    imageKey: 'HOTELS.POBLADO_KIMAL',
    active: true,
  },
  {
    id: 'cumbres-san-pedro',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Cumbres San Pedro de Atacama',
        categoryLabel: 'Superior',
      }
    },
    category: 4,
    imageKey: 'HOTELS.CUMBRES_SAN_PEDRO',
    active: true,
  },
  {
    id: 'tierra-atacama',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Tierra Atacama Hotel & Spa',
        categoryLabel: 'Lujo',
      }
    },
    category: 5,
    imageKey: 'HOTELS.TIERRA_ATACAMA',
    active: true,
  },
  {
    id: 'hotel-plaza-san-francisco-santiago',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Hotel Plaza San Francisco',
        categoryLabel: 'Superior',
      }
    },
    category: 3,
    imageKey: 'HOTELS.PLAZA_SAN_FRANCISCO',
    active: true,
  },
  {
    id: 'holiday-inn-santiago-airport',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Holiday Inn Santiago Airport',
        categoryLabel: 'Aeropuerto',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HOLIDAY_INN_SCL',
    active: true,
  },
  {
    id: 'cumbres-lastarria',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Cumbres Lastarria',
        categoryLabel: 'Boutique',
      }
    },
    category: 4,
    imageKey: 'HOTELS.CUMBRES_LASTARRIA',
    active: true,
  },
  {
    id: 'mandarin-oriental-santiago',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Mandarin Oriental Santiago',
        categoryLabel: 'Lujo',
      }
    },
    category: 5,
    imageKey: 'HOTELS.MANDARIN_ORIENTAL',
    active: true,
  },
  {
    id: 'altos-ushuaia',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Altos Ushuaia Hotel & Resto',
      }
    },
    category: 3,
    imageKey: 'HOTELS.ALTOS_USHUAIA',
    active: true,
  },
  {
    id: 'los-cauquenes',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Los Cauquenes Resort & Spa',
      }
    },
    category: 4,
    imageKey: 'HOTELS.LOS_CAUQUENES',
    active: true,
  },
  {
    id: 'arakur-ushuaia',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Arakur Ushuaia Resort & Spa',
      }
    },
    category: 5,
    imageKey: 'HOTELS.ARAKUR_USHUAIA',
    active: true,
  },
  {
    id: 'hotel-del-virrey-salta',
    destinationId: 'salta',
    content: {
      es: {
        name: 'Hotel Del Virrey',
        categoryLabel: 'Superior',
        description: 'Hotel céntrico de Salta con arquitectura colonial. Ubicado en el corazón de la ciudad, ideal para explorar el norte andino argentino.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HOTEL_DEL_VIRREY_SALTA',
    active: true,
  },
  {
    id: 'refugio-coquena-purmamarca',
    destinationId: 'purmamarca',
    content: {
      es: {
        name: 'El Refugio de Coquena',
        categoryLabel: 'Boutique',
        description: 'Hostería boutique en Purmamarca, al pie del Cerro de los Siete Colores. Arquitectura regional, atmósfera íntima y vistas únicas.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.REFUGIO_COQUENA_PURMAMARCA',
    active: true,
  },
  {
    id: 'esplendor-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Esplendor Buenos Aires',
        categoryLabel: 'Superior',
        description: 'Hotel 4 estrellas superior en el centro de Buenos Aires. Diseño contemporáneo en un edificio histórico, ideal como base para explorar la ciudad.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.ESPLENDOR_BUENOS_AIRES',
    active: true,
  },
  {
    id: 'huinid-obelisco-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Huinid Obelisco',
        categoryLabel: 'Superior',
        description: 'Hotel bien ubicado en el centro de Buenos Aires, a pasos del Obelisco. Cómodo punto de partida para descubrir la capital argentina.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HUINID_OBELISCO_BUENOS_AIRES',
    active: true,
  },
  {
    id: 'amerian-tucuman',
    destinationId: 'tucuman',
    content: {
      es: {
        name: 'Amerian Tucumán',
        categoryLabel: 'Superior',
        description: 'Hotel 4 estrellas en el centro de Tucumán. Servicios completos y ubicación estratégica para explorar el noroeste argentino.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.AMERIAN_TUCUMAN',
    active: true,
  },
  {
    id: 'vinas-cafayate-wine-resort',
    destinationId: 'cafayate',
    content: {
      es: {
        name: 'Viñas de Cafayate Wine Resort',
        categoryLabel: 'Resort',
        description: 'Resort vinícola en Cafayate, en los Valles Calchaquíes. Rodeado de viñedos, con piscina, spa y acceso directo a bodegas locales.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.VINAS_CAFAYATE_WINE_RESORT',
    active: true,
  },
  {
    id: 'hotel-salta',
    destinationId: 'salta',
    content: {
      es: {
        name: 'Hotel Salta',
        categoryLabel: 'Superior',
        description: 'Icónico hotel de estilo colonial en el centro histórico de Salta. Frente a la Plaza 9 de Julio, es un referente de la hospitalidad salteña.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.HOTEL_SALTA',
    active: true,
  },
  {
    id: 'la-comarca-purmamarca',
    destinationId: 'purmamarca',
    content: {
      es: {
        name: 'La Comarca',
        categoryLabel: 'Superior',
        description: 'Hotel de estilo regional en Purmamarca, rodeado de los paisajes coloridos de la Quebrada de Humahuaca. Diseño cálido y auténtico.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.LA_COMARCA_PURMAMARCA',
    active: true,
  },
  {
    id: 'cilene-del-faro-ushuaia',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Cilene del Faro Suites & Spa',
        categoryLabel: 'Suites & Spa',
        description: 'Suites de lujo en Ushuaia con vistas al Canal Beagle y la Cordillera de los Andes. Spa y restaurante para disfrutar del Fin del Mundo con comodidad.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.CILENE_DEL_FARO_USHUAIA',
    active: true,
  },
  {
    id: 'mirador-del-lago-el-calafate',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Mirador del Lago Hotel',
        categoryLabel: 'Superior',
        description: 'Hotel con vistas al Lago Argentino en El Calafate. Diseño patagónico, excelente ubicación para acceder al Glaciar Perito Moreno.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.MIRADOR_DEL_LAGO_EL_CALAFATE',
    active: true,
  },
  {
    id: 'hotel-saint-george-iguazu',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Hotel Saint George',
        categoryLabel: 'Superior',
        description: 'Hotel 3 estrellas superior en Puerto Iguazú, a pocos minutos del Parque Nacional Iguazú. Cómodo y bien ubicado para disfrutar las cataratas.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HOTEL_SAINT_GEORGE_IGUAZU',
    active: true,
  },
  {
    id: 'hotel-dora-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Hotel Dorá',
        categoryLabel: 'Superior',
        description: 'Hotel céntrico en Buenos Aires con buena relación calidad-precio. Ideal como última noche antes del vuelo de regreso.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HOTEL_DORA_BUENOS_AIRES',
    active: true,
  },
  {
    id: 'pullman-santiago-vitacura',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Pullman Santiago Vitacura',
        categoryLabel: 'Superior',
        description: 'Hotel moderno de 20 pisos en la exclusiva comuna de Vitacura, frente al Club de Golf Los Leones y el Parque Bicentenario. Piscina, gimnasio, business center y habitaciones con aire acondicionado y vistas a los Andes.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.PULLMAN_SANTIAGO_VITACURA',
    active: true,
  },
  {
    id: 'nh-cordillera-mendoza',
    destinationId: 'mendoza',
    content: {
      es: {
        name: 'NH Cordillera',
        categoryLabel: 'Superior',
        description: 'Hotel de alta categoría en el microcentro de Mendoza, frente a una hermosa plaza y a pasos de la calle peatonal. Piscina en terraza con sol mendocino, sauna, restaurante con carta de vinos y habitaciones con sommier, aire acondicionado y frigobar.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.NH_CORDILLERA_MENDOZA',
    active: true,
  },
  {
    id: 'grand-brizo-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Grand Brizo Hotel',
        categoryLabel: 'Superior',
        description: 'Hotel de 192 habitaciones en el corazón de Buenos Aires, a metros del Obelisco. Con Wi-Fi, spa, gimnasio, room service y restaurante. Ideal para acceder a todos los puntos turísticos de la ciudad.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.GRAND_BRIZO_BUENOS_AIRES',
    active: true,
  },
  {
    id: 'own-montevideo',
    destinationId: 'montevideo',
    content: {
      es: {
        name: 'Own Montevideo',
        categoryLabel: 'Boutique',
        description: 'Boutique hotel de 44 habitaciones en Punta Carretas, con piscina climatizada y vistas al Río de la Plata. Restaurante exclusivo y servicio personalizado "Customize your Stay". 100 % libre de humo, a pasos del centro comercial y el campo de golf.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.OWN_MONTEVIDEO',
    active: true,
  },
  {
    id: 'hotel-britania-lima',
    destinationId: 'lima',
    content: {
      es: {
        name: 'Hotel Britania',
        categoryLabel: 'Superior',
        description: 'Hotel céntrico en Lima con habitaciones confortables, restaurante y servicio de calidad. Buena ubicación para explorar la ciudad.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HOTEL_BRITANIA_LIMA',
    active: true,
  },
  {
    id: 'dazzler-miraflores-lima',
    destinationId: 'lima',
    content: {
      es: {
        name: 'Dazzler by Wyndham Lima Miraflores',
        categoryLabel: 'Superior',
        description: 'Hotel de diseño contemporáneo en el corazón de Miraflores, a pasos del Parque del Amor y los acantilados del Pacífico. Habitaciones amplias con vistas panorámicas, restaurante gourmet y spa.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.DAZZLER_MIRAFLORES_LIMA',
    active: true,
  },
  {
    id: 'pullman-lima-miraflores',
    destinationId: 'lima',
    content: {
      es: {
        name: 'Pullman Lima Miraflores',
        categoryLabel: 'Lujo',
        description: 'Hotel de cinco estrellas en Miraflores con vistas al Océano Pacífico. Habitaciones de lujo, piscina exterior, spa y restaurante de cocina peruana de autor.',
      }
    },
    category: 5,
    imageKey: 'HOTELS.PULLMAN_LIMA_MIRAFLORES',
    active: true,
  },
  {
    id: 'el-condor-paracas',
    destinationId: 'paracas',
    content: {
      es: {
        name: 'El Cóndor — Vista al Jardín',
        categoryLabel: 'Superior',
        description: 'Hotel con jardines a orillas de la bahía de Paracas. Ambiente tranquilo ideal para descansar tras las excursiones por la reserva nacional.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.EL_CONDOR_PARACAS',
    active: true,
  },
  {
    id: 'casa-andina-select-paracas',
    destinationId: 'paracas',
    content: {
      es: {
        name: 'Casa Andina Select Paracas',
        categoryLabel: 'Superior',
        description: 'Resort frente al mar en Paracas con habitaciones luminosas, piscina y acceso privado a la playa. La cadena peruana de referencia con su carácter local y servicios de primera.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.CASA_ANDINA_SELECT_PARACAS',
    active: true,
  },
  {
    id: 'la-hacienda-paracas',
    destinationId: 'paracas',
    content: {
      es: {
        name: 'La Hacienda Bahía Paracas',
        categoryLabel: 'Lujo',
        description: 'Elegante resort de lujo a orillas de la bahía, con habitaciones frente al mar, piscina infinita, spa y restaurante de mariscos frescos. En categorías superiores, el embarque a Islas Ballestas sale desde el propio hotel.',
      }
    },
    category: 5,
    imageKey: 'HOTELS.LA_HACIENDA_PARACAS',
    active: true,
  },
  {
    id: 'majestad-arequipa',
    destinationId: 'arequipa',
    content: {
      es: {
        name: 'Majestad Arequipa Boutique Hotel',
        categoryLabel: 'Boutique',
        description: 'Encantador hotel boutique en el centro histórico de Arequipa, construido en sillar volcánico. Ambiente íntimo, patio interior y ubicación privilegiada.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.MAJESTAD_AREQUIPA',
    active: true,
  },
  {
    id: 'san-agustin-posada-monasterio-arequipa',
    destinationId: 'arequipa',
    content: {
      es: {
        name: 'San Agustín Posada del Monasterio',
        categoryLabel: 'Superior',
        description: 'Hotel de cuatro estrellas instalado en un edificio histórico del centro de Arequipa, frente al Convento de Santa Catalina. Habitaciones con encanto colonial y excelente cocina arequipeña.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.SAN_AGUSTIN_POSADA_MONASTERIO',
    active: true,
  },
  {
    id: 'costa-del-sol-wyndham-arequipa',
    destinationId: 'arequipa',
    content: {
      es: {
        name: 'Costa del Sol Wyndham Arequipa',
        categoryLabel: 'Lujo',
        description: 'Hotel de cinco estrellas en el centro histórico de Arequipa con habitaciones de lujo, spa, piscina climatizada y restaurante de cocina nueva andina. Vistas al volcán Misti desde sus terrazas.',
      }
    },
    category: 5,
    imageKey: 'HOTELS.COSTA_DEL_SOL_WYNDHAM_AREQUIPA',
    active: true,
  },
  {
    id: 'pozo-del-cielo-colca',
    destinationId: 'canon-del-colca',
    content: {
      es: {
        name: 'Pozo del Cielo',
        categoryLabel: 'Superior',
        description: 'Hotel acogedor en Chivay, puerta del Cañón del Colca. Ambiente familiar y cálido, restaurante con cocina local y acceso a las termas de La Calera.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.POZO_DEL_CIELO_COLCA',
    active: true,
  },
  {
    id: 'el-refugio-colca',
    destinationId: 'canon-del-colca',
    content: {
      es: {
        name: 'El Refugio',
        categoryLabel: 'Superior',
        description: 'Hotel de montaña a orillas del río Colca con termas propias, habitaciones confortables y restaurante con productos locales. El entorno natural y las termas hacen de este alojamiento un oasis andino.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.EL_REFUGIO_COLCA',
    active: true,
  },
  {
    id: 'colca-lodge-spa',
    destinationId: 'canon-del-colca',
    content: {
      es: {
        name: 'Colca Lodge Spa & Hot Springs',
        categoryLabel: 'Lujo',
        description: 'El alojamiento más exclusivo del cañón, ubicado directamente sobre el río Colca. Bungalows con termas privadas alimentadas por aguas termales naturales, spa, restaurante gourmet y vistas espectaculares al cañón.',
      }
    },
    category: 5,
    imageKey: 'HOTELS.COLCA_LODGE_SPA',
    active: true,
  },
  {
    id: 'la-hacienda-plaza-armas-puno',
    destinationId: 'puno',
    content: {
      es: {
        name: 'La Hacienda Plaza de Armas',
        categoryLabel: 'Superior',
        description: 'Hotel colonial en plena Plaza de Armas de Puno. Vista directa al lago Titicaca desde sus habitaciones superiores, restaurante con cocina altiplánica y ambiente acogedor.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.LA_HACIENDA_PUNO',
    active: true,
  },
  {
    id: 'jose-antonio-puno',
    destinationId: 'puno',
    content: {
      es: {
        name: 'José Antonio Puno',
        categoryLabel: 'Superior',
        description: 'Hotel de referencia en Puno con habitaciones amplias y confortables, restaurante con cocina peruana, bar y servicio atento. Excelente ubicación para los embarcaderos del Titicaca.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.JOSE_ANTONIO_PUNO',
    active: true,
  },
  {
    id: 'casa-andina-premium-puno',
    destinationId: 'puno',
    content: {
      es: {
        name: 'Casa Andina Premium Puno',
        categoryLabel: 'Lujo',
        description: 'Hotel premium frente al lago Titicaca con habitaciones de lujo con vista al lago, restaurante de gastronomía andina, spa y servicio impecable. La mejor experiencia de alojamiento en el altiplano peruano.',
      }
    },
    category: 5,
    imageKey: 'HOTELS.CASA_ANDINA_PREMIUM_PUNO',
    active: true,
  },
  {
    id: 'san-agustin-internacional-cusco',
    destinationId: 'cusco',
    content: {
      es: {
        name: 'San Agustín Internacional Cusco',
        categoryLabel: 'Superior',
        description: 'Hotel bien ubicado en el centro histórico de Cusco, a pasos de la Plaza de Armas. Habitaciones cómodas con calefacción, restaurante y servicio atento a la altitud.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.SAN_AGUSTIN_INTERNACIONAL_CUSCO',
    active: true,
  },
  {
    id: 'san-agustin-el-dorado-cusco',
    destinationId: 'cusco',
    content: {
      es: {
        name: 'San Agustín El Dorado Cusco',
        categoryLabel: 'Superior',
        description: 'Hotel de cuatro estrellas en el corazón de Cusco con habitaciones elegantes, restaurante de cocina novoandina, bar y sala de estar con chimenea. A metros de la Plaza de Armas y el Koricancha.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.SAN_AGUSTIN_EL_DORADO_CUSCO',
    active: true,
  },
  {
    id: 'casa-andina-premium-cusco',
    destinationId: 'cusco',
    content: {
      es: {
        name: 'Casa Andina Premium Cusco',
        categoryLabel: 'Lujo',
        description: 'Instalado en una joya colonial del siglo XVII en pleno centro histórico, este hotel de lujo ofrece habitaciones con mobiliario artesanal, spa andino, restaurante de cocina de autor y una de las mejores ubicaciones de Cusco.',
      }
    },
    category: 5,
    imageKey: 'HOTELS.CASA_ANDINA_PREMIUM_CUSCO',
    active: true,
  },
  {
    id: 'flowers-house-machupicchu',
    destinationId: 'machu-picchu',
    content: {
      es: {
        name: 'Flowers House Machupicchu',
        categoryLabel: 'Superior',
        description: 'Hotel acogedor en Aguas Calientes, a pasos de la estación de tren y del bus hacia Machu Picchu. Ambiente tranquilo, desayuno incluido y trato familiar.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.FLOWERS_HOUSE_MACHUPICCHU',
    active: true,
  },
  {
    id: 'el-mapi-machupicchu',
    destinationId: 'machu-picchu',
    content: {
      es: {
        name: 'El Mapi by Inkaterra',
        categoryLabel: 'Superior',
        description: 'Moderno hotel urbano de Inkaterra en Aguas Calientes con diseño contemporáneo que dialoga con el entorno selvático. Restaurante de cocina peruana, zona de spa y acceso privilegiado al pueblo y sus termas.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.EL_MAPI_MACHUPICCHU',
    active: true,
  },
  {
    id: 'sumaq-machu-picchu',
    destinationId: 'machu-picchu',
    content: {
      es: {
        name: 'Sumaq Machu Picchu Hotel',
        categoryLabel: 'Lujo',
        description: 'El hotel de cinco estrellas más exclusivo de Aguas Calientes, con habitaciones de lujo con vistas al río Urubamba y a la montaña. Spa con tratamientos andinos, restaurante gourmet y la cercanía más privilegiada a la ciudadela inca.',
      }
    },
    category: 5,
    imageKey: 'HOTELS.SUMAQ_MACHU_PICCHU',
    active: true,
  },
  {
    id: 'san-agustin-urubamba-spa',
    destinationId: 'valle-sagrado',
    content: {
      es: {
        name: 'San Agustín Urubamba & Spa',
        categoryLabel: 'Superior',
        description: 'Hotel & spa en el Valle Sagrado rodeado de jardines andinos y vistas a las montañas. Habitaciones amplias, piscina y spa con tratamientos con plantas medicinales del Valle.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.SAN_AGUSTIN_URUBAMBA_SPA',
    active: true,
  },
  {
    id: 'hacienda-del-valle-sagrado',
    destinationId: 'valle-sagrado',
    content: {
      es: {
        name: 'Hacienda del Valle',
        categoryLabel: 'Superior',
        description: 'Encantadora hacienda histórica en el corazón del Valle Sagrado, entre Urubamba y Ollantaytambo. Jardines andinos, caballos, restaurante con productos de huerto propio y una atmósfera de total serenidad.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.HACIENDA_DEL_VALLE_SAGRADO',
    active: true,
  },
  {
    id: 'inkaterra-hacienda-urubamba',
    destinationId: 'valle-sagrado',
    content: {
      es: {
        name: 'Inkaterra Hacienda Urubamba',
        categoryLabel: 'Lujo',
        description: 'Refugio de lujo sostenible en el Valle Sagrado con cabaña-casitas rodeadas de jardines botánicos. Spa con tratamientos ancestrales andinos, restaurante de cocina de autor con ingredientes del huerto y vistas a los Andes. La experiencia más especial del Valle.',
      }
    },
    category: 5,
    imageKey: 'HOTELS.INKATERRA_HACIENDA_URUBAMBA',
    active: true,
  },
  {
    id: 'nh-ciudad-de-santiago',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'NH Ciudad de Santiago',
        categoryLabel: 'Superior',
        description: 'Hotel de diseño contemporáneo en la comuna de Providencia, ideal para explorar Santiago. Habitaciones espaciosas decoradas con elegancia, restaurante, gimnasio y varios salones de reuniones. A pasos del metro y los mejores restaurantes de la ciudad.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.NH_CIUDAD_DE_SANTIAGO',
    active: true,
  },
  {
    id: 'altiplanico-sur-puerto-natales',
    destinationId: 'puerto-natales',
    content: {
      es: {
        name: 'Altiplánico Sur',
        categoryLabel: 'Superior',
        description: 'Hotel de diseño patagónico a 1,2 km de Puerto Natales con vistas al Seno de Última Esperanza y al Glaciar Balmaceda. Arquitectura que se mimetiza con la naturaleza del entorno, habitaciones acogedoras y la Patagonia como telón de fondo a una hora de Torres del Paine.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.ALTIPLANICO_SUR_PUERTO_NATALES',
    active: true,
  },
  {
    id: 'costaustralis-puerto-natales',
    destinationId: 'puerto-natales',
    content: {
      es: {
        name: 'Hotel Costaustralis',
        categoryLabel: 'Superior',
        description: 'Hotel de arquitectura elegante y céntrica ubicación en Puerto Natales, con vistas impresionantes a las montañas y fiordos. Habitaciones cómodas, desayuno buffet y servicio de primera categoría para explorar la Patagonia y Torres del Paine.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.COSTAUSTRALIS_PUERTO_NATALES',
    active: true,
  },
  {
    id: 'cabana-del-lago-puerto-varas',
    destinationId: 'puerto-varas',
    content: {
      es: {
        name: 'Cabaña del Lago — Hotel Sustentable',
        categoryLabel: 'Superior',
        description: 'Hotel ícono de Puerto Varas a orillas del Lago Llanquihue con vistas a los volcanes Osorno y Calbuco. Piscina climatizada, tinas calientes y sala de juegos. Comprometido con la sostenibilidad: reciclaje, energías renovables y apoyo a emprendedores locales.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.CABANA_DEL_LAGO_PUERTO_VARAS',
    active: true,
  },
  {
    id: 'solace-puerto-varas',
    destinationId: 'puerto-varas',
    content: {
      es: {
        name: 'Solace Hotel Puerto Varas',
        categoryLabel: 'Superior',
        description: 'Hotel acogedor en el corazón de Puerto Varas que transmite la auténtica hospitalidad del sur de Chile. Habitaciones diseñadas para conectar con la naturaleza del entorno, con el Lago Llanquihue como referencia constante.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.SOLACE_PUERTO_VARAS',
    active: true,
  },
  {
    id: 'casa-solcor-san-pedro',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Casa Solcor',
        categoryLabel: 'Boutique',
        description: 'Encantador bed & breakfast boutique en el Ayllu de Solcor, en el corazón del desierto de Atacama. Habitaciones con baño privado, calefacción y patio exclusivo. Jardines para contemplar el cielo estrellado, piscina y desayuno con sabores locales.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.CASA_SOLCOR_SAN_PEDRO',
    active: true,
  },
  {
    id: 'hilton-garden-inn-aeropuerto-santiago',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Hilton Garden Inn Aeropuerto Santiago',
        categoryLabel: 'Superior',
        description: 'Hotel a 5 minutos del aeropuerto Internacional Arturo Merino Benítez y a 20 minutos del centro. Habitaciones con camas Garden Sleep, piscina, sauna, gimnasio y restaurante. La opción más eficiente para noches de tránsito entre vuelos en Santiago.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HILTON_GARDEN_INN_AEROPUERTO',
    active: true,
  },
  {
    id: 'altiplanico-rapa-nui',
    destinationId: 'isla-pascua',
    content: {
      es: {
        name: 'Altiplánico Rapa Nui',
        categoryLabel: 'Superior',
        description: 'Hotel original diseñado en el estilo de una casa bote rapanui tradicional, en 1,5 hectáreas con vistas panorámicas a la costa de Isla de Pascua. Habitaciones con terraza privada para contemplar el Pacífico y un entorno que conecta con la esencia más auténtica de Rapa Nui.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.ALTIPLANICO_RAPA_NUI',
    active: true,
  },
  {
    id: 'hare-nua-rapa-nui',
    destinationId: 'isla-pascua',
    content: {
      es: {
        name: 'Hare Nua',
        categoryLabel: 'Boutique',
        description: 'Alojamiento acogedor construido en 1960 en la avenida principal de Hanga Roa, una de las pocas casas originales de la isla que conserva sus características nativas. Ubicación privilegiada a pasos del mar, restaurantes y del comercio local de Rapa Nui.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.HARE_NUA_RAPA_NUI',
    active: true,
  },
  {
    id: 'hotel-cosmopolitano-santa-cruz',
    destinationId: 'santa-cruz',
    content: {
      es: {
        name: 'Hotel Cosmopolitano',
        categoryLabel: 'Superior',
        description: 'Hotel céntrico en Santa Cruz de la Sierra, a pasos de la Plaza 24 de Septiembre. Habitaciones con aire acondicionado, piscina y restaurante. Punto de partida natural para los circuitos por Bolivia oriental.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.COSMOPOLITANO_SANTA_CRUZ',
    active: true,
  },
  {
    id: 'hotel-independencia-sucre',
    destinationId: 'sucre',
    content: {
      es: {
        name: 'Hotel Independencia',
        categoryLabel: 'Superior',
        description: 'Hotel en el centro histórico de Sucre, la ciudad blanca. Habitaciones confortables, desayuno incluido y trato cálido. A pocos minutos a pie de la Plaza Principal y los principales atractivos coloniales de la capital constitucional de Bolivia.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.INDEPENDENCIA_SUCRE',
    active: true,
  },
  {
    id: 'samay-wasi-uyuni',
    destinationId: 'uyuni',
    content: {
      es: {
        name: 'Samay Wasi',
        categoryLabel: 'Superior',
        description: 'Hotel de referencia en Uyuni para los circuitos por el Salar. Habitaciones sencillas y funcionales, desayuno incluido y servicio atento. Ubicación céntrica para gestionar traslados y excursiones al Salar y la Reserva Eduardo Avaroa.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.SAMAY_WASI_UYUNI',
    active: true,
  },
  {
    id: 'tayka-del-desierto',
    destinationId: 'ojo-de-perdiz',
    content: {
      es: {
        name: 'Tayka del Desierto',
        categoryLabel: 'Boutique',
        description: 'Hotel de la cadena Tayka construido con materiales del altiplano en pleno Lípez. Habitaciones cálidas a más de 4.500 metros, cenas incluidas para los grupos en circuito. La única opción de alojamiento en el camino entre las lagunas de colores y el Salar de Uyuni.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.TAYKA_DEL_DESIERTO',
    active: true,
  },
  {
    id: 'tayka-de-piedra',
    destinationId: 'san-pedro-quemez',
    content: {
      es: {
        name: 'Tayka de Piedra',
        categoryLabel: 'Boutique',
        description: 'Hotel de la cadena Tayka en San Pedro de Quemez, construido en piedra volcánica del altiplano. Cenas incluidas para los grupos en circuito. Base de partida hacia el Salar de Uyuni y la Isla Incahuasi al día siguiente.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.TAYKA_DE_PIEDRA',
    active: true,
  },
  {
    id: 'apart-hotel-ritz-la-paz',
    destinationId: 'la-paz',
    content: {
      es: {
        name: 'Apart Hotel Ritz',
        categoryLabel: 'Superior',
        description: 'Apart-hotel en La Paz con habitaciones amplias y equipadas. Buena ubicación en la zona de Miraflores, con acceso cómodo al centro histórico y los puntos de interés de la ciudad. Desayuno incluido.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.APART_HOTEL_RITZ_LA_PAZ',
    active: true,
  },
  {
    id: 'jacha-inti-hostal',
    destinationId: 'isla-del-sol',
    content: {
      es: {
        name: 'Jacha Inti Hostal',
        categoryLabel: 'Hostal',
        description: 'Alojamiento familiar en la Isla del Sol, accesible a pie desde el embarcadero. Habitaciones sencillas con vistas al Lago Titicaca. Cena incluida para los grupos en circuito. Sin electricidad permanente ni agua caliente en todas las habitaciones — así es la isla.',
      }
    },
    category: 3,
    imageKey: 'HOTELS.JACHA_INTI_HOSTAL',
    active: true,
  },
  {
    id: 'hotel-eco-chairu-santa-cruz',
    destinationId: 'santa-cruz',
    content: {
      es: {
        name: 'Hotel Eco Chairu',
        categoryLabel: 'Superior',
        description: 'Hotel de cuatro estrellas a orillas del río Piraí, en zona residencial de Santa Cruz. Habitaciones espaciosas, piscina exterior, restaurante y jardines tropicales. Alternativa superior para quienes prefieren un entorno tranquilo fuera del centro.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.ECO_CHAIRU_SANTA_CRUZ',
    active: true,
  },
  {
    id: 'villa-antigua-sucre',
    destinationId: 'sucre',
    content: {
      es: {
        name: 'Villa Antigua',
        categoryLabel: 'Boutique',
        description: 'Hotel boutique en una casona colonial restaurada en el corazón de Sucre. Patio interior con vegetación, habitaciones con carácter histórico y desayuno en terraza. A minutos de la Plaza Principal.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.VILLA_ANTIGUA_SUCRE',
    active: true,
  },
  {
    id: 'jardines-de-uyuni',
    destinationId: 'uyuni',
    content: {
      es: {
        name: 'Jardines de Uyuni',
        categoryLabel: 'Superior',
        description: 'Hotel de cuatro estrellas en Uyuni con habitaciones cómodas, jardín interior y buena relación calidad-precio para la categoría superior. Desayuno incluido y servicio atento para los viajeros del circuito del Salar.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.JARDINES_DE_UYUNI',
    active: true,
  },
  {
    id: 'hotel-europa-la-paz',
    destinationId: 'la-paz',
    content: {
      es: {
        name: 'Hotel Europa',
        categoryLabel: 'Superior',
        description: 'Hotel clásico en el centro de La Paz con más de cien años de historia. Habitaciones amplias, restaurante con cocina boliviana e internacional, y ubicación ideal para explorar la ciudad a pie. Referencia de hospitalidad en la capital boliviana.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.EUROPA_LA_PAZ',
    active: true,
  },
  {
    id: 'winay-inti-lodge',
    destinationId: 'isla-del-sol',
    content: {
      es: {
        name: 'Wiñay Inti Lodge',
        categoryLabel: 'Superior',
        description: 'Lodge superior en la Isla del Sol con vistas panorámicas al Lago Titicaca. Habitaciones con baño privado, terraza y cenas incluidas para los grupos en circuito. La mejor opción de alojamiento disponible en la isla.',
      }
    },
    category: 4,
    imageKey: 'HOTELS.WINAY_INTI_LODGE',
    active: true,
  },
]

export default hotels
