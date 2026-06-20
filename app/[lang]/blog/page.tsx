import type { Metadata } from 'next'
import { Suspense } from 'react'
import NewsletterForm from '@/components/forms/NewsletterForm'
import { getAllPosts, getFeaturedPost } from '@/lib/services/postsService'
import { CATEGORY_CONFIG, type PostCategory } from '@/lib/data/posts'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getStaticContent } from '@/lib/helpers/contentHelpers'
import { buildCollectionPageSchema } from '@/lib/schema'
import JsonLd from '@/components/scripts/JsonLd'
import BlogFilters from '@/app/[lang]/blog/BlogFilters'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const { metadata } = getStaticContent(lang).blogPage
  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    path: `/${lang}/blog`,
    lang,
  })
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params
  const blogContent = getStaticContent(lang).blogPage
  const { metadata, hero } = blogContent

  const allPosts = getAllPosts()
  const featured = getFeaturedPost()
  const categories = Object.entries(CATEGORY_CONFIG) as Array<[PostCategory, typeof CATEGORY_CONFIG[PostCategory]]>

  return (
    <>
      <JsonLd data={buildCollectionPageSchema(lang, {
        name: metadata.title,
        description: metadata.description,
        path: '/blog',
        items: allPosts.map(p => ({ name: p.content.es.title, path: `/blog/${p.slug}` })),
      })} id="ld-blog" />
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 bg-linear-to-b from-vidaia-charcoal to-vidaia-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-vidaia-earth via-transparent to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            {hero.badge}
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6 text-balance">
            {hero.title}
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto text-balance">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Featured + filters + grid — Client Component for useSearchParams */}
      <Suspense fallback={<div className="py-12 md:py-16 bg-vidaia-light/20" />}>
        <BlogFilters
          allPosts={allPosts}
          featured={featured}
          categories={categories}
          lang={lang}
          blogContent={blogContent}
        />
      </Suspense>

      {/* Newsletter */}
      <section id="newsletter" className="py-12 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm variant="blog" />
        </div>
      </section>
    </>
  )
}
