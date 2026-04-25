import hotels from '../data/hotels'
import type { Hotel } from '../data/hotels'
import type { HotelStopDef } from '../data/itineraries'

export function getHotels(): Hotel[] {
  return hotels.filter(h => h.active)
}

export function getHotelsByDestination(destinationId: string): Hotel[] {
  return hotels.filter(h => h.destinationId === destinationId && h.active)
}

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find(h => h.id === id && h.active)
}

export function getHotelByStopAndCategory(
  stop: HotelStopDef,
  category: 3 | 4 | 5
): Hotel | undefined {
  const id = stop.hotelByCategory[String(category) as '3' | '4' | '5']
  if (!id) return undefined
  return getHotelById(id)
}
