export interface CountryContent {
  name: string
  description: string
  heroAlt: string
  metaTitle: string
  metaDescription: string
}

export interface Country {
  id: string
  slug: string
  content: {
    es: CountryContent
    en?: CountryContent
  }
  flag: string
  flagCode: string
  heroImageKey: string
  active: boolean
  order: number
  lat: number
  lng: number
}

export type CountrySlug = 'argentina' | 'chile' | 'bolivia' | 'peru' | 'uruguay'

const countries: Country[] = [
  {
    id: 'argentina',
    slug: 'argentina',
    content: {
      es: {
        name: 'Argentina',
        description: 'Hasta que no conoces Argentina no descubres lo que cabe en un solo país: el norte y sus montañas de colores, la selva subtropical y las cataratas, los viñedos frente a la cordillera de Mendoza y Cafayate, los campos de piedra pómez de Catamarca, el Perito Moreno y los picos del Chaltén, la Península Valdés con sus ballenas, orcas y pingüinos. Y todavía quedaría mucho por contar. Argentina merece varios viajes, ¿te apetece alguna combinación inédita?',
        heroAlt: 'El Chaltén, Patagonia argentina',
        metaTitle: '',
        metaDescription: 'En Viajes Vidaia diseñamos viajes a Argentina completamente a medida: Patagonia, Ushuaia, Iguazú, Buenos Aires, Salta y mucho más.',
      }
    },
    flag: '🇦🇷',
    flagCode: 'ar',
    heroImageKey: 'COUNTRIES.ARGENTINA_HERO',
    active: true,
    order: 1,
    lat: -38.4161,
    lng: -63.6167,
  },
  {
    id: 'chile',
    slug: 'chile',
    content: {
      es: {
        name: 'Chile',
        description: 'Chile engaña en el mapa. Parece un hilo y resulta ser un mundo. Al norte, el Atacama; más abajo, valles con viñedos y la cordillera de fondo. Luego la Patagonia se despliega despacio: los lagos y los ríos de la Araucanía, los fiordos navegables, los glaciares del sur. Y cuando crees que ya lo entiendes, recuerdas que Chile también tiene una isla perdida en el Pacífico, con moais mirando al horizonte desde hace siglos. Chile es para vivirlo. ¿Por dónde quieres empezar?',
        heroAlt: 'Torres del Paine, Chile',
        metaTitle: '',
        metaDescription: 'En Viajes Vidaia diseñamos viajes a Chile personalizados: Atacama, Torres del Paine, Carretera Austral, Isla de Pascua y mucho más.',
      }
    },
    flag: '🇨🇱',
    flagCode: 'cl',
    heroImageKey: 'COUNTRIES.CHILE_HERO',
    active: true,
    order: 2,
    lat: -35.6751,
    lng: -71.543,
  },
  {
    id: 'bolivia',
    slug: 'bolivia',
    content: {
      es: {
        name: 'Bolivia',
        description: 'Bolivia te sorprenderá de una forma que no te esperas. Nunca olvidarás el amanecer en el Salar de Uyuni o la inmensidad del Altiplano, y te irás queriendo regresar a la Cordillera Real y al volcán Sajama, con los recuerdos de haber comido en los mercados de Sucre y Potosí, contando a tus amigos que no se pierdan las montañas de Samaipata o los cañones de Toro Toro. ¿Te gustaría que te preparáramos algo sorprendente?',
        heroAlt: 'Salar de Uyuni, Bolivia',
        metaTitle: '',
        metaDescription: 'En Viajes Vidaia diseñamos viajes a Bolivia personalizados: Salar de Uyuni, Samaipata, Sucre, La Paz, el Lago Titicaca y mucho más.',
      }
    },
    flag: '🇧🇴',
    flagCode: 'bo',
    heroImageKey: 'COUNTRIES.BOLIVIA_HERO',
    active: true,
    order: 3,
    lat: -16.2902,
    lng: -63.5887,
  },
  {
    id: 'peru',
    slug: 'peru',
    content: {
      es: {
        name: 'Perú',
        description: 'Perú tiene una profundidad histórica y natural que pocos países pueden igualar. Te llevaremos a Kuelap, la fortaleza perdida entre nubes, a Choquequirao, el Machu Picchu sin turistas, a Cajamarca y Arequipa. Al Amazonas desde Iquitos, a la reserva de Pacaya Samiria. A la Cordillera Blanca, con el Artesonraju y el Alpamayo, que para muchos son las montañas más bonitas del mundo. Y sí, también a Machu Picchu y al Valle Sagrado, que se merece cada uno de los viajeros que la visitan. Y si encima comes en un mercado local, Perú ya no te lo quita nadie. ¿Qué te gustaría probar?',
        heroAlt: 'Machu Picchu, Perú',
        metaTitle: '',
        metaDescription: 'En Viajes Vidaia diseñamos viajes a Perú completamente a medida: Machu Picchu, Cusco, Valle Sagrado, Arequipa, Huaraz, Iquitos y mucho más.',
      }
    },
    flag: '🇵🇪',
    flagCode: 'pe',
    heroImageKey: 'COUNTRIES.PERU_HERO',
    active: true,
    order: 4,
    lat: -9.19,
    lng: -75.0152,
  },
  {
    id: 'uruguay',
    slug: 'uruguay',
    content: {
      es: {
        name: 'Uruguay',
        description: 'Uruguay, el pequeño gran país del Cono Sur, sorprende con su vibrante capital Montevideo, su rambla frente al Río de la Plata y una floreciente tradición vitivinícola en valles como Canelones y Maldonado.',
        heroAlt: 'Montevideo, Uruguay',
        metaTitle: '',
        metaDescription: 'En Viajes Vidaia diseñamos viajes a Uruguay personalizados. Combinamos el destino con Argentina y Brasil. Montevideo, Colonia y mucho más.',
      }
    },
    flag: '🇺🇾',
    flagCode: 'uy',
    heroImageKey: 'COUNTRIES.URUGUAY_HERO',
    active: false,
    order: 5,
    lat: -32.5228,
    lng: -55.7658,
  }
]

export default countries
