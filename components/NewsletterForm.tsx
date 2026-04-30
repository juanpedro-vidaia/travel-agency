'use client'

import { useState, useEffect } from 'react'
import { Mail, CheckCircle, Loader2 } from 'lucide-react'
import LangLink from '@/components/LangLink'

const STORAGE_KEY = 'vidaia_newsletter_subscribed'

export default function NewsletterForm() {
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', privacy: false })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
      setAlreadySubscribed(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.privacy) return
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error al suscribirse')
      localStorage.setItem(STORAGE_KEY, '1')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Algo salió mal. Inténtalo de nuevo o escríbenos a info@viajesvidaia.com.')
    }
  }

  if (alreadySubscribed || status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle className="w-10 h-10 text-green-500" />
        <p className="font-semibold text-vidaia-dark text-lg">¡Ya estás suscrito!</p>
        <p className="text-gray-500 text-sm">Te avisaremos cuando publiquemos algo nuevo.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-vidaia-dark mb-1.5">Nombre</label>
          <input
            type="text"
            required
            value={form.first_name}
            onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-vidaia-dark mb-1.5">Apellido</label>
          <input
            type="text"
            required
            value={form.last_name}
            onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
            placeholder="Tu apellido"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-vidaia-dark mb-1.5">
          <Mail className="inline w-3.5 h-3.5 mr-1" />
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vidaia-primary/30 focus:border-vidaia-primary transition-colors"
          placeholder="tu@email.com"
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
            {form.privacy && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
          </div>
        </div>
        <span className="text-xs text-gray-500 leading-relaxed">
          He leído y acepto la{' '}
          <LangLink href="/privacidad" className="text-vidaia-primary hover:underline">política de privacidad</LangLink>.
          Mis datos se usarán únicamente para enviarme actualizaciones del blog.
        </span>
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
          <><Loader2 className="w-4 h-4 animate-spin" /> Suscribiendo…</>
        ) : (
          'Suscribirme gratis'
        )}
      </button>
    </form>
  )
}
