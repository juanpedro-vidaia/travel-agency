import countries, { type Country } from '../data/countries'

export function getCountries(): Country[] {
  return countries.filter(country => country.active).sort((a, b) => a.content.es.name.localeCompare(b.content.es.name))
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(country => country.slug === slug && country.active)
}

export function getAllCountries(): Country[] {
  return countries
}
