'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react'
import LangLink from '@/components/LangLink'
import { getAsset } from '@/lib/data/assets'

interface Slide {
  imageKey: string
  location: string
}

interface ViajesHeroProps {
  overline: string
  title: string
  subtitle: string
  ctaPrimary: string   // ui.buttons.requestQuote
  ctaSecondary: string
  slides: Slide[]
}

export default function ViajesHero({
  overline,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  slides,
}: ViajesHeroProps) {
  const [current,  setCurrent]  = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const resolvedSlides = slides.map(s => {
    const asset = getAsset(s.imageKey)
    return { src: asset.url, alt: asset.alt || s.location, location: s.location }
  })

  const next = useCallback(() => setCurrent(p => (p + 1) % resolvedSlides.length), [resolvedSlides.length])
  const prev = useCallback(() => setCurrent(p => (p - 1 + resolvedSlides.length) % resolvedSlides.length), [resolvedSlides.length])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [isPaused, next])

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {resolvedSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-8">
        <p className="text-vidaia-earth font-semibold tracking-widest uppercase text-xs mb-5">
          {overline}
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-5 text-balance">
          {title}
        </h1>
        <p className="text-xl sm:text-2xl text-white/80 max-w-xl font-light">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <LangLink
            href="/presupuesto"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            {ctaPrimary}
            <ArrowRight className="w-5 h-5" />
          </LangLink>
          <button
            onClick={() => {
              document.getElementById('buscador-viajes')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
          >
            {ctaSecondary}
          </button>
        </div>
      </div>

      {/* Location label */}
      <div className="absolute bottom-8 left-6 sm:left-8 z-10 pointer-events-none">
        <span className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {resolvedSlides[current]?.location}
        </span>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 right-6 sm:right-8 z-10 flex gap-2">
        {resolvedSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
