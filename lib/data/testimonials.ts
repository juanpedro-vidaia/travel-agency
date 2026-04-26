export interface Testimonial {
  id: string
  name: string
  location: string
  trip: string
  rating: 1 | 2 | 3 | 4 | 5
  image: string
  text: string
  date: string   // YYYY-MM
  active: boolean
  featured: boolean
}

// Reemplaza las fotos e imágenes con las reales cuando estén disponibles.
// Las imágenes de cliente deben ir en /public/images/testimonials/
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María García',
    location: 'Madrid, España',
    trip: 'Paisajes naturales de Argentina',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    text: 'Una experiencia que supera cualquier expectativa. Lau y Jupe se encargaron de absolutamente todo, desde los vuelos internos hasta los detalles más pequeños. Cada día era una sorpresa. Volvería mañana mismo.',
    date: '2024-12',
    active: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Carlos Martínez',
    location: 'Barcelona, España',
    trip: 'Patagonia de sur a norte',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    text: 'Llevábamos años queriendo hacer este viaje y no nos atrevíamos a organizarlo solos. Viajes Vidaia lo hizo sencillo, emocionante y absolutamente memorable. 100% recomendables.',
    date: '2025-02',
    active: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    location: 'Valencia, España',
    trip: 'Luna de Miel Argentina e Iguazú',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&q=80',
    text: 'Nuestro viaje de novios fue perfecto. Cada hotel, cada excursión, cada momento estaba pensado con mucho cariño. Si buscáis una agencia que de verdad os escuche y os cuide, esta es la vuestra.',
    date: '2025-04',
    active: true,
    featured: true,
  },
]

export default testimonials
