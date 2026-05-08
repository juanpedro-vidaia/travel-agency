import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getStaticContent, getCommonUI } from '@/lib/helpers/contentHelpers'
import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const content = getStaticContent(lang)
  return {
    title: content.cookiesPage.metadata.title,
    description: content.cookiesPage.metadata.description,
  }
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function CookiesPage({ params }: Props) {
  const { lang } = await params
  const content = getStaticContent(lang).cookiesPage
  const ui = getCommonUI(lang)

  return (
    <main className="min-h-screen bg-white pt-28 pb-12 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm text-vidaia-charcoal/55 hover:text-vidaia-primary mb-8 md:mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {ui.labels.backToHome}
        </Link>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-vidaia-dark mb-8 md:mb-10">
          {content.title}
        </h1>

        <div className="prose prose-gray max-w-none text-vidaia-charcoal/80 leading-relaxed space-y-6">
          <p>
            En esta web usamos cookies para asegurar el funcionamiento tecnico del sitio y, solo si nos das tu consentimiento,
            para analitica. Puedes aceptar, rechazar o cambiar tu decision en cualquier momento desde el enlace
            <strong> Configurar cookies</strong> del pie de pagina.
          </p>

          <h2>1. Que son las cookies</h2>
          <p>
            Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas una web. Permiten recordar
            preferencias, mejorar la experiencia de navegacion y, en algunos casos, medir el uso del sitio.
          </p>

          <h2>2. Tipos de cookies que usamos</h2>
          <h3>2.1 Cookies necesarias (siempre activas)</h3>
          <ul>
            <li>Finalidad: funcionamiento basico de la web y gestion de preferencias de privacidad.</li>
            <li>Base legal: interes legitimo y necesidad tecnica para prestar el servicio solicitado.</li>
            <li>Proveedor: Viajes Vidaia.</li>
          </ul>

          <h3>2.2 Cookies analiticas (opcionales)</h3>
          <ul>
            <li>Finalidad: medir uso de la web para mejorar contenidos y experiencia.</li>
            <li>Base legal: consentimiento expreso del usuario.</li>
            <li>Proveedor: Google Analytics 4 (Google LLC).</li>
          </ul>

          <h3>2.3 Cookies de marketing (actualmente desactivadas)</h3>
          <p>
            Esta categoria esta preparada en nuestra plataforma de consentimiento, pero no cargamos scripts de marketing
            en este momento.
          </p>

          <h3>2.4 Personalizacion no tecnica (fase futura)</h3>
          <p>
            Esta categoria esta reservada para funciones futuras del portal de clientes. No se utilizan cookies de esta
            categoria en el lanzamiento actual.
          </p>

          <h2>3. Cookies concretas en uso (lanzamiento)</h2>
          <div className="overflow-x-auto not-prose rounded-xl border border-vidaia-light">
            <table className="min-w-full text-sm">
              <thead className="bg-vidaia-light/50 text-vidaia-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Cookie</th>
                  <th className="px-4 py-3 text-left font-semibold">Categoria</th>
                  <th className="px-4 py-3 text-left font-semibold">Proveedor</th>
                  <th className="px-4 py-3 text-left font-semibold">Duracion</th>
                  <th className="px-4 py-3 text-left font-semibold">Finalidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vidaia-light">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">vidaia_consent</td>
                  <td className="px-4 py-3">Necesaria</td>
                  <td className="px-4 py-3">Viajes Vidaia</td>
                  <td className="px-4 py-3">12 meses</td>
                  <td className="px-4 py-3">Guardar tus preferencias de consentimiento.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">_ga</td>
                  <td className="px-4 py-3">Analitica</td>
                  <td className="px-4 py-3">Google Analytics 4</td>
                  <td className="px-4 py-3">2 años (segun navegador)</td>
                  <td className="px-4 py-3">Distinguir usuarios para estadisticas de uso.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">_ga_&lt;measurement_id&gt;</td>
                  <td className="px-4 py-3">Analitica</td>
                  <td className="px-4 py-3">Google Analytics 4</td>
                  <td className="px-4 py-3">2 años (segun navegador)</td>
                  <td className="px-4 py-3">Mantener estado de sesion para medicion.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>4. Como gestionar o retirar tu consentimiento</h2>
          <ul>
            <li>Desde la web: enlace <strong>Configurar cookies</strong> en el pie de pagina.</li>
            <li>Desde el navegador: puedes borrar o bloquear cookies en la configuracion de tu navegador.</li>
          </ul>

          <h2>5. Transferencias internacionales</h2>
          <p>
            Si aceptas cookies analiticas, algunos datos pueden tratarse por proveedores ubicados fuera del Espacio Economico
            Europeo. En ese caso, se aplicaran las garantias contractuales y medidas exigidas por la normativa aplicable.
          </p>

          <h2>6. Cambios en esta politica</h2>
          <p>
            Esta politica puede actualizarse por cambios legales o tecnicos. Si los cambios afectan a finalidades o categorias,
            solicitaremos de nuevo tu consentimiento.
          </p>

          <p className="text-sm text-vidaia-charcoal/60">
            Ultima actualizacion: mayo de 2026.
          </p>
        </div>
      </div>
    </main>
  )
}
