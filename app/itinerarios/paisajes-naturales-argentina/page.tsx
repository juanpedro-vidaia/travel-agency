'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  Plane,
  Leaf,
  Bed,
  Star,
  Waves,
  UtensilsCrossed,
  Music,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react'

interface ItineraryDay {
  day: number
  title: string
  cities: string
  hotel?: string
  schedule?: string
  duration?: string
  description: string
  flights?: string[]
  highlights?: string[]
  isOptionalDay?: boolean
  optionalLabel?: string
  includes?: string
  notIncludes?: string
}

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    alt: 'Cataratas del Iguazú, Argentina',
    location: 'Cataratas del Iguazú',
  },
  {
    src: 'https://images.unsplash.com/photo-1499343628900-f45a080d42d4?w=1920&q=80',
    alt: 'Ballena franca austral · Península de Valdés',
    location: 'Península de Valdés',
  },
  {
    src: 'https://images.unsplash.com/photo-1589993624-d5e0e6a27fd8?w=1920&q=80',
    alt: 'Buenos Aires, Argentina',
    location: 'Buenos Aires',
  },
  {
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
    alt: 'Glaciar Perito Moreno, El Calafate',
    location: 'Glaciar Perito Moreno · El Calafate',
  },
  {
    src: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=1920&q=80',
    alt: 'Canal Beagle, Ushuaia',
    location: 'Canal Beagle · Ushuaia',
  },
]

