'use client'

import type { ReactNode } from 'react'
import type { ConsentCategory } from '@/lib/consent/consent'
import { useConsent } from '@/lib/context/ConsentContext'

interface Props {
  category: ConsentCategory
  children: ReactNode
}

export default function ConsentScript({ category, children }: Props) {
  const { isReady, canUseCategory } = useConsent()
  if (!isReady || !canUseCategory(category)) return null
  return <>{children}</>
}

