import React from 'react'
import { getPayload } from '@/getPayload'
import type { JournalBlock, Project } from '@/payload-types'
import { JournalClientComponent, JournalItem } from './Client'

export const JournalBlockComponent = async (props: JournalBlock) => {
    const { populateBy, limit, filterByType, selectedItems, title, liveFeedText, manualItems } = props

    let items: (Project | string)[] = []

    if (populateBy === 'selection') {
        items = selectedItems || []
    } else {
        const payload = await getPayload()
        const where: any = {}
        
        if (filterByType && filterByType !== 'all') {
            where.type = { equals: filterByType }
        }

        // Only show published/completed/upcoming projects, hide archived if needed?
        // Let's assume we want to show everything that is public.
        // Projects access control is public read, so we are good.
        
        const { docs } = await payload.find({
            collection: 'projects',
            where,
            limit: limit || 5,
            sort: '-date', // Most recent first
        })
        items = docs
    }

    // Transform items to JournalItem format
    const displayArticles: JournalItem[] = items.map((item, index) => {
        if (typeof item === 'string') return null // Should not happen if depth is correct

        // Ensure we have a valid Project object
        const project = item as Project
        
        // Format meta string: "YEAR | TYPE"
        const year = project.date ? new Date(project.date).getFullYear() : new Date().getFullYear()
        const typeLabel = project.type === 'event' ? 'ÉVÉNEMENT' : 'PROJET'
        const meta = `${year} | ${typeLabel}`

        // Get image URL
        const imageUrl = typeof project.image === 'object' && project.image?.url 
            ? project.image.url 
            : '/assets/journal/placeholder.jpg'

        return {
            id: project.id,
            meta,
            title: project.title,
            description: project.description || '',
            linkText: 'VOIR PLUS', // Or customize based on type
            linkUrl: `/projects/${project.slug}`,
            image: imageUrl || ''
        }
    }).filter((item): item is JournalItem => item !== null)

    // Fallback to manual items if no dynamic items found (optional, for backward compatibility)
    if (displayArticles.length === 0 && manualItems && manualItems.length > 0) {
        const manualArticles = manualItems.map((item, index) => {
            const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : '/assets/journal/placeholder.jpg'
            return {
                id: item.id || index,
                meta: item.meta || '',
                title: item.title,
                description: item.description || '',
                linkText: item.linkText || 'VOIR PLUS',
                linkUrl: item.linkUrl || '#',
                image: imageUrl
            }
        })
        return <JournalClientComponent title={title} liveFeedText={liveFeedText} articles={manualArticles} />
    }

    return <JournalClientComponent title={title} liveFeedText={liveFeedText} articles={displayArticles} />
}
