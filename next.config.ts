import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'pfezxbdacmqscsbvohjv.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    // Inlinea el CSS en el HTML: elimina el único request render-blocking
    inlineCss: true,
  },
  async redirects() {
    return [
      // — PÁGINAS ESTRUCTURALES —
      { source: '/viajes',              destination: '/es/viajes',              permanent: true },
      { source: '/viajes/',             destination: '/es/viajes',              permanent: true },
      { source: '/destinos/argentina',  destination: '/es/destinos/argentina',  permanent: true },
      { source: '/destinos/argentina/', destination: '/es/destinos/argentina',  permanent: true },
      { source: '/destinos/chile',      destination: '/es/destinos/chile',      permanent: true },
      { source: '/destinos/chile/',     destination: '/es/destinos/chile',      permanent: true },

      // — CONTACTO (modal, sin página propia) —
      { source: '/contacto',  destination: '/es', permanent: true },
      { source: '/contacto/', destination: '/es', permanent: true },

      // — ABOUT —
      { source: '/about',  destination: '/es#quienes-somos', permanent: true },
      { source: '/about/', destination: '/es#quienes-somos', permanent: true },

      // — PÁGINAS LEGALES —
      { source: '/aviso-legal',              destination: '/es/aviso-legal', permanent: true },
      { source: '/aviso-legal/',             destination: '/es/aviso-legal', permanent: true },
      { source: '/politica-de-cookies-ue',   destination: '/es/cookies',     permanent: true },
      { source: '/politica-de-cookies-ue/',  destination: '/es/cookies',     permanent: true },
      { source: '/politica-de-privacidad',   destination: '/es/privacidad',  permanent: true },
      { source: '/politica-de-privacidad/',  destination: '/es/privacidad',  permanent: true },

      // — BLOG —
      { source: '/blog',  destination: '/es/blog', permanent: true },
      { source: '/blog/', destination: '/es/blog', permanent: true },

      // Posts migrados
      { source: '/blog/desierto-de-atacama',                                              destination: '/es/blog/desierto-de-atacama-en-chile', permanent: true },
      { source: '/blog/desierto-de-atacama/',                                             destination: '/es/blog/desierto-de-atacama-en-chile', permanent: true },
      { source: '/blog/carretera-austral-un-viaje-por-los-tesoros-de-la-patagonia',       destination: '/es/blog/carretera-austral-chile',       permanent: true },
      { source: '/blog/carretera-austral-un-viaje-por-los-tesoros-de-la-patagonia/',      destination: '/es/blog/carretera-austral-chile',       permanent: true },
      { source: '/blog/costumbres-argentinas-que-no-sabias-y-no-te-puedes-perder',        destination: '/es/blog/costumbres-argentinas',         permanent: true },
      { source: '/blog/costumbres-argentinas-que-no-sabias-y-no-te-puedes-perder/',       destination: '/es/blog/costumbres-argentinas',         permanent: true },

      // Post pendiente de migrar — 307 temporal; cambiar a permanent:true cuando esté publicado
      { source: '/blog/primeras-veces-vacaciones-solidarias-en-argentina',  destination: '/es/blog', permanent: false },
      { source: '/blog/primeras-veces-vacaciones-solidarias-en-argentina/', destination: '/es/blog', permanent: false },
    ]
  },

  // El redirect de rutas sin prefijo de idioma (incluida la raíz /) lo gestiona proxy.ts
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
