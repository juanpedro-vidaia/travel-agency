'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { getAsset } from '@/lib/data/assets'

export default function QuienesSomos() {
  const { content, ui } = useLanguage()
  const sectionContent = content.quienesSomos;
  const landscapePhotoAsset = getAsset('TEAM.LANDSCAPE_PHOTO');

  return (
    <section id="quienes-somos" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            {sectionContent.header.overline}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-4 leading-tight">
            {sectionContent.header.title.split('{br}').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index === 0 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {sectionContent.header.subtitle}
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {sectionContent.teamMembers.map((person) => {
            const personImage = getAsset(person.imageKey);
            return (
              <div
                key={person.name}
                className="group flex flex-col sm:flex-row gap-6 bg-vidaia-sand rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow duration-300"
              >
                {/* Photo */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl overflow-hidden self-start">
                  <Image
                    src={personImage.url}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="font-heading text-xl font-bold text-vidaia-dark">{person.name}</p>
                  <p className="text-vidaia-primary text-xs font-semibold uppercase tracking-wider mb-3">
                    {person.role}
                  </p>
                  <div className="space-y-2">
                    {person.bio.map((paragraph, i) => (
                      <p key={i} className="text-gray-500 text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Landscape photo strip */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden">
          <Image
            src={landscapePhotoAsset.url}
            alt={landscapePhotoAsset.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vidaia-dark/70 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8 sm:p-12">
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 max-w-sm leading-snug">
                {sectionContent.landscapePhoto.quote}
              </p>
              <Link
                href="/sobre-nosotros"
                className="inline-flex items-center gap-2 text-vidaia-earth hover:text-vidaia-cream font-semibold text-sm transition-colors"
              >
                {ui.buttons.readMore}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
