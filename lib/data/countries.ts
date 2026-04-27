export interface Country {
  id: string
  slug: string
  name: string
  flag: string
  description: string
  heroImage: string
  heroAlt: string
  active: boolean
  order: number
  metaTitle: string
  metaDescription: string
  flagCode: string
}

const countries: Country[] = [
  {
    id: 'argentina',
    slug: 'argentina',
    name: 'Argentina',
    flag: '🇦🇷',
    flagCode: 'ar',
    description: 'Argentina es mucho más que un país, es una experiencia. Sus majestuosos glaciares, las Cataratas del Iguazú, la vibrante Buenos Aires y la inmensidad de la Patagonia te dejarán sin palabras.',
    heroImage: 'https://images.unsplash.com/photo-1610680224983-f9759ce81c7a?q=80&w=1920',
    heroAlt: 'El Chaltén, Patagonia argentina',
    active: true,
    order: 1,
    metaTitle: 'Viajes a Argentina — Viajes Vidaia',
    metaDescription: 'Desde las Cataratas del Iguazú hasta el Fin del Mundo. Diseñamos tu aventura argentina a medida: Patagonia, Buenos Aires, Iguazú, glaciares y más.',
  },
  {
    id: 'chile',
    slug: 'chile',
    name: 'Chile',
    flag: '🇨🇱',
    flagCode: 'cl',
    description: 'Chile es uno de los países más diversos del mundo, con paisajes que van del desierto más árido al hielo eterno de la Patagonia.',
    heroImage: 'https://images.unsplash.com/photo-1558517286-6b7b81953cb5?q=80&w=1920',
    heroAlt: 'Torres del Paine, Chile',
    active: true,
    order: 2,
    metaTitle: 'Viajes a Chile — Viajes Vidaia',
    metaDescription: 'Atacama, Torres del Paine, Isla de Pascua y la Carretera Austral. Diseñamos tu viaje a Chile a medida.',
  },
  {
    id: 'bolivia',
    slug: 'bolivia',
    name: 'Bolivia',
    flag: '🇧🇴',
    flagCode: 'bo',
    description: 'Bolivia guarda algunos de los paisajes más sorprendentes de Sudamérica: el mayor desierto de sal del mundo, ciudades coloniales y una cultura viva que te dejará sin palabras.',
    heroImage: 'https://images.unsplash.com/photo-1641234332283-af77dfe995c7?q=80&w=1920',
    heroAlt: 'Salar de Uyuni, Bolivia',
    active: true,
    order: 3,
    metaTitle: 'Viajes a Bolivia — Viajes Vidaia',
    metaDescription: 'Salar de Uyuni, La Paz, Sucre y el Lago Titicaca. Diseñamos tu viaje a Bolivia a medida.',
  }
]

export default countries
