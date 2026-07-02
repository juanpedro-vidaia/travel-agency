import { NextRequest, NextResponse } from 'next/server'
import { contactoSchema, escapeHtml, type ContactoFormPayload } from '@/lib/form-utils'
import { pushContactToClientify } from '@/lib/services/clientify'
import { sendNotificationEmail } from '@/lib/services/resend'
import { isRateLimited, getClientIp } from '@/lib/services/rateLimit'

function buildEmailHtml(data: ContactoFormPayload) {
  const e = escapeHtml
  const sent = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
  return `
<h2>🔔 Nueva solicitud de llamada — ${e(data.full_name)}</h2>
<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <tr><td><strong>Nombre</strong></td><td>${e(data.full_name)}</td></tr>
  <tr><td><strong>Email</strong></td><td>${e(data.email)}</td></tr>
  <tr><td><strong>Teléfono</strong></td><td>${e(data.phone)}</td></tr>
  <tr><td><strong>Cuándo llamar</strong></td><td>${e(data.preferred_time)}</td></tr>
  <tr><td><strong>Mensaje</strong></td><td>${data.message ? e(data.message) : '—'}</td></tr>
  <tr><td><strong>Acepta comercial</strong></td><td>${data.commercial ? 'Sí' : 'No'}</td></tr>
  <tr><td><strong>Origen</strong></td><td>${e(data.form_source)}</td></tr>
  <tr><td><strong>Fecha</strong></td><td>${sent}</td></tr>
</table>
`
}

export async function POST(request: NextRequest) {
  if (isRateLimited(`contacto:${getClientIp(request.headers)}`)) {
    return NextResponse.json({ ok: false, error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = contactoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const data = parsed.data

  // Honeypot relleno = bot → éxito silencioso sin tocar Clientify/Resend
  if (data.website) {
    return NextResponse.json({ ok: true })
  }

  try {
    // ── Clientify ────────────────────────────────────────────────────────────
    await pushContactToClientify(data)

    // ── Resend (notificación al equipo) ────────────────────────────────────────
    await sendNotificationEmail({
      to:      'info@viajesvidaia.com',
      replyTo: data.email,
      subject: `🔔 Nueva solicitud de llamada — ${data.full_name}`,
      html:    buildEmailHtml(data),
    })

    // Sin PII: el lead completo vive en Clientify, no en los logs
    console.info('[Contacto] Nueva solicitud de llamada:', {
      origen: data.form_source,
      cuando: data.preferred_time,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Contacto] Error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}
