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
    title: content.legalNoticePage.metadata.title,
    description: content.legalNoticePage.metadata.description,
  }
}

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default async function AvisoLegalPage({ params }: Props) {
  const { lang } = await params
  const content = getStaticContent(lang).legalNoticePage
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
            En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Informacion y de Comercio Electronico (LSSI),
            se informa de los datos identificativos del titular de este sitio web.
          </p>

          <h2>1. Datos identificativos</h2>
          <ul>
            <li>Titular: Viajes Vidaia, S.R.L.</li>
            <li>NIF: B55455380.</li>
            <li>Domicilio: Calle de la Bahia de Algeciras 1, 28033, Madrid, Espana.</li>
            <li>Email de contacto: info@viajesvidaia.com.</li>
            <li>Actividad: agencia de viajes online y contenidos sobre destinos de Sudamerica.</li>
          </ul>

          <h2>2. Condiciones de uso</h2>
          <p>
            El acceso y uso de este sitio atribuye la condicion de usuario e implica la aceptacion de este aviso legal. El usuario
            se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos.
          </p>

          <h2>3. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del sitio (textos, imagenes, diseno, estructura, codigo y marcas) son titularidad de Viajes Vidaia
            o se utilizan con autorizacion. Queda prohibida su reproduccion, distribucion o comunicacion publica sin autorizacion previa.
          </p>

          <h2>4. Responsabilidad</h2>
          <p>
            Viajes Vidaia no garantiza la ausencia de errores en los contenidos, ni la disponibilidad permanente del sitio, aunque
            adopta medidas razonables para evitarlos y corregirlos. El usuario navega bajo su propia responsabilidad.
          </p>

          <h2>5. Enlaces externos</h2>
          <p>
            Esta web puede incluir enlaces a sitios de terceros. Viajes Vidaia no se responsabiliza de los contenidos, politicas
            o practicas de dichos sitios externos.
          </p>

          <h2>6. Proteccion de datos y cookies</h2>
          <p>
            El tratamiento de datos personales se regula en la <Link href={`/${lang}/privacidad`} className="underline hover:text-vidaia-primary">Politica de privacidad</Link>.
            El uso de cookies se regula en la <Link href={`/${lang}/cookies`} className="underline hover:text-vidaia-primary">Politica de cookies</Link>.
          </p>

          <h2>7. Legislacion aplicable y jurisdiccion</h2>
          <p>
            Este sitio se rige por la legislacion espanola. Para la resolucion de cualquier conflicto, las partes se someten a los
            juzgados y tribunales que correspondan conforme a derecho, salvo norma imperativa en materia de consumo.
          </p>

          <p className="text-sm text-vidaia-charcoal/60">
            Ultima actualizacion: mayo de 2026.
          </p>
        </div>
      </div>
    </main>
  )
}
