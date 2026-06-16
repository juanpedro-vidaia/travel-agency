import { NextRequest, NextResponse } from 'next/server'
import { pushContactToClientify, type ContactoPayload } from '@/lib/services/clientify'
import { sendNotificationEmail } from '@/lib/services/resend'

function buildEmailHtml(data: ContactoPayload & { privacy: boolean }) {
  const sent = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
  return `
<h2>🔔 Nueva solicitud de llamada — ${data.full_name}</h2>
<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <tr><td><strong>Nombre</strong></td><td>${data.full_name}</td></tr>
  <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
  <tr><td><strong>Teléfono</strong></td><td>${data.phone}</td></tr>
  <tr><td><strong>Cuándo llamar</strong></td><td>${data.preferred_time}</td></tr>
  <tr><td><strong>Mensaje</strong></td><td>${data.message || '—'}</td></tr>
  <tr><td><strong>Acepta comercial</strong></td><td>${data.commercial ? 'Sí' : 'No'}</td></tr>
  <tr><td><strong>Origen</strong></td><td>${data.form_source}</td></tr>
  <tr><td><strong>Fecha</strong></td><td>${sent}</td></tr>
</table>
`
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as ContactoPayload & { privacy: boolean }

    // ── Clientify ────────────────────────────────────────────────────────────
    await pushContactToClientify(data)

    // ── Resend (notificación al equipo) ────────────────────────────────────────
    await sendNotificationEmail({
      to:      'info@viajesvidaia.com',
      replyTo: data.email,
      subject: `🔔 Nueva solicitud de llamada — ${data.full_name}`,
      html:    buildEmailHtml(data),
    })

    console.log('[Contacto] Nueva solicitud de llamada:', JSON.stringify(data, null, 2))

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Contacto] Error:', error)
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}
