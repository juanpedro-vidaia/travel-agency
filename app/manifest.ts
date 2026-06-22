import type { MetadataRoute } from 'next'
import { getCountriesOrdered } from '@/lib/services/countriesService'

export default function manifest(): MetadataRoute.Manifest {
  const countryNames = getCountriesOrdered().map(c => c.content.es.name)
  const countryList =
    countryNames.length > 1
      ? `${countryNames.slice(0, -1).join(', ')} y ${countryNames.at(-1)}`
      : countryNames.join('')

  return {
    name: 'Viajes Vidaia',
    short_name: 'Vidaia',
    description: `Agencia de viajes personalizados especializada en ${countryList}.`,
    start_url: '/es',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5ea6ae',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
