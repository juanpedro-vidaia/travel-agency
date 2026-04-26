import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Cookies | Viajes Vidaia',
  description: 'Política de cookies de Viajes Vidaia.',
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-vidaia-charcoal/55 hover:text-vidaia-primary mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-10">
          Política de Cookies
        </h1>

        <div className="prose prose-gray max-w-none text-vidaia-charcoal/80 leading-relaxed space-y-6">
          <p className="text-vidaia-charcoal/50 text-sm">
            Contenido en preparación. Próximamente se publicará la política de cookies completa.
          </p>

          {/* El contenido legal irá aquí */}
        </div>
      </div>
    </main>
  )
}
