import type { Metadata } from 'next'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import Hero from '@/components/Hero'
import ValueProposition from '@/components/ValueProposition'
import QuienesSomos from '@/components/QuienesSomos'
import TestimonialsSection from '@/components/TestimonialsSection'
import InstagramBanner from '@/components/InstagramBanner'
import BlogSection from '@/components/BlogSection'
import CTASection from '@/components/CTASection'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata({
    title: 'Viajes Vidaia — El viaje de tu vida hecho realidad',
    description: 'Agencia de viajes personalizados especializada en Argentina, Chile y Bolivia. Diseñamos tu itinerario desde cero.',
    path: `/${lang}`,
    lang,
  })
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProposition />
      <QuienesSomos />
      <TestimonialsSection />
      <InstagramBanner />
      <BlogSection />
      <CTASection />
    </main>
  )
}
