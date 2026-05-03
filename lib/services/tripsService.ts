import trips from '../data/trips'
import type { Trip } from '../data/trips'

export function getTrips(): Trip[] {
  return trips.filter(trip => trip.active)
}

export function getTripsByCountry(country: string): Trip[] {
  return trips.filter(trip => {
    const countries = (Array.isArray(trip.country) ? trip.country : [trip.country]) as string[]
    return countries.includes(country) && trip.active
  })
}

export function getFeaturedTrips(): Trip[] {
  return trips.filter(trip => trip.featured && trip.active)
}

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find(trip => trip.slug === slug && trip.active)
}

export function getHoneymoonTrips(): Trip[] {
  return trips.filter(trip => trip.honeymoonFeatured && trip.active)
}

export function getActiveTrips(): Trip[] {
  return trips
    .filter(trip => trip.active)
    .sort((a, b) => (b.ranking ?? 0) - (a.ranking ?? 0))
}

export function getRelatedTripsBySlug(slug: string): Trip[] {
  const trip = trips.find(t => t.slug === slug)
  if (!trip || !trip.relatedTrips.length) return []
  return trip.relatedTrips
    .map(relatedTrip => trips.find(t => t.slug === relatedTrip.slug && t.active))
    .filter((t): t is Trip => t !== undefined)
}
