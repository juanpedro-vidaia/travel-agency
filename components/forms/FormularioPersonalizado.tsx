'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider, type SubmitHandler, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, STEP_FIELDS, type FormPayload } from '@/lib/form-utils'
import StepIndicator from './FormularioPersonalizado/StepIndicator'
import BreadcrumbPersonalizar from './FormularioPersonalizado/BreadcrumbPersonalizar'
import Paso1ElViaje from './FormularioPersonalizado/Paso1ElViaje'
import Paso2ComoViajar from './FormularioPersonalizado/Paso2ComoViajar'
import Paso3Contacto from './FormularioPersonalizado/Paso3Contacto'
import type { Country } from '@/lib/data/countries'
import type { Destination } from '@/lib/data/destinations'

interface ItineraryData {
  id: string
  slug: string
  title: string
  countryId: string
  countryName: string
  countrySlug: string
  countryFlagCode: string
  duration?: number
  tags?: string[]
  destinationIds?: string[]
}

interface FormContent {
  hero: {
    genericTitle: string
    genericSubtitle: string
    itineraryTitlePrefix: string
    customizingLabel: string
    personalizar: string
  }
  steps: { step1: string; step2: string; step3: string }
  step1: Record<string, string>
  step2: {
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
  step3: Record<string, string>
  motivoOptions: { value: string; label: string }[]
  groupTypes: { value: string; label: string }[]
  buttons: { next: string; back: string; send: string; sending: string }
  validation: Record<string, string>
  error: { generic: string }
}

interface FormularioPersonalizadoProps {
  origin: 'generic' | 'itinerary'
  itineraryData?: ItineraryData
  countries: Country[]
  featuredDestinations: Record<string, Destination[]>
  t: FormContent
  successPath: string
}

export default function FormularioPersonalizado({
  origin,
  itineraryData,
  countries,
  featuredDestinations,
  t,
  successPath,
}: FormularioPersonalizadoProps) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const preselectedCountries = itineraryData ? [itineraryData.countryId] : []
  const preselectedDestinations = itineraryData?.destinationIds ?? []
  const preselectedExperiences = itineraryData?.tags ?? []

  const methods = useForm<FormPayload>({
    resolver: zodResolver(formSchema) as Resolver<FormPayload>,
    mode: 'onTouched',
    defaultValues: {
      origin,
      itinerarySlug: itineraryData?.slug,
      itineraryId: itineraryData?.id,
      countries: preselectedCountries,
      otrosDestino: '',
      destinations: preselectedDestinations,
      dateStart: '',
      flexible: false,
      duration: itineraryData?.duration ?? 0,
      motivo: [],
      adultos: 2,
      menores: 0,
      groupType: null,
      departureAirport: '',
      experiences: preselectedExperiences,
      accommodation: null,
      budget: null,
      idea: '',
      nombre: '',
      email: '',
      telefono: '',
    },
  })

  const goNext = async () => {
    const fields = STEP_FIELDS[step]
    const valid = await methods.trigger(fields)
    if (!valid) return
    setStep(s => Math.min(3, s + 1) as 1 | 2 | 3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setStep(s => Math.max(1, s - 1) as 1 | 2 | 3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit: SubmitHandler<FormPayload> = async (data) => {
    setSubmitError(null)
    try {
      const res = await fetch('/api/forms/presupuesto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          referrer: document.referrer || undefined,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') ?? undefined,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') ?? undefined,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') ?? undefined,
        }),
      })
      if (res.ok) {
        router.push(successPath)
      } else {
        setSubmitError(t.error.generic)
      }
    } catch {
      setSubmitError(t.error.generic)
    }
  }

  const isSubmitting = methods.formState.isSubmitting

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-white">

        {/* Mini hero */}
        <section className="bg-vidaia-dark pt-24 md:pt-28 pb-10 md:pb-14 text-center">
          <div className="max-w-2xl mx-auto px-4">
            {origin === 'itinerary' && itineraryData && (
              <div className="mb-5 flex justify-center">
                <BreadcrumbPersonalizar
                  countryName={itineraryData.countryName}
                  countrySlug={itineraryData.countrySlug}
                  itineraryName={itineraryData.title}
                  itinerarySlug={itineraryData.slug}
                  personalizarLabel={t.hero.personalizar}
                />
              </div>
            )}
            {origin === 'itinerary' && (
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-white/10 backdrop-blur-xs border border-white/15 text-vidaia-earth font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
                  {t.hero.customizingLabel}
                </span>
              </div>
            )}
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
              {origin === 'generic' ? t.hero.genericTitle : itineraryData?.title}
            </h1>
            {origin === 'generic' && (
              <p className="text-white/60 text-base sm:text-lg leading-relaxed">{t.hero.genericSubtitle}</p>
            )}
          </div>
        </section>

        {/* Step indicator */}
        <StepIndicator currentStep={step} labels={t.steps} />

        {/* Form */}
        <section className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>

              {step === 1 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8">
                  <Paso1ElViaje
                    t={t.step1 as Parameters<typeof Paso1ElViaje>[0]['t']}
                    motivoOptions={t.motivoOptions}
                    groupTypes={t.groupTypes}
                    validationMessages={t.validation}
                    countries={countries}
                    featuredDestinations={featuredDestinations}
                    origin={origin}
                    preselectedCountries={preselectedCountries}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8">
                  <Paso2ComoViajar t={t.step2} origin={origin} />
                </div>
              )}

              {step === 3 && (
                <Paso3Contacto
                  t={t.step3 as Parameters<typeof Paso3Contacto>[0]['t']}
                  validationMessages={t.validation}
                />
              )}

              {/* Error global */}
              {submitError && (
                <p className="mt-4 text-sm text-red-500 text-center">{submitError}</p>
              )}

              {/* Navigation */}
              <div className="mt-8 flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-vidaia-mid transition-all"
                  >
                    {t.buttons.back}
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex-1 py-3.5 bg-vidaia-primary hover:bg-vidaia-mid text-white font-bold text-sm rounded-2xl transition-all shadow-xs hover:shadow-md active:scale-[0.98]"
                  >
                    {t.buttons.next}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-vidaia-earth hover:bg-vidaia-brown text-white font-bold text-sm rounded-2xl transition-all shadow-xs hover:shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t.buttons.sending : t.buttons.send}
                  </button>
                )}
              </div>

            </form>
          </div>
        </section>

        {/* Mobile sticky CTA — only on last step */}
        {step === 3 && (
          <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-xs border-t border-vidaia-light px-4 py-3 shadow-2xl">
            <button
              form="personalizar-form"
              type="submit"
              disabled={isSubmitting}
              onClick={methods.handleSubmit(onSubmit)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-vidaia-earth hover:bg-vidaia-brown text-white font-bold text-base rounded-2xl transition-colors disabled:opacity-60"
            >
              {isSubmitting ? t.buttons.sending : t.buttons.send}
            </button>
          </div>
        )}

      </div>
    </FormProvider>
  )
}
