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
      ...(item.path ? { item: `${BASE_URL}/${lang}${item.path}` } : {}),
    })),
  }
}
