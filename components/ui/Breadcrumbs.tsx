import LangLink from '@/components/ui/LangLink'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  name: string
  /** Ruta relativa al idioma ('' = home). Omitir en el último item (página actual). */
  path?: string
}

interface Props {
  /** Mismos items que se pasan a buildBreadcrumbSchema — una sola fuente de verdad. */
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: Props) {
  return (
    <nav aria-label="breadcrumb" className={className}>
      <ol className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 min-w-0">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.name} className={`flex items-center gap-1 ${isLast ? 'min-w-0' : 'shrink-0'}`}>
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" aria-hidden />}
              {!isLast && item.path !== undefined ? (
                <LangLink
                  href={item.path === '' ? '/' : item.path}
                  className="hover:text-vidaia-primary transition-colors font-medium"
                >
                  {item.name}
                </LangLink>
              ) : (
                <span className="text-vidaia-charcoal/70 font-medium truncate" aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
