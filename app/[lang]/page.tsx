import type { Metadata } from 'next'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getStaticContent } from '@/lib/helpers/contentHelpers'
import { getCountriesOrdered } from '@/lib/services/countriesService'
import { getDestinations } from '@/lib/services/destinationsService'
import { getFAQsByPage } from '@/lib/services/faqsService'
import { buildPageSchema, buildPersonSchema, buildFAQSchema } from '@/lib/schema'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import ValueProposition from '@/components/sections/ValueProposition'
import DestinationsSection from '@/components/sections/DestinationsSection'
import FaqSection from '@/components/sections/FaqSection'
import JsonLd from '@/components/scripts/JsonLd'

const QuienesSomos        = dynamic(() => import('@/components/sections/QuienesSomos'))
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'))
const InstagramBanner     = dynamic(() => import('@/components/sections/InstagramBanner'))
const BlogSection         = dynamic(() => import('@/components/sections/BlogSection'))
const CTASection          = dynamic(() => import('@/components/sections/CTASection'))

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
  const homeFaqs = getFAQsByPage('home')

  const persons = getStaticContent('es').quienesSomos.teamMembers.map(m => buildPersonSchema(m))

  return (
    <>
      <JsonLd data={buildPageSchema(
        ...persons,
        buildFAQSchema(homeFaqs.map(f => f.es)),
      )} id="ld-home" />
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
        <FaqSection
          title={content.home.faqSection.title}
          subtitle={content.home.faqSection.subtitle}
          faqs={homeFaqs.map(f => ({ id: f.id, ...f.es }))}
        />
        <CTASection />
      </main>
    </>
  )
}
