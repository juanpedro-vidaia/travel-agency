import { NextRequest, NextResponse } from 'next/server'
import { formSchema, buildPresupuestoEmailHtml } from '@/lib/form-utils'
import { pushPresupuestoToClientify } from '@/lib/services/clientify'

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

  // ── Resend ───────────────────────────────────────────────────────────────────
  // TODO: Configure DNS in domain to enable Resend sending.
  // Once DNS is ready:
  //   1. Add RESEND_API_KEY to environment variables
  //   2. Uncomment the Resend block below
  //
  // import { Resend } from 'resend'
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'web@viajesvidaia.com',
  //   to: 'sales@viajesvidaia.com',
  //   replyTo: data.email,
  //   subject: `Nueva solicitud de presupuesto — ${data.nombre}`,
  //   html: buildPresupuestoEmailHtml(data),
  // })

  // ── Clientify ────────────────────────────────────────────────────────────────
  await pushPresupuestoToClientify(data)

  console.log('[forms/presupuesto] Nueva solicitud:', JSON.stringify({
    origen: data.origin,
    itinerario: data.itinerarySlug,
    nombre: data.nombre,
    email: data.email,
    paises: data.countries,
    fecha: data.dateStart,
  }, null, 2))

  void buildPresupuestoEmailHtml

  return NextResponse.json({ ok: true }, { status: 201 })
}
