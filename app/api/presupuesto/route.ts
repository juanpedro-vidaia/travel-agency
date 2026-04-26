import { NextRequest, NextResponse } from 'next/server'

// TODO: Configurar Resend para enviar a sales@viajesvidaia.com
// Ver /docs/EMAIL.md para instrucciones de configuración.

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Por ahora solo registramos los datos. En el siguiente paso
    // conectar con Resend (ver docs/EMAIL.md).
    console.log('[Presupuesto] Nueva solicitud:', JSON.stringify(data, null, 2))

    // TODO: Reemplazar este bloque con la llamada a Resend:
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'web@viajesvidaia.com',
    //   to: 'sales@viajesvidaia.com',
    //   subject: `Nueva solicitud de presupuesto — ${data.first_name} ${data.last_name}`,
    //   html: buildEmailHtml(data),
    // })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Presupuesto] Error:', error)
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}
