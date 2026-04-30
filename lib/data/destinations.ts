export type Country = 'argentina' | 'chile' | 'bolivia'

export interface DestinationContent {
  name: string
  description: string
}

export interface Destination {
  id: string
  slug: string
  country: Country
  content: {
    es: DestinationContent
    en?: DestinationContent
  }
  imageKey: string
  active: boolean
}

const destinations: Destination[] = [
  // ── Argentina ────────────────────────────────────────────────────────────────
  {
    id: 'buenos-aires',
    slug: 'buenos-aires',
    country: 'argentina',
    content: {
      es: {
        name: 'Buenos Aires',
        description: 'Tango, Teatro Colón, San Telmo, La Boca, Recoleta, Palermo y Puerto Madero.',
      }
    },
    imageKey: 'DESTINATIONS.BUENOS_AIRES',
    active: true,
  },
  {
    id: 'iguazu',
    slug: 'iguazu',
    country: 'argentina',
    content: {
      es: {
        name: 'Iguazú',
        description: 'Las cataratas más impresionantes del mundo, declaradas Patrimonio de la Humanidad.',
      }
    },
    imageKey: 'DESTINATIONS.IGUAZU',
    active: true,
  },
  {
    id: 'peninsula-valdes',
    slug: 'peninsula-valdes',
    country: 'argentina',
    content: {
      es: {
        name: 'Península de Valdés',
        description: 'Reserva natural Patrimonio de la Humanidad: ballenas francas australes, elefantes y lobos marinos.',
      }
    },
    imageKey: 'DESTINATIONS.PENINSULA_VALDES',
    active: true,
  },
  {
    id: 'puerto-madryn',
    slug: 'puerto-madryn',
    country: 'argentina',
    content: {
      es: {
        name: 'Puerto Madryn',
        description: 'Puerta de entrada a la Península Valdés y la Patagonia atlántica.',
      }
    },
    imageKey: 'DESTINATIONS.PUERTO_MADRYN',
    active: true,
  },
  {
    id: 'el-calafate',
    slug: 'el-calafate',
    country: 'argentina',
    content: {
      es: {
        name: 'El Calafate',
        description: 'Puerta al Parque Nacional Los Glaciares y al imponente Glaciar Perito Moreno.',
      }
    },
    imageKey: 'DESTINATIONS.EL_CALAFATE',
    active: true,
  },
  {
    id: 'ushuaia',
    slug: 'ushuaia',
    country: 'argentina',
    content: {
      es: {
        name: 'Ushuaia',
        description: 'El Fin del Mundo entre el Canal Beagle y la Sierra del Martial.',
      }
    },
    imageKey: 'DESTINATIONS.USHUAIA',
    active: true,
  },
  {
    id: 'salta',
    slug: 'salta',
    country: 'argentina',
    content: {
      es: {
        name: 'Salta',
        description: 'La ciudad de los balcones floridos, puerta al norte argentino y los valles andinos.',
      }
    },
    imageKey: 'DESTINATIONS.SALTA',
    active: true,
  },
  {
    id: 'jujuy',
    slug: 'jujuy',
    country: 'argentina',
    content: {
      es: {
        name: 'Jujuy',
        description: 'Quebrada de Humahuaca, Salinas Grandes y los coloridos cerros de la Puna.',
      }
    },
    imageKey: 'DESTINATIONS.JUJUY',
    active: true,
  },
  // ── Chile ────────────────────────────────────────────────────────────────────
  {
    id: 'torres-del-paine',
    slug: 'torres-del-paine',
    country: 'chile',
    content: {
      es: {
        name: 'Torres del Paine',
        description: 'Parque Nacional con glaciares, torres de granito y lagos de colores imposibles.',
      }
    },
    imageKey: 'DESTINATIONS.TORRES_DEL_PAINE',
    active: true,
  },
  {
    id: 'atacama',
    slug: 'atacama',
    country: 'chile',
    content: {
      es: {
        name: 'Desierto de Atacama',
        description: 'El desierto más árido del mundo: géiseres, lagunas altiplánicas y cielos estrellados.',
      }
    },
    imageKey: 'DESTINATIONS.ATACAMA',
    active: false,
  },
  {
    id: 'santiago-chile',
    slug: 'santiago-chile',
    country: 'chile',
    content: {
      es: {
        name: 'Santiago de Chile',
        description: 'Capital cosmopolita de Chile, rodeada por los Andes y puerta de entrada a las viñas del valle central.',
      }
    },
    imageKey: 'DESTINATIONS.SANTIAGO',
    active: true,
  },
  {
    id: 'san-pedro-atacama',
    slug: 'san-pedro-atacama',
    country: 'chile',
    content: {
      es: {
        name: 'San Pedro de Atacama',
        description: 'Pueblo de adobe en el desierto más árido del mundo. Salares, géiseres, lagunas altiplánicas y cielos infinitos.',
      }
    },
    imageKey: 'DESTINATIONS.SAN_PEDRO_ATACAMA',
    active: true,
  },
  {
    id: 'isla-pascua',
    slug: 'isla-pascua',
    country: 'chile',
    content: {
      es: {
        name: 'Isla de Pascua (Rapa Nui)',
        description: 'La isla habitada más remota del planeta, cuna de los moáis y la enigmática cultura Rapa Nui.',
      }
    },
    imageKey: 'DESTINATIONS.ISLA_PASCUA',
    active: true,
  },
  // ── Bolivia ──────────────────────────────────────────────────────────────────
  {
    id: 'uyuni',
    slug: 'uyuni',
    country: 'bolivia',
    content: {
      es: {
        name: 'Salar de Uyuni',
        description: 'El mayor desierto de sal del mundo, un espejo natural que refleja el cielo.',
      }
    },
    imageKey: 'DESTINATIONS.UYUNI',
    active: false,
  },
  {
    id: 'la-paz',
    slug: 'la-paz',
    country: 'bolivia',
    content: {
      es: {
        name: 'La Paz',
        description: 'La ciudad más alta del mundo, con el Mercado de las Brujas y el teleférico urbano.',
      }
    },
    imageKey: 'DESTINATIONS.LA_PAZ',
    active: false,
  },
]

export default destinations

