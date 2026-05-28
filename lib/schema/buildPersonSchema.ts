export function buildPersonSchema(member: { name: string; role: string; bio: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio[0],
    url: 'https://www.viajesvidaia.com/es#quienes-somos',
    worksFor: {
      '@type': 'TravelAgency',
      name: 'Viajes Vidaia',
      url: 'https://www.viajesvidaia.com',
    },
  }
}
