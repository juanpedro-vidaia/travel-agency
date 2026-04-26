import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Calendar } from 'lucide-react'
import { getHoneymoonTrips } from '@/lib/services/tripsService'
import HoneymoonFaq from '@/components/HoneymoonFaq'

export const metadata: Metadata = {
  title: 'Lunas de Miel a medida en Sudamérica | Viajes Vidaia',
  description:
    'Diseñamos lunas de miel únicas y personalizadas en Argentina, Chile, Bolivia y Sudamérica. Sin paquetes cerrados, sin itinerarios estándar.',
}

const features = [
  {
    emoji: '💛',
    title: 'Diseño 100% a medida',
    description:
      'Cada viaje empieza con vosotros. Entendemos cómo sois, qué os emociona y qué tipo de experiencia queréis vivir. A partir de ahí, lo creamos todo desde cero.',
  },
  {
    emoji: '🌍',
    title: 'Destinos con sentido',
    description:
      'Argentina, Chile, Bolivia y otros destinos de Sudamérica o combinaciones únicas. No solo os llevamos a lugares increíbles, sino a vivirlos de forma especial.',
  },
  {
    emoji: '🧭',
    title: 'Equilibrio perfecto',
    description:
      'Aventura, relax, momentos únicos… Diseñamos el viaje para que fluya, sin prisas pero sin perderos nada importante.',
  },
  {
    emoji: '🤍',
    title: 'Experiencias que marcan',
    description:
      'Una cena especial, un hotel con vistas únicas o un momento sorpresa. Cuidamos los detalles que convierten un viaje en algo inolvidable.',
  },
]

const steps = [
  {
    title: 'Os conocemos',
    description:
      'Queremos saber cómo sois, qué os gusta, qué no… y qué esperáis de este viaje tan especial.',
  },
  {
    title: 'Creamos vuestra propuesta',
    description: 'Diseñamos un itinerario único, pensado solo para vosotros.',
  },
  {
    title: 'Lo ajustamos juntos',
    description: 'Refinamos cada detalle hasta que sea perfecto.',
  },
  {
    title: 'Solo queda disfrutar',
    description: 'Nos encargamos de todo para que vosotros solo viváis el viaje.',
  },
]

const reasons = [
  'Porque es vuestro viaje.',
  'Porque es un viaje que solo se hace una vez.',
  'Porque no queréis algo genérico.',
  'Porque queréis recordar cada momento.',
]

