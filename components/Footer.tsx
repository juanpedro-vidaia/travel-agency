'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react'
import { getCountries } from '@/lib/services/countriesService'
import { useContactModal } from '@/lib/context/ContactModalContext'
import { STATIC_CONTENT, COMMON_UI } from '@/lib/data/staticContent'
import { getAsset } from '@/lib/data/assets'
import React from 'react'

export default function Footer() {
  const countries = getCountries()
  const { openContactModal } = useContactModal()
  const footerContent = STATIC_CONTENT.es.footer
  const logoColorAsset = getAsset('LOGO.COLOR')

  return (
    <footer className="bg-vidaia-charcoal text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Column 1: Brand ── */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src={logoColorAsset.url}
                alt={logoColorAsset.alt}
                width={160}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              {footerContent.brand.description}
            </p>

            <div className="space-y-2.5 mb-7">
              <a
                href={`mailto:${footerContent.brand.email}`}
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-vidaia-earth flex-shrink-0" />
                {footerContent.brand.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-vidaia-earth flex-shrink-0" />
                {footerContent.brand.location}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/viajesvidaia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={footerContent.brand.instagramAriaLabel}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-vidaia-primary text-gray-400 hover:text-white transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label={footerContent.brand.facebookAriaLabel}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-vidaia-primary text-gray-400 hover:text-white transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── Column 2: Destinations ── */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              {footerContent.columns.destinations}
            </h3>
            <ul className="space-y-3">
              {countries.map((c) => (
                <li key={c.slug}>
                  <Link href={`/destinos/${c.slug}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <img src={`https://flagcdn.com/20x15/${c.flagCode}.png`} alt="" width={20} height={15} className="rounded-sm flex-shrink-0" />
                    {c.content.es.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Viajes Vidaia ── */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              {footerContent.columns.brandName}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/lunas-de-miel" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {footerContent.nav.honeymoons}
                </Link>
              </li>
              <li>
                <Link href="/viajes" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {footerContent.nav.trips}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {footerContent.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/#quienes-somos" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {footerContent.nav.aboutUs}
                </Link>
              </li>
              <li>
                <button
                  onClick={openContactModal}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {footerContent.nav.talkToUs}
                </button>
              </li>
            </ul>
          </div>

          {/* ── Column 4: Legal ── */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              {footerContent.columns.legal}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/aviso-legal" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {footerContent.legal.legalNotice}
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {footerContent.legal.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {footerContent.legal.cookiesPolicy}
                </Link>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              {footerContent.legal.officialAgencyInfo.split('{br}').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">
          <p className="text-xs text-gray-500">
            {footerContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
