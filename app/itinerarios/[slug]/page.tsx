import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getItinerary, getAllItineraries } from '@/lib/services/itinerariesService'
import ItineraryContent from './ItineraryContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const itinerary = getItinerary(slug)
  if (!itinerary) return {}

  return {
    title: `${itinerary.title} — Viajes Vidaia`,
    description: itinerary.subtitle,
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
