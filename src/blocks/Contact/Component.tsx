'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import {
  ArrowUpRight,
  Envelope,
  Phone,
  MapPin,
  Buildings,
  CaretRight,
  Circle,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { getClientSideURL } from '@/utilities/getURL'
import { fields } from '../Form/fields' // Reusing logic from Form block
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

// Types
type ContactBlockProps = {
  headline: string
  subheadline?: string
  form: FormType
  email: string
  phone?: string
  addresses?: {
    label: string
    value: string
    id?: string
  }[]
  socialLinks?: {
    platform: string
    url: string
    id?: string
  }[]
  mapEmbedUrl?: string
  theme?: 'dark' | 'charcoal'
}

export const ContactBlock: React.FC<ContactBlockProps> = (props) => {
  const {
    headline,
    subheadline,
    form: formFromProps,
    email,
    phone,
    addresses,
    socialLinks,
    mapEmbedUrl,
    theme = 'dark',
  } = props

  // Form Logic (Ported from FormBlock)
  const formID = formFromProps?.id
  const { confirmationMessage, confirmationType, redirect, submitButtonLabel } = formFromProps || {}

  const formMethods = useForm({
    defaultValues: formFromProps?.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const bgColor = theme === 'charcoal' ? 'bg-smatch-charcoal' : 'bg-smatch-black'

  return (
    <section className={cn('relative w-full py-24 lg:py-32 overflow-hidden', bgColor)}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-smatch-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* 1. Centered Header Section */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-yellow-500 text-xs font-mono font-bold tracking-widest uppercase">
              Status: Online
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight mb-6">
            {headline.split(' ').map((word, i, arr) => (
              <span key={i} className={i === arr.length - 1 ? 'text-smatch-gold' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>

          {/* Subheadline */}
          {subheadline && (
            <p className="font-sans text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              {subheadline}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* 2. Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <div className="group bg-zinc-900/40 border border-white/5 hover:border-white/10 p-6 rounded-2xl transition-colors duration-300">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-lg bg-yellow-500/20  text-yellow-500 group-hover:bg-yellow-500  transition-all duration-300">
                  <Envelope size={24} weight="fill" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1">
                    Discutez avec nous
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-xl font-bold text-white hover:text-smatch-gold transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            {phone && (
              <div className="group bg-zinc-900/40 border border-white/5 hover:border-white/10 p-6 rounded-2xl transition-colors duration-300">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-lg bg-yellow-500/20  text-yellow-500 group-hover:bg-yellow-500 transition-all duration-300">
                    <Phone size={24} weight="fill" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1">
                      Appelez-nous
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-xl font-bold text-white hover:text-smatch-gold transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Office Card */}
            {addresses && addresses.length > 0 && (
              <div className="relative bg-zinc-900/40 border border-white/5 p-8 rounded-2xl overflow-hidden min-h-[240px]">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500/50 rounded-tl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/50 rounded-br-lg" />

                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-2 text-yellow-500">
                    <Circle size={8} weight="fill" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">
                      Nos Bureaux
                    </span>
                  </div>
                  <Buildings size={32} className="text-zinc-700" weight="duotone" />
                </div>

                <div className="space-y-6">
                  {addresses.map((addr, idx) => (
                    <div key={idx} className="pl-4 border-l border-white/10">
                      <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        {addr.label}
                      </span>
                      <p className="text-white font-medium whitespace-pre-line leading-relaxed">
                        {addr.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Maps Embed */}
            {mapEmbedUrl && (
              <div className="relative bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden h-64 lg:h-72">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-smatch-gold/5 pointer-events-none mix-blend-multiply" />
              </div>
            )}
          </div>

          {/* 3. Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="relative bg-zinc-950 border-t-4 border-t-yellow-500 border-x border-b border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Form Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-white/5 pb-8">
                <h3 className="font-mono text-2xl md:text-3xl text-white font-bold tracking-tight">
                  Initialiser la communication
                </h3>
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                  FORM_ID: CNT_2024_X1
                </span>
              </div>

              {!formFromProps ? (
                <div className="text-center py-10 text-zinc-500 font-mono">
                  ERR_NO_FORM_SELECTED
                </div>
              ) : (
                <FormProvider {...formMethods}>
                  {!isLoading && hasSubmitted && confirmationType === 'message' && (
                    <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 p-6 rounded-lg text-center">
                      <h4 className="font-heading text-2xl mb-2">Message Transmitted</h4>
                      <p>Thank you. We will be in touch shortly.</p>
                    </div>
                  )}
                  {isLoading && !hasSubmitted && (
                    <div className="text-center py-12 text-yellow-500 font-mono animate-pulse">
                      ESTABLISHING UPLINK...
                    </div>
                  )}
                  {error && (
                    <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6 font-mono text-sm">
                      ERR_FAILED: {error.message}
                    </div>
                  )}
                  {!hasSubmitted && (
                    <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formFromProps.fields?.map((field, index) => {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          const Field: React.FC<any> =
                            fields?.[field.blockType as keyof typeof fields]

                          // Determine field width based on CMS settings
                          // If width is explicitly '50', it spans 1 column (50%)
                          // Otherwise, it defaults to full width (col-span-2)
                          // @ts-ignore - width property exists in Payload Form Builder fields
                          const fieldWidth = field.width ? String(field.width) : '100'
                          const isHalfWidth = fieldWidth === '50'

                          if (Field) {
                            return (
                              <div
                                className={cn(
                                  'col-span-1',
                                  isHalfWidth ? 'md:col-span-1' : 'md:col-span-2',
                                )}
                                key={index}
                              >
                                <Field
                                  form={formFromProps}
                                  {...field}
                                  {...formMethods}
                                  control={control}
                                  errors={errors}
                                  register={register}
                                />
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>

                      <div className="pt-4">
                        <Button
                          form={formID}
                          type="submit"
                          disabled={isLoading}
                          className="w-full md:w-auto px-8 h-14 bg-smatch-gold hover:bg-smatch-gold-light text-smatch-black font-bold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-3 group"
                        >
                          {submitButtonLabel || 'Envoyer le message'}
                          <CaretRight
                            size={16}
                            weight="bold"
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </Button>
                      </div>
                    </form>
                  )}
                </FormProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
