import { Resend } from 'resend'

const FROM = 'Viajes Vidaia <web@viajesvidaia.com>'

interface SendArgs {
  to:       string
  subject:  string
  html:     string
  replyTo?: string
}

// Notificación por email best-effort: captura sus propios errores y nunca lanza,
// para que un fallo de Resend no rompa el envío del formulario (Clientify es la
// fuente de verdad). Mirrorea el patrón de guard de lib/services/clientify.ts.
export async function sendNotificationEmail({ to, subject, html, replyTo }: SendArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Resend] RESEND_API_KEY not set — skipping email')
    return
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({ from: FROM, to, subject, html, replyTo })
    if (error) console.error('[Resend] Send failed:', error)
  } catch (err) {
    console.error('[Resend] Unexpected error:', err)
  }
}
