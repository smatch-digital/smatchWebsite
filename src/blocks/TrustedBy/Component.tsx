import React from 'react'
import type { Media } from '@/payload-types'
import Image from 'next/image'

type Props = {
    title?: string
    partners?: {
        name: string
        logoType: 'image' | 'text'
        logo?: Media | string
        textLogo?: string
        id?: string
    }[]
}

export const TrustedByBlock: React.FC<Props> = ({ title, partners }) => {
    const partnersList = partners || []

    // If no partners, don't render anything
    if (partnersList.length === 0) return null

    // Create a display list. If the list is short, we duplicate it multiple times to ensure smooth scrolling
    // For a seamless infinite scroll, we need enough content to cover the screen width + extra.
    // Tripling the list is a safe default for most screen sizes.
    const displayPartners = [...partnersList, ...partnersList, ...partnersList, ...partnersList]

    return (
        <section className="mx-auto overflow-hidden bg-smatch-black py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <span className="font-mono text-sm uppercase tracking-[0.2em] text-smatch-text-muted">
                        {title || 'TRUSTED BY'}
                    </span>
                </div>

                <div className="mask-gradient-x relative w-full overflow-hidden">
                    {/* Gradient Masks ensuring seamless edges */}
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-smatch-black to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-smatch-black to-transparent" />

                    {/* Marquee Track */}
                    <div className="flex w-max animate-scroll gap-12 md:gap-14">
                        {displayPartners.map((partner, index) => {
                            const isImage = partner.logoType === 'image' && partner.logo
                            let imageUrl = ''
                            const altText = partner.name

                            if (isImage) {
                                if (typeof partner.logo === 'string') {
                                    imageUrl = partner.logo
                                } else if (typeof partner.logo === 'object' && partner.logo?.url) {
                                    imageUrl = partner.logo.url
                                }
                            }

                            // Use index as key because we are intentionally duplicating items
                            return (
                                <div
                                    key={`${partner.id}-${index}`}
                                    className="flex min-w-[120px] items-center justify-center opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                                >
                                    {isImage && imageUrl ? (
                                        <div className="relative h-8 w-32 md:h-10 md:w-40">
                                            <Image
                                                src={imageUrl}
                                                alt={altText}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <span className="font-heading text-xl font-bold tracking-tighter text-white/80">
                                            {(partner.textLogo || partner.name).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
