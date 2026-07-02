import type { FormPayload } from '../form-utils'

const CLIENTIFY_BASE = 'https://api-plus.clientify.com'

// ── Timezone / date helpers ───────────────────────────────────────────────────

function toMadridISO(date: Date): string {
  const datePart = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Madrid',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).format(date).replace(' ', 'T')

  const tzName = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Madrid',
    timeZoneName: 'shortOffset',
  }).formatToParts(date).find(p => p.type === 'timeZoneName')?.value ?? 'GMT+1'

  // "GMT+2" → "+02:00", "GMT+1" → "+01:00"
  const match = tzName.match(/GMT([+-])(\d+)(?::(\d+))?/)
  const sign  = match?.[1] ?? '+'
  const hh    = (match?.[2] ?? '1').padStart(2, '0')
  const mm    = (match?.[3] ?? '0').padStart(2, '0')

  return `${datePart}${sign}${hh}:${mm}`
}

const DUE_DATE_DAYS: Record<string, number> = {
  'lo-antes-posible':  0,
  'manana':            1,
  'esta-semana':       2,
  'semana-siguiente':  7,
}

const PREFERRED_TIME_LABEL: Record<string, string> = {
  'lo-antes-posible':  'Lo antes posible',
  'manana':            'Mañana',
  'esta-semana':       'Esta semana',
  'semana-siguiente':  'La semana que viene',
}

function calculateDueDate(preferredTime: string): string {
  const date = new Date()
  date.setDate(date.getDate() + (DUE_DATE_DAYS[preferredTime] ?? 0))
  return toMadridISO(date)
}

// ── Shared fetch with timeout ─────────────────────────────────────────────────

async function fetchWithTimeout(url: string, options: RequestInit, ms = 10_000): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

// ── Contacto ("¿Hablamos?") ───────────────────────────────────────────────────

export interface ContactoPayload {
  full_name:      string
  email:          string
  phone:          string
  preferred_time: string
  message?:       string
  commercial:     boolean
  form_source:    string
}

function buildContactPayload(data: ContactoPayload & { privacy: boolean }) {
  const [firstName, ...rest] = data.full_name.trim().split(' ')
  return {
    first_name:     firstName,
    last_name:      rest.join(' '),
    email:          data.email,
    phone:          data.phone,
    message:        `Llámame ${PREFERRED_TIME_LABEL[data.preferred_time] ?? data.preferred_time}`,
    contact_source: 'Web',
    gdpr_accept:    data.privacy,
    // Trying with field name first; if this doesn't save correctly, fetch
    // GET /v2/contacts/custom-fields/ to get the numeric id and use { id, value } instead.
    custom_fields: [{ name: 'text_viaje_imaginado', value: data.message ?? '' }],
    tags: data.commercial ? ['marketing'] : [],
  }
}

function buildTaskPayload(data: ContactoPayload, contactId: number) {
  return {
    name:             `Llamar a ${data.full_name}`,
    start_datetime:   toMadridISO(new Date()),
    due_date:         calculateDueDate(data.preferred_time),
    type:             1,
    task_type:        'https://api-plus.clientify.com/api/activities/types/776895/', // "Llamar a teléfono" — verified via GET /v2/tasks/types/
    status:           1,
    priority:         1,
    related_contacts: [`${CLIENTIFY_BASE}/v2/contacts/${contactId}/`],
    description:      'El contacto solicita que le llamemos para hablar de su viaje',
  }
}

