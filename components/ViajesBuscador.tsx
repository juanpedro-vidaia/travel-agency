'use client'

import { useState, useMemo, useCallback } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import TripCard from '@/components/TripCard'
import LangLink from '@/components/LangLink'
import { searchTrips, MAX_DAYS, MIN_PRICE, MAX_PRICE, type TripFilters } from '@/lib/search/tripSearchIndex'
import { TAG_CONFIG, type TripTag } from '@/lib/data/trips'
import type { Trip } from '@/lib/data/trips'
import { renderTemplate, formatPrice } from '@/lib/helpers/contentHelpers'

interface CountryOption {
  id: string
  name: string
  flagCode: string
}

interface BuscadorStrings {
  searchPlaceholder: string
  advancedFilters: string
  resetFilters: string
  durationLabel: string
  destinationsLabel: string
  tagsLabel: string
  budgetLabel: string
  resultsCount: string
  resultsCountPlural: string
  emptyTitle: string
  emptyDescription: string
  emptyCta: string
}

interface TripCardStrings {
  durationTemplate: string
  priceTemplate: string
  ctaHasItinerary: string
  ctaNoItinerary: string
}

interface ViajesBuscadorProps {
  lang: string
  allTrips: Trip[]
  countries: CountryOption[]
  strings: BuscadorStrings
  tripCardStrings: TripCardStrings
}

const ALL_TAGS = Object.keys(TAG_CONFIG) as TripTag[]

// ── Dual range slider ─────────────────────────────────────────────────────────

interface DualRangeProps {
  min: number
  max: number
  valueMin: number
  valueMax: number
  onChangeMin: (v: number) => void
  onChangeMax: (v: number) => void
  formatValue?: (v: number) => string
  step?: number
}

