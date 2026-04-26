import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
        <Header />
        {children}
        <Footer />

        {/* Clientify — Widget de WhatsApp (esquina inferior derecha) */}
        <Script
          src="https://apps.clientify.net/widget-whatsapp2.0/app/assets/index-5yccDyx4.js?id=59083710-7ba9-4bff-b034-1cf1d2046e6d&path=https://plus.clientify.com"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
