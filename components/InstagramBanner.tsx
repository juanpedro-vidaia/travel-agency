import Image from 'next/image'
import Link from 'next/link'
import { Instagram } from 'lucide-react'

const INSTAGRAM_URL = 'https://www.instagram.com/viajesvidaia'

// Fotos placeholder de Unsplash — reemplazar cuando se integre Elfsight o SnapWidget.
// Para integrar el widget real, sustituir todo el grid por el script del proveedor
// y colocarlo dentro del div id="instagram-widget" (ver comentario abajo).
const photos = [
  {
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    alt: 'Glaciar Perito Moreno, Argentina',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Cataratas del Iguazú',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    alt: 'Torres del Paine, Chile',
  },
  {
    src: 'https://images.unsplash.com/photo-1589993624-d5e0e6a27fd8?w=600&q=80',
    alt: 'Buenos Aires',
  },
  {
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80',
    alt: 'Quebrada de Humahuaca, Jujuy',
  },
  {
    src: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=600&q=80',
    alt: 'Canal Beagle, Ushuaia',
  },
]

export default function InstagramBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-vidaia-dark hover:text-vidaia-primary transition-colors group"
          >
            <Instagram className="w-6 h-6" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">
              Síguenos en Instagram{' '}
              <span className="text-vidaia-primary">@viajesvidaia</span>
            </h2>
          </Link>
          <p className="text-gray-400 mt-2 text-base">
            Inspiración para tu próximo viaje
          </p>
        </div>

        {/*
          INTEGRACIÓN FUTURA CON ELFSIGHT / SNAPWIDGET:
          Cuando tengas el script del proveedor, reemplaza el grid de abajo
          por algo como:
          <div id="instagram-widget">
            <div class="elfsight-app-XXXXXX" data-elfsight-app-lazy></div>
          </div>
          Y añade el script del proveedor en app/layout.tsx con strategy="afterInteractive".
        */}

        {/* Grid placeholder */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {photos.map((photo, i) => (
            <Link
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-vidaia-dark/0 group-hover:bg-vidaia-dark/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-vidaia-primary hover:text-vidaia-dark transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Ver más en @viajesvidaia
          </Link>
        </div>
      </div>
    </section>
  )
}
