import { Metadata } from 'next'
import { STATIC_CONTENT } from '@/lib/data/staticContent'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getCountriesOrdered } from '@/lib/services/countriesService'
import { getFeaturedDestinationsGrouped } from '@/lib/services/destinationsService'
import JsonLd from '@/components/scripts/JsonLd'
import FormularioPersonalizado from '@/components/forms/FormularioPersonalizado'

interface Props {
  params: Promise<{ lang: string }>
}

const BASE_URL = 'https://www.viajesvidaia.com'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = STATIC_CONTENT[lang as keyof typeof STATIC_CONTENT]?.formularioPersonalizado
  if (!t) return {}
  return buildMetadata({
    title: t.metadata.genericTitle,
    description: t.metadata.genericDescription,
    path: `/${lang}/itinerarios/personalizar`,
    lang,
  })
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function PersonalizarPage({ params }: Props) {
  const { lang } = await params
  const t = STATIC_CONTENT[lang as keyof typeof STATIC_CONTENT]?.formularioPersonalizado
  if (!t) return null

  const countries = getCountriesOrdered()
  const featuredDestinations = getFeaturedDestinationsGrouped()

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Diseño de viajes personalizados a Sudamérica',
    description: t.metadata.genericDescription,
    provider: {
      '@type': 'TravelAgency',
      name: 'Viajes Vidaia',
      url: BASE_URL,
    },
    areaServed: 'ES',
    serviceType: 'Custom Travel Planning',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Presupuesto personalizado y gratuito',
    },
    potentialAction: {
      '@type': 'ReserveAction',
      name: 'Solicitar presupuesto personalizado',
      target: `${BASE_URL}/${lang}/itinerarios/personalizar`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Personalizar viaje', item: `${BASE_URL}/${lang}/itinerarios/personalizar` },
    ],
  }

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <FormularioPersonalizado
        origin="generic"
        countries={countries}
        featuredDestinations={featuredDestinations}
        t={t}
        successPath={`/${lang}/itinerarios/personalizar/exito`}
      />
    </>
  )
}
