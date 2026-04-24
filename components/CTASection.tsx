import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Fondo — Atacama o paisaje de sal */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1920&q=80"
          alt="Paisaje de Sudamérica"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-vidaia-dark/85" />
      </div>

      {/* Patrón decorativo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1.5 bg-white/10 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full mb-8">
          Empecemos
        </span>

        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          ¿Hablamos?
        </h2>

        <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-4 max-w-xl mx-auto">
          Cuéntanos qué tienes en mente — un destino, una fecha, una idea loca — y diseñamos juntos el viaje que siempre quisiste hacer.
        </p>

        <p className="text-vidaia-earth text-sm font-medium mb-10">
          Sin compromiso. Sin formularios interminables. Solo una charla.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/presupuesto"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            Solicitar mi viaje a medida
            <ArrowRight className="w-5 h-5" />
          </Link>

          <a
            href="mailto:hola@viajesvidaia.com"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white/80 hover:text-white hover:border-white/50 font-medium rounded-full text-base transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            hola@viajesvidaia.com
          </a>
        </div>
      </div>
    </section>
  );
}
