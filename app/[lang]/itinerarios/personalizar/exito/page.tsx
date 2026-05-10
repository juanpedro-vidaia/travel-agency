import { Metadata } from 'next'
import { STATIC_CONTENT } from '@/lib/data/staticContent'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { Check } from 'lucide-react'
import LangLink from '@/components/ui/LangLink'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata({
    title: '¡Solicitud recibida! — Viajes Vidaia',
    description: 'Hemos recibido tu solicitud de viaje personalizado. Nos pondremos en contacto contigo en menos de 48 horas.',
    path: `/${lang}/itinerarios/personalizar/exito`,
    lang,
  })
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function ExitoPage({ params }: Props) {
  const { lang } = await params
  const t = STATIC_CONTENT[lang as keyof typeof STATIC_CONTENT]?.formularioPersonalizado
  const success = t?.success ?? {
    title: '¡Solicitud recibida!',
    subtitle: 'Nos pondremos en contacto con vosotros en menos de 48 horas para empezar a diseñar el viaje de vuestra vida.',
    cta: 'Volver al inicio',
    ctaHref: '/',
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto py-20">
        <div className="w-20 h-20 bg-vidaia-light rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-vidaia-primary" strokeWidth={2.5} />
        </div>
        <h1 className="font-heading text-3xl font-bold text-vidaia-dark mb-4">
          {success.title}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8">
          {success.subtitle}
        </p>
        <LangLink
          href={success.ctaHref}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-vidaia-primary hover:bg-vidaia-mid text-white font-bold text-sm rounded-2xl transition-all shadow-sm hover:shadow-md"
        >
          {success.cta}
        </LangLink>
      </div>
    </main>
  )
}
