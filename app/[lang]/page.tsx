import type { Metadata } from 'next'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getStaticContent } from '@/lib/helpers/contentHelpers'
import { getCountriesOrdered } from '@/lib/services/countriesService'
import { getDestinations } from '@/lib/services/destinationsService'
import Hero from '@/components/sections/Hero'
import ValueProposition from '@/components/sections/ValueProposition'
import DestinationsSection from '@/components/sections/DestinationsSection'
import QuienesSomos from '@/components/sections/QuienesSomos'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import InstagramBanner from '@/components/sections/InstagramBanner'
import BlogSection from '@/components/sections/BlogSection'
import CTASection from '@/components/sections/CTASection'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const { home } = getStaticContent(lang)
  return buildMetadata({
    title: home.metadata.title,
    description: home.metadata.description,
    path: `/${lang}`,
    lang,
  })
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function Home({ params }: Props) {
  const { lang } = await params
  const content = getStaticContent(lang)
  const countries = getCountriesOrdered()
  const destinations = getDestinations()

  return (
    <main>
      <Hero />
      <ValueProposition />
      <DestinationsSection
        variant="home"
        content={content.destinationsSection}
        countries={countries}
        destinations={destinations}
        lang={lang}
      />
      <QuienesSomos />
      <TestimonialsSection />
      <InstagramBanner />
      <BlogSection />
      <CTASection />
    </main>
  )
}
