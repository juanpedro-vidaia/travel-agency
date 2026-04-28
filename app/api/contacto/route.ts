import { NextRequest, NextResponse } from 'next/server'

// TODO: Configurar Resend para enviar a info@viajesvidaia.com
// Ver /docs/EMAIL.md para instrucciones.

function buildEmailHtml(data: Record<string, string | boolean>) {
  const sent = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
  return `
<h2>🔔 Nueva solicitud de llamada — ${data.full_name}</h2>
<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <tr><td><strong>Nombre</strong></td><td>${data.full_name}</td></tr>
  <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
  <tr><td><strong>Teléfono</strong></td><td>${data.phone}</td></tr>
  <tr><td><strong>Cuándo llamar</strong></td><td>${data.preferred_time}</td></tr>
  <tr><td><strong>Mensaje</strong></td><td>${data.message || '—'}</td></tr>
  <tr><td><strong>Origen</strong></td><td>${data.form_source}</td></tr>
  <tr><td><strong>Fecha</strong></td><td>${sent}</td></tr>
</table>
`
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    console.log('[Contacto] Nueva solicitud de llamada:', JSON.stringify(data, null, 2))

    // TODO: Reemplazar con llamada a Resend cuando esté configurado:
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'web@viajesvidaia.com',
    //   to: 'info@viajesvidaia.com',
    //   subject: `🔔 Nueva solicitud de llamada — ${data.full_name}`,
    //   html: buildEmailHtml(data),
    // })

    void buildEmailHtml(data)  // keep the function referenced until Resend is wired up

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Contacto] Error:', error)
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}
