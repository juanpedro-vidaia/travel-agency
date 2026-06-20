import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/config/site'

const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`

interface SeoOptions {
  title: string
  description: string
  path: string           // e.g. '/es/viajes' or '/es/itinerarios/slug'
  lang: string
  ogImage?: string
  ogType?: 'website' | 'article'
  /** Only used when ogType is 'article' (ISO date, e.g. post.date) */
  publishedTime?: string
  /** Optional robots directives, e.g. { index: false, follow: true }. */
  robots?: Metadata['robots']
}

/**
 * Builds a complete Metadata object with OG, Twitter card, canonical and
 * hreflang alternates. Use this in every generateMetadata() call.
 */
export function buildMetadata({
  title,
  description,
  path,
  lang,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  publishedTime,
  robots,
}: SeoOptions): Metadata {
  const url = `${BASE_URL}${path}`

  // hreflang alternates — only Spanish is currently enabled, but the structure
  // is already in place for when English is toggled on.
  const languages: Record<string, string> = {
    es: `${BASE_URL}${path.replace(/^\/(es|en)/, '/es')}`,
    'x-default': `${BASE_URL}${path.replace(/^\/(es|en)/, '/es')}`,
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    ...(robots ? { robots } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: 'Viajes Vidaia',
      locale: lang === 'en' ? 'en_US' : 'es_ES',
      type: ogType,
      ...(ogType === 'article' && publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@viajesvidaia',
    },
  }
}
