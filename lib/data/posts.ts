// ── Categories ────────────────────────────────────────────────────────────────

export const POST_CATEGORIES = {
  ARGENTINA:    'argentina',
  CHILE:        'chile',
  BOLIVIA:      'bolivia',
  INSPIRACION:  'inspiracion',
  LUNA_DE_MIEL: 'luna-de-miel',
  CONSEJOS:     'consejos',
} as const

export type PostCategory = typeof POST_CATEGORIES[keyof typeof POST_CATEGORIES]

export const CATEGORY_CONFIG: Record<PostCategory, { label: string; color: string }> = {
  argentina:    { label: 'Argentina',          color: 'bg-sky-50 text-sky-700' },
  chile:        { label: 'Chile',              color: 'bg-red-50 text-red-700' },
  bolivia:      { label: 'Bolivia',            color: 'bg-amber-50 text-amber-700' },
  inspiracion:  { label: 'Inspiración',        color: 'bg-purple-50 text-purple-700' },
  'luna-de-miel':{ label: 'Lunas de Miel',    color: 'bg-rose-50 text-rose-700' },
  consejos:     { label: 'Consejos de viaje',  color: 'bg-green-50 text-green-700' },
}

// ── Post ──────────────────────────────────────────────────────────────────────

export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  imageAlt: string
  date: string           // ISO: "2026-04-18"
  category: PostCategory
  tags: string[]
  readingTime: number    // minutes
  featured: boolean
  active: boolean
  relatedTrips?: string[] // trip slugs
  author?: string
  metaTitle?: string
  metaDescription?: string
}

// ── Posts ─────────────────────────────────────────────────────────────────────

const posts: Post[] = [
  {
    slug: 'ruta-carretera-austral',
    title: '7 días por la Carretera Austral: la guía que nadie más te da',
    excerpt:
      'La ruta más espectacular de Chile te espera con bosques templados, glaciares y fiordos que parecen pintados. Te contamos cómo hacerla sin morir en el intento.',
    content: '',
    image:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Carretera Austral, Chile',
    date: '2026-04-18',
    category: 'chile',
    tags: ['carretera-austral', 'road-trip', 'patagonia', 'chile'],
    readingTime: 8,
    featured: true,
    active: true,
    relatedTrips: ['carretera-austral'],
    metaTitle: 'Carretera Austral en 7 días: la guía definitiva — Viajes Vidaia',
    metaDescription:
      'La ruta más espectacular de Chile, kilómetro a kilómetro. Consejos prácticos, qué ver, dónde dormir y cómo organizarlo todo desde cero.',
  },
  {
    slug: 'salar-uyuni-cuando-ir',
    title: 'Salar de Uyuni: cuándo ir, qué esperar y cómo no arruinarlo',
    excerpt:
      'El espejo natural más grande del mundo tiene sus secretos. Temporada de lluvias o de seca, la foto del coche en el reflejo, el amanecer sobre la sal…',
    content: '',
    image:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Salar de Uyuni al amanecer, Bolivia',
    date: '2026-04-04',
    category: 'bolivia',
    tags: ['salar-uyuni', 'bolivia', 'altiplano', 'cuando-ir'],
    readingTime: 6,
    featured: false,
    active: true,
    relatedTrips: ['chile-bolivia-salares'],
    metaTitle: 'Salar de Uyuni: cuándo ir y qué esperar — Viajes Vidaia',
    metaDescription:
      'Todo lo que necesitas saber antes de viajar al Salar de Uyuni: mejor época, fotos del efecto espejo, excursiones y consejos que no encontrarás en las guías.',
  },
  {
    slug: 'patagonia-argentina-w-circuit',
    title: 'W Circuit en Torres del Paine: todo lo que necesitas saber',
    excerpt:
      'Uno de los trekkings más míticos del planeta. Campamentos, refugios, el Glaciar Grey y esas torres que emergen entre nubes. Paso a paso.',
    content: '',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Torres del Paine, Patagonia',
    date: '2026-03-28',
    category: 'chile',
    tags: ['torres-del-paine', 'trekking', 'patagonia', 'circuito-w'],
    readingTime: 10,
    featured: false,
    active: true,
    relatedTrips: ['latitudes-australes'],
    metaTitle: 'Circuito W Torres del Paine: guía paso a paso — Viajes Vidaia',
    metaDescription:
      'Cómo hacer el Circuito W en Torres del Paine: campamentos, refugios, cuánto cuesta, cuándo ir y cómo reservar. La guía más completa en español.',
  },
  {
    slug: 'buenos-aires-primera-vez',
    title: 'Buenos Aires por primera vez: el barrio a barrio que te falta leer',
    excerpt:
      'Palermo, San Telmo, La Boca, Recoleta… Buenos Aires no se entiende sin sus barrios. Aquí va el mapa mental que necesitas antes de aterrizar.',
    content: '',
    image:
      'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Buenos Aires, Argentina',
    date: '2026-03-10',
    category: 'argentina',
    tags: ['buenos-aires', 'ciudad', 'argentina', 'primera-vez'],
    readingTime: 7,
    featured: false,
    active: true,
    relatedTrips: [],
    metaTitle: 'Buenos Aires por primera vez: guía de barrios — Viajes Vidaia',
    metaDescription:
      'De Palermo a San Telmo: cómo orientarte en Buenos Aires, qué ver en cada barrio, dónde comer y los errores que no debes cometer en tu primera visita.',
  },
  {
    slug: 'luna-de-miel-patagonia',
    title: 'Luna de miel en Patagonia: romanticismo en el fin del mundo',
    excerpt:
      'Pocos escenarios en el mundo combinan tanta grandeza con tanta intimidad. Te contamos cómo organizar una luna de miel que jamás olvidaréis.',
    content: '',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Patagonia al atardecer',
    date: '2026-02-14',
    category: 'luna-de-miel',
    tags: ['luna-de-miel', 'patagonia', 'argentina', 'chile', 'romantico'],
    readingTime: 6,
    featured: false,
    active: true,
    relatedTrips: ['latitudes-australes'],
    metaTitle: 'Luna de miel en Patagonia: guía romántica — Viajes Vidaia',
    metaDescription:
      'Glaciares, lagos y silencio. Todo lo que necesitas para planificar una luna de miel inolvidable en la Patagonia argentina y chilena.',
  },
  {
    slug: 'mejores-epocas-viajar-argentina',
    title: 'Cuándo viajar a Argentina: mes a mes, destino a destino',
    excerpt:
      'Argentina es el país de los contrastes climáticos. Lo que es perfecto en Bariloche puede ser un infierno en Buenos Aires. Aquí te lo aclaramos todo.',
    content: '',
    image:
      'https://images.unsplash.com/photo-1591177335318-eb7de5c24f86?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Patagonia argentina en otoño',
    date: '2026-01-20',
    category: 'consejos',
    tags: ['argentina', 'cuando-ir', 'temporadas', 'planificacion'],
    readingTime: 5,
    featured: false,
    active: true,
    relatedTrips: [],
    metaTitle: 'Cuándo viajar a Argentina: guía mes a mes — Viajes Vidaia',
    metaDescription:
      'La mejor época para viajar a cada región de Argentina: Patagonia, Buenos Aires, Iguazú, Mendoza y el norte. Clima, temporadas y cuándo reservar.',
  },
]

export default posts
