import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import type { Locale } from '@/utilities/i18n'

interface HeaderProps {
  locale: Locale
}

export async function Header({ locale }: HeaderProps) {
  const headerData: Header | null = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} locale={locale} />
}
