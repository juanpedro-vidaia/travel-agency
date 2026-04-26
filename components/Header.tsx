'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Mountain, Heart } from 'lucide-react';

const destinations = [
  { label: 'Argentina', href: '/destinos/argentina', flag: '🇦🇷', desc: 'Patagonia, Iguazú, Buenos Aires' },
  { label: 'Chile', href: '/destinos/chile', flag: '🇨🇱', desc: 'Atacama, Torres del Paine, Chiloé' },
  { label: 'Bolivia', href: '/destinos/bolivia', flag: '🇧🇴', desc: 'Salar de Uyuni, La Paz, Sucre' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destinosOpen, setDestinosOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDestinosOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const linkClass = scrolled
    ? 'text-vidaia-charcoal hover:text-vidaia-primary hover:bg-vidaia-light'
    : 'text-white/90 hover:text-white hover:bg-white/10';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className={`p-1.5 rounded-lg transition-colors ${
              scrolled ? 'bg-vidaia-primary' : 'bg-white/15'
            }`}
          >
            <Mountain className="w-5 h-5 text-white" strokeWidth={1.8} />
          </div>
          <span
            className={`text-xl font-heading font-bold tracking-wide transition-colors ${
              scrolled ? 'text-vidaia-dark' : 'text-white'
            }`}
          >
            Vidaia
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          <Link href="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}>
            Inicio
          </Link>

          {/* Destinos dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}
              onClick={() => setDestinosOpen((v) => !v)}
            >
              Destinos
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${destinosOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {destinosOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                {destinations.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-vidaia-light transition-colors group/item"
                    onClick={() => setDestinosOpen(false)}
                  >
                    <span className="text-xl mt-0.5">{d.flag}</span>
                    <div>
                      <p className="text-sm font-semibold text-vidaia-dark group-hover/item:text-vidaia-primary">
                        {d.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{d.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/lunas-de-miel"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              scrolled
                ? 'text-vidaia-earth hover:text-vidaia-brown hover:bg-vidaia-cream'
                : 'text-vidaia-earth hover:bg-white/10'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Lunas de Miel
          </Link>

          <Link href="/viajes" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}>
            Viajes
          </Link>
          <Link href="/blog" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}>
            Blog
          </Link>
          <Link href="/contacto" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}>
            ¿Hablamos?
          </Link>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/presupuesto"
            className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              scrolled
                ? 'bg-vidaia-earth text-white hover:bg-vidaia-brown shadow-sm'
                : 'bg-vidaia-earth/90 text-white hover:bg-vidaia-earth'
            }`}
          >
            Solicitar mi viaje a medida
          </Link>

          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
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
            <Link
              href="/"
              className="block px-4 py-3 text-vidaia-charcoal hover:bg-vidaia-light rounded-xl font-medium text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Inicio
            </Link>

            <div>
              <p className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Destinos
              </p>
              {destinations.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="flex items-center gap-2.5 pl-6 pr-4 py-2.5 text-sm text-vidaia-charcoal hover:bg-vidaia-light rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{d.flag}</span>
                  <span>{d.label}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/lunas-de-miel"
              className="flex items-center gap-2 px-4 py-3 text-vidaia-earth hover:bg-vidaia-cream rounded-xl font-medium text-sm"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="w-4 h-4" />
              Lunas de Miel
            </Link>

            {['Viajes', 'Blog'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block px-4 py-3 text-vidaia-charcoal hover:bg-vidaia-light rounded-xl font-medium text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </Link>
            ))}

            <Link
              href="/contacto"
              className="block px-4 py-3 text-vidaia-charcoal hover:bg-vidaia-light rounded-xl font-medium text-sm"
              onClick={() => setMobileOpen(false)}
            >
              ¿Hablamos?
            </Link>

            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/presupuesto"
                className="block w-full text-center px-4 py-3.5 bg-vidaia-earth text-white font-semibold rounded-xl text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Solicitar mi viaje a medida
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
