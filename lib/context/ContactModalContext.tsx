'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface ContactModalContextValue {
  isOpen: boolean
  openContactModal: () => void
  closeContactModal: () => void
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        openContactModal: () => setIsOpen(true),
        closeContactModal: () => setIsOpen(false),
      }}
    >
      {children}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) throw new Error('useContactModal must be inside ContactModalProvider')
  return ctx
}
