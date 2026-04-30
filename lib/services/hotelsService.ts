import hotels from '../data/hotels'
import type { Hotel } from '../data/hotels'
import type { AccommodationStop } from '../data/itineraries'

export function getHotels(): Hotel[] {
  return hotels.filter(hotel => hotel.active)
}

export function getHotelsByDestination(destinationId: string): Hotel[] {
  return hotels.filter(hotel => hotel.destinationId === destinationId && hotel.active)
}

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find(hotel => hotel.id === id && hotel.active)
}

export function getHotelByStopAndCategory(
  stop: AccommodationStop,
  category: 3 | 4 | 5
): Hotel | undefined {
  const id = stop.hotelsByCategory[String(category) as '3' | '4' | '5']
  if (!id) return undefined
  return getHotelById(id)
}
