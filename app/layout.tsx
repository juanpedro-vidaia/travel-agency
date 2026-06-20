import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactModal from '@/components/forms/ContactModal'
import ContactFAB from '@/components/ui/ContactFAB'
import CookieFAB from '@/components/ui/CookieFAB'
import CookieConsentManager from '@/components/scripts/CookieConsentManager'
import GoogleAnalytics from '@/components/scripts/GoogleAnalytics'
import JsonLd from '@/components/scripts/JsonLd'
import { ContactModalProvider } from '@/lib/context/ContactModalContext'
import { ConsentProvider } from '@/lib/context/ConsentContext'
import { LanguageProvider } from '@/lib/context/LanguageContext'
import { getCountriesOrdered } from '@/lib/services/countriesService'
import { getDestinations } from '@/lib/services/destinationsService'
import { buildOrganizationSchema, buildWebSiteSchema, buildPageSchema } from '@/lib/schema'
import { BASE_URL } from '@/lib/config/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Viajes Vidaia — El viaje de tu vida hecho realidad',
    template: '%s | Viajes Vidaia',
  },
  description:
    'Agencia de viajes personalizados especializada en Argentina, Chile y Bolivia. Viajes únicos, sostenibles y con apoyo local. Diseñamos tu itinerario desde cero.',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    siteName: 'Viajes Vidaia',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@viajesvidaia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const countries = getCountriesOrdered()
  const destinations = getDestinations()
  const organizationSchema = buildOrganizationSchema(countries, destinations)

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <JsonLd data={buildPageSchema(organizationSchema, buildWebSiteSchema())} id="ld-site" />
        <LanguageProvider>
          <ConsentProvider>
            <GoogleAnalytics />
            <ContactModalProvider>
              <Header />
              {children}
              <Footer />
              <ContactFAB />
              <CookieFAB />
              <ContactModal />
              <CookieConsentManager />
            </ContactModalProvider>
          </ConsentProvider>
        </LanguageProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
