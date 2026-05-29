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
    title: content.cookiesPage.metadata.title,
    description: content.cookiesPage.metadata.description,
  }
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function CookiesPage({ params }: Props) {
  const { lang } = await params
  const content = getStaticContent(lang).cookiesPage
  const ui = getCommonUI(lang)

  return (
    <main className="min-h-screen bg-white pt-28 pb-12 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm text-vidaia-charcoal/70 hover:text-vidaia-primary mb-8 md:mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {ui.labels.backToHome}
        </Link>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-vidaia-dark mb-8 md:mb-10">
          {content.title}
        </h1>

        <div className="prose prose-gray max-w-none text-vidaia-charcoal/80 leading-relaxed space-y-6">
          {content.sections.map((section, i) => (
            <div key={i}>
              <h2>{section.heading}</h2>

              {section.items && (
                <ul>
                  {section.items.map((item, j) => (
                    <li key={j}>
                      <strong>{item.label}:</strong> {item.value}
                    </li>
                  ))}
                </ul>
              )}

              {section.paragraphs && section.paragraphs.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}

              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.labeledBullets && (
                <ul>
                  {section.labeledBullets.map((item, j) => (
                    <li key={j}>
                      <strong>{item.label}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              )}

              {section.trailingParagraph && (
                <p>{section.trailingParagraph}</p>
              )}

              {section.cookiesTable && (
                <div className="overflow-x-auto not-prose rounded-xl border border-vidaia-light">
                  <table className="min-w-full text-sm">
                    <thead className="bg-vidaia-light/50 text-vidaia-dark">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Owner</th>
                        <th className="px-4 py-3 text-left font-semibold">Finalidad</th>
                        <th className="px-4 py-3 text-left font-semibold">Cookie</th>
                        <th className="px-4 py-3 text-left font-semibold">Descripción</th>
                        <th className="px-4 py-3 text-left font-semibold">Caducidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-vidaia-light">
                      {section.cookiesTable.map((cookie, j) => (
                        <tr key={j}>
                          <td className="px-4 py-3">{cookie.owner}</td>
                          <td className="px-4 py-3">{cookie.finalidad}</td>
                          <td className="px-4 py-3 font-mono text-xs">{cookie.nombre}</td>
                          <td className="px-4 py-3">{cookie.descripcion}</td>
                          <td className="px-4 py-3">{cookie.caducidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.browserLinks && (
                <ul>
                  {section.browserLinks.map((link, j) => (
                    <li key={j}>
                      <strong>{link.name}:</strong>{' '}
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-vidaia-primary break-all">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <p className="text-sm text-vidaia-charcoal/60">
            Última actualización: {content.lastUpdated}
          </p>
        </div>
      </div>
    </main>
  )
}
