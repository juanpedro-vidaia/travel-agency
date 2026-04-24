import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: number;
  description: string;
  badge?: string;
}

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {destination.badge && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-md">
            {destination.badge}
          </span>
        )}

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{destination.country}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {destination.name}
          </h3>
          <div className="text-right flex-shrink-0 ml-2">
            <span className="text-xs text-gray-400">Desde</span>
            <p className="text-2xl font-bold text-blue-600 leading-tight">
              €{destination.price.toLocaleString('es-ES')}
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        <Link
          href={`/destinos/${destination.id}`}
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors group/link"
        >
          Ver paquetes
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
