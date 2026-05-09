import { NextRequest, NextResponse } from 'next/server'
import { formSchema, buildPresupuestoEmailHtml, buildClientifyPayload } from '@/lib/form-utils'

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
  // TODO: Implement when Clientify API key is available.
  // Uncomment and complete with API key and endpoint:
  //
  // const clientifyPayload = buildClientifyPayload(data)
  // await fetch('https://api.clientify.net/v1/contacts/', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Token ${process.env.CLIENTIFY_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(clientifyPayload),
  // })

  // Temporary logging until integrations are active
  console.log('[forms/presupuesto] Nueva solicitud:', JSON.stringify({
    origen: data.origin,
    itinerario: data.itinerarySlug,
    nombre: data.nombre,
    email: data.email,
    paises: data.countries,
    fecha: data.dateStart,
  }, null, 2))

  // Reference the helpers to avoid unused import warnings during development
  void buildPresupuestoEmailHtml
  void buildClientifyPayload

  return NextResponse.json({ ok: true }, { status: 201 })
}
