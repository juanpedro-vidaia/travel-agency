'use client'

import type { ReactNode } from 'react'
import { openClientifyMeetingWidget } from '@/lib/helpers/clientifyWidgets'

interface Props {
  children: ReactNode
  className?: string
}

export default function ClientifyMeetingButton({ children, className }: Props) {
  return (
    <button
      type="button"
      onClick={openClientifyMeetingWidget}
      className={className}
      aria-label="Reservar reunión"
    >
      {children}
    </button>
  )
}
