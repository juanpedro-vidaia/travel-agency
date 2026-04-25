import trips from '../data/trips'
import type { Trip } from '../data/trips'
import type { Country } from '../data/destinations'

export function getTrips(): Trip[] {
  return trips.filter(t => t.active)
}

export function getTripsByCountry(country: Country): Trip[] {
  return trips.filter(t => t.country === country && t.active)
}

export function getFeaturedTrips(): Trip[] {
  return trips.filter(t => t.featured && t.active)
}

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find(t => t.slug === slug && t.active)
}
