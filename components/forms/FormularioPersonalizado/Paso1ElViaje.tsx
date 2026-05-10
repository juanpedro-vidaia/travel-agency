'use client'

import Image from 'next/image'
import { useFormContext, useController } from 'react-hook-form'
import { Check, Globe } from 'lucide-react'
import {
  FieldLabel, CheckPill, RadioPill, NumberStepper, inputCls, inputErrorCls, FieldError,
} from './FormPrimitives'
import type { FormPayload } from '@/lib/form-utils'
import type { Country } from '@/lib/data/countries'
import type { Destination } from '@/lib/data/destinations'

interface Paso1Props {
  t: {
    destinationLabel: string
    otrosLabel: string
    otrosPlaceholder: string
    zonesLabel: string
    dateLabel: string
    datePlaceholder: string
    flexibleLabel: string
    durationLabel: string
    durationPlaceholder: string
    durationUnit: string
    motivoLabel: string
    passengersLabel: string
    adultsLabel: string
    childrenLabel: string
    childrenSublabel: string
    groupTypeLabel: string
  }
  motivoOptions: { value: string; label: string }[]
  groupTypes: { value: string; label: string }[]
  validationMessages: Record<string, string>
  countries: Country[]
  featuredDestinations: Record<string, Destination[]>
  origin: 'generic' | 'itinerary'
  preselectedCountries?: string[]
}

