import { BASE_URL } from '@/lib/config/site'

interface CollectionItem {
  name: string
  /** Route path after /{lang}, e.g. '/itinerarios/slug' or '/blog/slug' */
  path: string
}

interface CollectionPageOptions {
  name: string
  description: string
  /** Route path after /{lang}, e.g. '/viajes' */
  path: string
  items: CollectionItem[]
}

export function buildCollectionPageSchema(
  lang: string,
  { name, description, path, items }: CollectionPageOptions
) {
  const pageUrl = `${BASE_URL}/${lang}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name,
    description,
    url: pageUrl,
    inLanguage: lang,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: `${BASE_URL}/${lang}${item.path}`,
      })),
    },
  }
}
