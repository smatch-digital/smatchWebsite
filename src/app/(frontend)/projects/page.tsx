import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ActivityTimelineBlock, TimelineItem } from '@/blocks/ActivityTimeline/Component'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'

export const metadata: Metadata = {
    title: 'Journal des Opérations | Smatch Digital',
    description: 'Découvrez nos derniers projets et événements.',
}

export default async function ProjectsPage() {
    const payload = await getPayload({ config: configPromise })

    // Fetch all published projects/events, sorted by date descending
    const { docs } = await payload.find({
        collection: 'projects',
        limit: 50,
        sort: '-date',
    })

    // Transform to TimelineItem format
    const items: TimelineItem[] = docs.map((doc) => ({
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

    return (
        <main className="flex w-full flex-col bg-smatch-black">
            <SolutionsHero
                title="JOURNAL DES OPÉRATIONS"
                subtitle="Projets. Événements. Le fil de notre transformation numérique."
            />
            <ActivityTimelineBlock
                title="ACTIVITÉS RÉCENTES"
                items={items}
                showFilters={true}
            />
        </main>
    )
}
