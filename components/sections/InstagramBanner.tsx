'use client'

import Script from 'next/script'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { useLanguage } from '@/lib/hooks/useLanguage'

export default function InstagramBanner() {
  const { content } = useLanguage()
  const sectionContent = content.instagramBanner

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
              {sectionContent.header.overline}
            </span>
          </div>
          <Link
            href={sectionContent.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 text-vidaia-dark hover:text-vidaia-primary transition-colors group"
          >
            <Instagram className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
              {sectionContent.header.title.split('{span}').map((part: string, index: number) => (
                <span key={index} className={index === 1 ? 'text-vidaia-primary' : ''}>
                  {part}
                </span>
              ))}
            </h2>
          </Link>
          <p className="text-gray-500 mt-3 text-base sm:text-lg leading-relaxed">
            {sectionContent.header.subtitle}
          </p>
        </div>

        <Script src="https://cdn.lightwidget.com/widgets/lightwidget.js" strategy="afterInteractive" />
        <iframe
          src="https://cdn.lightwidget.com/widgets/7113b98ca17856d2acf211e0680b259e.html"
          scrolling="no"
          className="lightwidget-widget"
          style={{ width: '100%', border: 0, overflow: 'hidden', minHeight: '300px' }}
        />
      </div>
    </section>
  )
}
