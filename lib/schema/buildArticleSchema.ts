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
    datePublished: post.publishedAt,
    url: post.url,
    mainEntityOfPage: post.url,
    author: { '@type': 'Organization', name: 'Viajes Vidaia' },
    publisher: {
      '@type': 'Organization',
      name: 'Viajes Vidaia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.viajesvidaia.com/images/logo/viajes-vidaia-logo.png',
      },
    },
  }
}
