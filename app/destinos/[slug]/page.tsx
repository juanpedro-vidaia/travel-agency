import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Calendar } from 'lucide-react'
import { getTripsByCountry } from '@/lib/services/tripsService'
import { getCountryBySlug, getCountries } from '@/lib/services/countriesService'
import { TAG_CONFIG } from '@/lib/data/trips'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const country = getCountryBySlug(slug)

  if (!country) return {}

  return {
    title: country.metaTitle,
    description: country.metaDescription,
  }
}

export async function generateStaticParams() {
  const countries = getCountries()
  return countries.map((country) => ({
    slug: country.slug,
  }))
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params
  const country = getCountryBySlug(slug)

  if (!country) {
    notFound()
  }

  // Cast country.id to any because the tripsService might be using a narrow type
  const trips = getTripsByCountry(country.id)

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src={country.heroImage}
          alt={country.heroAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p className="flex items-center gap-2 text-vidaia-earth font-semibold uppercase tracking-widest text-xs mb-3">
            <img src={`https://flagcdn.com/20x15/${country.flagCode}.png`} alt="" width={20} height={15} className="rounded-sm flex-shrink-0" />
            Viajes Vidaia · {country.name}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance max-w-2xl">
            Viajes a {country.name}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed text-balance">
            {country.metaDescription.split('. ')[0]} — diseñamos tu aventura a medida.
          </p>
        </div>
      </section>

      {/* ── INTRODUCCIÓN ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-vidaia-charcoal/80 text-lg sm:text-xl leading-relaxed">
            {country.description}{' '}
            <strong className="text-vidaia-dark">
              Cada viaje que diseñamos nace de escucharte a ti.
            </strong>
          </p>
        </div>
      </section>

      {/* ── GRID DE VIAJES ── */}
      {trips.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
              Itinerarios por {country.name}
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
                        {trip.days} días / {trip.nights} noches
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-vidaia-charcoal/50 mb-2 leading-snug">
                        {trip.subtitle}
                      </p>
                      <h3 className="font-heading font-bold text-vidaia-dark text-base leading-snug mb-3">
                        {trip.title}
                      </h3>
                      {trip.tags && trip.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {trip.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-xs bg-vidaia-light text-vidaia-dark px-2 py-0.5 rounded-full"
                            >
                              {TAG_CONFIG[tag].icon} {TAG_CONFIG[tag].label}
                            </span>
                          ))}
                        </div>
                      )}
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
      )}

      {/* ── CTA FINAL ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-dark text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            Diseñamos cualquier ruta por {country.name} a medida para ti.
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
