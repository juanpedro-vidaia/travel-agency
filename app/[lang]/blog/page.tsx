import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import NewsletterForm from '@/components/forms/NewsletterForm'
import { getAllPosts, getFeaturedPost, getPostsByCategory, formatDate } from '@/lib/services/postsService'
import { CATEGORY_CONFIG, type PostCategory } from '@/lib/data/posts'
import { getAsset } from '@/lib/data/assets'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { buildMetadata } from '@/lib/helpers/seo'
import { getStaticContent } from '@/lib/helpers/contentHelpers'

interface Props {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata({
    title: 'Blog de viajes — Viajes Vidaia',
    description: 'Guías de viaje, consejos prácticos e inspiración para descubrir Argentina, Chile y Bolivia. Escritos por quienes los han recorrido de verdad.',
    path: `/${lang}/blog`,
    lang,
  })
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { lang } = await params
  const { category } = await searchParams
  const activeCategory = category as PostCategory | undefined
  const blogContent = getStaticContent(lang).blogPage

  const allPosts = getAllPosts()
  const featured = getFeaturedPost()
  const posts = activeCategory ? getPostsByCategory(activeCategory) : allPosts
  const categories = Object.entries(CATEGORY_CONFIG) as Array<[PostCategory, typeof CATEGORY_CONFIG[PostCategory]]>

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 bg-gradient-to-b from-vidaia-charcoal to-vidaia-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-vidaia-earth via-transparent to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Blog de Viajes
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6 text-balance">
            Historias desde el fin del mundo
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto text-balance">
            Guías honestas, consejos prácticos e inspiración para descubrir Argentina, Chile y Bolivia sin filtros.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {!activeCategory && featured && (
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold text-vidaia-primary uppercase tracking-widest mb-6">Artículo destacado</p>
            <Link href={`/${lang}/blog/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden bg-vidaia-light/40 hover:bg-vidaia-light/70 transition-colors">
              <div className="relative h-72 md:h-auto min-h-[300px] overflow-hidden rounded-3xl md:rounded-r-none">
                <Image
                  src={getAsset(featured.imageKey).url}
                  alt={featured.content.es.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${CATEGORY_CONFIG[featured.category].color}`}>
                    {CATEGORY_CONFIG[featured.category].es.label}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 md:pr-12">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime} {blogContent.readingTimeLabel}
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-vidaia-dark leading-snug mb-4 group-hover:text-vidaia-primary transition-colors text-balance">
                  {featured.content.es.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">{featured.content.es.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-vidaia-primary font-semibold text-sm">
                  Leer artículo <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filter + grid */}
      <section className="py-12 md:py-16 bg-vidaia-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href={`/${lang}/blog`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !activeCategory
                  ? 'bg-vidaia-charcoal text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Todos
            </Link>
            {categories.map(([slug, cfg]) => (
              <Link
                key={slug}
                href={`/${lang}/blog?category=${slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === slug
                    ? 'bg-vidaia-charcoal text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cfg.es.label}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay artículos en esta categoría todavía.</p>
              <Link href={`/${lang}/blog`} className="mt-4 inline-block text-vidaia-primary text-sm font-medium hover:underline">
                Ver todos los artículos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <Image
                      src={getAsset(post.imageKey).url}
                      alt={post.content.es.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${CATEGORY_CONFIG[post.category].color}`}>
                        {CATEGORY_CONFIG[post.category].es.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} {blogContent.readingTimeShort}
                      </span>
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-vidaia-dark leading-snug mb-3 group-hover:text-vidaia-primary transition-colors line-clamp-2">
                      {post.content.es.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {post.content.es.excerpt}
                    </p>
                    <Link
                      href={`/${lang}/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-vidaia-primary hover:text-vidaia-dark font-semibold text-sm transition-colors group/link mt-auto"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-12 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm variant="blog" />
        </div>
      </section>
    </>
  )
}
