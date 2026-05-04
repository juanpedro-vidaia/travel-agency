'use client'

import { useEffect, useRef, useMemo } from 'react'
import 'leaflet/dist/leaflet.css'
import type { ResolvedAccommodationStop } from '@/lib/services/itinerariesService'
import allDestinations from '@/lib/data/destinations'

interface MapStop {
  destinationId: string
  name: string
  lat: number
  lng: number
  orders: number[]
  totalNights: number
  hotels: string[]
}

export default function ItineraryMap({
  accommodationStops,
  nightLabel,
  nightsLabel,
}: {
  accommodationStops: ResolvedAccommodationStop[]
  nightLabel: string
  nightsLabel: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)

  const { stops, polylineCoords } = useMemo(() => {
    const stopsByDest = new Map<string, MapStop>()
    const polylineCoords: [number, number][] = []

    accommodationStops.forEach((stop, index) => {
      const order = index + 1
      const destId = stop.defaultHotel?.destinationId
      if (!destId) return

      const dest = allDestinations.find(d => d.id === destId)
      if (!dest || dest.lat == null || dest.lng == null) return

      const coord: [number, number] = [dest.lat, dest.lng]
      polylineCoords.push(coord)

      const hotelName = stop.defaultHotel?.content.es.name ?? ''

      const existing = stopsByDest.get(destId)
      if (existing) {
        existing.orders.push(order)
        existing.totalNights += stop.nights
        if (hotelName && !existing.hotels.includes(hotelName)) {
          existing.hotels.push(hotelName)
        }
      } else {
        stopsByDest.set(destId, {
          destinationId: destId,
          name: dest.content.es.name,
          lat: dest.lat,
          lng: dest.lng,
          orders: [order],
          totalNights: stop.nights,
          hotels: hotelName ? [hotelName] : [],
        })
      }
    })

    return { stops: Array.from(stopsByDest.values()), polylineCoords }
  }, [accommodationStops])

  useEffect(() => {
    if (!containerRef.current || stops.length === 0) return

    let cancelled = false

    import('leaflet').then(L => {
      if (cancelled || mapRef.current || !containerRef.current) return

      const map = L.map(containerRef.current, { scrollWheelZoom: false })

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 18,
        }
      ).addTo(map)

      // Polyline connecting stops in travel order
      if (polylineCoords.length > 1) {
        L.polyline(polylineCoords, {
          color: '#5ea6ae',
          weight: 2.5,
          dashArray: '8, 8',
          opacity: 0.8,
        }).addTo(map)
      }

      // Markers
      stops.forEach(stop => {
        const orderLabel = stop.orders.join(', ')
        const nightsText =
          stop.totalNights === 1 ? `1 ${nightLabel}` : `${stop.totalNights} ${nightsLabel}`
        const hotelsHtml = stop.hotels
          .map(
            h =>
              `<div style="display:flex;align-items:flex-start;gap:5px;margin-top:4px"><span style="flex-shrink:0">🏨</span><span>${h}</span></div>`
          )
          .join('')

        const icon = L.divIcon({
          html: `<div style="display:inline-flex;flex-direction:column;align-items:center;gap:3px;transform:translateX(-50%)">
            <div style="background:#1a4a52;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;box-shadow:0 2px 6px rgba(0,0,0,0.4);border:2px solid white;flex-shrink:0">${orderLabel}</div>
            <div style="background:white;color:#1a4a52;border-radius:20px;padding:2px 8px;font-size:11px;font-weight:600;box-shadow:0 1px 4px rgba(0,0,0,0.18);border:1.5px solid #c0e8ec;white-space:nowrap;max-width:140px;overflow:hidden;text-overflow:ellipsis;text-align:center">${stop.name}</div>
          </div>`,
          className: '',
          iconSize: [0, 0],
          iconAnchor: [0, 15],
          popupAnchor: [0, -22],
        })

        const popupContent = `<div style="min-width:160px;max-width:220px;font-family:system-ui,sans-serif;padding:2px">
          <div style="font-size:15px;font-weight:700;color:#1a4a52;margin-bottom:6px">${stop.name}</div>
          <div style="font-size:13px;color:#5ea6ae;font-weight:600">🌙 ${nightsText}</div>
          ${hotelsHtml ? `<div style="font-size:12px;color:#555;margin-top:6px;border-top:1px solid #e5e5e5;padding-top:6px">${hotelsHtml}</div>` : ''}
        </div>`

        L.marker([stop.lat, stop.lng], { icon })
          .bindPopup(popupContent, { maxWidth: 250, closeButton: false })
          .addTo(map)
      })

      // Fit map to show all stops
      if (stops.length === 1) {
        map.setView([stops[0].lat, stops[0].lng], 7)
      } else {
        const bounds = L.latLngBounds(
          stops.map(s => [s.lat, s.lng] as [number, number])
        )
        map.fitBounds(bounds, { padding: [50, 50] })
      }

      mapRef.current = map
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [stops, polylineCoords])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden shadow-sm border border-vidaia-light"
      style={{ height: 480 }}
      aria-label="Mapa del itinerario"
    />
  )
}
