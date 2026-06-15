import { NextRequest, NextResponse } from 'next/server'
import { ENABLED_LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/config/languages.config'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1]
  if (ENABLED_LANGUAGES.includes(firstSegment)) return NextResponse.next()
  const target = pathname === '/' ? `/${DEFAULT_LANGUAGE}` : `/${DEFAULT_LANGUAGE}${pathname}`
  return NextResponse.redirect(new URL(target, request.url))
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|author|cita-previa|.*\\.\\w+$).*)'],
}