const itineraryDays: ItineraryDay[] = [
  {
    day: 1,
    title: 'Llegada a Buenos Aires y vuelo a Puerto Iguazú',
    cities: 'Barcelona · Buenos Aires · Puerto Iguazú',
    hotel: 'City Falls Iguazú 3★ Superior',
    flights: [
      'BCN → MAD: IB412 · 13:35 - 15:00',
      'MAD → EZE: AR1133 · 20:05',
      'EZE → IGR: AR1774 · 06:45 - 08:40',
    ],
    description:
      'Llegada a Buenos Aires y vuelo interno a Puerto Iguazú. Recepción en aeropuerto y traslado al hotel.',
  },
  {
    day: 2,
    title: 'Cataratas Brasileñas · Día libre',
    cities: 'Puerto Iguazú',
    hotel: 'City Falls Iguazú 3★ Superior',
    isOptionalDay: true,
    optionalLabel: 'Visita a las Cataratas Brasileñas con entradas incluidas',
    description: 'Día libre en Iguazú para disfrutar a vuestro ritmo.',
  },
  {
    day: 3,
    title: 'Cataratas Argentinas',
    cities: 'Puerto Iguazú',
    hotel: 'City Falls Iguazú 3★ Superior',
    schedule: '07:20 - 16:00 hs',
    duration: '8 horas',
    highlights: [
      'Paseo Inferior (1.200 m)',
      'Paseo Superior (1.100 m)',
      'Garganta del Diablo en tren ecológico',
    ],
    description: 'Visita al Parque Nacional Iguazú con las pasarelas sobre el agua.',
    includes: 'Traslados y guía bilingüe',
    notIncludes: 'Almuerzo',
  },
  {
    day: 4,
    title: 'De Puerto Iguazú a Puerto Madryn',
    cities: 'Puerto Iguazú · Puerto Madryn',
    hotel: 'Yene Hue 4★',
    flights: ['IGR → AEP → REL'],
    description:
      'Traslado al aeropuerto. Vuelo a Puerto Madryn, puerta de entrada a la Península Valdés y el avistaje de ballena franca austral.',
  },
  {
    day: 5,
    title: 'Excursión Península de Valdés y Ballena Franca Austral',
    cities: 'Puerto Madryn · Península de Valdés',
    hotel: 'Yene Hue 4★',
    schedule: '07:30 hs',
    duration: '10 horas',
    highlights: [
      'Ruta provincial 1 y 2 hasta el Istmo Carlos Ameghino',
      'Puerto Pirámides · Lobería de Punta Pirámide',
      'Caleta Valdés (elefantes marinos)',
      'Avistaje de ballena franca austral en catamarán desde Puerto Pirámides',
    ],
    description: 'Temporada: Junio a principios de Diciembre.',
    includes: 'Entrada reserva natural',
    notIncludes: 'Almuerzo',
  },
  {
    day: 6,
    title: 'De Puerto Madryn a Buenos Aires',
    cities: 'Puerto Madryn · Buenos Aires',
    hotel: 'Mérit San Telmo 3★',
    flights: ['REL → AEP'],
    description:
      'Vuelo a Buenos Aires. Tarde libre para explorar la ciudad: Tango, Teatro Colón, San Telmo, La Boca, Recoleta, Palermo, Puerto Madero.',
  },
  {
    day: 7,
    title: 'Buenos Aires: Visita de la ciudad con guía',
    cities: 'Buenos Aires',
    hotel: 'Mérit San Telmo 3★',
    schedule: 'Tour AM · Recogida 09:00 hs',
    duration: '3,5 - 4 horas',
    highlights: [
      'Floralis Genérica · Plaza de Mayo',
      'La Boca · San Telmo',
      'Palermo · Puerto Madero · Obelisco',
    ],
    description: 'Tarde libre en Buenos Aires.',
    includes: 'Guía de turismo y recogida en hoteles del centro',
  },
  {
    day: 8,
    title: 'De Buenos Aires a El Calafate',
    cities: 'Buenos Aires · El Calafate',
    hotel: 'RH Rochester Calafate 4★',
    flights: ['AEP → FTE: AR1850 · 15:15 - 19:50'],
    description:
      'Vuelo a El Calafate, puerta al Parque Nacional Los Glaciares y al Glaciar Perito Moreno.',
  },
  {
    day: 9,
    title: 'Glaciar Perito Moreno y Safari Náutico',
    cities: 'El Calafate',
    hotel: 'RH Rochester Calafate 4★',
    schedule: '09:00 - 17:00 hs',
    duration: '8 horas',
    highlights: [
      'Ruta asfaltada hasta el Parque Nacional Los Glaciares (50 km)',
      'Pasarelas del Perito Moreno con vistas al frente del glaciar',
      'Safari Náutico (1 hora): navegación del Lago Rico',
      'Pared sur del glaciar de 60 m de altura',
    ],
    description: '',
    includes: 'Traslados y guía bilingüe',
  },
  {
    day: 10,
    title: 'El Calafate: Día libre',
    cities: 'El Calafate',
    hotel: 'RH Rochester Calafate 4★',
    optionalLabel:
      'Estancia Nibepo Aike — Día de campo con asado de cordero · 08:30-16:30 hs. Incluye: traslados, mate y torta frita, almuerzo asado, 1 copa de vino.',
    description:
      'Día libre para disfrutar de El Calafate. Opciones: Glaciarium (museo del hielo), centro de El Calafate, contemplar el Lago Argentino.',
  },
  {
    day: 11,
    title: 'De El Calafate a Ushuaia',
    cities: 'El Calafate · Ushuaia',
    hotel: 'Altos Ushuaia Hotel & Resto 3★ Superior',
    flights: ['FTE → USH: AR1896 · 16:30 - 17:50'],
    description:
      'Ushuaia, el Fin del Mundo entre el Canal Beagle y la Sierra del Martial.',
  },
  {
    day: 12,
    title: 'Parque Nacional Tierra del Fuego y Canal Beagle',
    cities: 'Ushuaia',
    hotel: 'Altos Ushuaia Hotel & Resto 3★ Superior',
    highlights: [
      'Mañana: Parque Nacional Tierra del Fuego (salida 08:00 hs · 5 horas)',
      'Tren del Fin del Mundo · Bahía Ensenada · Lago Acigami',
      'Bahía Lapataia — fin de la Ruta Panamericana',
      'Tarde: Navegación Canal Beagle (15:00-18:00 hs · 30 km)',
    ],
    description: '',
    includes:
      'Guía, ticket Tren del Fin del Mundo, traslados, tasa portuaria y cafetería a bordo',
  },
  {
    day: 13,
    title: 'De Ushuaia a Buenos Aires · Cena Tango Show',
    cities: 'Ushuaia · Buenos Aires',
    hotel: 'Mérit San Telmo 3★',
    flights: ['USH → AEP: AR1873 · 09:30 - 13:00'],
    highlights: [
      'Espectáculo de tango con cena en La Ventana (San Telmo)',
      'Cena: 20:00-21:30 hs / Show: 21:30-23:30 hs',
    ],
    description: '',
    includes:
      'Entrada, plato principal, postre y 1 botella de vino cada 2 personas',
  },
  {
    day: 14,
    title: 'Vuelo de regreso a España',
    cities: 'Buenos Aires · Madrid',
    flights: ['EZE → MAD: AR1134 · 15:05'],
    description: 'Traslado privado al Aeropuerto Ezeiza. Noche en vuelo.',
  },
  {
    day: 15,
    title: 'Llegada a Madrid y vuelo a Barcelona',
    cities: 'Madrid · Barcelona',
    flights: ['MAD → BCN: IB413 · 12:40 - 14:00'],
    description: 'Llegada a Madrid a las 08:20 hs. Conexión a Barcelona. Fin de nuestros servicios.',
  },
]

