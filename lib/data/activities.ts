export interface ActivityContent {
  name: string
  description: string
}

export interface Activity {
  id: string
  destinationId: string
  content: {
    es: ActivityContent
    en?: ActivityContent
  }
  duration?: string
  priceFrom?: number     // reference price when booked as optional add-on
  imageKey?: string
  active: boolean
}

const activities: Activity[] = [
  // ── Iguazú ───────────────────────────────────────────────────────────────────
  {
    id: 'cataratas-argentinas',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Cataratas Argentinas',
        description:
          'Visita al Parque Nacional Iguazú: Paseo Inferior (1.200 m), Paseo Superior (1.100 m) y Garganta del Diablo en tren ecológico. Incluye traslados y guía bilingüe.',
      }
    },
    duration: '8 horas · 07:20-16:00 hs',
    active: true,
  },
  {
    id: 'cataratas-brasilenas',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Cataratas Brasileñas',
        description: 'Visita al lado brasileño de las Cataratas con entradas incluidas. Una perspectiva diferente y espectacular.',
      }
    },
    duration: '6-8 horas',
    priceFrom: 78,
    active: true,
  },
  {
    id: 'gran-aventura-iguazu',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Gran Aventura',
        description: 'Recorrido en camión 4×4 por la selva y paseo en zodiac bajo las cataratas. Imprescindible para los amantes de la adrenalina.',
      }
    },
    duration: '3 horas',
    priceFrom: 90,
    active: true,
  },
  // ── Península de Valdés ──────────────────────────────────────────────────────
  {
    id: 'peninsula-valdes-ballenas',
    destinationId: 'peninsula-valdes',
    content: {
      es: {
        name: 'Excursión Península de Valdés y avistaje de ballena franca austral',
        description:
          'Ruta por el Istmo Carlos Ameghino, Puerto Pirámides y Caleta Valdés (elefantes marinos). Avistaje en catamarán. Incluye entrada reserva natural. Temporada: junio-diciembre.',
      }
    },
    duration: '10 horas · Salida 07:30 hs',
    active: true,
  },
  // ── Buenos Aires ─────────────────────────────────────────────────────────────
  {
    id: 'city-tour-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Visita de la ciudad de Buenos Aires con guía',
        description:
          'Floralis Genérica, Plaza de Mayo, La Boca, San Telmo, Palermo, Puerto Madero y Obelisco. Incluye guía de turismo y recogida en hoteles del centro.',
      }
    },
    duration: '3,5-4 horas · Tour AM · Recogida 09:00 hs',
    active: true,
  },
  {
    id: 'tango-show-la-ventana',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Espectáculo de Tango con cena en La Ventana',
        description:
          'Cena y show de tango en La Ventana (San Telmo). Incluye entrada, plato principal, postre y 1 botella de vino cada 2 personas.',
      }
    },
    duration: 'Cena 20:00-21:30 hs · Show 21:30-23:30 hs',
    priceFrom: 120,
    active: true,
  },
  // ── El Calafate ──────────────────────────────────────────────────────────────
  {
    id: 'perito-moreno-safari',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Glaciar Perito Moreno y Safari Náutico',
        description:
          'Pasarelas del Perito Moreno con vistas al frente del glaciar. Safari Náutico de 1 hora por el Lago Rico junto a la pared sur (60 m de altura). Incluye traslados y guía bilingüe.',
      }
    },
    duration: '8 horas · 09:00-17:00 hs',
    active: true,
  },
  {
    id: 'estancia-nibepo-aike',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Estancia Nibepo Aike — Día de campo patagónico',
        description:
          'Asado de cordero, mate y torta frita en estancia patagónica. Incluye traslados, almuerzo asado y 1 copa de vino o bebida sin alcohol.',
      }
    },
    duration: '8 horas · 08:30-16:30 hs',
    priceFrom: 195,
    active: true,
  },
  // ── Ushuaia ──────────────────────────────────────────────────────────────────
  {
    id: 'tierra-del-fuego-parque',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Parque Nacional Tierra del Fuego',
        description:
          'Tren del Fin del Mundo, Bahía Ensenada, Lago Acigami y Bahía Lapataia (fin de la Ruta Panamericana). Incluye guía y ticket del tren.',
      }
    },
    duration: '5 horas · Salida 08:00 hs',
    active: true,
  },
  {
    id: 'canal-beagle-navegacion',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Navegación Canal Beagle',
        description:
          'Recorrido de 30 km por el Canal Beagle. Incluye traslados, tasa portuaria y cafetería a bordo.',
      }
    },
    duration: '3 horas · 15:00-18:00 hs',
    active: true,
  },
  {
    id: 'catamaran-canal-beagle-tarde',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Catamarán Canal Beagle — Isla de Lobos (tarde)',
        description: 'Navegación exclusiva al atardecer hasta Isla de Lobos. Lobos y leones marinos en su hábitat natural.',
      }
    },
    duration: '2,5 horas · Tarde',
    priceFrom: 85,
    active: true,
  },
]

export default activities
