// Shared Clientify CRM integration service.
// Each form defines its own payload builder; pushToClientify() handles the HTTP call.
// Activate when CLIENTIFY_API_KEY is available in environment variables.

export interface ClientifyContact {
  firstName: string
  lastName: string
  email: string
  phone?: string
  source_page?: string
  tags?: string[]
  [key: string]: unknown
}

export async function pushToClientify(contact: ClientifyContact): Promise<void> {
  // TODO: Uncomment when CLIENTIFY_API_KEY is configured:
  //
  // const res = await fetch('https://api.clientify.net/v1/contacts/', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Token ${process.env.CLIENTIFY_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(contact),
  // })
  // if (!res.ok) {
  //   const text = await res.text()
  //   throw new Error(`Clientify error ${res.status}: ${text}`)
  // }

  void contact // keep reference until activated
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export interface NewsletterPayload {
  full_name: string
  email: string
  commercial: boolean
}

export function buildNewsletterClientifyPayload(data: NewsletterPayload): ClientifyContact {
  const [firstName, ...rest] = data.full_name.trim().split(' ')
  return {
    firstName,
    lastName: rest.join(' '),
    email: data.email,
    source_page: 'newsletter-blog',
    tags: ['newsletter', ...(data.commercial ? ['marketing'] : [])],
  }
}

// ─── Contacto modal ───────────────────────────────────────────────────────────

export interface ContactoPayload {
  full_name: string
  email: string
  phone: string
  preferred_time: string
  message?: string
  commercial: boolean
  form_source: string
}

export function buildContactoClientifyPayload(data: ContactoPayload): ClientifyContact {
  const [firstName, ...rest] = data.full_name.trim().split(' ')
  return {
    firstName,
    lastName: rest.join(' '),
    email: data.email,
    phone: data.phone,
    source_page: data.form_source,
    tags: ['contacto-modal', ...(data.commercial ? ['marketing'] : [])],
    preferred_time: data.preferred_time,
    message: data.message,
  }
}
