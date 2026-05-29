'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  ChevronDown,
  MapPin,
  Calendar,
  Plane,
  Bed,
  Star,
  Waves,
  UtensilsCrossed,
  Music,
  Clock,
  CheckCircle,
  XCircle,
  Mountain,
  Binoculars,
  Snowflake,
  Wine,
  CableCar,
  Building2,
  TreePine,
  MountainSnow,
  Fish,
  Landmark,
  Shell,
  TreePalm,
  type LucideIcon,
} from 'lucide-react'
import type { ResolvedItinerary } from '@/lib/services/itinerariesService'
import { useLanguage } from '@/lib/hooks/useLanguage'

const ACTIVITY_ICON_MAP: Record<string, LucideIcon> = {
  Waves,
  UtensilsCrossed,
  Music,
  Mountain,
  Binoculars,
  Snowflake,
  Wine,
  CableCar,
  Building2,
  TreePine,
  MountainSnow,
  Fish,
  Landmark,
  Shell,
  TreePalm,
}

interface Props {
  resolvedItinerary: ResolvedItinerary
  destinationNames: Record<string, string>
}

export default function ItineraryDayAccordion({ resolvedItinerary, destinationNames }: Props) {
  const { content: pageContent } = useLanguage()
  const content = pageContent.itineraryPage

  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]))

  const toggleDay = useCallback((day: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else next.add(day)
      return next
    })
  }, [])

  const itineraryDays = useMemo(() => {
    return resolvedItinerary.days.map((day) => {
      const cityName = day.destinationId ? (destinationNames[day.destinationId] ?? '') : ''
      const hotel = day.referenceHotel
      const hotelLabel = hotel
        ? `${hotel.content.es.name} ${hotel.category}★${hotel.content.es.categoryLabel ? ' ' + hotel.content.es.categoryLabel : ''}`
        : undefined
      const dayOptionals = day.activities.filter((da) => da.status === 'optional')
      const optionalLabel =
        dayOptionals.length > 0
          ? dayOptionals.map((da) => da.activity.content.es.name).join(' · ')
          : undefined

      const includedActivities = day.activities
        .filter((da) => da.status === 'included')
        .map((da) => ({
          title: da.activity.content.es.name,
          description: da.activity.content.es.description,
          Icon: ACTIVITY_ICON_MAP[da.activity.icon ?? ''] ?? MapPin,
        }))

      return {
        day: day.dayNumber,
        title: day.content.es.title,
        cities: cityName,
        hotel: hotelLabel,
        schedule: day.content.es.schedule,
        duration: day.content.es.duration,
        description: day.content.es.description,
        flights: day.flights,
        highlights: day.content.es.highlights,
        isOptionalDay: day.dayType === 'free',
        optionalLabel,
        includes: day.content.es.included,
        notIncludes: day.content.es.excluded,
        includedActivities,
      }
    })
  }, [resolvedItinerary, destinationNames])

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-vidaia-sand">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-vidaia-dark mb-2 text-center">
          {content.accordion.title}
        </h2>
        <p className="text-center text-vidaia-charcoal/70 mb-6 md:mb-10 text-sm">
          {content.accordion.subtitle}
        </p>

        <div className="space-y-2">
          {itineraryDays.map((day) => {
            const isOpen = openDays.has(day.day)
            return (
              <div key={day.day} className="border border-vidaia-light rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleDay(day.day)}
                  className={`w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left transition-colors ${
                    isOpen ? 'bg-vidaia-dark' : 'bg-white hover:bg-vidaia-sand'
                  }`}
                >
                  <span
                    className={`shrink-0 font-heading font-bold text-lg w-11 h-11 rounded-full flex items-center justify-center ${
                      isOpen ? 'bg-vidaia-earth text-white' : 'bg-vidaia-light text-vidaia-dark'
                    }`}
                  >
                    {day.day}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold leading-snug ${isOpen ? 'text-white' : 'text-vidaia-dark'}`}>
                      {day.title}
                    </p>
                    {day.cities && (
                      <p
                        className={`text-xs sm:text-sm flex items-center gap-1 mt-0.5 ${
                          isOpen ? 'text-white/60' : 'text-vidaia-charcoal/70'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{day.cities}</span>
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white/70' : 'text-vidaia-primary'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="bg-white border-t border-vidaia-light/60 p-5 sm:p-6 space-y-4">
                    {day.isOptionalDay && (
                      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                        <span className="text-amber-500 text-lg leading-none mt-0.5">⭐</span>
                        <p className="text-sm text-amber-800">
                          <span className="font-semibold">{content.accordion.freeDayLabel}</span>
                          {day.optionalLabel && (
                            <>
                              {' '}
                              — <span className="font-semibold">{content.accordion.optionalLabel}</span>{' '}
                              {day.optionalLabel}
                            </>
                          )}
                        </p>
                      </div>
                    )}

                    {!day.isOptionalDay && day.optionalLabel && (
                      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                        <span className="text-amber-500 text-lg leading-none mt-0.5">⭐</span>
                        <p className="text-sm text-amber-800">
                          <span className="font-semibold">{content.accordion.optionalLabel}</span>{' '}
                          {day.optionalLabel}
                        </p>
                      </div>
                    )}

                    {(day.schedule || day.duration) && (
                      <div className="flex flex-wrap gap-4 text-sm text-vidaia-charcoal/65">
                        {day.schedule && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-vidaia-primary" />
                            {day.schedule}
                          </span>
                        )}
                        {day.duration && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-vidaia-primary" />
                            {content.accordion.durationLabel} {day.duration}
                          </span>
                        )}
                      </div>
                    )}

                    {day.flights && day.flights.length > 0 && (
                      <div className="space-y-1.5">
                        {day.flights.map((flight, i) => (
                          <p key={i} className="flex items-center gap-2 text-sm text-vidaia-charcoal/75">
                            <Plane className="w-4 h-4 text-vidaia-primary shrink-0" />
                            {flight}
                          </p>
                        ))}
                      </div>
                    )}

                    {day.description && (
                      <p className="text-vidaia-charcoal/80 text-sm sm:text-base">{day.description}</p>
                    )}

                    {day.includedActivities.length > 0 && (
                      <div className="space-y-2.5">
                        {day.includedActivities.map((act, i) => {
                          const Icon = act.Icon
                          return (
                            <div
                              key={i}
                              className="flex gap-3 bg-vidaia-sand rounded-xl p-3.5 border border-vidaia-light/60"
                            >
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 border border-vidaia-light/70">
                                <Icon className="w-4 h-4 text-vidaia-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-vidaia-dark text-sm leading-snug">{act.title}</p>
                                {act.description && (
                                  <p className="text-vidaia-charcoal/65 text-xs mt-1 leading-relaxed">
                                    {act.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {day.highlights && day.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {day.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1.5 text-sm text-vidaia-charcoal/80 bg-amber-50 border border-amber-100 rounded-full px-3 py-1"
                          >
                            <Star className="w-3 h-3 fill-vidaia-earth text-vidaia-earth shrink-0" />
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {(day.includes || day.notIncludes) && (
                      <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-vidaia-light/70">
                        {day.includes && (
                          <span className="flex items-start gap-1.5 text-sm text-green-700">
                            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>
                              <strong>{content.accordion.includesLabel}</strong> {day.includes}
                            </span>
                          </span>
                        )}
                        {day.notIncludes && (
                          <span className="flex items-start gap-1.5 text-sm text-red-600">
                            <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>
                              <strong>{content.accordion.excludesLabel}</strong> {day.notIncludes}
                            </span>
                          </span>
                        )}
                      </div>
                    )}

                    {day.hotel && (
                      <div className="flex items-center gap-2 pt-3 border-t border-vidaia-light/70">
                        <Bed className="w-4 h-4 text-vidaia-primary shrink-0" />
                        <span className="text-sm font-semibold text-vidaia-dark">{day.hotel}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
