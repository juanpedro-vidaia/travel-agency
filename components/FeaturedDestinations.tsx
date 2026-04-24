import DestinationCard, { type Destination } from './DestinationCard';

const destinations: Destination[] = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    price: 899,
    description:
      'Playas paradisíacas, templos ancestrales y una cultura única que te dejará sin palabras.',
    badge: 'Más popular',
  },
  {
    id: 'paris',
    name: 'París',
    country: 'Francia',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    price: 749,
    description:
      'La ciudad del amor, arte y gastronomía. La Torre Eiffel y Montmartre te esperan.',
    badge: 'Romántico',
  },
  {
    id: 'tokio',
    name: 'Tokio',
    country: 'Japón',
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    price: 1299,
    description:
      'Tradición y modernidad en perfecta armonía. Una experiencia cultural sin igual.',
    badge: 'Tendencia',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Grecia',
    image:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    price: 999,
    description:
      'Cúpulas azules, vistas al mar Egeo y atardeceres que te robarán el corazón.',
  },
  {
    id: 'nueva-york',
    name: 'Nueva York',
    country: 'EE. UU.',
    image:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    price: 1099,
    description:
      'Broadway, Central Park y el skyline más icónico del mundo. La ciudad que nunca duerme.',
  },
  {
    id: 'cancun',
    name: 'Cancún',
    country: 'México',
    image:
      'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=800&q=80',
    price: 649,
    description:
      'Aguas turquesas, playas de arena blanca y resorts de lujo en el Caribe mexicano.',
    badge: 'Oferta',
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4">
            Destinos Destacados
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            ¿A dónde quieres ir?
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Explora nuestros destinos más solicitados y encuentra el viaje perfecto para ti
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/destinos"
            className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all duration-200 text-lg"
          >
            Ver todos los destinos
          </a>
        </div>
      </div>
    </section>
  );
}
