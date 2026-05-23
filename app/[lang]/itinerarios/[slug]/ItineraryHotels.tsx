'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { Bed, Star, Calendar } from 'lucide-react'
import { getItineraryWithDetails } from '@/lib/services/itinerariesService'
import { getDestinationById } from '@/lib/services/destinationsService'
import { getAsset } from '@/lib/data/assets'
import { useLanguage } from '@/lib/hooks/useLanguage'

export default function ItineraryHotels({ slug }: { slug: string }) {
  const itinerary = getItineraryWithDetails(slug)
  const { content: pageContent } = useLanguage()
  const content = pageContent.itineraryPage

  const hotelCards = useMemo(() => {
    if (!itinerary) return []
    return itinerary.accommodationStops
      .filter((stop) => stop.featured)
      .map((stop) => {
        const hotel = stop.defaultHotel
        if (!hotel) return null
        const destination = getDestinationById(hotel.destinationId)
        return {
          name: hotel.content.es.name,
          stars: stop.defaultCategory,
          category: hotel.content.es.categoryLabel,
          nights: stop.nights,
          dates: stop.dates,
          city: destination?.content.es.name ?? hotel.destinationId,
          img: getAsset(hotel.imageKey).url,
        }
      })
      .filter((h): h is NonNullable<typeof h> => h !== null)
  }, [itinerary])

  if (!itinerary || hotelCards.length === 0) return null

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-vidaia-dark mb-2 text-center">
          {content.hotels.title}
        </h2>
        <p className="text-center text-vidaia-charcoal/55 text-sm mb-6 md:mb-12">
          {content.hotels.subtitle}
        </p>

        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 -mx-4 md:mx-0 px-4 md:px-0 pb-4 md:pb-0">
          {hotelCards.map((hotel, index) => (
            <div
              key={index}
              className="snap-start shrink-0 md:shrink w-[260px] md:w-auto bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={hotel.img}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-vidaia-dark truncate">{hotel.name}</h3>
                    <p className="text-sm text-vidaia-charcoal/55">{hotel.city}</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-vidaia-earth text-vidaia-earth" />
                    ))}
                  </div>
                </div>
                {hotel.category && (
                  <span className="inline-block bg-vidaia-light text-vidaia-dark text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                    {hotel.category}
                  </span>
                )}
                <div className="flex items-center justify-between text-xs text-vidaia-charcoal/55 pt-3 border-t border-vidaia-light/50 mt-1">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5" />
                    {hotel.nights} {hotel.nights === 1 ? content.labels.night : content.labels.nights}
                  </span>
                  {hotel.dates && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {hotel.dates}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-vidaia-charcoal/45 mt-10 italic">
          {content.hotels.disclaimer}
        </p>
      </div>
    </section>
  )
}
