'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Facebook, Link2, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReadingProgress from '@/components/ReadingProgress'
import NewsletterForm from '@/components/NewsletterForm'
import { CATEGORY_CONFIG } from '@/lib/data/posts'
import type { Post } from '@/lib/data/posts'
import type { Trip } from '@/lib/data/trips'
import { formatDate } from '@/lib/services/postsService'
import { getAsset } from '@/lib/data/assets'

interface Props {
  post: Post
  relatedPosts: Post[]
  relatedTrips: Trip[]
}

export default function PostContent({ post, relatedPosts, relatedTrips }: Props) {
  const [copied, setCopied] = useState(false)
  const es = post.content.es
  const postImageUrl = getAsset(post.imageKey).url

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(t)
    }
  }, [copied])

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => setCopied(true))
    }
  }

  const shareOnTwitter = () => {
    if (typeof window === 'undefined') return
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(es.title)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener')
  }

  const shareOnFacebook = () => {
    if (typeof window === 'undefined') return
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener')
  }

  return (
    <>
      <ReadingProgress />

      <article className="pt-24 pb-16">
        {/* Hero & Header */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-vidaia-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          <div className="relative h-72 sm:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-xl mb-12">
            <Image
              src={postImageUrl}
              alt={es.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="mb-5">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${CATEGORY_CONFIG[post.category].color}`}>
              {CATEGORY_CONFIG[post.category].es.label}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-vidaia-dark leading-tight mb-6 text-balance">
            {es.title}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed mb-8">{es.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} min de lectura
            </span>
          </div>
        </header>

        {/* Body content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {es.content ? (
            <div className="prose prose-lg prose-vidaia max-w-none
              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_ul]:my-6
              [&_ol]:list-decimal
              [&_ol]:pl-6
              [&_ol]:my-6
              [&_li]:my-2
              [&_li]:pl-2
              [&_li::marker]:text-vidaia-primary
              prose-h2:text-4xl
              prose-h2:font-bold
              prose-h2:mt-16
              prose-h2:mb-6
              prose-h2:pb-3
              prose-h2:border-b
              prose-h2:border-vidaia-light
              prose-h3:text-2xl
              prose-h3:font-semibold
              prose-h3:mt-10
              prose-h3:mb-4
              prose-p:mb-6
              prose-p:leading-relaxed
              prose-p:text-base
              [&_p+p]:mt-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {es.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center py-16 bg-vidaia-light/30 rounded-3xl">
              <p className="text-gray-500 text-lg mb-2">Este artículo está siendo redactado.</p>
              <p className="text-gray-400 text-sm">¡Vuelve pronto! Publicamos regularmente.</p>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-vidaia-light text-vidaia-dark text-xs font-medium rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-sm text-gray-500 flex items-center gap-1.5 font-medium">
              <Share2 className="w-4 h-4" /> Compartir:
            </span>
            <button
              onClick={shareOnTwitter}
              aria-label="Compartir en Twitter/X"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={shareOnFacebook}
              aria-label="Compartir en Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              aria-label="Copiar enlace"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors relative"
            >
              <Link2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ¡Copiado!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Related trips */}
        {relatedTrips.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <h2 className="font-heading text-2xl font-bold text-vidaia-dark mb-6">
              Viajes relacionados
            </h2>
            <div className="space-y-4">
              {relatedTrips.map((trip) => {
                const tripImage = getAsset(trip.imageKey)
                const tripTitle = trip.content.es.title
                return (
                  <Link
                    key={trip.slug}
                    href={`/itinerarios/${trip.slug}`}
                    className="group flex items-center gap-4 p-4 bg-vidaia-light/40 hover:bg-vidaia-light rounded-2xl transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={tripImage.url} alt={tripImage.alt} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-vidaia-dark group-hover:text-vidaia-primary transition-colors text-sm truncate">
                        {tripTitle}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{trip.days} días · desde {trip.priceFrom.toLocaleString('es-ES')} €</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-vidaia-primary flex-shrink-0 transition-colors" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section id="newsletter" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-vidaia-light/50 rounded-3xl p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-vidaia-dark mb-2">
              ¿Te ha gustado este artículo?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Suscríbete y te avisamos cuando publiquemos algo nuevo. Sin spam, solo inspiración.
            </p>
            <NewsletterForm />
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <h2 className="font-heading text-2xl font-bold text-vidaia-dark mb-8">Más artículos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={getAsset(related.imageKey).url}
                      alt={related.content.es.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className={`self-start px-2.5 py-0.5 text-xs font-semibold rounded-full mb-3 ${CATEGORY_CONFIG[related.category].color}`}>
                      {CATEGORY_CONFIG[related.category].es.label}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-vidaia-dark leading-snug mb-3 group-hover:text-vidaia-primary transition-colors line-clamp-2 flex-1">
                      {related.content.es.title}
                    </h3>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="inline-flex items-center gap-1 text-vidaia-primary text-sm font-semibold mt-auto"
                    >
                      Leer <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
