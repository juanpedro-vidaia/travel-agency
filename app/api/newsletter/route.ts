import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { first_name, last_name, email, privacy } = body

    if (!first_name || !last_name || !email || !privacy) {
      return NextResponse.json({ error: 'Campos requeridos incompletos' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // TODO: integrate Mailchimp / Brevo / ConvertKit
    console.log('[newsletter] New subscriber:', { first_name, last_name, email })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
