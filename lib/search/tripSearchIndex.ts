/**
 * Trip search index — built once, reused across renders.
 *
 * Dataset is small (< 20 trips), so we use normalize + includes instead of
 * fuse.js to avoid an extra dependency. NFD normalization handles accents
 * (e.g. "naturaleza" matches "Naturaleza", "machu" matches "Machu Picchu").
 */

import trips from '@/lib/data/trips'
import type { Trip, TripTag } from '@/lib/data/trips'
import { TAG_CONFIG } from '@/lib/data/trips'

// ── Search entry ──────────────────────────────────────────────────────────────

interface TripSearchEntry {
  trip: Trip
  searchableText: string
}

// ── Normalise helper ──────────────────────────────────────────────────────────

function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// ── Index construction (runs once at module load) ─────────────────────────────

function buildIndex(): TripSearchEntry[] {
  return trips
    .filter(t => t.active)
    .map(trip => {
      const countries = (Array.isArray(trip.country) ? trip.country : [trip.country]).join(' ')
      const tagLabels  = trip.tags.map(tag => TAG_CONFIG[tag].es.label).join(' ')

      const parts = [
        trip.content.es.title,
        trip.content.es.subtitle,
        trip.content.en?.title ?? '',
        trip.content.en?.subtitle ?? '',
        countries,
        tagLabels,
        String(trip.days),
      ]

      return {
        trip,
        searchableText: normalize(parts.join(' ')),
      }
    })
}

const INDEX: TripSearchEntry[] = buildIndex()

// ── Filters type ──────────────────────────────────────────────────────────────

export interface TripFilters {
  query: string
  minDays: number
  maxDays: number
  minPrice: number
  maxPrice: number
  countries: string[]  // country slugs, e.g. ['argentina', 'chile']
  tags: TripTag[]
}

// ── Public search function ────────────────────────────────────────────────────

export function searchTrips(filters: TripFilters): Trip[] {
  const { query, minDays, maxDays, minPrice, maxPrice, countries, tags } = filters
  const normalizedQuery = normalize(query)

  return INDEX
    .filter(({ trip, searchableText }) => {
      if (normalizedQuery && !searchableText.includes(normalizedQuery)) return false

      if (trip.days < minDays || trip.days > maxDays) return false

      if (trip.priceFrom < minPrice || trip.priceFrom > maxPrice) return false

      if (countries.length > 0) {
        const tripCountries = Array.isArray(trip.country) ? trip.country : [trip.country]
        const hasCountry = countries.some(c => (tripCountries as string[]).includes(c))
        if (!hasCountry) return false
      }

      if (tags.length > 0) {
        const hasTag = tags.some(tag => trip.tags.includes(tag))
        if (!hasTag) return false
      }

      return true
    })
    .map(e => e.trip)
    .sort((a, b) => (b.ranking ?? 0) - (a.ranking ?? 0))
}

export const MAX_DAYS   = Math.max(...trips.filter(t => t.active).map(t => t.days))
export const MIN_PRICE  = Math.min(...trips.filter(t => t.active).map(t => t.priceFrom))
export const MAX_PRICE  = Math.max(...trips.filter(t => t.active).map(t => t.priceFrom))
