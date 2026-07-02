import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight } from 'lucide-react'
import { getTripsByCountry } from '@/lib/services/tripsService'
import { getCountryBySlug, getCountries } from '@/lib/services/countriesService'
import { getFAQsByPage } from '@/lib/services/faqsService'
import TripCard from '@/components/ui/TripCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import DestinationBackButton from '@/app/[lang]/destinos/[slug]/DestinationBackButton'
import DestinationHeroImage from '@/app/[lang]/destinos/[slug]/DestinationHeroImage'
import FaqSection from '@/components/sections/FaqSection'
import JsonLd from '@/components/scripts/JsonLd'
import { getStaticContent } from '@/lib/helpers/contentHelpers'
import { buildMetadata } from '@/lib/helpers/seo'
import { getDestinationsByCountry } from '@/lib/services/destinationsService'
import type { CountrySlug } from '@/lib/data/countries'
import { buildPageSchema, buildTouristDestinationSchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema'
import { getAsset } from '@/lib/data/assets'
import { renderTemplate } from '@/lib/helpers/contentHelpers'
import SectionHeader from '@/components/sections/SectionHeader'
import ViewTracker from '@/components/analytics/ViewTracker'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) return {}
  const c = (country.content[lang as keyof typeof country.content] ?? country.content.es)
  const destinationContent = getStaticContent(lang).destinationPage
  return buildMetadata({
    title: renderTemplate(destinationContent.metaTitleTemplate, { country: c.name }),
    description: c.metaDescription + destinationContent.metaDescriptionSuffix,
    path: `/${lang}/destinos/${slug}`,
    lang,
  })
}

export function generateStaticParams() {
  const countries = getCountries()
  return ENABLED_LANGUAGES.flatMap(lang =>
    countries.map(c => ({ lang, slug: c.slug }))
  )
}

export default async function CountryPage({ params }: Props) {
  const { lang, slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) notFound()

  const trips = getTripsByCountry(country.id)
  const content = getStaticContent(lang).destinationPage
  const countryT = (country.content[lang as keyof typeof country.content] ?? country.content.es)
  const countryName = countryT.name
  const heroAsset = getAsset(country.heroImageKey)
  const flagAsset = getAsset(`FLAGS.${country.flagCode.toUpperCase()}`)
  const destinationFaqs = getFAQsByPage('destination', country.slug)

  const countryDests = getDestinationsByCountry(country.slug as CountrySlug)

  // Una sola fuente de verdad: mismos items para el schema y el breadcrumb visible
  const breadcrumbItems = [
    { name: 'Inicio', path: '' },
    { name: 'Viajes', path: '/viajes' },
    { name: countryName },
  ]

  return (
    <>
      <ViewTracker event="destination_view" params={{ destination_slug: slug }} />
      <JsonLd data={buildPageSchema(
        buildTouristDestinationSchema(country, countryDests),
        buildBreadcrumbSchema(lang, breadcrumbItems),
        ...(destinationFaqs.length > 0 ? [buildFAQSchema(destinationFaqs.map(f => f.es))] : []),
      )} id="ld-destination" />
      <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-dvh md:h-screen min-h-[600px] md:min-h-[620px] flex items-end overflow-hidden">
        <DestinationHeroImage asset={heroAsset} />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 w-full">
          <p className="flex items-center gap-2 text-vidaia-earth font-semibold uppercase tracking-widest text-xs mb-3">
            <Image src={flagAsset.url} alt={flagAsset.alt} width={20} height={15} className="rounded-xs shrink-0" />
            {renderTemplate(content.hero.taglineTemplate, { country: countryName })}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white mb-4 text-balance max-w-2xl">
            {renderTemplate(content.hero.titleTemplate, { country: countryName })}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed text-balance">
            {countryT.metaDescription.split('. ')[0]}{content.hero.descriptionSuffix}
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB + VOLVER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <Suspense fallback={null}>
        <DestinationBackButton lang={lang} label={content.backButton} />
      </Suspense>

      {/* ── INTRODUCCIÓN ── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-vidaia-charcoal/80 text-lg sm:text-xl leading-relaxed">
            {countryT.description}{' '}
            <strong className="text-vidaia-dark">{content.hero.quote}</strong>
          </p>
        </div>
      </section>

      {/* ── GRID DE VIAJES ── */}
      {trips.length > 0 && (
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              overline={renderTemplate(content.section.overlineTemplate, { country: countryName })}
              title={renderTemplate(content.section.titleTemplate, { country: countryName })}
              subtitle={content.section.subtitle}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  lang={lang}
                  strings={{
                    variant: 'default',
                    durationTemplate: content.tripCard.durationTemplate,
                    priceTemplate: content.tripCard.priceTemplate,
                    ctaHasItinerary: content.tripCard.ctaHasItinerary,
                    ctaNoItinerary: content.tripCard.ctaNoItinerary,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      <FaqSection
        title={content.faqSection.title}
        subtitle={renderTemplate(content.faqSection.subtitle, { country: countryName })}
        faqs={destinationFaqs.map(f => ({ id: f.id, ...f.es }))}
      />

      {/* ── CTA FINAL ── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-dark text-white text-center">
        <div className="max-w-xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            {content.cta.overline}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight">{content.cta.title}</h2>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            {renderTemplate(content.cta.descriptionTemplate, { country: countryName })}
          </p>
          <Link
            href={`/${lang}/itinerarios/personalizar`}
            className="inline-flex items-center gap-2 bg-vidaia-earthDark hover:bg-vidaia-brown text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
          >
            {content.cta.button}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      </main>
    </>
  )
}