const hotelCards = [
  {
    name: 'City Falls Iguazú',
    stars: 3,
    category: 'Superior',
    nights: 2,
    dates: '17-19 sep',
    city: 'Iguazú',
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  },
  {
    name: 'Yene Hue',
    stars: 4,
    nights: 2,
    dates: '19-21 sep',
    city: 'Puerto Madryn',
    img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
  },
  {
    name: 'Mérit San Telmo',
    stars: 3,
    nights: 2,
    dates: '21-23 sep',
    city: 'Buenos Aires',
    img: 'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=800&q=80',
  },
  {
    name: 'RH Rochester Calafate',
    stars: 4,
    nights: 3,
    dates: '23-26 sep',
    city: 'El Calafate',
    img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  },
  {
    name: 'Altos Ushuaia',
    stars: 3,
    category: 'Superior',
    nights: 2,
    dates: '26-28 sep',
    city: 'Ushuaia',
    img: 'https://images.unsplash.com/photo-1596413038447-f0a9e6ecefff?w=800&q=80',
  },
  {
    name: 'Mérit San Telmo',
    stars: 3,
    nights: 1,
    dates: '28-29 sep',
    city: 'Buenos Aires (vuelta)',
    img: 'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=800&q=80',
  },
]

const optionals = [
  {
    Icon: Waves,
    title: 'Cataratas Brasileñas',
    description:
      'Visita al lado brasileño de las Cataratas del Iguazú con entradas incluidas. Una perspectiva diferente y espectacular.',
  },
  {
    Icon: UtensilsCrossed,
    title: 'Estancia Nibepo Aike',
    description:
      'Día de campo patagónico con asado de cordero, mate, torta frita y copa de vino. Una experiencia auténticamente argentina.',
  },
  {
    Icon: Music,
    title: 'Catamarán Canal Beagle (tarde)',
    description:
      'Navegación exclusiva al atardecer hasta Isla de Lobos. Lobos y leones marinos en su hábitat natural.',
  },
]

