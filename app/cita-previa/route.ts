import { redirect } from 'next/navigation'

const CLIENTIFY_CITA_URL = process.env.NEXT_PUBLIC_CLIENTIFY_CITA_URL ?? ''

export function GET() {
  if (!CLIENTIFY_CITA_URL) {
    return new Response('Cita previa no disponible', { status: 503 })
  }
  redirect(CLIENTIFY_CITA_URL)
}
