import Link from 'next/link'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto py-20">
        <div className="w-20 h-20 bg-vidaia-light rounded-full flex items-center justify-center mx-auto mb-8">
          <Compass className="w-10 h-10 text-vidaia-primary" strokeWidth={2} />
        </div>
        <h1 className="font-heading text-3xl font-bold text-vidaia-dark mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8">
          La página que buscas no existe o ha cambiado de dirección. Pero el
          viaje no termina aquí.
        </p>
        <Link
          href="/es"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-vidaia-primary hover:bg-vidaia-mid text-white font-bold text-sm rounded-2xl transition-all shadow-sm hover:shadow-md"
        >
          Volver al inicio
        </Link>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <Link href="/es/viajes" className="text-vidaia-primary font-medium hover:underline">
            Ver viajes
          </Link>
          <Link href="/es/blog" className="text-vidaia-primary font-medium hover:underline">
            Ir al blog
          </Link>
        </div>
      </div>
    </main>
  )
}
