import { NextResponse } from 'next/server'
import { newsletterSchema, escapeHtml } from '@/lib/form-utils'
import { pushNewsletterToClientify } from '@/lib/services/clientify'
import { sendNotificationEmail } from '@/lib/services/resend'
import { isRateLimited, getClientIp } from '@/lib/services/rateLimit'

export async function POST(req: Request) {
  if (isRateLimited(`newsletter:${getClientIp(req.headers)}`)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = newsletterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Campos requeridos incompletos' }, { status: 400 })
  }

  const { full_name, email, privacy, commercial, website } = parsed.data

  // Honeypot relleno = bot → éxito silencioso sin tocar Clientify/Resend
  if (website) {
    return NextResponse.json({ success: true })
  }

  try {
    // ── Clientify ────────────────────────────────────────────────────────────
    await pushNewsletterToClientify({ full_name, email, commercial, privacy })

    // ── Resend (notificación al equipo) ────────────────────────────────────────
    await sendNotificationEmail({
      to:      'info@viajesvidaia.com',
      subject: `Nueva suscripción al newsletter — ${full_name}`,
      html:    `<p><strong>${escapeHtml(full_name)}</strong> (${escapeHtml(email)}) se ha suscrito al newsletter. Acepta comercial: ${commercial ? 'sí' : 'no'}.</p>`,
    })

    // Sin PII: el suscriptor vive en Clientify, no en los logs
    console.info('[newsletter] Nueva suscripción registrada')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[newsletter] Error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