export async function pushContactToClientify(data: ContactoPayload & { privacy: boolean }): Promise<void> {
  const token = process.env.VV_CLIENTIFY_API_TOKEN
  if (!token) {
    console.warn('[Clientify] VV_CLIENTIFY_API_TOKEN not set — skipping integration')
    return
  }

  const headers = {
    Authorization:  `Token ${token}`,
    'Content-Type': 'application/json',
  }

  // Step 1: Create / update contact (Clientify upserts by email automatically)
  const contactRes = await fetchWithTimeout(`${CLIENTIFY_BASE}/v2/contacts/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(buildContactPayload(data)),
  })

  if (!contactRes.ok) {
    // Solo status: el cuerpo de la respuesta puede ecoar datos del contacto (PII)
    throw new Error(`[Clientify] Contact failed (${contactRes.status})`)
  }

  const { id: contactId } = await contactRes.json() as { id: number }

  // Step 2: Create call task — non-fatal if it fails (contact already saved)
  const taskRes = await fetchWithTimeout(`${CLIENTIFY_BASE}/v2/tasks/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(buildTaskPayload(data, contactId)),
  })

  if (!taskRes.ok) {
    console.error(`[Clientify] Task creation failed (${taskRes.status})`)
  }
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export interface NewsletterPayload {
  full_name:  string
  email:      string
  commercial: boolean
}

function buildNewsletterContactPayload(data: NewsletterPayload & { privacy: boolean }) {
  const [firstName, ...rest] = data.full_name.trim().split(' ')
  const tags = ['newsletter']
  if (data.commercial) tags.push('marketing')
  return {
    first_name:     firstName,
    last_name:      rest.join(' '),
    email:          data.email,
    contact_source: 'Web',
    gdpr_accept:    data.privacy,
    tags,
  }
}

