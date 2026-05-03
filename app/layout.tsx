import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import ContactFAB from '@/components/ContactFAB'
import JsonLd from '@/components/JsonLd'
import { ContactModalProvider } from '@/lib/context/ContactModalContext'
import { LanguageProvider } from '@/lib/context/LanguageContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: {
    default: 'Viajes Vidaia — El viaje de tu vida hecho realidad',
    template: '%s | Viajes Vidaia',
  },
  description:
    'Agencia de viajes personalizados especializada en Argentina, Chile y Bolivia. Viajes únicos, sostenibles y con apoyo local. Diseñamos tu itinerario desde cero.',
  icons: { icon: '/favicon.png' },
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

const travelAgencyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Viajes Vidaia',
  url: 'https://www.viajesvidaia.com',
  logo: 'https://www.viajesvidaia.com/images/logo/viajes-vidaia-logo.png',
  description:
    'Agencia de viajes personalizados especializada en Argentina, Chile y Bolivia.',
  email: 'info@viajesvidaia.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle de la Bahía de Algeciras 1',
    addressLocality: 'Madrid',
    postalCode: '28033',
    addressCountry: 'ES',
  },
  sameAs: ['https://www.instagram.com/viajesvidaia'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <JsonLd data={travelAgencyJsonLd} />
        <LanguageProvider>
          <ContactModalProvider>
            <Header />
            {children}
            <Footer />
            <ContactFAB />
            <ContactModal />
          </ContactModalProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
