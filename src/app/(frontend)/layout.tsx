import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import React from 'react'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { Antonio, Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { IntroLoader } from '@/components/Loader/IntroLoader'

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-antonio',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(antonio.variable, inter.variable, jetbrains.variable)}
      lang="fr"
      suppressHydrationWarning
    >

      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className='bg-smatch-black'>
        <IntroLoader />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Smatch Digital | Solutions WMS & Supply Chain',
    template: '%s | Smatch Digital',
  },
  description: 'Smatch Digital conçoit des solutions WMS, supply chain et IoT sur mesure pour l\'industrie marocaine. Expertise locale, standards internationaux. Digitalisation industrielle de pointe.',
  keywords: ['WMS', 'Supply Chain', 'IoT', 'Maroc', 'Industrie 4.0', 'Digitalisation', 'Logistique', 'Smatch Digital'],
  authors: [{ name: 'Smatch Digital', url: 'https://smatch.ma' }],
  creator: 'Smatch Digital',
  publisher: 'Smatch Digital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    ...mergeOpenGraph(),
    title: 'Smatch Digital | Solutions WMS & Supply Chain',
    description: 'Solutions WMS, supply chain et IoT sur mesure pour l\'industrie marocaine.',
    siteName: 'Smatch Digital',
    locale: 'fr_MA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@smatchdigital',
    title: 'Smatch Digital',
    description: 'Solutions WMS & Supply Chain pour l\'industrie marocaine.',
  },
}
