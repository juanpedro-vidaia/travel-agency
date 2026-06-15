'use client'

import React from 'react'
import { Compass, Heart, Leaf, Users, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/lib/hooks/useLanguage'

const ICON_MAP: Record<string, LucideIcon> = { Compass, Heart, Leaf, Users }

export default function ValueProposition() {
  const { content } = useLanguage()
  const sectionContent = content.valueProposition

  return (
    <section className="py-12 md:py-24 bg-vidaia-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            {sectionContent.header.overline}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-vidaia-dark mb-3 sm:mb-4 leading-tight">
            {sectionContent.header.title.split('{br}').map((part: string, index: number) => (
              <React.Fragment key={index}>
                {part}
                {index === 0 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            {sectionContent.header.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectionContent.items.map((item) => {
            const Icon = ICON_MAP[item.iconName] ?? Compass
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 shadow-xs hover:shadow-md transition-shadow duration-300 border border-vidaia-light/60 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-vidaia-light rounded-xl mb-5 group-hover:bg-vidaia-primary transition-colors duration-300">
                  <Icon className="w-6 h-6 text-vidaia-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-vidaia-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
