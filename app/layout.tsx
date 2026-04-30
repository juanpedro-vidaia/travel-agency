import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import ContactFAB from '@/components/ContactFAB'
import { ContactModalProvider } from '@/lib/context/ContactModalContext'
import { LanguageProvider } from '@/lib/context/LanguageContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Viajes Vidaia — El viaje de tu vida hecho realidad',
  description:
    'Agencia de viajes personalizados especializada en Argentina, Chile y Bolivia. Viajes únicos, sostenibles y con apoyo local. Diseñamos tu itinerario desde cero.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable}`}>
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
