export type Country = 'argentina' | 'chile' | 'bolivia'

export interface Destination {
  id: string
  slug: string
  name: string
  country: Country
  description: string
  image: string
  active: boolean
}

const destinations: Destination[] = [
  // ── Argentina ────────────────────────────────────────────────────────────────
  {
    id: 'buenos-aires',
    slug: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'argentina',
    description: 'Tango, Teatro Colón, San Telmo, La Boca, Recoleta, Palermo y Puerto Madero.',
    image: 'https://images.unsplash.com/photo-1589993624-d5e0e6a27fd8?w=800&q=80',
    active: true,
  },
  {
    id: 'iguazu',
    slug: 'iguazu',
    name: 'Iguazú',
    country: 'argentina',
    description: 'Las cataratas más impresionantes del mundo, declaradas Patrimonio de la Humanidad.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    active: true,
  },
  {
    id: 'peninsula-valdes',
    slug: 'peninsula-valdes',
    name: 'Península de Valdés',
    country: 'argentina',
    description: 'Reserva natural Patrimonio de la Humanidad: ballenas francas australes, elefantes y lobos marinos.',
    image: 'https://images.unsplash.com/photo-1499343628900-f45a080d42d4?w=800&q=80',
    active: true,
  },
  {
    id: 'puerto-madryn',
    slug: 'puerto-madryn',
    name: 'Puerto Madryn',
    country: 'argentina',
    description: 'Puerta de entrada a la Península Valdés y la Patagonia atlántica.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    active: true,
  },
  {
    id: 'el-calafate',
    slug: 'el-calafate',
    name: 'El Calafate',
    country: 'argentina',
    description: 'Puerta al Parque Nacional Los Glaciares y al imponente Glaciar Perito Moreno.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    active: true,
  },
  {
    id: 'ushuaia',
    slug: 'ushuaia',
    name: 'Ushuaia',
    country: 'argentina',
    description: 'El Fin del Mundo entre el Canal Beagle y la Sierra del Martial.',
    image: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=800&q=80',
    active: true,
  },
  {
    id: 'salta',
    slug: 'salta',
    name: 'Salta',
    country: 'argentina',
    description: 'La ciudad de los balcones floridos, puerta al norte argentino y los valles andinos.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    active: true,
  },
  {
    id: 'jujuy',
    slug: 'jujuy',
    name: 'Jujuy',
    country: 'argentina',
    description: 'Quebrada de Humahuaca, Salinas Grandes y los coloridos cerros de la Puna.',
    image: 'https://images.unsplash.com/photo-1583309219338-a582f1db9a62?w=800&q=80',
    active: true,
  },
  // ── Chile ────────────────────────────────────────────────────────────────────
  {
    id: 'torres-del-paine',
    slug: 'torres-del-paine',
    name: 'Torres del Paine',
    country: 'chile',
    description: 'Parque Nacional con glaciares, torres de granito y lagos de colores imposibles.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    active: true,
  },
  {
    id: 'atacama',
    slug: 'atacama',
    name: 'Desierto de Atacama',
    country: 'chile',
    description: 'El desierto más árido del mundo: géiseres, lagunas altiplánicas y cielos estrellados.',
    image: 'https://images.unsplash.com/photo-1548919219-32a0d9e83b80?w=800&q=80',
    active: false,
  },
  {
    id: 'santiago-chile',
    slug: 'santiago-chile',
    name: 'Santiago de Chile',
    country: 'chile',
    description: 'Capital cosmopolita de Chile, rodeada por los Andes y puerta de entrada a las viñas del valle central.',
    image: 'https://images.unsplash.com/photo-1601053999937-7fb74e2c552d?w=1200&q=80',
    active: true,
  },
  {
    id: 'san-pedro-atacama',
    slug: 'san-pedro-atacama',
    name: 'San Pedro de Atacama',
    country: 'chile',
    description: 'Pueblo de adobe en el desierto más árido del mundo. Salares, géiseres, lagunas altiplánicas y cielos infinitos.',
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=1200&q=80',
    active: true,
  },
  {
    id: 'isla-pascua',
    slug: 'isla-pascua',
    name: 'Isla de Pascua (Rapa Nui)',
    country: 'chile',
    description: 'La isla habitada más remota del planeta, cuna de los moáis y la enigmática cultura Rapa Nui.',
    image: 'https://images.unsplash.com/photo-1565073624497-7e91b5cc3843?w=1200&q=80',
    active: true,
  },
  // ── Bolivia ──────────────────────────────────────────────────────────────────
  {
    id: 'uyuni',
    slug: 'uyuni',
    name: 'Salar de Uyuni',
    country: 'bolivia',
    description: 'El mayor desierto de sal del mundo, un espejo natural que refleja el cielo.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    active: false,
  },
  {
    id: 'la-paz',
    slug: 'la-paz',
    name: 'La Paz',
    country: 'bolivia',
    description: 'La ciudad más alta del mundo, con el Mercado de las Brujas y el teleférico urbano.',
    image: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=800&q=80',
    active: false,
  },
]

export default destinations
