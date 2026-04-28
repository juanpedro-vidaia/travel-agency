import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/services/postsService'
import { getTripBySlug } from '@/lib/services/tripsService'
import type { Trip } from '@/lib/data/trips'
import PostContent from './PostContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const title = post.metaTitle ?? `${post.title} — Viajes Vidaia`
  const description = post.metaDescription ?? post.excerpt
  const url = `https://viajesvidaia.com/blog/${post.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
    alternates: { canonical: url },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug)
  const relatedTrips: Trip[] = (post.relatedTrips ?? [])
    .map((s) => getTripBySlug(s))
    .filter((t): t is Trip => t !== undefined)

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Viajes Vidaia' },
    publisher: {
      '@type': 'Organization',
      name: 'Viajes Vidaia',
      logo: { '@type': 'ImageObject', url: 'https://viajesvidaia.com/images/logo/viajes-vidaia-logo-color.jpg' },
    },
    url: `https://viajesvidaia.com/blog/${post.slug}`,
    mainEntityOfPage: `https://viajesvidaia.com/blog/${post.slug}`,
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
