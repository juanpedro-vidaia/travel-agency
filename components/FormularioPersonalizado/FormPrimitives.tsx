'use client'

import { Check, Plus, Minus } from 'lucide-react'

// ─── FieldLabel ───────────────────────────────────────────────────────────────

export function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <p className="flex items-center gap-2.5 mb-4">
      <span className="w-1.5 h-4 rounded-full bg-vidaia-primary flex-shrink-0" />
      <span className="text-sm font-bold text-vidaia-dark uppercase tracking-wide">
        {text}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
    </p>
  )
}

// ─── CheckPill ────────────────────────────────────────────────────────────────

export function CheckPill({
  checked, onChange, label,
}: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
        checked
          ? 'border-vidaia-primary bg-vidaia-primary text-white'
          : 'border-gray-200 text-gray-600 hover:border-vidaia-mid bg-white'
      }`}
    >
      {label}
    </button>
  )
}

// ─── RadioPill ────────────────────────────────────────────────────────────────

export function RadioPill({
  selected, onSelect, label,
}: { selected: boolean; onSelect: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all ${
        selected
          ? 'border-vidaia-primary bg-vidaia-primary text-white'
          : 'border-gray-200 text-gray-600 hover:border-vidaia-mid bg-white'
      }`}
    >
      {label}
    </button>
  )
}

// ─── CheckCard ────────────────────────────────────────────────────────────────

export function CheckCard({
  checked, onChange, label, icon, emoji,
}: { checked: boolean; onChange: () => void; label: string; icon?: React.ReactNode; emoji?: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all w-full ${
        checked
          ? 'border-vidaia-primary bg-vidaia-light/60 text-vidaia-dark'
          : 'border-gray-200 hover:border-vidaia-mid text-gray-700 bg-white'
      }`}
    >
      <span className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
        checked ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'
      }`}>
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </span>
      {emoji && <span className="text-xl leading-none">{emoji}</span>}
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

// ─── NumberStepper ────────────────────────────────────────────────────────────

export function NumberStepper({
  label, sublabel, value, onChange, min = 0,
}: { label: string; sublabel?: string; value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div>
        <p className="text-sm font-semibold text-vidaia-dark">{label}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-vidaia-primary hover:text-vidaia-primary disabled:opacity-25 disabled:cursor-not-allowed transition-all"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center text-xl font-bold text-vidaia-dark tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-vidaia-primary hover:text-vidaia-primary transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Input class ─────────────────────────────────────────────────────────────

export const inputCls = 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-vidaia-charcoal placeholder-gray-400 focus:outline-none focus:border-vidaia-primary transition-colors bg-white'
export const inputErrorCls = 'w-full px-4 py-3 border-2 border-red-300 rounded-xl text-sm text-vidaia-charcoal placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors bg-white'

// ─── FieldError ───────────────────────────────────────────────────────────────

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-xs text-red-500">{message}</p>
}
