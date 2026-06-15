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
          <div className="absolute -top-24 left-0 right-0 h-24 bg-linear-to-b from-transparent to-white pointer-events-none" />
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
      className={`group flex flex-col overflow-hidden rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 md:h-[240px] ${isOdd ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      aria-label={`${content.cardTitlePrefix} ${card.countryName}`}
    >
      {/* Photo */}
      <div className="relative h-48 w-full shrink-0 md:h-full md:w-1/2">
        <Image
          src={card.imageUrl}
          alt={card.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col bg-vidaia-sand px-5 py-4 md:w-1/2 md:justify-center md:gap-2 md:px-8 md:py-6">
        <p className="font-heading font-bold text-xl text-vidaia-dark leading-tight">
          {content.cardTitlePrefix} {card.countryName}
        </p>
        {subtitle && (
          <p className="hidden text-vidaia-charcoal/70 text-sm leading-relaxed md:block">{subtitle}</p>
        )}
        {card.countryDescription && (
          <p className="hidden text-xs text-vidaia-charcoal/50 leading-relaxed line-clamp-3 md:block">
            {card.countryDescription}
          </p>
        )}
        <ArrowRight
          className="hidden w-5 h-5 text-vidaia-primary transition-transform duration-200 group-hover:translate-x-1 md:block"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}
