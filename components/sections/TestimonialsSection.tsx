'use client'

import Script from 'next/script'
import { useLanguage } from '@/lib/hooks/useLanguage'
import SectionHeader from '@/components/sections/SectionHeader'

export default function TestimonialsSection() {
  const { content } = useLanguage()
  const sectionContent = content.testimonialsSection

  return (
    <section className="py-12 md:py-24 bg-vidaia-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          overline={sectionContent.header.overline}
          title={sectionContent.header.title}
          subtitle={sectionContent.header.subtitle}
        />

        {/* Google Reviews — Elfsight widget */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" id="elfsight-platform" />
        <div
          className="elfsight-app-fd4557ec-7381-4f49-9315-445105893b4c"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  )
}