function DualRange({ min, max, valueMin, valueMax, onChangeMin, onChangeMax, formatValue, step = 1 }: DualRangeProps) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100
  const fmt = formatValue ?? String

  return (
    <div className="w-full">
      {/* Track + coloured fill */}
      <div className="relative h-2 bg-vidaia-light rounded-full mb-4">
        <div
          className="absolute h-full bg-vidaia-primary rounded-full"
          style={{ left: `${pct(valueMin)}%`, right: `${100 - pct(valueMax)}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={e => onChangeMin(Math.min(Number(e.target.value), valueMax - step))}
          className="dual-range-thumb absolute w-full h-full opacity-0 cursor-pointer"
          aria-label="Mínimo"
        />
        {/* Max thumb — layered on top so both are accessible */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={e => onChangeMax(Math.max(Number(e.target.value), valueMin + step))}
          className="dual-range-thumb absolute w-full h-full opacity-0 cursor-pointer"
          aria-label="Máximo"
        />
      </div>
      <div className="flex justify-between text-xs text-vidaia-charcoal/60 font-medium">
        <span>{fmt(valueMin)}</span>
        <span>{fmt(valueMax)}</span>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ViajesBuscador({
  lang,
  allTrips,
  countries,
  strings,
  tripCardStrings,
}: ViajesBuscadorProps) {
  const [query,             setQuery]             = useState('')
  const [showFilters,       setShowFilters]       = useState(false)
  const [minDays,           setMinDays]           = useState(0)
  const [maxDays,           setMaxDays]           = useState(MAX_DAYS)
  const [minPrice,          setMinPrice]          = useState(MIN_PRICE)
  const [maxPrice,          setMaxPrice]          = useState(MAX_PRICE)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedTags,      setSelectedTags]      = useState<TripTag[]>([])

  const hasActiveFilters = useMemo(
    () =>
      query !== '' ||
      minDays > 0 ||
      maxDays < MAX_DAYS ||
      minPrice > MIN_PRICE ||
      maxPrice < MAX_PRICE ||
      selectedCountries.length > 0 ||
      selectedTags.length > 0,
    [query, minDays, maxDays, minPrice, maxPrice, selectedCountries, selectedTags]
  )

  const results = useMemo<Trip[]>(() => {
    if (!hasActiveFilters) return allTrips
    const filters: TripFilters = { query, minDays, maxDays, minPrice, maxPrice, countries: selectedCountries, tags: selectedTags }
    return searchTrips(filters)
  }, [query, minDays, maxDays, minPrice, maxPrice, selectedCountries, selectedTags, hasActiveFilters, allTrips])

  const reset = useCallback(() => {
    setQuery('')
    setMinDays(0)
    setMaxDays(MAX_DAYS)
    setMinPrice(MIN_PRICE)
    setMaxPrice(MAX_PRICE)
    setSelectedCountries([])
    setSelectedTags([])
  }, [])

  const toggleCountry = useCallback((id: string) =>
    setSelectedCountries(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]), [])

  const toggleTag = useCallback((tag: TripTag) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]), [])

  const countLabel = results.length === 1
    ? renderTemplate(strings.resultsCount, { count: results.length })
    : renderTemplate(strings.resultsCountPlural, { count: results.length })

  return (
    <section id="buscador-viajes" className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-sand">
      <div className="max-w-6xl mx-auto">

        {/* ── Zona A: search bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vidaia-charcoal/40 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={strings.searchPlaceholder}
              aria-label={strings.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-vidaia-light bg-white text-vidaia-charcoal placeholder:text-vidaia-charcoal/40 focus:outline-none focus:ring-2 focus:ring-vidaia-primary text-base"
            />
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm transition-colors ${
              showFilters
                ? 'bg-vidaia-dark text-white'
                : 'bg-white border border-vidaia-light text-vidaia-charcoal hover:bg-vidaia-light'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {strings.advancedFilters}
          </button>
          {hasActiveFilters && (
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm bg-vidaia-earth/10 hover:bg-vidaia-earth/20 text-vidaia-earth border border-vidaia-earth/30 transition-colors"
            >
              <X className="w-4 h-4" />
              {strings.resetFilters}
            </button>
          )}
        </div>

        {/* ── Zona B: filtros avanzados ── */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-vidaia-light p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Duración */}
            <fieldset>
              <legend className="text-xs font-bold text-vidaia-dark uppercase tracking-widest mb-4">
                {strings.durationLabel}
              </legend>
              <DualRange
                min={0}
                max={MAX_DAYS}
                valueMin={minDays}
                valueMax={maxDays}
                onChangeMin={setMinDays}
                onChangeMax={setMaxDays}
                formatValue={v => `${v} días`}
              />
            </fieldset>

            {/* Presupuesto */}
            <fieldset>
              <legend className="text-xs font-bold text-vidaia-dark uppercase tracking-widest mb-4">
                {strings.budgetLabel}
              </legend>
              <DualRange
                min={MIN_PRICE}
                max={MAX_PRICE}
                valueMin={minPrice}
                valueMax={maxPrice}
                onChangeMin={setMinPrice}
                onChangeMax={setMaxPrice}
                formatValue={v => `${formatPrice(v)}€`}
                step={100}
              />
            </fieldset>

            {/* Destinos */}
            <fieldset>
              <legend className="text-xs font-bold text-vidaia-dark uppercase tracking-widest mb-4">
                {strings.destinationsLabel}
              </legend>
              <div className="space-y-2.5">
                {countries.map(c => (
                  <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(c.id)}
                      onChange={() => toggleCountry(c.id)}
                      className="w-4 h-4 rounded border-vidaia-light accent-vidaia-primary focus:ring-vidaia-primary"
                    />
                    <img
                      src={`https://flagcdn.com/20x15/${c.flagCode}.png`}
                      alt=""
                      width={20}
                      height={15}
                      className="rounded-sm flex-shrink-0"
                    />
                    <span className="text-sm text-vidaia-charcoal group-hover:text-vidaia-primary transition-colors">
                      {c.name}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Tags */}
            <fieldset>
              <legend className="text-xs font-bold text-vidaia-dark uppercase tracking-widest mb-4">
                {strings.tagsLabel}
              </legend>
              <div className="space-y-2.5">
                {ALL_TAGS.map(tag => (
                  <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="w-4 h-4 rounded border-vidaia-light accent-vidaia-primary focus:ring-vidaia-primary"
                    />
                    <span className="text-sm text-vidaia-charcoal group-hover:text-vidaia-primary transition-colors">
                      {TAG_CONFIG[tag].icon} {TAG_CONFIG[tag].es.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {/* ── Zona C: resultados ── */}
        <p className="text-xs text-vidaia-charcoal/50 mb-6 font-medium">{countLabel}</p>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-heading font-bold text-vidaia-dark mb-3">{strings.emptyTitle}</p>
            <p className="text-vidaia-charcoal/60 mb-8">{strings.emptyDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LangLink
                href="/presupuesto"
                className="inline-flex items-center justify-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors"
              >
                {strings.emptyCta}
              </LangLink>
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 bg-white border border-vidaia-light text-vidaia-charcoal hover:bg-vidaia-light font-semibold px-8 py-4 rounded-full transition-colors"
              >
                {strings.resetFilters}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                lang={lang}
                strings={{
                  variant: 'default',
                  durationTemplate: tripCardStrings.durationTemplate,
                  priceTemplate: tripCardStrings.priceTemplate,
                  ctaHasItinerary: tripCardStrings.ctaHasItinerary,
                  ctaNoItinerary: tripCardStrings.ctaNoItinerary,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
