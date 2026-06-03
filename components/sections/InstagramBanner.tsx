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
        <div className="text-center mb-10">
          <Link
            href={sectionContent.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-vidaia-dark hover:text-vidaia-primary transition-colors group"
          >
            <Instagram className="w-6 h-6" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">
              {sectionContent.header.title.split('{span}').map((part: string, index: number) => (
                <span key={index} className={index === 1 ? 'text-vidaia-primary' : ''}>
                  {part}
                </span>
              ))}
            </h2>
          </Link>
          <p className="text-gray-400 mt-2 text-base">
            {sectionContent.header.subtitle}
          </p>
        </div>

        <Script src="https://cdn.lightwidget.com/widgets/lightwidget.js" strategy="afterInteractive" />
        <iframe
          src="https://cdn.lightwidget.com/widgets/7113b98ca17856d2acf211e0680b259e.html"
          scrolling="no"
          allowTransparency={true}
          className="lightwidget-widget"
          style={{ width: '100%', border: 0, overflow: 'hidden' }}
        />
      </div>
    </section>
  )
}
