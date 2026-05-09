import { z } from 'zod'

// ─── Schema ───────────────────────────────────────────────────────────────────

export const formSchema = z.object({
  // Context
  origin: z.enum(['generic', 'itinerary']),
  itinerarySlug: z.string().optional(),
  itineraryId: z.string().optional(),

  // Step 1 — El viaje
  countries: z.array(z.string()).min(1, 'countriesRequired').default([]),
  otrosDestino: z.string().default(''),
  destinations: z.array(z.string()).default([]),
  dateStart: z.string().min(1, 'dateRequired'),
  flexible: z.boolean().default(false),
  duration: z.coerce.number().min(1, 'durationRequired').default(0),
  motivo: z.array(z.string()).default([]),
  adultos: z.number().min(1, 'adultsMin').default(2),
  menores: z.number().min(0).default(0),
  groupType: z.string().nullable().default(null),

  // Step 2 — Cómo viajar
  departureAirport: z.string().default(''),
  experiences: z.array(z.string()).default([]),
  accommodation: z.string().nullable().default(null),
  budget: z.string().nullable().default(null),

  // Step 3 — Contacto
  idea: z.string().default(''),
  nombre: z.string().min(1, 'nameRequired'),
  email: z.string().min(1, 'emailRequired').email('emailInvalid'),
  telefono: z.string().optional().default(''),
  privacidad: z.literal(true, { message: 'privacyRequired' }),

  // Attribution (populated automatically)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  referrer: z.string().optional(),
})

export type FormPayload = z.infer<typeof formSchema>

// ─── Step field map ───────────────────────────────────────────────────────────

export const STEP_FIELDS: Record<1 | 2 | 3, (keyof FormPayload)[]> = {
  1: ['countries', 'otrosDestino', 'destinations', 'dateStart', 'flexible', 'duration', 'motivo', 'adultos', 'menores', 'groupType'],
  2: ['departureAirport', 'experiences', 'accommodation', 'budget'],
  3: ['idea', 'nombre', 'email', 'telefono', 'privacidad'],
}

// ─── Clientify payload builder ────────────────────────────────────────────────

export function buildClientifyPayload(data: FormPayload) {
  const [firstName, ...rest] = data.nombre.trim().split(' ')
  return {
    firstName,
    lastName: rest.join(' '),
    email: data.email,
    phone: data.telefono || undefined,
    source_page: data.origin === 'generic' ? 'presupuesto-generico' : 'presupuesto-itinerario',
    itinerary: data.itinerarySlug ?? 'no_especificado',
    countries: data.countries,
    destinations: data.destinations,
    dates: { start: data.dateStart, flexible: data.flexible },
    duration: data.duration,
    passengers: data.adultos,
    childPassengers: data.menores,
    group_type: data.groupType,
    motivo: data.motivo,
    preferences: {
      experiences: data.experiences,
      budget: data.budget,
      accommodation: data.accommodation,
    },
    message: data.idea,
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
    referrer: data.referrer,
  }
}

// ─── Email HTML template ──────────────────────────────────────────────────────

export function buildPresupuestoEmailHtml(data: FormPayload): string {
  const origin = data.origin === 'itinerary'
    ? `Itinerario: <strong>${data.itinerarySlug}</strong>`
    : 'Formulario genérico'

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Nueva solicitud de presupuesto</title></head>
<body style="font-family:sans-serif;color:#1c2e32;max-width:600px;margin:auto;padding:24px">
  <h1 style="color:#1a4a52;font-size:22px">🌍 Nueva solicitud de presupuesto</h1>
  <p style="color:#5ea6ae;margin-top:-8px">${origin}</p>

  <hr style="border:none;border-top:1px solid #c0e8ec;margin:20px 0">

  <h2 style="font-size:16px">El viaje</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:4px 0;color:#666;width:40%">Destinos</td><td>${data.countries.join(', ') || '—'}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Zonas</td><td>${data.destinations.join(', ') || '—'}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Aeropuerto salida</td><td>${data.departureAirport || '—'}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Fecha</td><td>${data.dateStart}${data.flexible ? ' (flexible)' : ''}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Duración</td><td>${data.duration ? `${data.duration} días` : '—'}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Motivo</td><td>${data.motivo.join(', ') || '—'}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Adultos</td><td>${data.adultos}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Menores</td><td>${data.menores}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Tipo grupo</td><td>${data.groupType || '—'}</td></tr>
  </table>

  <h2 style="font-size:16px;margin-top:20px">Preferencias</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:4px 0;color:#666;width:40%">Experiencias</td><td>${data.experiences.join(', ') || '—'}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Alojamiento</td><td>${data.accommodation || '—'}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Presupuesto</td><td>${data.budget || '—'}</td></tr>
  </table>

  ${data.idea ? `
  <h2 style="font-size:16px;margin-top:20px">Su idea</h2>
  <p style="background:#f0f8f9;padding:16px;border-radius:8px;border-left:4px solid #5ea6ae">${data.idea.replace(/\n/g, '<br>')}</p>
  ` : ''}

  <hr style="border:none;border-top:1px solid #c0e8ec;margin:20px 0">

  <h2 style="font-size:16px">Contacto</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:4px 0;color:#666;width:40%">Nombre</td><td><strong>${data.nombre}</strong></td></tr>
    <tr><td style="padding:4px 0;color:#666">Email</td><td><a href="mailto:${data.email}" style="color:#5ea6ae">${data.email}</a></td></tr>
    <tr><td style="padding:4px 0;color:#666">Teléfono</td><td>${data.telefono || '—'}</td></tr>
  </table>

  ${data.utm_source ? `<p style="font-size:11px;color:#999;margin-top:20px">UTM: ${data.utm_source} / ${data.utm_medium} / ${data.utm_campaign}</p>` : ''}
</body>
</html>`
}
