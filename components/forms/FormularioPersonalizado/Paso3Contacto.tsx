'use client'

import { useFormContext } from 'react-hook-form'
import { FieldLabel, inputCls, inputErrorCls, FieldError } from './FormPrimitives'
import LangLink from '@/components/ui/LangLink'
import type { FormPayload } from '@/lib/form-utils'

interface Paso3Props {
  t: {
    title: string
    ideaLabel: string
    ideaPlaceholder: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    phoneHelper: string
    privacyLabel: string
    privacyLink: string
  }
  validationMessages: Record<string, string>
}

export default function Paso3Contacto({ t, validationMessages }: Paso3Props) {
  const { register, formState: { errors } } = useFormContext<FormPayload>()

  const err = (key: keyof FormPayload) => {
    const msg = (errors[key] as { message?: string } | undefined)?.message
    return msg ? (validationMessages[msg] ?? msg) : undefined
  }

  return (
    <div className="space-y-8">

      {/* Textarea protagonista */}
      <div>
        <FieldLabel text={t.ideaLabel} />
        <textarea
          {...register('idea')}
          rows={5}
          placeholder={t.ideaPlaceholder}
          className={`${inputCls} resize-none leading-relaxed`}
          style={{ minHeight: '120px' }}
        />
      </div>

      {/* Datos de contacto */}
      <div className="bg-vidaia-sand rounded-2xl border border-vidaia-light p-6 space-y-5">

        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-vidaia-dark mb-2">
            {t.nameLabel} <span className="text-red-400">*</span>
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            {...register('nombre')}
            className={errors.nombre ? inputErrorCls : inputCls}
          />
          <FieldError message={err('nombre')} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-vidaia-dark mb-2">
            {t.emailLabel} <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            {...register('email')}
            className={errors.email ? inputErrorCls : inputCls}
          />
          <FieldError message={err('email')} />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-semibold text-vidaia-dark mb-2">
            {t.phoneLabel}
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            placeholder={t.phonePlaceholder}
            {...register('telefono')}
            className={inputCls}
          />
          <p className="mt-1.5 text-xs text-gray-400">{t.phoneHelper}</p>
        </div>

        {/* Privacidad */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('privacidad')}
              className="mt-0.5 rounded border-gray-300 text-vidaia-primary flex-shrink-0"
            />
            <span className="text-xs text-gray-500 leading-relaxed">
              {t.privacyLabel}{' '}
              <LangLink href="/privacidad" className="underline hover:text-vidaia-primary transition-colors">
                {t.privacyLink}
              </LangLink>
            </span>
          </label>
          <FieldError message={err('privacidad')} />
        </div>

      </div>

    </div>
  )
}
