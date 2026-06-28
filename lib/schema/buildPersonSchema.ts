import { BASE_URL } from '@/lib/config/site'
import { getAsset } from '@/lib/data/assets'

export interface PersonMember {
  name: string
  role: string
  bio: string[]
  imageKey?: string
}

/** Person node WITHOUT @context — for embedding inside other schemas (e.g. Article author). */
export function buildPersonNode(member: PersonMember) {
  return {
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio[0],
    ...(member.imageKey ? { image: getAsset(member.imageKey).url } : {}),
    url: `${BASE_URL}/es#quienes-somos`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
  }
}

export function buildPersonSchema(member: PersonMember) {
  return { '@context': 'https://schema.org', ...buildPersonNode(member) }
}
