'use client'

import type { ReactNode } from 'react'

interface Props {
  user: string
  domain: string
  className?: string
  children?: ReactNode
}

export default function ObfuscatedEmail({ user, domain, className, children }: Props) {
  const email = [user, domain].join('@')
  return (
    <a href={`mailto:${email}`} className={className}>
      {children}
      {email}
    </a>
  )
}
