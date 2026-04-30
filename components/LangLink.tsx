'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/hooks/useLanguage'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link>

export default function LangLink({ href, ...rest }: Props) {
  const { language } = useLanguage()
  const hrefStr = typeof href === 'string' ? href : String(href)
  const langHref = hrefStr.startsWith('/') ? `/${language}${hrefStr}` : hrefStr
  return <Link href={langHref} {...rest} />
}
