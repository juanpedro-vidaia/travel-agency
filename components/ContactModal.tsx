'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useContactModal } from '@/lib/context/ContactModalContext'
import { CONTACT } from '@/lib/config/contact'

type FormState = {
  full_name: string
  email: string
  phone: string
  preferred_time: string
  message: string
  privacy: boolean
  commercial: boolean
}

const BLANK: FormState = {
  full_name: '',
  email: '',
  phone: '',
  preferred_time: 'lo-antes-posible',
  message: '',
  privacy: false,
  commercial: false,
}

const PREFERRED_TIME_OPTIONS = [
  { value: 'lo-antes-posible', label: 'Lo antes posible' },
  { value: 'manana',           label: 'Mañana' },
  { value: 'esta-semana',      label: 'Esta semana' },
  { value: 'semana-siguiente', label: 'Semana que viene' },
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal()
  const [form, setForm]     = useState<FormState>(BLANK)
  const [status, setStatus] = useState<Status>('idle')
  const firstInputRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Focus first field on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => firstInputRef.current?.focus(), 80)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeContactModal()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeContactModal])

  // Auto-close after success
  useEffect(() => {
    if (status !== 'success') return
    const timer = setTimeout(() => {
      closeContactModal()
      setStatus('idle')
      setForm(BLANK)
    }, 3000)
    return () => clearTimeout(timer)
  }, [status, closeContactModal])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, form_source: 'contact-modal' }),
      })
      const data = await res.json()
      setStatus(data.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeContactModal}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="bg-vidaia-dark px-6 sm:px-8 pt-7 pb-5 flex-shrink-0">
          <button
            onClick={closeContactModal}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-vidaia-earth font-semibold uppercase tracking-widest text-xs mb-1.5">
            Contacto directo
          </p>
          <h2
            id="contact-modal-title"
            className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1"
          >
            ¿Hablamos?
          </h2>
          <p className="text-white/65 text-sm leading-relaxed">
            Te llamamos cuando te venga mejor. Cuéntanos un poco sobre tu viaje.
          </p>
        </div>

        {/* Scrollable form body */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-4">

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                <p className="text-green-800 font-semibold text-lg mb-1">¡Recibido!</p>
                <p className="text-green-700 text-sm">
                  Te contactamos en breve. Cerrando en unos segundos…
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-red-700 text-sm font-medium">
                  Algo ha ido mal. Inténtalo de nuevo o escríbenos a{' '}
                  <a href={`mailto:${CONTACT.email}`} className="underline">
                    {CONTACT.email}
                  </a>
                  .
                </p>
              </div>
            )}

            {status !== 'success' && (
              <>
                {/* full_name */}
                <div>
                  <label className="block text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-1.5">
                    Nombre y apellidos *
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={e => set('full_name', e.target.value)}
                    required
                    placeholder="Ana García López"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
                  />
                </div>

                {/* email */}
                <div>
                  <label className="block text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    required
                    placeholder="ana@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
                  />
                </div>

                {/* phone */}
                <div>
                  <label className="block text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-1.5">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    required
                    placeholder="+34 600 000 000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
                  />
                </div>

                {/* preferred_time */}
                <div>
                  <p className="text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-2">
                    ¿Cuándo prefieres que te llamemos? *
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {PREFERRED_TIME_OPTIONS.map(opt => {
                      const active = form.preferred_time === opt.value
                      return (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors text-sm ${
                            active
                              ? 'border-vidaia-primary bg-vidaia-light text-vidaia-primary font-medium'
                              : 'border-gray-200 text-vidaia-charcoal/65 hover:border-vidaia-primary/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferred_time"
                            value={opt.value}
                            checked={active}
                            onChange={e => set('preferred_time', e.target.value)}
                            className="sr-only"
                          />
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                              active ? 'border-vidaia-primary bg-vidaia-primary' : 'border-gray-300'
                            }`}
                          />
                          {opt.label}
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* message */}
                <div>
                  <label className="block text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-1.5">
                    Tu idea de viaje (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    rows={3}
                    placeholder="Cuéntanos brevemente qué tienes en mente"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors resize-none"
                  />
                </div>

                <input type="hidden" name="form_source" value="contact-modal" />

                {/* Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.privacy}
                      onChange={e => set('privacy', e.target.checked)}
                      required
                      className="mt-0.5 w-4 h-4 flex-shrink-0 accent-vidaia-primary"
                    />
                    <span className="text-xs text-vidaia-charcoal/60 leading-relaxed">
                      He leído y acepto la{' '}
                      <Link
                        href="/privacidad"
                        target="_blank"
                        className="underline hover:text-vidaia-primary transition-colors"
                        onClick={e => e.stopPropagation()}
                      >
                        política de privacidad
                      </Link>{' '}
                      *
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.commercial}
                      onChange={e => set('commercial', e.target.checked)}
                      className="mt-0.5 w-4 h-4 flex-shrink-0 accent-vidaia-primary"
                    />
                    <span className="text-xs text-vidaia-charcoal/60 leading-relaxed">
                      Acepto recibir información comercial y ofertas exclusivas de Viajes Vidaia
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-vidaia-earth hover:bg-vidaia-brown disabled:opacity-60 text-white font-semibold py-4 rounded-2xl transition-colors text-sm mt-2"
                >
                  {status === 'submitting'
                    ? 'Enviando…'
                    : 'Quiero asesoramiento personalizado'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
