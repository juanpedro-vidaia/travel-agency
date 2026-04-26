'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'No sabemos por dónde empezar',
    a: 'Perfecto, es lo más habitual. Nosotros os guiamos paso a paso desde la primera conversación.',
  },
  {
    q: 'Queremos algo especial pero sin complicarnos',
    a: 'Nosotros lo hacemos fácil. Nos encargamos de toda la organización para que solo tengáis que disfrutar.',
  },
  {
    q: 'Nos preocupa el presupuesto',
    a: 'Adaptamos el viaje a vosotros. Diseñamos opciones en distintos rangos de precio sin renunciar a la calidad.',
  },
]

export default function HoneymoonFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-vidaia-light rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${
              open === i
                ? 'bg-vidaia-dark text-white'
                : 'bg-white hover:bg-vidaia-sand text-vidaia-dark'
            }`}
          >
            <span className="font-semibold pr-4">{faq.q}</span>
            <ChevronDown
              className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                open === i ? 'rotate-180 text-white/70' : 'text-vidaia-primary'
              }`}
            />
          </button>
          {open === i && (
            <div className="bg-white border-t border-vidaia-light/60 px-6 py-5">
              <p className="text-vidaia-charcoal/80 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