export default function PaisajesNaturalesArgentina() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]))
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  const toggleDay = (day: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else next.add(day)
      return next
    })
  }

  return (
    <main className="min-h-screen bg-white pb-20 lg:pb-0">
      {/* ── HERO CAROUSEL ── */}
      <section
        className="relative h-screen overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/65" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-8">
          <p className="text-vidaia-earth font-medium tracking-widest uppercase text-sm mb-4">
            Viajes Vidaia · Itinerario destacado
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-4 text-balance">
            Paisajes naturales de Argentina: ballenas, glaciares, cataratas y el Fin del Mundo
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl">
            Iguazú · Península de Valdés · Buenos Aires · El Calafate · Ushuaia
          </p>
          <p className="text-white/60 mt-1 text-base">12 noches / 13 días</p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
            {[
              { Icon: Calendar, text: '13 días · 12 noches' },
              { Icon: MapPin, text: 'Argentina completa' },
              { Icon: Leaf, text: 'Naturaleza y aventura' },
              { Icon: Plane, text: 'Vuelos internos incluidos' },
            ].map(({ Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-medium"
              >
                <Icon className="w-4 h-4 text-vidaia-earth" />
                {text}
              </span>
            ))}
          </div>

          {/* CTA — desktop only */}
          <Link
            href="/presupuesto-itinerario"
            className="hidden lg:inline-flex items-center gap-2 mt-10 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
          >
            Quiero este viaje a medida
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Location label */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="flex items-center gap-1.5 text-white/75 text-sm">
            <MapPin className="w-4 h-4" />
            {slides[currentSlide].location}
          </span>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-vidaia-earth w-6'
                  : 'bg-white/50 w-2 hover:bg-white/80'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── DESCRIPCIÓN ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-vidaia-charcoal/80 leading-relaxed">
            Argentina tiene una capacidad única para dejarte sin palabras. Este viaje lo demuestra en
            cada etapa: las cataratas más impresionantes del mundo, ballenas francas australes, el
            glaciar Perito Moreno en movimiento y el mítico Fin del Mundo en Ushuaia.{' '}
            <strong className="text-vidaia-dark">
              13 días de naturaleza pura y experiencias únicas.
            </strong>
          </p>
          <Link
            href="/presupuesto-itinerario"
            className="inline-flex items-center gap-2 mt-8 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-8 py-4 rounded-full transition-colors text-base sm:text-lg"
          >
            Quiero este viaje a medida
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── ITINERARIO ACORDEÓN ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-vidaia-sand">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            Itinerario día a día
          </h2>
          <p className="text-center text-vidaia-charcoal/55 mb-10 text-sm">
            Haz clic en cada día para ver los detalles
          </p>

          <div className="space-y-2">
            {itineraryDays.map((day) => {
              const isOpen = openDays.has(day.day)
              return (
                <div
                  key={day.day}
                  className="border border-vidaia-light rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => toggleDay(day.day)}
                    className={`w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left transition-colors ${
                      isOpen ? 'bg-vidaia-dark' : 'bg-white hover:bg-vidaia-sand'
                    }`}
                  >
                    <span
                      className={`shrink-0 font-heading font-bold text-lg w-11 h-11 rounded-full flex items-center justify-center ${
                        isOpen
                          ? 'bg-vidaia-earth text-white'
                          : 'bg-vidaia-light text-vidaia-dark'
                      }`}
                    >
                      {day.day}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold leading-snug ${
                          isOpen ? 'text-white' : 'text-vidaia-dark'
                        }`}
                      >
                        {day.title}
                      </p>
                      <p
                        className={`text-xs sm:text-sm flex items-center gap-1 mt-0.5 ${
                          isOpen ? 'text-white/60' : 'text-vidaia-charcoal/55'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{day.cities}</span>
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-white/70' : 'text-vidaia-primary'
                      }`}
                    />
                  </button>

                  {/* Accordion body */}
                  {isOpen && (
                    <div className="bg-white border-t border-vidaia-light/60 p-5 sm:p-6 space-y-4">
                      {/* Optional full day */}
                      {day.isOptionalDay && (
                        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                          <span className="text-amber-500 text-lg leading-none mt-0.5">⭐</span>
                          <p className="text-sm text-amber-800">
                            <span className="font-semibold">DÍA LIBRE</span> —{' '}
                            <span className="font-semibold">OPCIONAL:</span> {day.optionalLabel}
                          </p>
                        </div>
                      )}

                      {/* Optional activity (day is NOT optional, but has optional activity) */}
                      {!day.isOptionalDay && day.optionalLabel && (
                        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                          <span className="text-amber-500 text-lg leading-none mt-0.5">⭐</span>
                          <p className="text-sm text-amber-800">
                            <span className="font-semibold">OPCIONAL:</span> {day.optionalLabel}
                          </p>
                        </div>
                      )}

                      {/* Schedule & duration */}
                      {(day.schedule || day.duration) && (
                        <div className="flex flex-wrap gap-4 text-sm text-vidaia-charcoal/65">
                          {day.schedule && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-vidaia-primary" />
                              {day.schedule}
                            </span>
                          )}
                          {day.duration && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-vidaia-primary" />
                              Duración: {day.duration}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Flights */}
                      {day.flights && day.flights.length > 0 && (
                        <div className="space-y-1.5">
                          {day.flights.map((flight, i) => (
                            <p
                              key={i}
                              className="flex items-center gap-2 text-sm text-vidaia-charcoal/75"
                            >
                              <Plane className="w-4 h-4 text-vidaia-primary shrink-0" />
                              {flight}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      {day.description && (
                        <p className="text-vidaia-charcoal/80 text-sm sm:text-base">
                          {day.description}
                        </p>
                      )}

                      {/* Highlights */}
                      {day.highlights && day.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {day.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm text-vidaia-charcoal/80"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-vidaia-primary mt-2 shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Includes / Not includes */}
                      {(day.includes || day.notIncludes) && (
                        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-vidaia-light/70">
                          {day.includes && (
                            <span className="flex items-start gap-1.5 text-sm text-green-700">
                              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>
                                <strong>Incluye:</strong> {day.includes}
                              </span>
                            </span>
                          )}
                          {day.notIncludes && (
                            <span className="flex items-start gap-1.5 text-sm text-red-600">
                              <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>
                                <strong>No incluye:</strong> {day.notIncludes}
                              </span>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Hotel */}
                      {day.hotel && (
                        <div className="flex items-center gap-2 pt-3 border-t border-vidaia-light/70">
                          <Bed className="w-4 h-4 text-vidaia-primary shrink-0" />
                          <span className="text-sm font-semibold text-vidaia-dark">{day.hotel}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOTELES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            Alojamientos recomendados
          </h2>
          <p className="text-center text-vidaia-charcoal/55 text-sm mb-12">
            Seleccionados por su calidad, ubicación y relación calidad-precio
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelCards.map((hotel, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={hotel.img}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-vidaia-dark truncate">{hotel.name}</h3>
                      <p className="text-sm text-vidaia-charcoal/55">{hotel.city}</p>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-vidaia-earth text-vidaia-earth" />
                      ))}
                    </div>
                  </div>
                  {hotel.category && (
                    <span className="inline-block bg-vidaia-light text-vidaia-dark text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                      {hotel.category}
                    </span>
                  )}
                  <div className="flex items-center justify-between text-xs text-vidaia-charcoal/55 pt-3 border-t border-vidaia-light/50 mt-1">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" />
                      {hotel.nights} {hotel.nights === 1 ? 'noche' : 'noches'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {hotel.dates}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-vidaia-charcoal/45 mt-10 italic">
            *Los hoteles mostrados son orientativos. Adaptamos el alojamiento a tu presupuesto y
            preferencias.
          </p>
        </div>
      </section>

      {/* ── OPCIONALES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-700 font-semibold tracking-widest uppercase text-xs mb-3">
            Actividades opcionales
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-12">
            ¿Quieres enriquecer tu viaje?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {optionals.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 text-left hover:border-amber-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-vidaia-dark mb-2">⭐ {title}</h3>
                <p className="text-sm text-vidaia-charcoal/70 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIO ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-vidaia-dark text-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-vidaia-earth uppercase tracking-widest text-xs font-semibold mb-4">
            Precio orientativo
          </p>
          <p className="font-heading text-6xl sm:text-7xl font-bold mb-1">Desde 4.412€</p>
          <p className="text-white/55 text-sm mb-2">por persona</p>
          <p className="text-white/40 text-xs mb-12">
            En habitación doble · Vuelos internos incluidos · Alojamiento incluido
          </p>
          <Link
            href="/presupuesto-itinerario"
            className="inline-flex items-center gap-2 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-10 py-5 rounded-full transition-colors text-lg"
          >
            Solicitar mi presupuesto personalizado
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── STICKY CTA (mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-sm border-t border-vidaia-light px-4 py-3 shadow-2xl">
        <Link
          href="/presupuesto-itinerario"
          className="flex items-center justify-center gap-2 w-full bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-base"
        >
          Quiero este viaje a medida
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  )
}
