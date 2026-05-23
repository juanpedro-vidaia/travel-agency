'use client'

import Image from 'next/image'
import LangLink from '@/components/ui/LangLink'
import { ArrowRight } from 'lucide-react'
import { getTripBySlug, getRelatedTripsBySlug } from '@/lib/services/tripsService'
import { TAG_CONFIG } from '@/lib/data/trips'
import { getAsset } from '@/lib/data/assets'
import { formatPrice, renderTemplate } from '@/lib/helpers/contentHelpers'
import { useLanguage } from '@/lib/hooks/useLanguage'

export default function ItineraryRelated({ slug }: { slug: string }) {
  const trip = getTripBySlug(slug)
  const relatedTrips = getRelatedTripsBySlug(slug)
  const { content: pageContent, ui } = useLanguage()
  const content = pageContent.itineraryPage

  if (!trip || relatedTrips.length === 0) return null

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-vidaia-dark mb-2 text-center">
          {content.relatedTrips.title}
        </h2>
        <p className="text-center text-vidaia-charcoal/55 text-sm mb-6 md:mb-12">
          {content.relatedTrips.subtitle}
        </p>

        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 -mx-4 md:mx-0 px-4 md:px-0 pb-4 md:pb-0">
          {relatedTrips.map((related) => {
            const reason = trip.relatedTrips.find((r) => r.slug === related.slug)?.es.reason
            const href = related.hasItinerary ? `/itinerarios/${related.slug}` : `/itinerarios/personalizar`
            const cta = related.hasItinerary ? ui.buttons.viewItinerary : ui.buttons.requestInfo

            return (
              <article
                key={related.id}
                className="snap-start shrink-0 md:shrink w-[260px] md:w-auto group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={getAsset(related.imageKey).url}
                    alt={related.content.es.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {reason && <p className="text-xs text-amber-700 font-medium mb-2">💡 {reason}</p>}
                  <h3 className="font-heading font-bold text-vidaia-dark text-sm leading-snug mb-2 flex-1">
                    {related.content.es.title}
                  </h3>
                  {related.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {related.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-vidaia-light text-vidaia-dark px-2 py-0.5 rounded-full">
                          {TAG_CONFIG[tag].icon} {TAG_CONFIG[tag].es.label}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-vidaia-light/60 mt-auto">
                    <div>
                      {related.priceFrom != null && related.priceFrom > 0 && (
                        <p className="text-vidaia-primary font-bold text-sm">
                          {renderTemplate(content.price.fromTemplate, { price: formatPrice(related.priceFrom) })}
                        </p>
                      )}
                      <p className="text-xs text-vidaia-charcoal/50">
                        {related.days} {ui.labels.days}
                      </p>
                    </div>
                    <LangLink
                      href={href}
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                        related.hasItinerary
                          ? 'bg-vidaia-primary hover:bg-vidaia-dark text-white'
                          : 'bg-vidaia-earth hover:bg-vidaia-brown text-white'
                      }`}
                    >
                      {cta}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </LangLink>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
