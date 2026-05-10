'use client'

import { type ReactNode } from 'react'
import { useContactModal } from '@/lib/context/ContactModalContext'

interface Props {
  children: ReactNode
  className?: string
}

export default function ContactModalTrigger({ children, className }: Props) {
  const { openContactModal } = useContactModal()
  return (
    <button type="button" onClick={openContactModal} className={className}>
      {children}
    </button>
  )
}
