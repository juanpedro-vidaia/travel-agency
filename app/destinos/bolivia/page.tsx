import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Viajes a Bolivia — Viajes Vidaia',
  description:
    'Salar de Uyuni, La Paz, Sucre y el Lago Titicaca. Diseñamos tu viaje a Bolivia a medida.',
}

export default function BoliviaPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Salar de Uyuni, Bolivia"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-vidaia-earth font-semibold uppercase tracking-widest text-xs mb-4">
            🇧🇴 Viajes Vidaia · Bolivia
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Viajes a Bolivia
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-10 text-balance">
            Salar de Uyuni, La Paz, Sucre y el Lago Titicaca.
            Próximamente diseñaremos aquí tus rutas bolivianas.
          </p>
          <Link
            href="/presupuesto"
            className="inline-flex items-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
          >
            Cuéntanos tu viaje soñado
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
