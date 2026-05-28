export function buildPageSchema(...schemas: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map(({ '@context': _ctx, ...rest }) => rest),
  }
}
