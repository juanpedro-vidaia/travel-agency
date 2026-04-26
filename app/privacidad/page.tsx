import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Viajes Vidaia',
  description: 'Política de privacidad de Viajes Vidaia.',
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-vidaia-charcoal/55 hover:text-vidaia-primary mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-10">
          Política de Privacidad
        </h1>

        <div className="prose prose-gray max-w-none text-vidaia-charcoal/80 leading-relaxed space-y-6">
          {<>
  <p>
    El titular te informa sobre su <strong>Política de Privacidad</strong> respecto del tratamiento y protección de los datos de carácter personal de los usuarios y clientes que puedan ser recabados por la navegación o contratación de servicios a través del sitio web <a href="https://viajesvidaia.com/">https://viajesvidaia.com/</a>. Nuestro deber es informarte y el tuyo estar debidamente informado.
  </p>

  <p>
    En esta Política de Privacidad te informaremos con <strong>total transparencia</strong> sobre la finalidad de este sitio web y todo lo que afecta a los datos que nos facilites, así como de las obligaciones y derechos que te corresponden.
  </p>

  <p>
    Este sitio web se adapta a la normativa vigente en relación con la protección de datos (<strong>RGPD</strong>, <strong>LOPDGDD</strong> y <strong>LSSI</strong>), lo que afecta a los datos personales que nos facilites con tu consentimiento expreso y a las cookies que utilizamos para que este sitio web funcione correctamente.
  </p>

  <h3>DATOS DE IDENTIFICACIÓN</h3>
  <p>
    El responsable y titular de este sitio web es Viajes Vidaia, S.R.L.<br />
    <strong>Titular:</strong> Viajes Vidaia, S.R.L.<br />
    <strong>NIF:</strong> B55455380<br />
    <strong>Domicilio Social:</strong> Calle de la Bahía de Algeciras 1, 28033, Madrid, España<br />
    <strong>Actividad:</strong> Agencia de viajes online y contenidos del Cono Sur<br />
    <strong>Correo electrónico:</strong> info@viajesvidaia.com
  </p>

  <h3>REGISTRO Y FINALIDAD DE TUS DATOS</h3>
  <p>
    En función del formulario o sección a la que accedas, te solicitaremos exclusivamente los datos necesarios para:
  </p>
  <ul>
    <li>Atender tus solicitudes, comentarios o consultas.</li>
    <li>Informarte sobre actividades, productos y servicios vía e-mail, WhatsApp o teléfono.</li>
    <li>Enviar comunicaciones comerciales y promociones de nuestros partners (sin que estos tengan nunca acceso a tus datos).</li>
  </ul>

  <h3>EXACTITUD Y VERACIDAD DE LOS DATOS</h3>
  <p>
    Como usuario, eres el único responsable de la veracidad y modificación de los datos que remitas a <strong>Viajes Vidaia, S.R.L.</strong>, comprometiéndote a proporcionar información completa y correcta en los formularios de contacto.
  </p>

  <h3>DERECHOS DE ACCESO Y REVOCACIÓN</h3>
  <p>
    Podrás ejercer en cualquier momento tus derechos de <strong>acceso, rectificación, cancelación y oposición</strong>. Para ello, solo tienes que enviarnos un correo electrónico a <em>info@viajesvidaia.com</em> adjuntando una copia de tu DNI como prueba de identidad.
  </p>

  <h3>SERVICIOS DE TERCEROS</h3>
  <p>
    Para el funcionamiento de la web, compartimos datos con los siguientes proveedores bajo sus propias políticas de privacidad:
  </p>
  <ul>
    <li><strong>Hosting:</strong> Hostinger (Hostinger Hosting Profesional).</li>
    <li><strong>Análisis web:</strong> Google Analytics.</li>
    <li><strong>Publicidad:</strong> Google Adsense.</li>
  </ul>

  <h3>MEDIDAS DE SEGURIDAD</h3>
  <p>
    Hemos adoptado las medidas técnicas necesarias para garantizar la seguridad e integridad de tus datos, evitando su pérdida o el acceso por parte de terceros no autorizados.
  </p>
</>}
        </div>
      </div>
    </main>
  )
}
