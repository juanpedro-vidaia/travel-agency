import Link from 'next/link';
import { Mountain, Instagram, Mail, MapPin } from 'lucide-react';

const navGroups = [
  {
    title: 'Destinos',
    links: [
      { label: '🇦🇷 Argentina', href: '/destinos/argentina' },
      { label: '🇨🇱 Chile', href: '/destinos/chile' },
      { label: '🇧🇴 Bolivia', href: '/destinos/bolivia' },
      { label: 'Ver todos', href: '/destinos' },
    ],
  },
  {
    title: 'Vidaia',
    links: [
      { label: '💍 Lunas de Miel', href: '/lunas-de-miel' },
      { label: 'Viajes', href: '/viajes' },
      { label: 'Blog', href: '/blog' },
      { label: 'Quiénes somos', href: '/sobre-nosotros' },
      { label: '¿Hablamos?', href: '/contacto' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-vidaia-charcoal text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="p-1.5 bg-vidaia-primary rounded-lg">
                <Mountain className="w-5 h-5 text-white" strokeWidth={1.8} />
              </div>
              <span className="text-xl font-heading font-bold text-white tracking-wide">
                Vidaia
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Agencia de viajes personalizados especializada en Argentina, Chile y Bolivia.
              Diseñamos cada itinerario desde cero — para que sea tuyo de verdad.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-7">
              <a
                href="mailto:hola@viajesvidaia.com"
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-vidaia-earth flex-shrink-0" />
                hola@viajesvidaia.com
              </a>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-vidaia-earth flex-shrink-0" />
                España · Argentina · Chile
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/viajesvidaia"
                aria-label="Instagram de Viajes Vidaia"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 hover:bg-vidaia-primary text-gray-400 hover:text-white transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 Vidaia Travels SL. Todos los derechos reservados.</p>
          <div className="flex items-center gap-5">
            <Link href="/aviso-legal" className="hover:text-white transition-colors">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
