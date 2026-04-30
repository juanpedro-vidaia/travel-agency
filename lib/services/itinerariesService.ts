import itineraries from '../data/itineraries'
import type { Itinerary, ItineraryDay, AccommodationStop } from '../data/itineraries'
import type { Activity } from '../data/activities'
import type { Hotel } from '../data/hotels'
import type { Trip } from '../data/trips'
import { getActivityById } from './activitiesService'
import { getHotelById } from './hotelsService'
import { getTripBySlug } from './tripsService'

export interface ResolvedDayActivity {
  activity: Activity
  status: 'included' | 'optional'
}

export interface ResolvedDay extends Omit<ItineraryDay, 'activities' | 'content'> {
  content: ItineraryDay['content']
  activities: ResolvedDayActivity[]
  referenceHotel?: Hotel
}

export interface ResolvedAccommodationStop extends AccommodationStop {
  hotels: { category: 3 | 4 | 5; hotel: Hotel }[]
  defaultHotel: Hotel | undefined
}

export interface ResolvedItinerary extends Omit<Itinerary, 'days' | 'accommodationStops' | 'content'> {
  content: Itinerary['content']
  days: ResolvedDay[]
  accommodationStops: ResolvedAccommodationStop[]
}

export interface ItineraryWithTrip {
  itinerary: ResolvedItinerary
  trip: Trip
}

export function getItinerary(slug: string): Itinerary | undefined {
  return itineraries.find(i => i.slug === slug && i.active)
}

export function getItineraryWithDetails(slug: string): ResolvedItinerary | undefined {
  const itinerary = getItinerary(slug)
  if (!itinerary) return undefined

  const days: ResolvedDay[] = itinerary.days.map(day => ({
    ...day,
    content: day.content,
    activities: day.activities
      .map(da => {
        const activity = getActivityById(da.activityId)
        if (!activity) return null
        return { activity, status: da.status }
      })
      .filter((x): x is ResolvedDayActivity => x !== null),
    referenceHotel: day.referenceHotelId ? getHotelById(day.referenceHotelId) : undefined,
  }))

  const accommodationStops: ResolvedAccommodationStop[] = itinerary.accommodationStops.map(stop => {
    const categories: (3 | 4 | 5)[] = [3, 4, 5]
    const hotels = categories
      .map(cat => {
        const id = stop.hotelsByCategory[String(cat) as '3' | '4' | '5']
        if (!id) return null
        const hotel = getHotelById(id)
        if (!hotel) return null
        return { category: cat, hotel }
      })
      .filter((x): x is { category: 3 | 4 | 5; hotel: Hotel } => x !== null)

    return {
      ...stop,
      hotels,
      defaultHotel: getHotelById(
        stop.hotelsByCategory[String(stop.defaultCategory) as '3' | '4' | '5'] ?? ''
      ),
    }
  })

  return { ...itinerary, days, accommodationStops }
}

/** Returns the resolved itinerary paired with its matching Trip (same slug). */
export function getItineraryWithTrip(slug: string): ItineraryWithTrip | undefined {
  const itinerary = getItineraryWithDetails(slug)
  const trip = getTripBySlug(slug)
  if (!itinerary || !trip) return undefined
  return { itinerary, trip }
}

export function getItineraryOptionals(slug: string): Activity[] {
  const itinerary = getItinerary(slug)
  if (!itinerary) return []

  const seen = new Set<string>()
  const optionals: Activity[] = []

  for (const day of itinerary.days) {
    for (const da of day.activities) {
      if (da.status === 'optional' && !seen.has(da.activityId)) {
        seen.add(da.activityId)
        const activity = getActivityById(da.activityId)
        if (activity) optionals.push(activity)
      }
    }
  }

  return optionals
}

export function getFeaturedItineraries(): Itinerary[] {
  return itineraries.filter(i => i.featured && i.active)
}

export function getAllItineraries(): Itinerary[] {
  return itineraries.filter(i => i.active)
}
