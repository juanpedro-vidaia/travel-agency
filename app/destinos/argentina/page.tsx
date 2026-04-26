import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { getTripsByCountry } from '@/lib/services/tripsService'

export const metadata: Metadata = {
  title: 'Viajes a Argentina — Viajes Vidaia',
  description:
    'Desde las Cataratas del Iguazú hasta el Fin del Mundo. Diseñamos tu aventura argentina a medida: Patagonia, Buenos Aires, Iguazú, glaciares y más.',
}

export default function ArgentinaPage() {
  const trips = getTripsByCountry('argentina')

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1610680224983-f9759ce81c7a?q=80&w=1920"
          alt="El Chaltén, Patagonia argentina"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p className="text-vidaia-earth font-semibold uppercase tracking-widest text-xs mb-3">
            🇦🇷 Viajes Vidaia · Argentina
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance max-w-2xl">
            Viajes a Argentina
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed text-balance">
            Desde las Cataratas del Iguazú hasta el Fin del Mundo —
            diseñamos tu aventura argentina a medida.
          </p>
        </div>
      </section>

      {/* ── INTRODUCCIÓN ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-vidaia-charcoal/80 text-lg sm:text-xl leading-relaxed">
            Argentina es mucho más que un país, es una experiencia. Sus majestuosos glaciares,
            las Cataratas del Iguazú, la vibrante Buenos Aires y la inmensidad de la Patagonia
            te dejarán sin palabras.{' '}
            <strong className="text-vidaia-dark">
              Cada viaje que diseñamos nace de escucharte a ti.
            </strong>
          </p>
        </div>
      </section>

      {/* ── GRID DE VIAJES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            Itinerarios por Argentina
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

      {/* ── CTA FINAL ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-dark text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            Diseñamos cualquier ruta argentina a medida para ti.
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
