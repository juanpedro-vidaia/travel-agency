import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react'
import { getCountries } from '@/lib/services/countriesService'

export default function Footer() {
  const countries = getCountries()
  return (
    <footer className="bg-vidaia-charcoal text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Columna 1: Marca ── */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/logo/viajes-vidaia-logo-color.jpg"
                alt="Viajes Vidaia"
                width={160}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Agencia de viajes personalizados especializada en Argentina, Chile y Bolivia.
              Diseñamos cada itinerario desde cero — para que sea tuyo de verdad.
            </p>

            <div className="space-y-2.5 mb-7">
              <a
                href="mailto:info@viajesvidaia.com"
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-vidaia-earth flex-shrink-0" />
                info@viajesvidaia.com
              </a>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-vidaia-earth flex-shrink-0" />
                España · Argentina · Chile
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/viajesvidaia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Viajes Vidaia"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 hover:bg-vidaia-primary text-gray-400 hover:text-white transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook de Viajes Vidaia"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 hover:bg-vidaia-primary text-gray-400 hover:text-white transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── Columna 2: Destinos ── */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              Destinos
            </h3>
            <ul className="space-y-3">
              {countries.map((c) => (
                <li key={c.slug}>
                  <Link href={`/destinos/${c.slug}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <img src={`https://flagcdn.com/20x15/${c.flagCode}.png`} alt="" width={20} height={15} className="rounded-sm flex-shrink-0" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 3: Viajes Vidaia ── */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              Viajes Vidaia
            </h3>
            <ul className="space-y-3">
              {[
                { label: '💍 Lunas de Miel', href: '/lunas-de-miel' },
                { label: 'Viajes', href: '/viajes' },
                { label: 'Blog', href: '/blog' },
                { label: 'Quiénes somos', href: '/#quienes-somos' },
                { label: '¿Hablamos?', href: '/contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 4: Legal ── */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Aviso legal', href: '/aviso-legal' },
                { label: 'Política de privacidad', href: '/privacidad' },
                { label: 'Política de cookies', href: '/cookies' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              Agencia de viajes oficial<br />
              CICMA n.º 4641<br />
              Comunidad de Madrid
            </p>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Viajes Vidaia · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
