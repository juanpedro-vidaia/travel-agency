import { BASE_URL } from '@/lib/config/site'
import { getAsset } from '@/lib/data/assets'

export function buildPersonSchema(member: {
  name: string
  role: string
  bio: string[]
  imageKey?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio[0],
    ...(member.imageKey ? { image: getAsset(member.imageKey).url } : {}),
    url: `${BASE_URL}/es#quienes-somos`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
  }
}
