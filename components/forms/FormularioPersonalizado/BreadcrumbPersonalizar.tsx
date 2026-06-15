import LangLink from '@/components/ui/LangLink'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbPersonalizarProps {
  countryName: string
  countrySlug: string
  itineraryName: string
  itinerarySlug: string
  personalizarLabel: string
}

export default function BreadcrumbPersonalizar({
  countryName,
  countrySlug,
  itineraryName,
  itinerarySlug,
  personalizarLabel,
}: BreadcrumbPersonalizarProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1 text-xs text-white/50 flex-wrap justify-center">
        <li>
          <LangLink
            href={`/destinos/${countrySlug}`}
            className="hover:text-white transition-colors font-medium"
          >
            {countryName}
          </LangLink>
        </li>
        <li aria-hidden><ChevronRight className="w-3 h-3 text-white/25 shrink-0" /></li>
        <li>
          <LangLink
            href={`/itinerarios/${itinerarySlug}`}
            className="hover:text-white transition-colors font-medium"
          >
            {itineraryName}
          </LangLink>
        </li>
        <li aria-hidden><ChevronRight className="w-3 h-3 text-white/25 shrink-0" /></li>
        <li>
          <span className="text-white/70 font-medium">{personalizarLabel}</span>
        </li>
      </ol>
    </nav>
  )
}
