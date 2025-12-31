import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from '@/getPayload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarBlank, MapPin, Tag } from '@phosphor-icons/react/dist/ssr'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const projects = await payload.find({
      collection: 'projects',
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
      },
    })

    return projects.docs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProjectDetailPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise

  if (!slug) return notFound()

  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug

  const project = await queryProjectBySlug({ slug: decodedSlug })

  if (!project) {
    return <PayloadRedirects url={url} />
  }

  const imageUrl =
    typeof project.image === 'object' && project.image?.url ? project.image.url : null
  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <article className="min-h-screen bg-smatch-black">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        {/* Background Image */}
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image src={imageUrl} alt={project.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-smatch-black via-smatch-black/80 to-transparent" />
          </div>
        )}

        <div className="container relative z-10 mx-auto px-4 pb-12 pt-32 md:px-6">
          {/* Back Link */}
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gray-400 transition-colors hover:text-[#FFB800]"
          >
            <ArrowLeft size={16} />
            Retour au Journal
          </Link>

          {/* Status Badge */}
          {project.status === 'upcoming' && (
            <div className="mb-4 inline-flex items-center gap-2 rounded border border-[#FFB800]/50 bg-[#FFB800]/10 px-3 py-1">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FFB800] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#FFB800]" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FFB800]">
                BIENTÔT
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="mb-6 max-w-4xl font-heading text-4xl font-bold uppercase leading-tight text-white md:text-6xl">
            {project.title}
          </h1>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            {formattedDate && (
              <div className="flex items-center gap-2">
                <CalendarBlank size={18} />
                <span className="font-mono text-sm">{formattedDate}</span>
              </div>
            )}
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="font-mono text-sm">{project.location}</span>
              </div>
            )}
            {project.code && (
              <div className="flex items-center gap-2">
                <Tag size={18} />
                <span className="font-mono text-sm">CODE: {project.code}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          {/* Short Description */}
          {project.description && (
            <p className="mb-12 text-xl leading-relaxed text-gray-300">{project.description}</p>
          )}

          {/* Full Description (Rich Text) */}
          {project.fullDescription && (
            <div className="prose prose-lg prose-invert max-w-none">
              <RichText data={project.fullDescription} />
            </div>
          )}

          {/* Metadata Pills */}
          {project.metadata && project.metadata.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-8">
              {project.metadata.map((meta, i) => (
                <div
                  key={i}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-gray-300"
                >
                  {meta.label}: <span className="text-[#FFB800]">{meta.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 font-heading text-2xl font-bold uppercase text-white">Galerie</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.gallery.map((item, i) => {
                  const galleryImageUrl =
                    typeof item.image === 'object' && item.image?.url ? item.image.url : null
                  if (!galleryImageUrl) return null
                  return (
                    <div key={i} className="group relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={galleryImageUrl}
                        alt={item.caption || `Image ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <p className="text-sm text-white">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  if (!slug) return {}

  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug({ slug: decodedSlug })

  return generateMeta({ doc: project })
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  try {
    const result = await payload.find({
      collection: 'projects',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  } catch {
    return null
  }
})
