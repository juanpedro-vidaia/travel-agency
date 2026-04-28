import { MetadataRoute } from 'next'
import { getCountries } from '@/lib/services/countriesService'
import { getAllItineraries } from '@/lib/services/itinerariesService'
import { getAllPosts } from '@/lib/services/postsService'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://viajesvidaia.com' // Cambiar por la URL real si es diferente

  // Páginas estáticas
  const staticPages = [
    '',
    '/lunas-de-miel',
    '/presupuesto',
    '/viajes',
    '/blog',
    '/contacto',
    '/aviso-legal',
    '/privacidad',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Países dinámicos
  const countries = getCountries().map((country) => ({
    url: `${baseUrl}/destinos/${country.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Itinerarios dinámicos
  const itineraries = getAllItineraries().map((itinerary) => ({
    url: `${baseUrl}/itinerarios/${itinerary.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog posts dinámicos
  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...countries, ...itineraries, ...blogPosts]
}
