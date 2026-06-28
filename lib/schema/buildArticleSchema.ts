import { BASE_URL } from '@/lib/config/site'
import { buildPersonNode, type PersonMember } from './buildPersonSchema'

export function buildArticleSchema(post: {
  title: string
  description: string
  publishedAt: string
  /** Falls back to publishedAt when the post has never been updated */
  updatedAt?: string
  imageUrl?: string
  url: string
  /** Real author (E-E-A-T). When omitted, the Organization is credited as author. */
  author?: PersonMember
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.imageUrl,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt ?? post.publishedAt).toISOString(),
    url: post.url,
    mainEntityOfPage: post.url,
    author: post.author ? buildPersonNode(post.author) : { '@id': `${BASE_URL}/#organization` },
    publisher: { '@id': `${BASE_URL}/#organization` },
  }
}
