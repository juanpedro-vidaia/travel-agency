'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

interface FaqSectionProps {
  title: string
  subtitle?: string
  faqs: FaqItem[]
  className?: string
}

export default function FaqSection({ title, subtitle, faqs, className }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  if (!faqs.length) return null

  return (
    <section className={className ?? 'py-12 md:py-20 px-4 sm:px-6 lg:px-8'}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-vidaia-charcoal/70 text-sm mb-8 md:mb-12">
            {subtitle}
          </p>
        )}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="border border-vidaia-light rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${
                  open === i
                    ? 'bg-vidaia-dark text-white'
                    : 'bg-white hover:bg-vidaia-sand text-vidaia-dark'
                }`}
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180 text-white/70' : 'text-vidaia-primary'
                  }`}
                />
              </button>
              {open === i && (
                <div className="bg-white border-t border-vidaia-light/60 px-6 py-5">
                  <p className="text-vidaia-charcoal/80 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
