import type { Metadata } from 'next';
import Image from 'next/image';
import PresupuestoForm from '@/components/PresupuestoForm';

export const metadata: Metadata = {
  title: 'Solicitar presupuesto — Viajes Vidaia',
  description:
    'Cuéntanos tu viaje soñado en solo 2 minutos y diseñamos un itinerario personalizado para ti. Especialistas en Argentina, Chile y Bolivia.',
};

export default function PresupuestoPage() {
  return (
    <div className="min-h-screen bg-vidaia-sand">
      {/* ── Cabecera con foto ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85"
            alt="Patagonia — paisaje"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vidaia-dark/85 via-vidaia-dark/70 to-vidaia-dark/85" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-24">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full mb-7">
            Viajes únicos · A tu medida
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 text-balance">
            Expertos en Diseñar Viajes Únicos en Sudamérica
          </h1>

          <p className="font-heading text-lg sm:text-xl text-vidaia-earth/90 italic mb-5">
            &ldquo;Como no hay dos personas o grupos iguales,
            <br className="hidden sm:block" /> tampoco hay dos viajes iguales.&rdquo;
          </p>

          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Cuéntanos vuestro viaje deseado para poder diseñar una experiencia personalizada.
            Creamos recuerdos inolvidables, diseñados a medida para vosotros.
          </p>
        </div>
      </div>

      {/* ── Formulario ────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-12 pb-24 relative z-10">
        <PresupuestoForm />
      </div>
    </div>
  );
}
