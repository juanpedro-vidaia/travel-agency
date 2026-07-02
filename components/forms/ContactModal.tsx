'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Phone } from 'lucide-react'
import { useContactModal } from '@/lib/context/ContactModalContext'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { CONTACT } from '@/lib/config/contact'
import { contactoSchema, type ContactoFormPayload } from '@/lib/form-utils'
import { trackEvent } from '@/lib/analytics/trackEvent'
import ObfuscatedEmail from '@/components/ui/ObfuscatedEmail'
import LangLink from '@/components/ui/LangLink'

type Status = 'idle' | 'success' | 'error'

const DEFAULT_VALUES = {
  full_name: '',
  email: '',
  phone: '',
  preferred_time: 'lo-antes-posible' as const,
  message: '',
  commercial: false,
  form_source: 'contact-modal',
  website: '',
}

export default function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal()
  const { content } = useLanguage()
  const t = content.contactModal

  const [status, setStatus] = useState<Status>('idle')
  const firstInputRef = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactoFormPayload>({
    resolver: zodResolver(contactoSchema) as Resolver<ContactoFormPayload>,
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  })

  const err = (key: keyof ContactoFormPayload) => {
    const msg = (errors[key] as { message?: string } | undefined)?.message
    return msg ? ((t.validation as Record<string, string>)[msg] ?? msg) : undefined
  }

  const preferredTime = watch('preferred_time')
  const { ref: fullNameRef, ...fullNameReg } = register('full_name')

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
      reset(DEFAULT_VALUES)
    }, 3000)
    return () => clearTimeout(timer)
  }, [status, closeContactModal, reset])

  if (!isOpen) return null

  const onSubmit: SubmitHandler<ContactoFormPayload> = async (values) => {
    try {
      const res = await fetch('/api/forms/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(12_000),
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (data.ok) trackEvent('form_submit_contacto', { form_location: window.location.pathname })
      setStatus(data.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const fieldError = (key: keyof ContactoFormPayload) => {
    const message = err(key)
    return message ? <p className="mt-1.5 text-xs text-red-500">{message}</p> : null
  }

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={closeContactModal}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="bg-vidaia-dark px-6 sm:px-8 pt-7 pb-5 shrink-0">
          <button
            onClick={closeContactModal}
            aria-label={t.closeLabel}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex justify-center mb-3">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-vidaia-earth text-xs font-bold uppercase tracking-widest rounded-full">
              {t.overline}
            </span>
          </div>
          <h2
            id="contact-modal-title"
            className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3"
          >
            {t.title}
          </h2>

          {/* Phone CTA */}
          <a
            href={`tel:${CONTACT.phoneClean}`}
            onClick={() => trackEvent('phone_click', { click_location: window.location.pathname })}
            className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl px-4 py-2.5 transition-colors mb-3"
          >
            <span className="w-7 h-7 rounded-full bg-vidaia-earth/20 flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 text-vidaia-earth" />
            </span>
            <span className="text-sm font-semibold text-white">
              {t.callUs}{' '}
              <span className="text-vidaia-earth">{CONTACT.phone}</span>
            </span>
          </a>

          <p className="text-white/65 text-sm leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Scrollable form body */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 sm:px-8 py-6 space-y-4">

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                <p className="text-green-800 font-semibold text-lg mb-1">{t.successTitle}</p>
                <p className="text-green-700 text-sm">{t.successText}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-red-700 text-sm font-medium">
                  {t.errorText}{' '}
                  <ObfuscatedEmail user="info" domain="viajesvidaia.com" className="underline" />
                  .
                </p>
              </div>
            )}

            {status !== 'success' && (
              <>
                {/* Honeypot anti-spam — invisible para humanos, los bots lo rellenan */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                  <label>
                    No rellenar este campo
                    <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                  </label>
                </div>

                {/* full_name */}
                <div>
                  <label className="block text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-1.5">
                    {t.fullNameLabel} *
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={t.fullNamePlaceholder}
                    {...fullNameReg}
                    ref={(el) => {
                      fullNameRef(el)
                      firstInputRef.current = el
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
                  />
                  {fieldError('full_name')}
                </div>

                {/* email */}
                <div>
                  <label className="block text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-1.5">
                    {t.emailLabel} *
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="ana@email.com"
                    {...register('email')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
                  />
                  {fieldError('email')}
                </div>

                {/* phone */}
                <div>
                  <label className="block text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-1.5">
                    {t.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="+34 600 000 000"
                    {...register('phone')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
                  />
                  {fieldError('phone')}
                </div>

                {/* preferred_time */}
                <div>
                  <p className="text-xs font-semibold text-vidaia-charcoal/70 uppercase tracking-wide mb-2">
                    {t.preferredTimeLabel} *
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {t.preferredTimeOptions.map(opt => {
                      const active = preferredTime === opt.value
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
                            value={opt.value}
                            {...register('preferred_time')}
                            className="sr-only"
                          />
                          <span
                            className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
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
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t.messagePlaceholder}
                    {...register('message')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors resize-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      {...register('privacy')}
                      className="mt-0.5 w-4 h-4 shrink-0 accent-vidaia-primary"
                    />
                    <span className="text-xs text-vidaia-charcoal/60 leading-relaxed">
                      {t.privacyPrefix}{' '}
                      <LangLink
                        href="/privacidad"
                        target="_blank"
                        className="underline hover:text-vidaia-primary transition-colors"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        {t.privacyLink}
                      </LangLink>{' '}
                      *
                    </span>
                  </label>
                  {fieldError('privacy')}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('commercial')}
                      className="mt-0.5 w-4 h-4 shrink-0 accent-vidaia-primary"
                    />
                    <span className="text-xs text-vidaia-charcoal/60 leading-relaxed">
                      {t.commercialText}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-vidaia-earthDark hover:bg-vidaia-brown disabled:opacity-60 text-white font-semibold py-4 rounded-2xl transition-colors text-sm mt-2"
                >
                  {isSubmitting ? t.submittingButton : t.submitButton}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
