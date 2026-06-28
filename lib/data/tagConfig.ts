export const TRIP_TAGS = {
  NATURE: 'nature',
  WILDLIFE: 'wildlife',
  ADVENTURE: 'adventure',
  RELAX: 'relax',
  CULTURE: 'culture',
  GASTRONOMY: 'gastronomy',
  CRUISE: 'cruise',
} as const

export type TripTag = typeof TRIP_TAGS[keyof typeof TRIP_TAGS]

export const TAG_CONFIG: Record<TripTag, { icon: string; es: { label: string }; en?: { label: string } }> = {
  nature:     { icon: '🌿', es: { label: 'Naturaleza' } },
  wildlife:   { icon: '🐋', es: { label: 'Vida salvaje' } },
  adventure:  { icon: '🏔', es: { label: 'Aventura' } },
  relax:      { icon: '🌅', es: { label: 'Relax' } },
  culture:    { icon: '🏛', es: { label: 'Cultura' } },
  gastronomy: { icon: '🍷', es: { label: 'Gastronomía' } },
  cruise:     { icon: '🚢', es: { label: 'Crucero' } },
}

// ── Dificultad del viaje (opcional, para el bloque "Datos clave") ──────────────
// Aquí (no en trips.ts) para que los Client Components puedan importar el config
// sin arrastrar el array de datos de viajes al bundle (ver M22).
export type TripDifficulty = 'facil' | 'moderada' | 'exigente'

export const DIFFICULTY_CONFIG: Record<TripDifficulty, { es: { label: string }; en?: { label: string } }> = {
  facil:    { es: { label: 'Fácil' } },
  moderada: { es: { label: 'Moderada' } },
  exigente: { es: { label: 'Exigente' } },
}
