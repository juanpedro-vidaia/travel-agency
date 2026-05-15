import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAsset } from '@/lib/data/assets'
import type { Country } from '@/lib/data/countries'
import type { Destination } from '@/lib/data/destinations'
import DestinationsSectionExpand from '@/components/sections/DestinationsSectionExpand'

export type DestinationsSectionContent = {
  homePill: string
  homeTitle: string
  homeSubtitle: string
  viajesPill: string
  viajesTitle: string
  viajesSubtitle: string
  cardTitlePrefix: string
  cardSubtitleSuffix: string
  discoverMore: string
}

export type CountryCard = {
  countryId: string
  countrySlug: string
  countryName: string
  countryDescription: string
  imageUrl: string
  imageAlt: string
  href: string
  featuredDestNames: string[]
}

interface Props {
  variant: 'home' | 'viajes'
  content: DestinationsSectionContent
  countries: Country[]
  destinations: Destination[]
  lang: string
}

export default function DestinationsSection({ variant, content, countries, destinations, lang }: Props) {
  const pill = variant === 'home' ? content.homePill : content.viajesPill
  const title = variant === 'home' ? content.homeTitle : content.viajesTitle
  const subtitle = variant === 'home' ? content.homeSubtitle : content.viajesSubtitle

  const sortedCountries = [...countries].sort((a, b) => a.order - b.order)

  const countryCards: CountryCard[] = sortedCountries.map(country => {
    const asset = getAsset(`DESTINATIONS_CARD_${country.id.toUpperCase()}` as Parameters<typeof getAsset>[0])
    const countryContent = (country.content[lang as keyof typeof country.content] ?? country.content.es)
    const featuredDests = destinations.filter(
      d => d.country === country.id && d.featured === true && d.active === true,
    )
    return {
      countryId: country.id,
      countrySlug: country.slug,
      countryName: countryContent.name,
      countryDescription: countryContent.description,
      imageUrl: asset.url,
      imageAlt: asset.alt ?? `Paisaje de ${countryContent.name}`,
      href: `/${lang}/destinos/${country.slug}?from=${variant}`,
      featuredDestNames: featuredDests.map(
        d => (d.content[lang as keyof typeof d.content] ?? d.content.es).name,
      ),
    }
  })

  return (
    <section id="destinations-section" className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14">
          <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            {pill}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-vidaia-dark mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">{subtitle}</p>
        </div>

        {variant === 'home' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {countryCards.map(card => (
              <HomeCard key={card.countryId} card={card} content={content} />
            ))}
          </div>
        ) : (
          <DestinationsSectionExpand countryCards={countryCards} content={content} />
        )}
      </div>
    </section>
  )
}

function HomeCard({ card, content }: { card: CountryCard; content: DestinationsSectionContent }) {
  const subtitle =
    card.featuredDestNames.length > 0
      ? `${card.featuredDestNames.join(', ')} ${content.cardSubtitleSuffix}`
      : null

  return (
    <Link
      href={card.href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
      aria-label={`${content.cardTitlePrefix} ${card.countryName}`}
    >
      <Image
        src={card.imageUrl}
        alt={card.imageAlt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 right-0 p-5 text-right text-white">
        <p className="font-heading font-bold text-xl leading-tight">
          {content.cardTitlePrefix} {card.countryName}
        </p>
        {subtitle && <p className="text-sm text-white/80 mt-1 max-w-xs ml-auto">{subtitle}</p>}
        <ArrowRight className="mt-2 ml-auto w-5 h-5" aria-hidden="true" />
      </div>
    </Link>
  )
}
