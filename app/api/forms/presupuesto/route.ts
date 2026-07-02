import { NextRequest, NextResponse } from 'next/server'
import { formSchema, buildPresupuestoEmailHtml } from '@/lib/form-utils'
import { pushPresupuestoToClientify } from '@/lib/services/clientify'
import { sendNotificationEmail } from '@/lib/services/resend'
import { isRateLimited, getClientIp } from '@/lib/services/rateLimit'

export async function POST(request: NextRequest) {
  if (isRateLimited(`presupuesto:${getClientIp(request.headers)}`)) {
    return NextResponse.json({ ok: false, error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = formSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const data = parsed.data

  // Honeypot relleno = bot → éxito silencioso sin tocar Clientify/Resend
  if (data.website) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  // ── Clientify ────────────────────────────────────────────────────────────────
  await pushPresupuestoToClientify(data)

  // ── Resend (notificación al equipo) ────────────────────────────────────────────
  await sendNotificationEmail({
    to:      'sales@viajesvidaia.com',
    replyTo: data.email,
    subject: `Nueva solicitud de presupuesto — ${data.nombre}`,
    html:    buildPresupuestoEmailHtml(data),
  })

  // Sin PII (nombre/email): el lead completo vive en Clientify, no en los logs
  console.info('[forms/presupuesto] Nueva solicitud:', JSON.stringify({
    origen: data.origin,
    itinerario: data.itinerarySlug,
    paises: data.countries,
    fecha: data.dateStart,
  }))

  return NextResponse.json({ ok: true }, { status: 201 })
}
