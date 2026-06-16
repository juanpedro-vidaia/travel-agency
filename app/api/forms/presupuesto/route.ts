import { NextRequest, NextResponse } from 'next/server'
import { formSchema, buildPresupuestoEmailHtml } from '@/lib/form-utils'
import { pushPresupuestoToClientify } from '@/lib/services/clientify'
import { sendNotificationEmail } from '@/lib/services/resend'

export async function POST(request: NextRequest) {
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

  // ── Clientify ────────────────────────────────────────────────────────────────
  await pushPresupuestoToClientify(data)

  // ── Resend (notificación al equipo) ────────────────────────────────────────────
  await sendNotificationEmail({
    to:      'sales@viajesvidaia.com',
    replyTo: data.email,
    subject: `Nueva solicitud de presupuesto — ${data.nombre}`,
    html:    buildPresupuestoEmailHtml(data),
  })

  console.log('[forms/presupuesto] Nueva solicitud:', JSON.stringify({
    origen: data.origin,
    itinerario: data.itinerarySlug,
    nombre: data.nombre,
    email: data.email,
    paises: data.countries,
    fecha: data.dateStart,
  }, null, 2))

  return NextResponse.json({ ok: true }, { status: 201 })
}