export default function LunasDeМielPage() {
  const honeymoonTrips = getHoneymoonTrips()

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Atardecer en la Patagonia — Luna de miel en Sudamérica"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/65" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-8">
          <p className="text-vidaia-earth font-medium tracking-widest uppercase text-sm mb-5">
            💍 Viajes Vidaia · Lunas de Miel
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-5 text-balance">
            Viajes de novios a medida por Sudamérica
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 max-w-xl font-light italic">
            Tu luna de miel, sin plantillas.
            <br />
            Solo vuestra historia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="https://reuniones.clientify.com/#/viajesvidaia/hablemos30min?v2=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
            >
              Reservar reunión gratuita 💕
            </Link>
            <Link
              href="/presupuesto"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
            >
              Cuéntanos vuestro viaje
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTRODUCCIÓN ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-8 h-8 text-vidaia-earth mx-auto mb-6" fill="currentColor" />
          <p className="text-vidaia-charcoal/80 text-lg sm:text-xl leading-relaxed">
            No hay dos parejas iguales, ¿por qué debería serlo vuestro viaje?
            <br className="hidden sm:block" />
            <br className="hidden sm:block" />
            En Viajes Vidaia diseñamos lunas de miel completamente personalizadas, pensadas desde
            cero para vosotros. Sin paquetes cerrados, sin itinerarios estándar. Solo experiencias
            que encajen con vuestra forma de viajar, vuestro ritmo y lo que realmente os hace
            ilusión.
          </p>
        </div>
      </section>

      {/* ── SECCIÓN 1: QUÉ NOS DIFERENCIA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            ✨ ¿Qué hace diferente vuestra luna de miel con nosotros?
          </h2>
          <p className="text-center text-vidaia-charcoal/55 text-sm mb-14">
            Cada detalle pensado para vosotros, desde el primer día hasta el último
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-vidaia-sand rounded-2xl p-7 border border-vidaia-light hover:border-vidaia-earth hover:shadow-md transition-all"
              >
                <span className="text-3xl mb-4 block">{feature.emoji}</span>
                <h3 className="font-heading font-bold text-vidaia-dark text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-vidaia-charcoal/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: CÓMO LO DISEÑAMOS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            💬 ¿Cómo lo diseñamos?
          </h2>
          <p className="text-center text-vidaia-charcoal/55 text-sm mb-16">
            Un proceso sencillo y pensado para que todo sea fácil
          </p>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            {/* Connector line */}
            <div className="absolute top-5 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px border-t-2 border-dashed border-vidaia-light" />
            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-vidaia-primary text-white flex items-center justify-center font-heading font-bold text-lg mb-5 shadow-sm">
                    {i + 1}
                  </div>
                  <h3 className="font-heading font-bold text-vidaia-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-vidaia-charcoal/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-vidaia-primary text-white flex items-center justify-center font-heading font-bold text-lg shrink-0 shadow-sm">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-vidaia-light my-2 min-h-[2rem]" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-heading font-bold text-vidaia-dark mb-1 mt-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-vidaia-charcoal/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: POR QUÉ A MEDIDA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-12">
            💎 ¿Por qué una luna de miel a medida?
          </h2>
          <ul className="space-y-5 text-left">
            {reasons.map((reason, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart
                  className="w-5 h-5 text-vidaia-earth shrink-0"
                  fill="currentColor"
                />
                <span className="text-lg text-vidaia-charcoal/80">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SECCIÓN 4: IDEAS DE LUNAS DE MIEL ── */}
      {honeymoonTrips.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-sand">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
              🌎 Ideas de lunas de miel
            </h2>
            <p className="text-center text-vidaia-charcoal/55 text-sm mb-14">
              Todos nuestros viajes se adaptan completamente — esto es solo el punto de partida
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {honeymoonTrips.map((trip) => {
                const infoHref = `/presupuesto-itinerario?titulo=${encodeURIComponent(trip.honeymoonTitle ?? trip.title)}`
                const itineraryHref = `/itinerarios/${trip.slug}`
                const displayTitle = trip.honeymoonTitle ?? trip.title
                const displayTagline = trip.honeymoonTagline ?? trip.subtitle

                return (
                  <article
                    key={trip.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={trip.image}
                        alt={displayTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span className="absolute top-3 right-3 flex items-center gap-1 bg-vidaia-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
                        <Calendar className="w-3 h-3" />
                        {trip.days} días
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-vidaia-earth font-medium mb-1.5">
                        {displayTagline}
                      </p>
                      <h3 className="font-heading font-bold text-vidaia-dark text-base leading-snug mb-5 flex-1">
                        {displayTitle}
                      </h3>

                      <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-vidaia-light/60">
                        {trip.hasItinerary && (
                          <Link
                            href={itineraryHref}
                            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full bg-vidaia-primary hover:bg-vidaia-dark text-white transition-colors"
                          >
                            Ver itinerario
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={infoHref}
                          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full bg-vidaia-earth hover:bg-vidaia-brown text-white transition-colors"
                        >
                          Solicitar información
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── SECCIÓN 5: FAQ ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            ¿Qué dudas os pueden surgir?
          </h2>
          <p className="text-center text-vidaia-charcoal/55 text-sm mb-12">
            Las preguntas más habituales de las parejas que nos escriben
          </p>
          <HoneymoonFaq />
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-vidaia-dark via-[#2a5060] to-vidaia-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Heart className="w-10 h-10 text-vidaia-earth mx-auto mb-6" fill="currentColor" />
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Empieza a diseñar vuestra luna de miel
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Primera reunión gratuita y sin compromiso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://reuniones.clientify.com/#/viajesvidaia/hablemos30min?v2=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
            >
              Reservar reunión gratuita 💕
            </Link>
            <Link
              href="/presupuesto"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
            >
              Cuéntanos vuestro viaje
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
