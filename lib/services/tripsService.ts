import trips from '../data/trips'
import type { Trip } from '../data/trips'

export function getTrips(): Trip[] {
  return trips.filter(t => t.active)
}

export function getTripsByCountry(country: string): Trip[] {
  return trips.filter(t => {
    const countries = (Array.isArray(t.country) ? t.country : [t.country]) as string[]
    return countries.includes(country) && t.active
  })
}

export function getFeaturedTrips(): Trip[] {
  return trips.filter(t => t.featured && t.active)
}

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find(t => t.slug === slug && t.active)
}

export function getHoneymoonTrips(): Trip[] {
  return trips.filter(t => t.honeymoonFeatured && t.active)
}

export function getRelatedTripsBySlug(slug: string): Trip[] {
  const trip = trips.find(t => t.slug === slug)
  if (!trip || !trip.relatedTrips.length) return []
  return trip.relatedTrips
    .map(r => trips.find(t => t.slug === r.slug && t.active))
    .filter((t): t is Trip => t !== undefined)
}