export async function pushNewsletterToClientify(data: NewsletterPayload & { privacy: boolean }): Promise<void> {
  const token = process.env.VV_CLIENTIFY_API_TOKEN
  if (!token) {
    console.warn('[Clientify] VV_CLIENTIFY_API_TOKEN not set — skipping integration')
    return
  }

  const contactRes = await fetchWithTimeout(`${CLIENTIFY_BASE}/v2/contacts/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(buildNewsletterContactPayload(data)),
  })

  if (!contactRes.ok) {
    throw new Error(`[Clientify] Newsletter contact failed (${contactRes.status})`)
  }
}

// ── Presupuesto ("Viaje a Medida") ────────────────────────────────────────────

// Clientify stores dates as DD/MM/YYYY; the form sends YYYY-MM-DD
function toClientifyDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

// Verified via GET /v2/deals/ — pipeline 120333 = "Viaje a Medida", stage 535944 = "Contacto realizado"
// Numeric IDs required; URL format is rejected by the write endpoint
const PIPELINE_ID       = 120333
const STAGE_CONTACTO_ID = 535944

// Form internal values → Clientify dropdown option text (must match exactly)
const ACCOMMODATION_MAP: Record<string, string> = {
  'standard': '3*',
  'primera':  '4*',
  'premium':  '5*',
  'surprise': 'Sorpréndeme',
}

const GROUP_TYPE_MAP: Record<string, string> = {
  'solo':    'Solo',
  'pareja':  'Pareja',
  'familia': 'Familia',
  'amigos':  'Grupo de amigos',
}


function buildPresupuestoContactPayload(data: FormPayload) {
  const [firstName, ...rest] = data.nombre.trim().split(' ')
  return {
    first_name:     firstName,
    last_name:      rest.join(' '),
    email:          data.email,
    phone:          data.telefono || undefined,
    status:         'in-deal',
    contact_source: 'Web',
    gdpr_accept:    data.privacidad,
    tags:           ['web', 'quoteform'],
    // field: key verified to work (name: rejected with 400, field: returns 200)
    custom_fields: [
      { field: 'destino',              value: data.countries.join(', ') },
      { field: 'destinos_interes',     value: data.destinations.join(', ') },
      { field: 'fecha_inicio',         value: toClientifyDate(data.dateStart) },
      { field: 'duracion',             value: String(data.duration) },
      { field: 'motivo_viaje',         value: data.motivo.join(', ') },
      { field: 'pasajeros_adultos',    value: String(data.adultos) },
      { field: 'pasajeros_menores',    value: String(data.menores) },
      { field: 'itinerario_web_referencia', value: data.itinerarySlug ?? '' },
      { field: 'tipo_grupo',           value: GROUP_TYPE_MAP[data.groupType ?? ''] ?? '' },
      { field: 'aeropuerto_origen',    value: data.departureAirport },
      { field: 'tipo_experiencia',     value: data.experiences.join(', ') },
      { field: 'tipo_alojamientos',    value: ACCOMMODATION_MAP[data.accommodation ?? ''] ?? '' },
      { field: 'presupuesto_estimado', value: data.budget ?? '' },
      { field: 'texto_viaje_imaginado', value: data.idea },
    ],
  }
}

function buildDealNoteComment(data: FormPayload, tags: string[]): string {
  return [
    `Nombre: ${data.nombre}`,
    `Correo electrónico: ${data.email}`,
    `Teléfono: ${data.telefono || '—'}`,
    `Itinerario Web Referenciado: ${data.itinerarySlug ?? '—'}`,
    `Destino: ${data.countries.join(', ')}`,
    `Fecha inicio: ${data.dateStart}`,
    `Fechas flexibles: ${data.flexible ? 'Sí' : 'No'}`,
    `Duración: ${data.duration}`,
    `Destinos de Interés: ${data.destinations.join(', ') || '—'}`,
    `Motivo del Viaje: ${data.motivo.join(', ') || '—'}`,
    `Tipo de experiencia: ${data.experiences.join(', ') || '—'}`,
    `Tipo de Grupo: ${data.groupType ?? '—'}`,
    `Adultos: ${data.adultos}`,
    `Menores: ${data.menores}`,
    `Alojamiento: ${data.accommodation ?? '—'}`,
    `Aeropuerto Origen: ${data.departureAirport || '—'}`,
    `Presupuesto Estimado: ${data.budget ?? '—'}`,
    `GDPR: Sí`,
    `TAGS: ${tags.join(', ')}`,
  ].join('<br>')
}

export async function pushPresupuestoToClientify(data: FormPayload): Promise<void> {
  const token = process.env.VV_CLIENTIFY_API_TOKEN
  if (!token) {
    console.warn('[Clientify] VV_CLIENTIFY_API_TOKEN not set — skipping integration')
    return
  }

  const headers = { Authorization: `Token ${token}`, 'Content-Type': 'application/json' }
  const tags = ['web', 'quoteform']

  // Step 1: Create/update contact
  const contactRes = await fetchWithTimeout(`${CLIENTIFY_BASE}/v2/contacts/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(buildPresupuestoContactPayload(data)),
  })

  if (!contactRes.ok) {
    throw new Error(`[Clientify] Presupuesto contact failed (${contactRes.status})`)
  }

  const { id: contactId } = await contactRes.json() as { id: number }

  // Step 2: Create deal — non-fatal (contact already saved)
  const dealRes = await fetchWithTimeout(`${CLIENTIFY_BASE}/v2/deals/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name:              `Oportunidad para ${data.countries.join(', ')}`,
      amount:            0,
      pipeline_id:       PIPELINE_ID,
      pipeline_stage_id: STAGE_CONTACTO_ID,
      contact_id:        contactId,
    }),
  })

  if (!dealRes.ok) {
    console.error(`[Clientify] Deal creation failed (${dealRes.status})`)
    return
  }

  const { id: dealId } = await dealRes.json() as { id: number }

  // Step 3: Add note to deal — non-fatal
  const noteRes = await fetchWithTimeout(`${CLIENTIFY_BASE}/v2/deals/${dealId}/note/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name:    'Datos de la solicitud de Viaje a Medida del contacto',
      comment: buildDealNoteComment(data, tags),
    }),
  })
  if (!noteRes.ok) {
    console.error(`[Clientify] Deal note failed (${noteRes.status})`)
  }
}
