import React from 'react'
import { getPayload } from '@/getPayload'
import type { JournalBlock, Project } from '@/payload-types'
import { JournalClientComponent, JournalItem } from './Client'

export const JournalBlockComponent = async (props: JournalBlock & { locale?: string }) => {
  const {
    populateBy,
    limit,
    filterByType,
    selectedItems,
    title,
    liveFeedText,
    manualItems,
    locale,
  } = props

  const normalizedLocale = locale === 'fr' || locale === 'en' ? locale : 'en'

  let items: (number | Project)[] = []

  if (populateBy === 'selection') {
    items = (selectedItems || []) as (number | Project)[]
  } else {
    const payload = await getPayload()
    const where: any = {}

    if (filterByType && filterByType !== 'all') {
      where.type = { equals: filterByType }
    }

    const { docs } = await payload.find({
      collection: 'projects',
      where,
      limit: limit || 5,
      sort: '-date',
      locale: normalizedLocale as 'en' | 'fr',
    })
    items = docs
  }

  const displayArticles: JournalItem[] = items
    .filter((item): item is Project => typeof item !== 'number')
    .map((project) => {
      const year = project.date ? new Date(project.date).getFullYear() : new Date().getFullYear()
      const typeLabel = project.type === 'event' ? 'ÉVÉNEMENT' : 'PROJET'
      const meta = `${year} | ${typeLabel}`

      const imageUrl =
        typeof project.image === 'object' && project.image?.url
          ? project.image.url
          : '/assets/journal/placeholder.jpg'

      const prefix = normalizedLocale ? `/${normalizedLocale}` : ''

      return {
        id: project.id,
        meta,
        title: project.title,
        description: project.description || '',
        linkText: 'VOIR PLUS',
        linkUrl: `${prefix}/projects/${project.slug}`,
        image: imageUrl || '',
      }
    })

  if (displayArticles.length === 0 && manualItems && manualItems.length > 0) {
    const manualArticles = manualItems.map((item, index) => {
      const imageUrl =
        typeof item.image === 'object' && item.image?.url
          ? item.image.url
          : '/assets/journal/placeholder.jpg'
      return {
        id: item.id || index,
        meta: item.meta || '',
        title: item.title,
        description: item.description || '',
        linkText: item.linkText || 'VOIR PLUS',
        linkUrl: item.linkUrl || '#',
        image: imageUrl,
      }
    })
    return (
      <JournalClientComponent title={title} liveFeedText={liveFeedText} articles={manualArticles} />
    )
  }

  return (
    <JournalClientComponent title={title} liveFeedText={liveFeedText} articles={displayArticles} />
  )
}
