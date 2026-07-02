// Rate limiting en memoria por instancia serverless. Suficiente para cortar
// ráfagas de bots; si algún día hace falta persistencia entre instancias,
// migrar a Upstash/Vercel KV manteniendo esta misma interfaz.

const WINDOW_MS = 10 * 60_000 // 10 minutos
const MAX_REQUESTS = 5 // por clave (endpoint + IP) y ventana

const hits = new Map<string, number[]>()

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent)
    return true
  }

  recent.push(now)
  hits.set(key, recent)

  // GC ocasional para que el Map no crezca sin límite
  if (hits.size > 1_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
    }
  }

  return false
}

/** Primera IP del x-forwarded-for (la del cliente en Vercel). */
export function getClientIp(headers: Headers): string {
  return (headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
}
