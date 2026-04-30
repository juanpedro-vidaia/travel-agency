import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { getFeaturedTrips } from '@/lib/services/tripsService'
import { STATIC_CONTENT, COMMON_UI } from '@/lib/data/staticContent'
import { getAsset } from '@/lib/data/assets'

export default function FeaturedDestinations() {
  const trips = getFeaturedTrips()
  const sectionContent = STATIC_CONTENT.es.featuredDestinations

  return (
    <section className="py-20 bg-vidaia-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-dark text-sm font-semibold rounded-full mb-4">
            {sectionContent.header.overline}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-4">
            {sectionContent.header.title}
          </h2>
          <p className="text-xl text-vidaia-charcoal/60 max-w-2xl mx-auto">
            {sectionContent.header.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trips.map((trip) => {
            const href = trip.hasItinerary
              ? `/itinerarios/${trip.slug}`
              : `/presupuesto-itinerario?titulo=${encodeURIComponent(trip.content.es.title)}&subtitulo=${encodeURIComponent(trip.content.es.subtitle)}`
            
            const tripImage = getAsset(trip.imageKey)

            return (
              <article
                key={trip.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tripImage.url}
                    alt={trip.content.es.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-vidaia-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
                    <Calendar className="w-3 h-3" />
                    {trip.days} {COMMON_UI.es.labels.days}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-vidaia-charcoal/50 mb-2 leading-snug">
                    {trip.content.es.subtitle}
                  </p>
                  <h3 className="font-heading font-bold text-vidaia-dark text-base leading-snug mb-4 flex-1">
                    {trip.content.es.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-vidaia-light/60">
                    <span className="text-vidaia-primary font-bold text-base">
                      {COMMON_UI.es.labels.from} {trip.priceFrom.toLocaleString('es-ES')}€
                    </span>
                    <Link
                      href={href}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                        trip.hasItinerary
                          ? 'bg-vidaia-primary hover:bg-vidaia-dark text-white'
                          : 'bg-vidaia-earth hover:bg-vidaia-brown text-white'
                      }`}
                    >
                      {trip.hasItinerary ? COMMON_UI.es.buttons.viewItinerary : COMMON_UI.es.buttons.requestInfo}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/destinos/argentina"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-vidaia-primary text-vidaia-primary hover:bg-vidaia-primary hover:text-white font-semibold rounded-full transition-all duration-200 text-lg"
          >
            {sectionContent.callToAction}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
