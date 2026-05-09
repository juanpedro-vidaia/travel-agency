'use client'

import { useFormContext, useController } from 'react-hook-form'
import { FieldLabel, RadioPill } from './FormPrimitives'
import { CheckCard } from './FormPrimitives'
import { inputCls } from './FormPrimitives'
import { FieldError } from './FormPrimitives'
import { TAG_CONFIG, type TripTag } from '@/lib/data/trips'
import type { FormPayload } from '@/lib/form-utils'

interface Paso2Props {
  t: {
    title: string
    departureAirportLabel: string
    departureAirportPlaceholder: string
    experienceLabel: string
    experienceOptional: string
    accommodationLabel: string
    budgetLabel: string
    budgetPlaceholder: string
    budgetOptions: { value: string; label: string }[]
    accommodationOptions: { value: string; label: string }[]
  }
  origin: 'generic' | 'itinerary'
}

export default function Paso2ComoViajar({ t }: Paso2Props) {
  const { register, watch, setValue } = useFormContext<FormPayload>()
  const { field: experiencesField } = useController({ name: 'experiences' })

  const selectedExperiences = watch('experiences') ?? []
  const accommodation = watch('accommodation')
  const budget = watch('budget')

  const toggleExperience = (tag: string) => {
    const current = experiencesField.value as string[]
    experiencesField.onChange(
      current.includes(tag) ? current.filter(e => e !== tag) : [...current, tag]
    )
  }

  const tags = Object.entries(TAG_CONFIG) as [TripTag, typeof TAG_CONFIG[TripTag]][]

  return (
    <div className="space-y-8">

      {/* Aeropuerto de salida */}
      <div>
        <FieldLabel text={t.departureAirportLabel} />
        <input
          type="text"
          {...register('departureAirport')}
          placeholder={t.departureAirportPlaceholder}
          className={inputCls}
        />
      </div>

      {/* Tipo de experiencia */}
      <fieldset>
        <FieldLabel text={t.experienceLabel} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {tags.map(([key, config]) => (
            <CheckCard
              key={key}
              checked={selectedExperiences.includes(key)}
              onChange={() => toggleExperience(key)}
              emoji={config.icon}
              label={config.es.label}
            />
          ))}
        </div>
      </fieldset>

      {/* Alojamiento */}
      <fieldset>
        <FieldLabel text={t.accommodationLabel} />
        <div className="flex flex-wrap gap-2">
          {t.accommodationOptions.map(opt => (
            <RadioPill
              key={opt.value}
              selected={accommodation === opt.value}
              onSelect={() => setValue('accommodation', accommodation === opt.value ? null : opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </fieldset>

      {/* Presupuesto */}
      <div>
        <FieldLabel text={t.budgetLabel} />
        <select
          value={budget ?? ''}
          onChange={e => setValue('budget', e.target.value || null)}
          className={inputCls}
        >
          <option value="">{t.budgetPlaceholder}</option>
          {t.budgetOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

    </div>
  )
}
