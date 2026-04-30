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
}

const countries: Country[] = [
  {
    id: 'argentina',
    slug: 'argentina',
    content: {
      es: {
        name: 'Argentina',
        description: 'Argentina es mucho más que un país, es una experiencia. Sus majestuosos glaciares, las Cataratas del Iguazú, la vibrante Buenos Aires y la inmensidad de la Patagonia te dejarán sin palabras.',
        heroAlt: 'El Chaltén, Patagonia argentina',
        metaTitle: 'Viajes a Argentina — Viajes Vidaia',
        metaDescription: 'Desde las Cataratas del Iguazú hasta el Fin del Mundo. Diseñamos tu aventura argentina a medida: Patagonia, Buenos Aires, Iguazú, glaciares y más.',
      }
    },
    flag: '🇦🇷',
    flagCode: 'ar',
    heroImageKey: 'COUNTRIES.ARGENTINA_HERO',
    active: true,
    order: 1,
  },
  {
    id: 'chile',
    slug: 'chile',
    content: {
      es: {
        name: 'Chile',
        description: 'Chile es uno de los países más diversos del mundo, con paisajes que van del desierto más árido al hielo eterno de la Patagonia.',
        heroAlt: 'Torres del Paine, Chile',
        metaTitle: 'Viajes a Chile — Viajes Vidaia',
        metaDescription: 'Atacama, Torres del Paine, Isla de Pascua y la Carretera Austral. Diseñamos tu viaje a Chile a medida.',
      }
    },
    flag: '🇨🇱',
    flagCode: 'cl',
    heroImageKey: 'COUNTRIES.CHILE_HERO',
    active: true,
    order: 2,
  },
  {
    id: 'bolivia',
    slug: 'bolivia',
    content: {
      es: {
        name: 'Bolivia',
        description: 'Bolivia guarda algunos de los paisajes más sorprendentes de Sudamérica: el mayor desierto de sal del mundo, ciudades coloniales y una cultura viva que te dejará sin palabras.',
        heroAlt: 'Salar de Uyuni, Bolivia',
        metaTitle: 'Viajes a Bolivia — Viajes Vidaia',
        metaDescription: 'Salar de Uyuni, La Paz, Sucre y el Lago Titicaca. Diseñamos tu viaje a Bolivia a medida.',
      }
    },
    flag: '🇧🇴',
    flagCode: 'bo',
    heroImageKey: 'COUNTRIES.BOLIVIA_HERO',
    active: true,
    order: 3,
  },
  {
    id: 'peru',
    slug: 'peru',
    content: {
      es: {
        name: 'Perú',
        description: 'Perú guarda algunos de los paisajes más sorprendentes de Sudamérica: Machu Pichu y el Valle Sagrado, el Amazonas y la Cordillera Blanca.',
        heroAlt: 'Machi Pichu, Perú',
        metaTitle: 'Viajes a Perú — Viajes Vidaia',
        metaDescription: 'Lima, Cuzco y el Valle Sagrado, Arequipa, Machi Pichu y el Amazonas. Diseñamos tu viaje a Perú a medida.',
      }
    },
    flag: 'PE',
    flagCode: 'pe',
    heroImageKey: 'COUNTRIES.PERU_HERO',
    active: true,
    order: 4,
  }
]

export default countries
