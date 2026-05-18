import destinations from '../data/destinations'
import type { Destination } from '../data/destinations'
import type { CountrySlug as Country } from '../data/countries'

export function getDestinations(): Destination[] {
  return destinations.filter(destination => destination.active)
}

export function getDestinationsByCountry(country: Country): Destination[] {
  return destinations.filter(destination => destination.country === country && destination.active)
}

export function getFeaturedDestinationsByCountry(country: Country): Destination[] {
  return destinations.filter(destination => destination.country === country && destination.featured)
}

export function getFeaturedDestinationsGrouped(): Record<Country, Destination[]> {
  const grouped = {} as Record<Country, Destination[]>
  for (const d of destinations.filter(d => d.featured)) {
    if (!grouped[d.country]) grouped[d.country] = []
    grouped[d.country].push(d)
  }
  return grouped
}

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(destination => destination.id === id && destination.active)
}
