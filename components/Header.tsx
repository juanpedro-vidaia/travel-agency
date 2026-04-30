'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronDown, Heart } from 'lucide-react'
import { getCountries } from '@/lib/services/countriesService'
import { useContactModal } from '@/lib/context/ContactModalContext'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { getAsset } from '@/lib/data/assets'
import LangLink from '@/components/LangLink'
import LanguageSwitch from '@/components/LanguageSwitch'

export default function Header() {
  const countries = getCountries()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [destinosOpen, setDestinosOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { openContactModal } = useContactModal()
  const { content, ui, language } = useLanguage()
  const headerContent = content.header
  const logoAsset = getAsset('LOGO.DEFAULT')
  const navItems = [
    { key: 'viajes', label: headerContent.nav.trips },
    { key: 'blog', label: headerContent.nav.blog }
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDestinosOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const linkClass = scrolled
    ? 'text-vidaia-charcoal hover:text-vidaia-primary hover:bg-vidaia-light'
    : 'text-white/90 hover:text-white hover:bg-white/10'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <LangLink href="/" className="flex items-center group">
          <Image
            src={logoAsset.url}
            alt={logoAsset.alt}
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </LangLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          <LangLink href="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}>
            {headerContent.nav.home}
          </LangLink>

          {/* Destinos dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}
              onClick={() => setDestinosOpen((v) => !v)}
            >
              {headerContent.nav.destinations}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${destinosOpen ? 'rotate-180' : ''}`} />
            </button>

            {destinosOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                {countries.map((c) => (
                  <LangLink
                    key={c.slug}
                    href={`/destinos/${c.slug}`}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-vidaia-light transition-colors group/item"
                    onClick={() => setDestinosOpen(false)}
                  >
                    <img src={`https://flagcdn.com/20x15/${c.flagCode}.png`} alt="" width={20} height={15} className="rounded-sm flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-vidaia-dark group-hover/item:text-vidaia-primary">
                        {(c.content[language as keyof typeof c.content] ?? c.content.es).name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{(c.content[language as keyof typeof c.content] ?? c.content.es).description.split('. ')[0]}</p>
                    </div>
                  </LangLink>
                ))}
              </div>
            )}
          </div>

          {/* Lunas de Miel */}
          <LangLink
            href="/lunas-de-miel"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              scrolled
                ? 'text-vidaia-earth hover:text-vidaia-brown hover:bg-vidaia-cream'
                : 'text-vidaia-earth hover:bg-white/10'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            {headerContent.nav.honeymoons}
          </LangLink>

          <LangLink href="/viajes" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}>
            {headerContent.nav.trips}
          </LangLink>
          <LangLink href="/blog" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}>
            {headerContent.nav.blog}
          </LangLink>
          <button
            onClick={openContactModal}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}
          >
            {headerContent.nav.talkToUs}
          </button>
        </nav>

        {/* CTA + language switch + mobile toggle */}
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <LangLink
            href="/presupuesto"
            className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              scrolled
                ? 'bg-vidaia-earth text-white hover:bg-vidaia-brown shadow-sm'
                : 'bg-vidaia-earth/90 text-white hover:bg-vidaia-earth'
            }`}
          >
            {ui.buttons.requestQuote}
          </LangLink>

          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={headerContent.mobileMenu.openLabel}
          >
            {mobileOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-vidaia-dark' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-vidaia-dark' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            <LangLink
              href="/"
              className="block px-4 py-3 text-vidaia-charcoal hover:bg-vidaia-light rounded-xl font-medium text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {headerContent.nav.home}
            </LangLink>

            <div>
              <p className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                {headerContent.nav.destinations}
              </p>
              {countries.map((c) => (
                <LangLink
                  key={c.slug}
                  href={`/destinos/${c.slug}`}
                  className="flex items-center gap-2.5 pl-6 pr-4 py-2.5 text-sm text-vidaia-charcoal hover:bg-vidaia-light rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <img src={`https://flagcdn.com/20x15/${c.flagCode}.png`} alt="" width={20} height={15} className="rounded-sm flex-shrink-0" />
                  <span>{(c.content[language as keyof typeof c.content] ?? c.content.es).name}</span>
                </LangLink>
              ))}
            </div>

            <LangLink
              href="/lunas-de-miel"
              className="flex items-center gap-2 px-4 py-3 text-vidaia-earth hover:bg-vidaia-cream rounded-xl font-medium text-sm"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="w-4 h-4" />
              {headerContent.nav.honeymoons}
            </LangLink>

            {navItems.map((item) => (
              <LangLink
                key={item.key}
                href={`/${item.key}`}
                className="block px-4 py-3 text-vidaia-charcoal hover:bg-vidaia-light rounded-xl font-medium text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </LangLink>
            ))}

            <button
              onClick={() => { setMobileOpen(false); openContactModal() }}
              className="block w-full text-left px-4 py-3 text-vidaia-charcoal hover:bg-vidaia-light rounded-xl font-medium text-sm"
            >
              {headerContent.nav.talkToUs}
            </button>

            <div className="pt-3 border-t border-gray-100">
              <LangLink
                href="/presupuesto"
                className="block w-full text-center px-4 py-3.5 bg-vidaia-earth text-white font-semibold rounded-xl text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {ui.buttons.requestQuote}
              </LangLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