export default function Paso1ElViaje({
  t, motivoOptions, groupTypes, validationMessages,
  countries, featuredDestinations, origin, preselectedCountries,
}: Paso1Props) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<FormPayload>()

  const selectedCountries = watch('countries') ?? []
  const selectedDestinations = watch('destinations') ?? []
  const selectedMotivo = watch('motivo') ?? []
  const adultos = watch('adultos')
  const menores = watch('menores')
  const groupType = watch('groupType')

  const { field: countriesField } = useController({ name: 'countries' })
  const { field: destinationsField } = useController({ name: 'destinations' })
  const { field: motivoField } = useController({ name: 'motivo' })
  const { field: durationField } = useController({ name: 'duration' })

  const toggleCountry = (countryId: string) => {
    const current = countriesField.value as string[]
    const next = current.includes(countryId)
      ? current.filter(c => c !== countryId)
      : [...current, countryId]

    // Remove destinations that belong to deselected country
    if (!next.includes(countryId)) {
      const countryDests = (featuredDestinations[countryId] ?? []).map(d => d.id)
      destinationsField.onChange((destinationsField.value as string[]).filter(d => !countryDests.includes(d)))
    }
    countriesField.onChange(next)
  }

  const toggleDestination = (destId: string) => {
    const current = destinationsField.value as string[]
    destinationsField.onChange(
      current.includes(destId) ? current.filter(d => d !== destId) : [...current, destId]
    )
  }

  const toggleMotivo = (value: string) => {
    const current = motivoField.value as string[]
    motivoField.onChange(
      current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    )
  }

  const activeCountriesWithDests = selectedCountries.filter(
    c => c !== 'otros' && (featuredDestinations[c] ?? []).length > 0
  )

  const hasOtros = selectedCountries.includes('otros')
  const countriesError = errors.countries?.message
    ? validationMessages[errors.countries.message] ?? errors.countries.message
    : undefined
  const durationError = errors.duration?.message
    ? validationMessages[errors.duration.message] ?? errors.duration.message
    : undefined

  return (
    <div className="space-y-8">

      {/* Destinos */}
      <fieldset>
        <FieldLabel text={t.destinationLabel} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {countries.map(country => {
            const checked = selectedCountries.includes(country.id)
            const isPreselected = origin === 'itinerary' && preselectedCountries?.includes(country.id)
            return (
              <label
                key={country.id}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  checked
                    ? 'border-vidaia-primary bg-vidaia-light/60 text-vidaia-dark'
                    : 'border-gray-200 hover:border-vidaia-mid text-gray-700 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCountry(country.id)}
                  className="sr-only"
                />
                <span className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                  checked ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'
                }`}>
                  {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>
                <Image
                  src={`https://flagcdn.com/20x15/${country.flagCode}.png`}
                  alt=""
                  width={20}
                  height={15}
                  className="rounded-sm flex-shrink-0"
                />
                <span className="text-sm font-semibold">{country.content.es.name}</span>
                {isPreselected && (
                  <span className="ml-auto text-xs text-vidaia-primary font-medium">Tu viaje</span>
                )}
              </label>
            )
          })}

          {/* Otros */}
          <label
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
              hasOtros
                ? 'border-vidaia-primary bg-vidaia-light/60 text-vidaia-dark'
                : 'border-gray-200 hover:border-vidaia-mid text-gray-700 bg-white'
            }`}
          >
            <input
              type="checkbox"
              checked={hasOtros}
              onChange={() => toggleCountry('otros')}
              className="sr-only"
            />
            <span className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
              hasOtros ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'
            }`}>
              {hasOtros && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </span>
            <Globe className="w-5 h-5 flex-shrink-0 text-vidaia-charcoal/60" />
            <span className="text-sm font-semibold">{t.otrosLabel}</span>
          </label>
        </div>

        {/* Texto libre cuando se selecciona Otros */}
        {hasOtros && (
          <div className="mt-3">
            <input
              type="text"
              {...register('otrosDestino')}
              placeholder={t.otrosPlaceholder}
              className={inputCls}
            />
          </div>
        )}

        <FieldError message={countriesError} />
      </fieldset>

      {/* Zonas / destinos por país */}
      {activeCountriesWithDests.length > 0 && (
        <div>
          <FieldLabel text={t.zonesLabel} />
          <div className="space-y-5">
            {activeCountriesWithDests.map(countryId => {
              const country = countries.find(c => c.id === countryId)
              if (!country) return null
              const dests = featuredDestinations[countryId] ?? []
              return (
                <div key={countryId}>
                  <p className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2.5">
                    <Image
                      src={`https://flagcdn.com/20x15/${country.flagCode}.png`}
                      alt=""
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                    {country.content.es.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dests.map(dest => (
                      <CheckPill
                        key={dest.id}
                        checked={selectedDestinations.includes(dest.id)}
                        onChange={() => toggleDestination(dest.id)}
                        label={dest.content.es.name}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Fecha */}
      <div>
        <FieldLabel text={t.dateLabel} required />
        <input
          type="date"
          {...register('dateStart')}
          min={new Date().toISOString().split('T')[0]}
          className={errors.dateStart ? inputErrorCls : inputCls}
        />
        <FieldError message={errors.dateStart?.message ? validationMessages[errors.dateStart.message] ?? errors.dateStart.message : undefined} />
        <label className="flex items-center gap-2.5 mt-3 cursor-pointer">
          <input type="checkbox" {...register('flexible')} className="rounded border-gray-300 text-vidaia-primary" />
          <span className="text-sm text-gray-600">{t.flexibleLabel}</span>
        </label>
      </div>

      {/* Duración */}
      <div>
        <FieldLabel text={t.durationLabel} required />
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={durationField.value || ''}
            onChange={e => durationField.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
            onBlur={durationField.onBlur}
            min={1}
            max={365}
            placeholder={t.durationPlaceholder}
            readOnly={origin === 'itinerary'}
            className={`${durationError ? inputErrorCls : inputCls} w-28 text-center text-lg font-semibold ${origin === 'itinerary' ? 'bg-gray-50 cursor-not-allowed' : ''}`}
          />
          <span className="text-sm text-gray-500 font-medium">{t.durationUnit}</span>
          {origin === 'itinerary' && (
            <span className="text-xs text-vidaia-primary font-medium">(preseleccionado)</span>
          )}
        </div>
        <FieldError message={durationError} />
      </div>

      {/* Motivo del viaje */}
      <fieldset>
        <FieldLabel text={t.motivoLabel} />
        <div className="flex flex-wrap gap-2">
          {motivoOptions.map(opt => (
            <CheckPill
              key={opt.value}
              checked={selectedMotivo.includes(opt.value)}
              onChange={() => toggleMotivo(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </fieldset>

      {/* Pasajeros */}
      <div>
        <FieldLabel text={t.passengersLabel} required />
        <div className="bg-gray-50 rounded-2xl px-5 divide-y divide-gray-100">
          <NumberStepper
            label={t.adultsLabel}
            value={adultos ?? 2}
            min={1}
            onChange={v => setValue('adultos', v, { shouldValidate: true })}
          />
          <NumberStepper
            label={t.childrenLabel}
            sublabel={t.childrenSublabel}
            value={menores ?? 0}
            onChange={v => setValue('menores', v)}
          />
        </div>
        <FieldError message={errors.adultos?.message ? validationMessages[errors.adultos.message] ?? errors.adultos.message : undefined} />
      </div>

      {/* Tipo de grupo */}
      <fieldset>
        <FieldLabel text={t.groupTypeLabel} />
        <div className="flex flex-wrap gap-2">
          {groupTypes.map(gt => (
            <RadioPill
              key={gt.value}
              selected={groupType === gt.value}
              onSelect={() => setValue('groupType', groupType === gt.value ? null : gt.value)}
              label={gt.label}
            />
          ))}
        </div>
      </fieldset>

    </div>
  )
}
