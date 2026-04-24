'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, MapPin } from 'lucide-react'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const OPCIONALES = [
  'Cataratas Brasileñas',
  'Estancia Nibepo Aike',
  'Catamarán Canal Beagle (tarde)',
  'Espectáculo de Tango con cena',
]

const CATEGORIES = [
  { value: '3', label: '3★', sublabel: 'Económico' },
  { value: '4', label: '4★', sublabel: 'Confort' },
  { value: '5', label: '5★', sublabel: 'Lujo' },
]

interface FormState {
  nombre: string
  email: string
  telefono: string
  adultos: string
  menores: string
  mes: string
  categoria: string
  opcionales: string[]
  comentarios: string
}

function PresupuestoItinerarioContent() {
  const searchParams = useSearchParams()
  const titulo = searchParams.get('titulo') ?? ''
  const subtitulo = searchParams.get('subtitulo') ?? ''

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    telefono: '',
    adultos: '2',
    menores: '0',
    mes: '',
    categoria: '',
    opcionales: [],
    comentarios: '',
  })

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const toggleOpcional = (opt: string) => {
    setForm((prev) => ({
      ...prev,
      opcionales: prev.opcionales.includes(opt)
        ? prev.opcionales.filter((o) => o !== opt)
        : [...prev.opcionales, opt],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const backHref = titulo ? `/destinos/argentina` : '/itinerarios/paisajes-naturales-argentina'

  if (submitted) {
    return (
      <main className="min-h-screen bg-vidaia-sand flex items-center justify-center px-4 py-20">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-vidaia-light rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-vidaia-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-vidaia-dark mb-3">¡Perfecto!</h2>
          <p className="text-vidaia-charcoal/70 leading-relaxed mb-8">
            En menos de 24h te enviamos tu presupuesto personalizado.{' '}
            <strong className="text-vidaia-dark">¡Nos ponemos en marcha!</strong>
          </p>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-vidaia-primary hover:text-vidaia-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        </div>
      </main>
    )
  }

  const heroTitle = titulo
    ? `Me interesa: ${titulo}`
    : 'Me interesa este itinerario'

  const heroSubtitle = subtitulo || 'Paisajes naturales de Argentina · 13 días'

  return (
    <main className="min-h-screen bg-vidaia-sand">
      {/* Hero */}
      <div className="relative h-52 sm:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
          alt="Paisajes naturales de Argentina"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-vidaia-dark/65" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-vidaia-earth text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-xs sm:max-w-none">{heroSubtitle}</span>
          </p>
          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold max-w-2xl text-balance">
            {heroTitle}
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10">
          <p className="text-center text-vidaia-charcoal/65 mb-8 leading-relaxed">
            Cuéntanos cuándo queréis ir y lo adaptamos exactamente para vosotros.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                Nombre y apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.nombre}
                onChange={(e) => set('nombre', e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full border border-vidaia-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="tu@email.com"
                className="w-full border border-vidaia-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={form.telefono}
                onChange={(e) => set('telefono', e.target.value)}
                placeholder="+34 600 000 000"
                className="w-full border border-vidaia-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
              />
            </div>

            {/* Personas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                  Adultos <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.adultos}
                  onChange={(e) => set('adultos', e.target.value)}
                  className="w-full border border-vidaia-light rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'adulto' : 'adultos'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                  Menores
                </label>
                <select
                  value={form.menores}
                  onChange={(e) => set('menores', e.target.value)}
                  className="w-full border border-vidaia-light rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
                >
                  {Array.from({ length: 7 }, (_, i) => i).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'menor' : 'menores'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mes */}
            <div>
              <label className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                Mes de inicio preferido <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.mes}
                onChange={(e) => set('mes', e.target.value)}
                className="w-full border border-vidaia-light rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
              >
                <option value="">Selecciona un mes</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-semibold text-vidaia-dark mb-3">
                Categoría de hoteles preferida <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {CATEGORIES.map(({ value, label, sublabel }) => (
                  <label
                    key={value}
                    className={`flex flex-col items-center gap-0.5 px-3 py-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      form.categoria === value
                        ? 'border-vidaia-primary bg-vidaia-light'
                        : 'border-vidaia-light hover:border-vidaia-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="categoria"
                      value={value}
                      required
                      checked={form.categoria === value}
                      onChange={(e) => set('categoria', e.target.value)}
                      className="sr-only"
                    />
                    <span
                      className={`font-bold text-base ${
                        form.categoria === value ? 'text-vidaia-dark' : 'text-vidaia-charcoal'
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-xs text-vidaia-charcoal/55">{sublabel}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Opcionales */}
            <div>
              <label className="block text-sm font-semibold text-vidaia-dark mb-3">
                Opcionales que te interesan
              </label>
              <div className="space-y-2">
                {OPCIONALES.map((opt) => {
                  const checked = form.opcionales.includes(opt)
                  return (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                        checked
                          ? 'border-amber-400 bg-amber-50 text-amber-800'
                          : 'border-vidaia-light hover:border-amber-300 hover:bg-amber-50/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOpcional(opt)}
                        className="w-4 h-4 accent-amber-500 shrink-0"
                      />
                      <span className="text-sm">⭐ {opt}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Comentarios */}
            <div>
              <label className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                ¿Algo más que quieras contarnos?{' '}
                <span className="font-normal text-vidaia-charcoal/45">(opcional)</span>
              </label>
              <textarea
                rows={4}
                value={form.comentarios}
                onChange={(e) => set('comentarios', e.target.value)}
                placeholder="Fechas concretas, peticiones especiales, alergias alimentarias..."
                className="w-full border border-vidaia-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold py-4 rounded-full transition-colors text-base sm:text-lg mt-2"
            >
              Enviar mi solicitud
            </button>
          </form>

          <p className="text-center text-xs text-vidaia-charcoal/35 mt-6">
            Al enviar aceptas nuestra{' '}
            <Link href="/privacidad" className="underline hover:text-vidaia-primary transition-colors">
              política de privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}

export default function PresupuestoItinerarioPage() {
  return (
    <Suspense>
      <PresupuestoItinerarioContent />
    </Suspense>
  )
}
