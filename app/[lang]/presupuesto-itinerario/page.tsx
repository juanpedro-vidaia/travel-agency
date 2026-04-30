import { ENABLED_LANGUAGES } from '@/lib/config/languages.config'
import { Suspense } from 'react'
import PresupuestoItinerarioContent from './PresupuestoItinerarioContent'

export function generateStaticParams() {
  return ENABLED_LANGUAGES.map(lang => ({ lang }))
}

export default function PresupuestoItinerarioPage() {
  return (
    <Suspense>
      <PresupuestoItinerarioContent />
    </Suspense>
  )
}
