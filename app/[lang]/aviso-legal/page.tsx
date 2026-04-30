import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getStaticContent, getCommonUI } from '@/lib/helpers/contentHelpers'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const content = getStaticContent(lang)
  return {
    title: content.legalNoticePage.metadata.title,
    description: content.legalNoticePage.metadata.description,
  }
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function AvisoLegalPage({ params }: Props) {
  const { lang } = await params
  const content = getStaticContent(lang).legalNoticePage
  const ui = getCommonUI(lang)

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm text-vidaia-charcoal/55 hover:text-vidaia-primary mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {ui.labels.backToHome}
        </Link>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-10">
          {content.title}
        </h1>

        <div className="prose prose-gray max-w-none text-vidaia-charcoal/80 leading-relaxed space-y-6">
          <p className="text-vidaia-charcoal/50 text-sm">
            Contenido en preparación. Próximamente se publicará el aviso legal completo.
          </p>
        </div>
      </div>
    </main>
  )
}
