import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getItinerary, getAllItineraries } from '@/lib/services/itinerariesService'
import { getTripBySlug } from '@/lib/services/tripsService'
import ItineraryContent from './ItineraryContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const itinerary = getItinerary(slug)
  if (!itinerary) return {}

  const trip = getTripBySlug(slug)

  return {
    title: `${itinerary.content.es.title} — Viajes Vidaia`,
    description: trip?.content.es.subtitle ?? itinerary.content.es.title,
  }
}

export async function generateStaticParams() {
  const itineraries = getAllItineraries()
  return itineraries.map((i) => ({ slug: i.slug }))
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params
  const itinerary = getItinerary(slug)

  if (!itinerary) {
    notFound()
  }

  return <ItineraryContent slug={slug} />
}
