export const TRIP_TAGS = {
  NATURE: 'nature',
  WILDLIFE: 'wildlife',
  ADVENTURE: 'adventure',
  RELAX: 'relax',
  CULTURE: 'culture',
  GASTRONOMY: 'gastronomy',
} as const

export type TripTag = typeof TRIP_TAGS[keyof typeof TRIP_TAGS]

export const TAG_CONFIG: Record<TripTag, { icon: string; es: { label: string }; en?: { label: string } }> = {
  nature:     { icon: '🌿', es: { label: 'Naturaleza' } },
  wildlife:   { icon: '🐋', es: { label: 'Vida salvaje' } },
  adventure:  { icon: '🏔', es: { label: 'Aventura' } },
  relax:      { icon: '🌅', es: { label: 'Relax' } },
  culture:    { icon: '🏛', es: { label: 'Cultura' } },
  gastronomy: { icon: '🍷', es: { label: 'Gastronomía' } },
}
