import type { ActivityTimelineBlock as ActivityTimelineBlockType } from '@/payload-types'
import { getPayload } from '@/getPayload'
import React from 'react'
import { ActivityTimelineClient, TimelineItem } from './Component.client'

export type { TimelineItem }

export const ActivityTimelineBlock: React.FC<
    ActivityTimelineBlockType & {
        locale?: string
    }
> = async ({
    title,
    populateBy,
    limit,
    filterByType,
    selectedItems,
    showFilters,
    locale = 'fr',
}) => {
        const payload = await getPayload()

        let docs: any[] = []

        if (populateBy === 'selection' && selectedItems && selectedItems.length > 0) {
            // If items are populated by selection, they might already be populated if depth > 0 was used in the page fetch.
            // However, blocks often don't have deep population by default in the generic page query unless specified.
            // If they are IDs (strings/numbers), we might need to fetch them.
            // BUT Payload's local API usually respects the depth passed to the page query.
            // If we assume depth=1 (standard), they are objects.

            // Type guard or resolving:
            const resolvedItems = selectedItems.map((item) => {
                if (typeof item === 'object' && item !== null && 'id' in item) {
                    return item
                }
                return null
            }).filter(Boolean)

            if (resolvedItems.length > 0) {
                docs = resolvedItems
            } else {
                // Fallback: if we just have IDs, fetch them.
                const ids = selectedItems.filter((id) => typeof id === 'string' || typeof id === 'number')
                if (ids.length > 0) {
                    const { docs: fetchedDocs } = await payload.find({
                        collection: 'projects',
                        where: {
                            id: { in: ids as any[] }
                        },
                        limit: ids.length,
                        locale: locale as 'en' | 'fr',
                        depth: 1
                    })
                    // Sort by selection order? Or date? 
                    // Usually selection order is preserved if we map back.
                    // For now, let's sort by date like others.
                    docs = fetchedDocs
                }
            }
        } else {
            // Populate by latest
            const where: any = {
                _status: {
                    equals: 'published',
                },
            }

            if (filterByType && filterByType !== 'all') {
                where.type = {
                    equals: filterByType,
                }
            }

            const { docs: fetchedDocs } = await payload.find({
                collection: 'projects',
                limit: limit || 10,
                sort: '-date',
                where,
                locale: locale as 'en' | 'fr',
                depth: 1
            })

            docs = fetchedDocs
        }

        // Transform to TimelineItem
        const items: TimelineItem[] = docs.map((doc: any) => ({
            id: doc.id,
            title: doc.title,
            slug: doc.slug || '',
            type: (doc.type as 'project' | 'event') || 'project',
            status: (doc.status as 'upcoming' | 'completed' | 'archived') || 'completed',
            date: doc.date || '',
            location: doc.location,
            code: doc.code,
            description: doc.description,
            image: doc.image,
            metadata: doc.metadata,
            linkLabel: doc.linkLabel,
            externalLink: doc.externalLink,
            linkUrl: doc.linkUrl,
        }))

        return <ActivityTimelineClient title={title || undefined} items={items} showFilters={showFilters} />
    }
