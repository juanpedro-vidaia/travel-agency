'use client'

import { useState, useEffect, startTransition } from 'react'
import { Mail, CheckCircle, Loader2 } from 'lucide-react'
import LangLink from '@/components/ui/LangLink'
import { useLanguage } from '@/lib/hooks/useLanguage'

const STORAGE_KEY = 'vidaia_newsletter_subscribed'

interface NewsletterFormProps {
  variant: 'post' | 'blog'
}

export default function NewsletterForm({ variant }: NewsletterFormProps) {
  const { content } = useLanguage()
  const t = content.newsletter

  const [alreadySubscribed, setAlreadySubscribed] = useState(false)
  const [form, setForm] = useState({ full_name: '', email: '', privacy: false, commercial: false })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      startTransition(() => setAlreadySubscribed(true))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.privacy) return
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/forms/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error')
      localStorage.setItem(STORAGE_KEY, '1')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg(t.errorText)
    }
  }

  if (alreadySubscribed || status === 'success') {
    return (
      <div className={variant === 'post' ? 'bg-vidaia-light/50 rounded-3xl p-8 sm:p-10' : 'bg-vidaia-light/50 rounded-3xl p-8 sm:p-10'}>
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <p className="font-semibold text-vidaia-dark text-lg">{t.alreadySubscribed}</p>
          <p className="text-gray-500 text-sm">{t.alreadySubscribedText}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-vidaia-light/50 rounded-3xl p-8 sm:p-10">
      <div className="flex justify-center mb-6">
        <span className="inline-block px-4 py-1.5 bg-vidaia-primary/10 text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full">
          {t.overline}
        </span>
      </div>

      <h2 className="font-heading text-2xl font-bold text-vidaia-dark mb-2">
        {variant === 'post' ? t.postTitle : t.blogTitle}
      </h2>
      <p className="text-gray-500 text-sm mb-6">{t.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-vidaia-dark mb-1.5">
            {t.fullNameLabel} *
          </label>
          <input
            type="text"
            required
            value={form.full_name}
            onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
            placeholder={t.fullNamePlaceholder}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-vidaia-dark mb-1.5">
            <Mail className="inline w-3.5 h-3.5 mr-1" />
            {t.emailLabel} *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="tu@email.com"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              required
              checked={form.privacy}
              onChange={(e) => setForm((f) => ({ ...f, privacy: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-vidaia-primary peer-checked:bg-vidaia-primary transition-colors flex items-center justify-center">
              {form.privacy && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-500 leading-relaxed">
            {t.privacyPrefix}{' '}
            <LangLink href="/privacidad" className="text-vidaia-primary hover:underline">
              {t.privacyLink}
            </LangLink>
            {t.privacySuffix}
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={form.commercial}
              onChange={(e) => setForm((f) => ({ ...f, commercial: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-vidaia-primary peer-checked:bg-vidaia-primary transition-colors flex items-center justify-center">
              {form.commercial && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-500 leading-relaxed">{t.commercialText}</span>
        </label>

        {status === 'error' && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-vidaia-earth hover:bg-vidaia-brown text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> {t.submittingButton}</>
          ) : (
            t.submitButton
          )}
        </button>
      </form>
    </div>
  )
}
