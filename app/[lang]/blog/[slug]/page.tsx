import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/services/postsService'
import { getTripBySlug } from '@/lib/services/tripsService'
import type { Trip } from '@/lib/data/trips'
import { getAsset } from '@/lib/data/assets'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getStaticContent } from '@/lib/helpers/contentHelpers'
import { BASE_URL } from '@/lib/config/site'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'
import JsonLd from '@/components/scripts/JsonLd'
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
  return buildMetadata({
    title: es.metaTitle ?? `${es.title} — Viajes Vidaia`,
    description: es.metaDescription ?? es.excerpt,
    path: `/${lang}/blog/${post.slug}`,
    lang,
    ogImage: getAsset(post.imageKey).url,
    ogType: 'article',
    publishedTime: post.date,
  })
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
  const author = post.author
    ? getStaticContent('es').quienesSomos.teamMembers.find((m) => m.name === post.author)
    : undefined

  return (
    <>
      <JsonLd id="ld-article" data={buildArticleSchema({
        title: es.title,
        description: es.excerpt,
        imageUrl,
        publishedAt: post.date,
        updatedAt: post.dateUpdated,
        url: `${BASE_URL}/${lang}/blog/${post.slug}`,
        author,
      })} />
      <JsonLd id="ld-breadcrumb" data={buildBreadcrumbSchema(lang, [
        { name: 'Inicio', path: '' },
        { name: 'Blog', path: '/blog' },
        { name: es.title },
      ])} />
      <PostContent post={post} relatedPosts={relatedPosts} relatedTrips={relatedTrips} />
    </>
  )
}
