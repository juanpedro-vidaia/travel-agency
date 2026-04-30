import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/services/postsService'
import { getTripBySlug } from '@/lib/services/tripsService'
import type { Trip } from '@/lib/data/trips'
import { getAsset } from '@/lib/data/assets'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import PostContent from './PostContent'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return ENABLED_LANGUAGES.flatMap(lang =>
    posts.map(post => ({ lang, slug: post.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const es = post.content.es
  const title = es.metaTitle ?? `${es.title} — Viajes Vidaia`
  const description = es.metaDescription ?? es.excerpt
  const imageUrl = getAsset(post.imageKey).url
  const url = `https://viajesvidaia.com/${lang}/blog/${post.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: imageUrl, alt: es.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: { canonical: url },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug)
  const relatedTrips: Trip[] = (post.relatedTripSlugs ?? [])
    .map((s) => getTripBySlug(s))
    .filter((t): t is Trip => t !== undefined)

  const es = post.content.es
  const imageUrl = getAsset(post.imageKey).url

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: es.title,
    description: es.excerpt,
    image: imageUrl,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Viajes Vidaia' },
    publisher: {
      '@type': 'Organization',
      name: 'Viajes Vidaia',
      logo: { '@type': 'ImageObject', url: 'https://viajesvidaia.com/images/logo/viajes-vidaia-logo-color.jpg' },
    },
    url: `https://viajesvidaia.com/${lang}/blog/${post.slug}`,
    mainEntityOfPage: `https://viajesvidaia.com/${lang}/blog/${post.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostContent post={post} relatedPosts={relatedPosts} relatedTrips={relatedTrips} />
    </>
  )
}
