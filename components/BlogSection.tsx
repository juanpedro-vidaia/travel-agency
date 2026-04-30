import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { getRecentPosts, formatDate } from '@/lib/services/postsService'
import { CATEGORY_CONFIG } from '@/lib/data/posts'
import { STATIC_CONTENT, COMMON_UI } from '@/lib/data/staticContent'
import { getAsset } from '@/lib/data/assets'

export default function BlogSection() {
  const posts = getRecentPosts(3)

  if (posts.length === 0) return null

  const sectionContent = STATIC_CONTENT.es.blogSection;

  return (
    <section className="py-24 bg-vidaia-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
              {sectionContent.header.overline}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark leading-tight">
              {sectionContent.header.title}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-vidaia-primary hover:text-vidaia-dark font-semibold text-sm transition-colors self-start sm:self-auto pb-1"
          >
            {sectionContent.callToAction}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => {
            const postImage = getAsset(post.imageKey);
            return (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <Image
                    src={postImage.url}
                    alt={post.content.es.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${CATEGORY_CONFIG[post.category].color}`}>
                      {CATEGORY_CONFIG[post.category].es.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime} {COMMON_UI.es.labels.minutes}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-vidaia-dark leading-snug mb-3 group-hover:text-vidaia-primary transition-colors line-clamp-2">
                    {post.content.es.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                    {post.content.es.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-vidaia-primary hover:text-vidaia-dark font-semibold text-sm transition-colors group/link mt-auto"
                  >
                    {COMMON_UI.es.buttons.readMore}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
