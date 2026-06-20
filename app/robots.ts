import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/config/site'

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === 'production'

  // Previews y cualquier entorno que no sea el de producción: no indexar nada.
  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
