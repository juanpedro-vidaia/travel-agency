import { MetadataRoute } from 'next'
import { getCountries } from '@/lib/services/countriesService'
import { getAllItineraries } from '@/lib/services/itinerariesService'
import { getAllPosts } from '@/lib/services/postsService'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'

const BASE_URL = 'https://www.viajesvidaia.com'

function langUrls(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']) {
  return ENABLED_LANGUAGES.map(lang => ({
    url: `${BASE_URL}/${lang}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...langUrls('',                    1.0, 'weekly'),
    ...langUrls('/viajes',             0.9, 'weekly'),
    ...langUrls('/lunas-de-miel',      0.9, 'monthly'),
    ...langUrls('/presupuesto',        0.8, 'monthly'),
    ...langUrls('/blog',               0.8, 'weekly'),
    ...langUrls('/aviso-legal',        0.3, 'yearly'),
    ...langUrls('/privacidad',         0.3, 'yearly'),
    ...langUrls('/cookies',            0.3, 'yearly'),
  ]

  const countryRoutes: MetadataRoute.Sitemap = getCountries().flatMap(c =>
    langUrls(`/destinos/${c.slug}`, 0.9, 'weekly')
  )

  const itineraryRoutes: MetadataRoute.Sitemap = getAllItineraries().flatMap(i =>
    langUrls(`/itinerarios/${i.slug}`, 0.8, 'weekly')
  )

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().flatMap(p =>
    langUrls(`/blog/${p.slug}`, 0.7, 'monthly')
  )

  return [...staticRoutes, ...countryRoutes, ...itineraryRoutes, ...blogRoutes]
}
