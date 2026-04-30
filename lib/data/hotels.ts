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
  // ── Iguazú ───────────────────────────────────────────────────────────────────
  {
    id: 'city-falls-iguazu',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'City Falls Iguazú',
        categoryLabel: 'Superior',
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
  // ── Puerto Madryn ────────────────────────────────────────────────────────────
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
  // ── Buenos Aires ─────────────────────────────────────────────────────────────
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
  // ── El Calafate ──────────────────────────────────────────────────────────────
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
  // ── Ushuaia ──────────────────────────────────────────────────────────────────
  {
    id: 'altos-ushuaia',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Altos Ushuaia Hotel & Resto',
        categoryLabel: 'Superior',
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
  // Santiago — categoría 3, 4, 5
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
  // Santiago Aeropuerto (escalas)
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
  // San Pedro de Atacama
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
  // Isla de Pascua
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
]

export default hotels
