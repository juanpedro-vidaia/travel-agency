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
  { id: 'opt_cataratas',  value: 'cataratas_brasilenas',   label: 'Cataratas Brasileñas' },
  { id: 'opt_estancia',   value: 'estancia_nibepo_aike',   label: 'Estancia Nibepo Aike' },
  { id: 'opt_catamaran',  value: 'catamaran_canal_beagle', label: 'Catamarán Canal Beagle (tarde)' },
  { id: 'opt_tango',      value: 'tango_show',             label: 'Espectáculo de Tango con cena' },
]

const CATEGORIES = [
  { value: '3', id: 'cat_3', label: '3★', sublabel: 'Económico' },
  { value: '4', id: 'cat_4', label: '4★', sublabel: 'Confort' },
  { value: '5', id: 'cat_5', label: '5★', sublabel: 'Lujo' },
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
  const titulo    = searchParams.get('titulo')    ?? ''
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

  const toggleOpcional = (value: string) => {
    setForm((prev) => ({
      ...prev,
      opcionales: prev.opcionales.includes(value)
        ? prev.opcionales.filter((o) => o !== value)
        : [...prev.opcionales, value],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const backHref = titulo ? '/destinos/argentina' : '/itinerarios/paisajes-naturales-argentina'
  const heroTitle    = titulo    ? `Me interesa: ${titulo}` : 'Me interesa este itinerario'
  const heroSubtitle = subtitulo || 'Paisajes naturales de Argentina · 13 días'
  const itineraryRef = titulo    || 'Paisajes naturales de Argentina'

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
            {/* Hidden fields para Clientify */}
            <input type="hidden" name="form_source"          value="presupuesto-itinerario" />
            <input type="hidden" name="itinerary_reference"  value={itineraryRef} />

            {/* Nombre */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                Nombre y apellidos <span className="text-red-500">*</span>
              </label>
              <input
                id="full_name"
                name="full_name"
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
              <label htmlFor="email" className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
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
              <label htmlFor="phone" className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
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
                <label htmlFor="adults" className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                  Adultos <span className="text-red-500">*</span>
                </label>
                <select
                  id="adults"
                  name="adults"
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
                <label htmlFor="children" className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                  Menores
                </label>
                <select
                  id="children"
                  name="children"
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
              <label htmlFor="start_month" className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                Mes de inicio preferido <span className="text-red-500">*</span>
              </label>
              <select
                id="start_month"
                name="start_month"
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

            {/* Categoría — radio buttons con id/name correctos */}
            <fieldset>
              <legend className="block text-sm font-semibold text-vidaia-dark mb-3">
                Categoría de hoteles preferida <span className="text-red-500">*</span>
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {CATEGORIES.map(({ value, id, label, sublabel }) => (
                  <label
                    key={value}
                    htmlFor={id}
                    className={`flex flex-col items-center gap-0.5 px-3 py-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      form.categoria === value
                        ? 'border-vidaia-primary bg-vidaia-light'
                        : 'border-vidaia-light hover:border-vidaia-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      id={id}
                      name="hotel_category"
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
            </fieldset>

            {/* Opcionales — todos con name="optionals", value distinto */}
            <fieldset>
              <legend className="block text-sm font-semibold text-vidaia-dark mb-3">
                Opcionales que te interesan
              </legend>
              <div className="space-y-2">
                {OPCIONALES.map(({ id, value, label }) => {
                  const checked = form.opcionales.includes(value)
                  return (
                    <label
                      key={value}
                      htmlFor={id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                        checked
                          ? 'border-amber-400 bg-amber-50 text-amber-800'
                          : 'border-vidaia-light hover:border-amber-300 hover:bg-amber-50/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={id}
                        name="optionals"
                        value={value}
                        checked={checked}
                        onChange={() => toggleOpcional(value)}
                        className="w-4 h-4 accent-amber-500 shrink-0"
                      />
                      <span className="text-sm">⭐ {label}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            {/* Comentarios */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-vidaia-dark mb-1.5">
                ¿Algo más que quieras contarnos?{' '}
                <span className="font-normal text-vidaia-charcoal/45">(opcional)</span>
              </label>
              <textarea
                id="message"
                name="message"
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
