import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const team = [
  {
    name: 'Lau',
    role: 'Fundadora & Travel Designer',
    bio: 'Llevo más de diez años recorriendo Argentina y Chile con la mochila al hombro. Me enamoré de la Patagonia en un viaje que iba a durar dos semanas y se convirtió en dos meses. Desde entonces sé que los mejores viajes son los que no tienen fecha de vuelta.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Jupe',
    role: 'Co-fundador & Experto en Bolivia',
    bio: 'Bolivia me cambió la perspectiva. Después de cruzar el Salar de Uyuni a pie, entendí que viajar bien no es ver muchos sitios — es conectar de verdad con uno solo. Eso es lo que intentamos hacer con cada persona que confía en nosotros.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
];

export default function QuienesSomos() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            El equipo
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-4 leading-tight">
            Hola, somos
            <br />
            Lau y Jupe.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Dos viajeros que se enamoraron de Sudamérica y decidieron dedicar su vida a compartirla. No somos una gran agencia — somos personas que diseñan viajes como si fueran propios.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {team.map((person) => (
            <div
              key={person.name}
              className="group flex flex-col sm:flex-row gap-6 bg-vidaia-sand rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow duration-300"
            >
              {/* Photo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl overflow-hidden self-start">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              {/* Text */}
              <div>
                <p className="font-heading text-xl font-bold text-vidaia-dark">{person.name}</p>
                <p className="text-vidaia-primary text-xs font-semibold uppercase tracking-wider mb-3">
                  {person.role}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Landscape photo strip */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1461301214746-1e109215d6d3?auto=format&fit=crop&w=1600&q=80"
            alt="Patagonia — donde todo empezó"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vidaia-dark/70 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8 sm:p-12">
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 max-w-sm leading-snug">
                &ldquo;Cada viaje que diseñamos es uno en el que querríamos estar.&rdquo;
              </p>
              <Link
                href="/sobre-nosotros"
                className="inline-flex items-center gap-2 text-vidaia-earth hover:text-vidaia-cream font-semibold text-sm transition-colors"
              >
                Conoce nuestra historia
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
