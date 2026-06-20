import { NextRequest, NextResponse } from 'next/server'
import { ENABLED_LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/config/languages.config'
import { BASE_URL } from '@/lib/config/site'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') ?? ''
  const vercelEnv = process.env.VERCEL_ENV
  const canonicalHost = new URL(BASE_URL).host

  // Producción: el alias *.vercel.app del deployment se pliega al dominio real (308).
  if (vercelEnv === 'production' && host !== canonicalHost && host.endsWith('.vercel.app')) {
    const url = new URL(request.url)
    url.protocol = 'https:'
    url.host = canonicalHost
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  // Redirect de prefijo de idioma (comportamiento original).
  const firstSegment = pathname.split('/')[1]
  const response = ENABLED_LANGUAGES.includes(firstSegment)
    ? NextResponse.next()
    : NextResponse.redirect(
        new URL(pathname === '/' ? `/${DEFAULT_LANGUAGE}` : `/${DEFAULT_LANGUAGE}${pathname}`, request.url),
      )

  // Fuera de producción (previews, etc.): no indexar.
  if (vercelEnv !== 'production') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|author|cita-previa|.*\\.\\w+$).*)'],
}
