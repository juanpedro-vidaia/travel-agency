import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import { getAllPosts, getFeaturedPost, getPostsByCategory, formatDate } from '@/lib/services/postsService'
import { CATEGORY_CONFIG, type PostCategory } from '@/lib/data/posts'

export const metadata: Metadata = {
  title: 'Blog de viajes — Viajes Vidaia',
  description:
    'Guías de viaje, consejos prácticos e inspiración para descubrir Argentina, Chile y Bolivia. Escritos por quienes los han recorrido de verdad.',
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const activeCategory = category as PostCategory | undefined

  const allPosts = getAllPosts()
  const featured = getFeaturedPost()
  const posts = activeCategory ? getPostsByCategory(activeCategory) : allPosts
  const categories = Object.entries(CATEGORY_CONFIG) as [PostCategory, { label: string; color: string }][]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-vidaia-charcoal to-vidaia-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-vidaia-earth via-transparent to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Blog de Viajes
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
            Historias desde el fin del mundo
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto text-balance">
            Guías honestas, consejos prácticos e inspiración para descubrir Argentina, Chile y Bolivia sin filtros.
          </p>
        </div>
      </section>

      {/* Featured post (only shown when no filter active) */}
      {!activeCategory && featured && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold text-vidaia-primary uppercase tracking-widest mb-6">Artículo destacado</p>
            <Link href={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden bg-vidaia-light/40 hover:bg-vidaia-light/70 transition-colors">
              <div className="relative h-72 md:h-auto min-h-[300px] overflow-hidden rounded-3xl md:rounded-r-none">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${CATEGORY_CONFIG[featured.category].color}`}>
                    {CATEGORY_CONFIG[featured.category].label}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 md:pr-12">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime} min de lectura
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-vidaia-dark leading-snug mb-4 group-hover:text-vidaia-primary transition-colors text-balance">
                  {featured.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-vidaia-primary font-semibold text-sm">
                  Leer artículo <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filter + grid */}
      <section className="py-16 bg-vidaia-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/blog"
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
                href={`/blog?category=${slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === slug
                    ? 'bg-vidaia-charcoal text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cfg.label}
              </Link>
            ))}
          </div>

          {/* Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay artículos en esta categoría todavía.</p>
              <Link href="/blog" className="mt-4 inline-block text-vidaia-primary text-sm font-medium hover:underline">
                Ver todos los artículos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${CATEGORY_CONFIG[post.category].color}`}>
                        {CATEGORY_CONFIG[post.category].label}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} min
                      </span>
                    </div>

                    <h2 className="font-heading text-lg font-semibold text-vidaia-dark leading-snug mb-3 group-hover:text-vidaia-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
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

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Newsletter
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-4 text-balance">
            Nuevos artículos, directo a tu bandeja
          </h2>
          <p className="text-gray-500 mb-8 text-balance">
            Sin spam, solo inspiración. Publicamos cuando tenemos algo bueno que contar.
          </p>
          <Link
            href="#newsletter"
            className="inline-flex items-center gap-2 px-8 py-4 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Suscribirme gratis
          </Link>
        </div>
      </section>
    </>
  )
}
