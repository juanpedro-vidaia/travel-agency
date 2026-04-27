import countries, { type Country } from '../data/countries'

export function getCountries(): Country[] {
  return countries.filter(c => c.active).sort((a, b) => a.order - b.order)
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(c => c.slug === slug && c.active)
}

export function getAllCountries(): Country[] {
  return countries
}
