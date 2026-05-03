import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getTripsByCountry } from '@/lib/services/tripsService'
import { getCountryBySlug, getCountries } from '@/lib/services/countriesService'
import TripCard from '@/components/TripCard'
import { getStaticContent } from '@/lib/helpers/contentHelpers'
import { buildMetadata } from '@/lib/helpers/seo'
import { getAsset } from '@/lib/data/assets'
import { renderTemplate } from '@/lib/helpers/contentHelpers'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) return {}
  const c = (country.content[lang as keyof typeof country.content] ?? country.content.es)
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
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

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <Image src={heroAsset.url} alt={heroAsset.alt} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p className="flex items-center gap-2 text-vidaia-earth font-semibold uppercase tracking-widest text-xs mb-3">
            <img src={flagAsset.url} alt={flagAsset.alt} width={20} height={15} className="rounded-sm flex-shrink-0" />
            {renderTemplate(content.hero.taglineTemplate, { country: countryName })}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance max-w-2xl">
            {renderTemplate(content.hero.titleTemplate, { country: countryName })}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed text-balance">
            {countryT.metaDescription.split('. ')[0]}{content.hero.descriptionSuffix}
          </p>
        </div>
      </section>

      {/* ── INTRODUCCIÓN ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-vidaia-charcoal/80 text-lg sm:text-xl leading-relaxed">
            {countryT.description}{' '}
            <strong className="text-vidaia-dark">{content.hero.quote}</strong>
          </p>
        </div>
      </section>

      {/* ── GRID DE VIAJES ── */}
      {trips.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
              {renderTemplate(content.section.titleTemplate, { country: countryName })}
            </h2>
            <p className="text-center text-vidaia-charcoal/55 text-sm mb-14">{content.section.subtitle}</p>

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

      {/* ── CTA FINAL ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-dark text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">{content.cta.title}</h2>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            {renderTemplate(content.cta.descriptionTemplate, { country: countryName })}
          </p>
          <Link
            href={`/${lang}/presupuesto`}
            className="inline-flex items-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
          >
            {content.cta.button}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
