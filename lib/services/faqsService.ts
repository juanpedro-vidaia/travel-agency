import faqs, { type FAQ } from '@/lib/data/faqs'
import destinations from '@/lib/data/destinations'
import type { Trip } from '@/lib/data/trips'
import type { ResolvedDay } from '@/lib/services/itinerariesService'

export interface ResolvedFAQ {
  id: string
  question: string
  answer: string
}

export function getFAQsByPage(page: FAQ['page'], refId?: string): FAQ[] {
  return faqs
    .filter(f =>
      f.active &&
      f.page === page &&
      (refId === undefined ? f.refId === undefined : f.refId === refId)
    )
    .sort((a, b) => a.order - b.order)
}

export function generateItineraryFAQs(
  trip: Trip,
  days: ResolvedDay[],
  lang: 'es' = 'es'
): ResolvedFAQ[] {
  const seen = new Set<string>()
  const destNames: string[] = []
  for (const day of days) {
    if (day.destinationId && !seen.has(day.destinationId)) {
      seen.add(day.destinationId)
      const dest = destinations.find(d => d.id === day.destinationId)
      if (dest) destNames.push((dest.content[lang] ?? dest.content.es).name)
    }
  }

  const MONTH_NAMES: Record<number, string> = {
    1: 'enero', 2: 'febrero', 3: 'marzo', 4: 'abril', 5: 'mayo', 6: 'junio',
    7: 'julio', 8: 'agosto', 9: 'septiembre', 10: 'octubre', 11: 'noviembre', 12: 'diciembre',
  }

  const vars: Record<string, string> = {
    days: String(trip.days),
    nights: String(trip.nights),
    destinations: destNames.join(', '),
    price_from: trip.priceFrom ? trip.priceFrom.toLocaleString('es-ES') + '€' : '',
    best_months: (trip.bestMonths ?? []).map(m => MONTH_NAMES[m]).join(', '),
    domestic_flights: trip.includesDomesticFlights
      ? 'Los vuelos domésticos entre destinos están incluidos. '
      : '',
    international_flights: trip.includesInternationalFlights
      ? 'Los vuelos internacionales desde España están incluidos. '
      : '',
  }

  const conditions: Record<string, boolean> = {
    hasDomesticFlights: trip.includesDomesticFlights,
    hasInternationalFlights: trip.includesInternationalFlights,
    hasPriceFrom: !!(trip.priceFrom && trip.priceFrom > 0),
    hasBestMonths: !!(trip.bestMonths?.length),
  }

  return faqs
    .filter(f => f.active && f.page === 'itinerary' && (!f.onlyIf || conditions[f.onlyIf]))
    .sort((a, b) => a.order - b.order)
    .map(f => {
      const c = lang === 'es' ? f.es : (f.en ?? f.es)
      return {
        id: f.id,
        question: resolveVars(c.question, vars),
        answer: resolveVars(c.answer, vars),
      }
    })
}

function resolveVars(text: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{{${k}}}`, v), text)
}
