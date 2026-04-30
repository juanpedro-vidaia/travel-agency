import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { STATIC_CONTENT, COMMON_UI } from '@/lib/data/staticContent'
import React from 'react'

export const metadata: Metadata = {
  title: STATIC_CONTENT.es.privacyPage.metadata.title,
  description: STATIC_CONTENT.es.privacyPage.metadata.description,
}

export default function PrivacidadPage() {
  const content = STATIC_CONTENT.es.privacyPage

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-vidaia-charcoal/55 hover:text-vidaia-primary mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {COMMON_UI.es.labels.backToHome}
        </Link>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-10">
          {content.title}
        </h1>

        <div className="prose prose-gray max-w-none text-vidaia-charcoal/80 leading-relaxed space-y-6">
          <p>
            El titular te informa sobre su <strong>Política de Privacidad</strong> respecto del tratamiento y protección de los datos de carácter personal de los usuarios y clientes que puedan ser recabados por la navegación o contratación de servicios a través del sitio web <a href="https://viajesvidaia.com/">https://viajesvidaia.com/</a>. Nuestro deber es informarte y el tuyo estar debidamente informado.
          </p>
          <p>
            En esta Política de Privacidad te informaremos con <strong>total transparencia</strong> sobre la finalidad de este sitio web y todo lo que afecta a los datos que nos facilites, así como de las obligaciones y derechos que te corresponden.
          </p>
          <p>
            Este sitio web se adapta a la normativa vigente en relación con la protección de datos (<strong>RGPD</strong>, <strong>LOPDGDD</strong> y <strong>LSSI</strong>), lo que afecta a los datos personales que nos facilites con tu consentimiento expreso y a las cookies que utilizamos para que este sitio web funcione correctamente.
          </p>

          <h3>{content.policyContent.heading1}</h3>
          <p>
            El responsable y titular de este sitio web es Viajes Vidaia, S.R.L.<br />
            <strong>{content.policyContent.identificationInfo[0].label}:</strong> {content.policyContent.identificationInfo[0].value}<br />
            <strong>{content.policyContent.identificationInfo[1].label}:</strong> {content.policyContent.identificationInfo[1].value}<br />
            <strong>{content.policyContent.identificationInfo[2].label}:</strong> {content.policyContent.identificationInfo[2].value}<br />
            <strong>{content.policyContent.identificationInfo[3].label}:</strong> {content.policyContent.identificationInfo[3].value}<br />
            <strong>{content.policyContent.identificationInfo[4].label}:</strong> {content.policyContent.identificationInfo[4].value}
          </p>

          <h3>{content.policyContent.heading2}</h3>
          <p>
            {content.policyContent.registrationPurpose}
          </p>
          <ul>
            {content.policyContent.registrationPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <h3>{content.policyContent.accuracyHeading}</h3>
          <p>
            {content.policyContent.accuracyText}
          </p>

          <h3>{content.policyContent.rightsHeading}</h3>
          <p>
            {content.policyContent.rightsText}
          </p>

          <h3>{content.policyContent.thirdPartyServicesHeading}</h3>
          <p>
            {content.policyContent.thirdPartyServicesText}
          </p>
          <ul>
            {content.policyContent.thirdPartyServicesList.map((service, i) => (
              <li key={i}><strong>{service.name}:</strong> {service.description}</li>
            ))}
          </ul>

          <h3>{content.policyContent.securityMeasuresHeading}</h3>
          <p>
            {content.policyContent.securityMeasuresText}
          </p>
        </div>
      </div>
    </main>
  )
}
