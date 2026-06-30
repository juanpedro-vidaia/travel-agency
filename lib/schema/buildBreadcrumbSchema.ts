import { BASE_URL } from '@/lib/config/site'

interface BreadcrumbItem {
  name: string
  /** Omit for the last (current) item */
  path?: string
}

export function buildBreadcrumbSchema(lang: string, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      // path === '' es la home (item = BASE_URL/lang); path === undefined es la página actual (se omite item)
      ...(item.path !== undefined ? { item: `${BASE_URL}/${lang}${item.path}` } : {}),
    })),
  }
}
