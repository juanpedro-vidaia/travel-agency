import destinations from '../data/destinations'
import type { Destination, Country } from '../data/destinations'

export function getDestinations(): Destination[] {
  return destinations.filter(d => d.active)
}

export function getDestinationsByCountry(country: Country): Destination[] {
  return destinations.filter(d => d.country === country && d.active)
}

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(d => d.id === id && d.active)
}
