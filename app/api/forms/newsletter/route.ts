import { NextResponse } from 'next/server'
import { pushNewsletterToClientify, type NewsletterPayload } from '@/lib/services/clientify'

export async function POST(req: Request) {
  try {
    const body = await req.json() as NewsletterPayload & { privacy: boolean }
    const { full_name, email, privacy, commercial } = body

    if (!full_name || !email || !privacy) {
      return NextResponse.json({ error: 'Campos requeridos incompletos' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // ── Clientify ────────────────────────────────────────────────────────────
    await pushNewsletterToClientify({ full_name, email, commercial: !!commercial, privacy })

    // ── Resend ───────────────────────────────────────────────────────────────
    // TODO: Activate when RESEND_API_KEY and DNS are configured.
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'web@viajesvidaia.com',
    //   to: 'info@viajesvidaia.com',
    //   subject: `Nueva suscripción al newsletter — ${full_name}`,
    //   html: `<p><strong>${full_name}</strong> (${email}) se ha suscrito al newsletter. Acepta comercial: ${commercial ? 'sí' : 'no'}.</p>`,
    // })

    console.log('[newsletter] Nueva suscripción:', { full_name, email, commercial: !!commercial })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
