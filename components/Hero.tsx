import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo Patagonia */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=90"
          alt="Torres del Paine, Patagonia"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradiente oscuro para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/65" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Región */}
        <p className="inline-flex flex-wrap justify-center items-center gap-2 text-vidaia-earth text-sm font-semibold uppercase tracking-wide sm:tracking-[0.25em] mb-7">
          <span>🇦🇷</span>
          <span>Argentina</span>
          <span className="opacity-40">·</span>
          <span>🇨🇱</span>
          <span>Chile</span>
          <span className="opacity-40">·</span>
          <span>🇧🇴</span>
          <span>Bolivia</span>
        </p>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance">
          El viaje de tu vida
          <br />
          <em className="not-italic text-vidaia-earth">hecho realidad</em>
        </h1>

        <p className="text-white/75 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance px-2">
          Diseñamos cada itinerario desde cero — sin paquetes estándar, sin prisas.
          Solo tú, el paisaje y una experiencia que no olvidarás.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/presupuesto"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            Solicitar mi viaje a medida
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/40 text-white hover:bg-white/10 font-medium rounded-full text-base transition-all duration-200"
          >
            ¿Hablamos?
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
