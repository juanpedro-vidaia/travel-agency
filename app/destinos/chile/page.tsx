import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { getTripsByCountry } from '@/lib/services/tripsService'

export const metadata: Metadata = {
  title: 'Viajes a Chile — Viajes Vidaia',
  description:
    'Atacama, Torres del Paine, Isla de Pascua y la Carretera Austral. Diseñamos tu viaje a Chile a medida.',
}

export default function ChilePage() {
  const trips = getTripsByCountry('chile')

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558517286-6b7b81953cb5?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Torres del Paine, Chile"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p className="text-vidaia-earth font-semibold uppercase tracking-widest text-xs mb-3">
            🇨🇱 Viajes Vidaia · Chile
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance max-w-2xl">
            Viajes a Chile
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed text-balance">
            Atacama, Torres del Paine, Isla de Pascua y la Carretera Austral —
            diseñamos tu aventura chilena a medida.
          </p>
        </div>
      </section>

      {/* ── INTRODUCCIÓN ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-vidaia-charcoal/80 text-lg sm:text-xl leading-relaxed">
            Chile es uno de los países más diversos del mundo, con paisajes que van del desierto
            más árido al hielo eterno de la Patagonia.{' '}
            <strong className="text-vidaia-dark">
              Cada viaje que diseñamos nace de escucharte a ti.
            </strong>
          </p>
        </div>
      </section>

      {/* ── GRID DE VIAJES ── */}
      {trips.length > 0 ? (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
              Itinerarios por Chile
            </h2>
            <p className="text-center text-vidaia-charcoal/55 text-sm mb-14">
              Todos son puntos de partida — los adaptamos a tus fechas, ritmo y presupuesto
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => {
                const href = trip.hasItinerary
                  ? `/itinerarios/${trip.slug}`
                  : `/presupuesto-itinerario?titulo=${encodeURIComponent(trip.title)}&subtitulo=${encodeURIComponent(trip.subtitle)}`
                const cta = trip.hasItinerary ? 'Ver itinerario' : 'Solicitar información'

                return (
                  <article
                    key={trip.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span className="absolute top-3 right-3 flex items-center gap-1 bg-vidaia-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
                        <Calendar className="w-3 h-3" />
                        {trip.days} días
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-vidaia-charcoal/50 mb-2 leading-snug">
                        {trip.subtitle}
                      </p>
                      <h3 className="font-heading font-bold text-vidaia-dark text-base leading-snug mb-4 flex-1">
                        {trip.title}
                      </h3>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-vidaia-light/60">
                        <span className="text-vidaia-primary font-bold text-base">
                          Desde {trip.priceFrom.toLocaleString('es-ES')}€
                        </span>
                        <Link
                          href={href}
                          className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                            trip.hasItinerary
                              ? 'bg-vidaia-primary hover:bg-vidaia-dark text-white'
                              : 'bg-vidaia-earth hover:bg-vidaia-brown text-white'
                          }`}
                        >
                          {cta}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── CTA FINAL ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-dark text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            Diseñamos cualquier ruta chilena a medida para ti.
          </p>
          <Link
            href="/presupuesto"
            className="inline-flex items-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
          >
            Cuéntanos tu viaje soñado
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
