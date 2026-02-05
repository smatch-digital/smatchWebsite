'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import {
  ArrowRight, // Switched to ArrowRight to match the straight arrow in the image
  Envelope,
  Phone,
  Buildings,
} from '@phosphor-icons/react/dist/ssr'
import { getClientSideURL } from '@/utilities/getURL'
import { fields } from '../Form/fields'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

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
    mapEmbedUrl,
    theme = 'dark',
  } = props

  // Form Logic
  const formID = formFromProps?.id
  const { confirmationType, redirect } = formFromProps || {}

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
    <section className={cn('relative w-full py-16 lg:py-20 overflow-hidden', bgColor)}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-smatch-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* 1. Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-yellow-500/10  border-yellow-500/20 mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-md bg-yellow-500 animate-pulse" />
            <span className="text-yellow-500 text-xs font-mono font-bold tracking-widest uppercase">
              Status: Online
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-6xl text-white font-bold tracking-tight mb-6">
            {headline}
          </h2>

          {subheadline && (
            <p className="font-sans text-lg text-zinc-400 max-w-2xl leading-relaxed">
              {subheadline}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-12">
          {/* 2. Left Column: Contact Info */}
          <div className="flex flex-col gap-6">
            {/* Email Card */}
            <div className="group bg-zinc-900/50 border border-white/5 p-6 rounded-lg hover:border-smatch-gold/30 transition-all duration-300">
              <div className="flex space-x-3 items-center gap-6">
                <div className="p-3 rounded-md border border-smatch-gold/20 text-smatch-gold bg-smatch-gold/5 group-hover:bg-smatch-gold group-hover:text-black transition-colors duration-300">
                  <Envelope size={24} weight="regular" />
                </div>
                <div className="w-full pl-5">
                  <span className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1 group-hover:text-smatch-gold/70 transition-colors">
                    Discutez avec nous
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-lg md:text-xl font-bold text-white hover:text-smatch-gold transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            {phone && (
              <div className="group bg-zinc-900/50 border border-white/5 p-6 rounded-lg hover:border-smatch-gold/30 transition-all duration-300">
                <div className="flex items-center gap-6">
                  <div className="p-3 rounded-md border border-smatch-gold/20 text-smatch-gold bg-smatch-gold/5 group-hover:bg-smatch-gold group-hover:text-black transition-colors duration-300">
                    <Phone size={24} weight="regular" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1 group-hover:text-smatch-gold/70 transition-colors">
                      Appelez-nous
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-lg md:text-xl font-bold text-white hover:text-smatch-gold transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Office Addresses */}
            {addresses && addresses.length > 0 && (
              <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-lg hover:border-smatch-gold/30 transition-all duration-300 relative overflow-hidden group">
                <div className="mb-6 flex items-center gap-3">
                  <Buildings size={24} className="text-smatch-gold" weight="regular" />
                  <h4 className="text-smatch-gold font-mono text-xs font-bold uppercase tracking-widest">
                    Nos Locaux
                  </h4>
                </div>
                <div className="space-y-6">
                  {addresses.map((addr, idx) => (
                    <div key={idx} className="pl-4 border-l border-white/10 group-hover:border-white/20 transition-colors">
                      <span className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        {addr.label}
                      </span>
                      <p className="text-white font-bold leading-snug">
                        {addr.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Right Column: Form */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-lg p-8 md:p-10 shadow-lg">
            <div className="mb-8 border-b border-white/10 pb-6">
              <h3 className="font-mono text-2xl text-white font-bold tracking-tight uppercase mb-2">
                Envoyez un message
              </h3>
              <p className="text-sm text-zinc-500 font-mono">
                Réponse sous 24h garantie
              </p>
            </div>

            {!formFromProps ? (
              <div className="text-center py-10 text-zinc-500 font-mono">
                ERR_NO_FORM_SELECTED
              </div>
            ) : (
              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <div className="bg-smatch-gold/10 border border-smatch-gold text-smatch-gold p-6 rounded-sm text-center">
                    <h4 className="font-heading text-xl mb-2">Message Envoyé</h4>
                    <p className="text-sm">Merci. Nous vous contacterons rapidement.</p>
                  </div>
                )}
                {isLoading && !hasSubmitted && (
                  <div className="text-center py-12 text-smatch-gold font-mono animate-pulse text-sm uppercase tracking-widest">
                    Transmission en cours...
                  </div>
                )}
                {error && (
                  <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-4 rounded-sm mb-6 font-mono text-sm">
                    Erreur: {error.message}
                  </div>
                )}
                {!hasSubmitted && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-6">
                      {formFromProps.fields?.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fields?.[field.blockType as keyof typeof fields]

                        if (Field) {
                          return (
                            <div key={index} className="group gap-2">

                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                                className="w-full bg-black/40 border border-white/10 rounded-md text-white px-4 py-3 focus:ring-1 focus:ring-smatch-gold focus:border-smatch-gold outline-none transition-all placeholder-zinc-700 font-mono text-sm"
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
                        className="w-full h-12 bg-smatch-gold hover:bg-smatch-gold-light text-black font-bold uppercase tracking-widest rounded-md transition-all duration-300 shadow-lg shadow-smatch-gold/10 group text-sm"
                      >
                        <span className="flex items-center gap-2">
                          Envoyer
                          <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </div>
                  </form>
                )}
              </FormProvider>
            )}
          </div>
        </div>

        {/* 4. Map Section (Bottom) */}
        {mapEmbedUrl && (
          <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-white/10 grayscale  transition-all duration-700 ease-in-out relative group">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(100%) contrast(100%) opacity(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
              className="w-full h-full"
            />
            {/* Overlay to ensure dark mode consistency */}
            <div className="absolute inset-0 bg-smatch-black/10 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-smatch-gold/5 mix-blend-overlay pointer-events-none" />
          </div>
        )}
      </div>
    </section>
  )
}
