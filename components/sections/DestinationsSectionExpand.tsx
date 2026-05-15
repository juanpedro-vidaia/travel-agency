'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { CountryCard, DestinationsSectionContent } from '@/components/sections/DestinationsSection'

const INITIAL_COUNT = 3

interface Props {
  countryCards: CountryCard[]
  content: DestinationsSectionContent
}

export default function DestinationsSectionExpand({ countryCards, content }: Props) {
  const [showAll, setShowAll] = useState(false)
  const expandRef = useRef<HTMLDivElement>(null)

  const displayed = showAll ? countryCards : countryCards.slice(0, INITIAL_COUNT)
  const hasMore = countryCards.length > INITIAL_COUNT

  function handleExpand() {
    setShowAll(true)
    setTimeout(() => expandRef.current?.focus(), 50)
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {displayed.map((card, index) => (
          <ViajesCard key={card.countryId} card={card} index={index} content={content} />
        ))}
      </div>

      {hasMore && !showAll && (
        <div className="relative mt-0">
          {/* Fade overlay on last card */}
          <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />
          <div className="relative flex flex-col items-center pt-4">
            <button
              onClick={handleExpand}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-vidaia-primary text-vidaia-primary font-semibold text-sm hover:bg-vidaia-primary hover:text-white transition-colors duration-200"
            >
              {content.discoverMore}
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Focus target after expand */}
      {showAll && <div ref={expandRef} tabIndex={-1} className="sr-only" />}
    </div>
  )
}

function ViajesCard({
  card,
  index,
  content,
}: {
  card: CountryCard
  index: number
  content: DestinationsSectionContent
}) {
  const isOdd = index % 2 === 0
  const subtitle =
    card.featuredDestNames.length > 0
      ? `${card.featuredDestNames.join(', ')} ${content.cardSubtitleSuffix}`
      : null

  return (
    <Link
      href={card.href}
      className={`group flex h-[240px] overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${isOdd ? 'flex-row' : 'flex-row-reverse'}`}
      aria-label={`${content.cardTitlePrefix} ${card.countryName}`}
    >
      {/* Photo */}
      <div
        className={`relative w-1/2 flex-shrink-0 overflow-hidden ${isOdd ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}
      >
        <Image
          src={card.imageUrl}
          alt={card.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 30vw"
        />
      </div>

      {/* Text */}
      <div className="flex w-1/2 flex-col justify-center gap-2 px-8 py-6 bg-vidaia-sand">
        <p className="font-heading font-bold text-xl text-vidaia-dark leading-tight">
          {content.cardTitlePrefix} {card.countryName}
        </p>
        {subtitle && <p className="text-vidaia-charcoal/70 text-sm leading-relaxed">{subtitle}</p>}
        {card.countryDescription && (
          <p className="text-xs text-vidaia-charcoal/50 leading-relaxed line-clamp-3">
            {card.countryDescription}
          </p>
        )}
        <ArrowRight
          className="w-5 h-5 text-vidaia-primary transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}
