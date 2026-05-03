import type { Metadata } from 'next'
import { getStaticContent, getCommonUI } from '@/lib/helpers/contentHelpers'
import { buildMetadata } from '@/lib/helpers/seo'
import { getActiveTrips } from '@/lib/services/tripsService'
import { getCountries } from '@/lib/services/countriesService'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import ViajesHero from '@/components/ViajesHero'
import ViajesServicios from '@/components/ViajesServicios'
import ViajesBuscador from '@/components/ViajesBuscador'
import ViajesComoTrabajamos from '@/components/ViajesComoTrabajamos'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const content = getStaticContent(lang)
  const { metadata } = content.viajesPage
  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    path: `/${lang}/viajes`,
    lang,
  })
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function ViajesPage({ params }: Props) {
  const { lang } = await params
  const content   = getStaticContent(lang)
  const ui        = getCommonUI(lang)
  const page      = content.viajesPage
  const allTrips  = getActiveTrips()
  const countries = getCountries().map(c => ({
    id: c.id,
    flagCode: c.flagCode,
    name: (c.content[lang as keyof typeof c.content] ?? c.content.es).name,
  }))

  return (
    <main className="min-h-screen bg-white">

      {/* 1 — Hero carrusel */}
      <ViajesHero
        overline={page.hero.overline}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        ctaPrimary={ui.buttons.requestQuote}
        ctaSecondary={page.hero.ctaSecondary}
        slides={page.hero.slides}
      />

      {/* 2 — Misión + Servicios */}
      <ViajesServicios
        missionTitle={page.servicios.missionTitle}
        missionText={page.servicios.missionText}
        cardsTitle={page.servicios.cardsTitle}
        cards={page.servicios.cards}
      />

      {/* 3 — Buscador + Grid */}
      <ViajesBuscador
        lang={lang}
        allTrips={allTrips}
        countries={countries}
        strings={page.buscador}
        tripCardStrings={content.destinationPage.tripCard}
      />

      {/* 4 — Cómo trabajamos */}
      <ViajesComoTrabajamos
        title={page.comoTrabajamos.title}
        subtitle={page.comoTrabajamos.subtitle}
        steps={page.comoTrabajamos.steps}
      />

      {/* 5 — Testimonios */}
      <TestimonialsSection />

      {/* 6 — CTA final */}
      <CTASection />

    </main>
  )
}
