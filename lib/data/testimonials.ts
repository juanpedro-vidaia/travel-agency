export interface TestimonialContent {
  name: string
  location: string
  trip: string
  text: string
}

export interface Testimonial {
  id: string
  content: {
    es: TestimonialContent
    en?: TestimonialContent
  }
  rating: 1 | 2 | 3 | 4 | 5
  imageKey: string
  date: string   // YYYY-MM
  active: boolean
  featured: boolean
}

// Reemplaza las fotos e imágenes con las reales cuando estén disponibles.
// Las imágenes de cliente deben ir en /public/images/testimonials/
const testimonials: Testimonial[] = [
  {
    id: '1',
    content: {
      es: {
        name: 'María García',
        location: 'Madrid, España',
        trip: 'Paisajes naturales de Argentina',
        text: 'Una experiencia que supera cualquier expectativa. Lau y Jupe se encargaron de absolutamente todo, desde los vuelos internos hasta los detalles más pequeños. Cada día era una sorpresa. Volvería mañana mismo.',
      }
    },
    rating: 5,
    imageKey: 'TESTIMONIALS.MARIA_GARCIA',
    date: '2024-12',
    active: true,
    featured: true,
  },
  {
    id: '2',
    content: {
      es: {
        name: 'Carlos Martínez',
        location: 'Barcelona, España',
        trip: 'Patagonia de sur a norte',
        text: 'Llevábamos años queriendo hacer este viaje y no nos atrevíamos a organizarlo solos. Viajes Vidaia lo hizo sencillo, emocionante y absolutamente memorable. 100% recomendables.',
      }
    },
    rating: 5,
    imageKey: 'TESTIMONIALS.CARLOS_MARTINEZ',
    date: '2025-02',
    active: true,
    featured: true,
  },
  {
    id: '3',
    content: {
      es: {
        name: 'Ana Rodríguez',
        location: 'Valencia, España',
        trip: 'Luna de Miel Argentina e Iguazú',
        text: 'Nuestro viaje de novios fue perfecto. Cada hotel, cada excursión, cada momento estaba pensado con mucho cariño. Si buscáis una agencia que de verdad os escuche y os cuide, esta es la vuestra.',
      }
    },
    rating: 5,
    imageKey: 'TESTIMONIALS.ANA_RODRIGUEZ',
    date: '2025-04',
    active: true,
    featured: true,
  },
]

export default testimonials
