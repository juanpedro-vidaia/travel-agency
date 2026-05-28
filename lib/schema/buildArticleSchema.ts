export function buildArticleSchema(post: {
  title: string
  description: string
  publishedAt: string
  imageUrl?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.imageUrl,
    datePublished: new Date(post.publishedAt).toISOString(),
    url: post.url,
    mainEntityOfPage: post.url,
    author: { '@id': 'https://www.viajesvidaia.com/#organization' },
    publisher: { '@id': 'https://www.viajesvidaia.com/#organization' },
  }
}
