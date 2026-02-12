import React from 'react'
import { getPayload } from '@/getPayload'
import type { Solution, SolutionsArchiveBlock as SolutionsArchiveBlockProps } from '@/payload-types'
import { SolutionsGridClient } from './Component.client'

export const SolutionsArchiveBlock: React.FC<
    SolutionsArchiveBlockProps & {
        id?: string
        locale?: string
    }
> = async (props) => {
    const {
        id,
        sectionTitle,
        sectionDescription,
        populateBy,
        limit: limitFromProps,
        selectedSolutions,
        columns,
        locale = 'fr',
    } = props

    const limit = limitFromProps || 10

    let solutions: Solution[] = []

    const payload = await getPayload()

    if (populateBy === 'collection') {
        // Fetch all solutions from collection
        const fetchedSolutions = await payload.find({
            collection: 'solutions',
            depth: 1,
            limit,
            locale: locale as 'en' | 'fr',
            sort: 'order',
            select: {
                title: true,
                slug: true,
                heroSubtitle: true,
                description: true,
                icon: true,
                heroImage: true,
            },
        })

        solutions = fetchedSolutions.docs as Solution[]
    } else if (selectedSolutions?.length) {
        // Manual selection - resolve relationships
        const resolvedSolutions = selectedSolutions.map((solution) => {
            if (typeof solution === 'object') return solution
            return null
        }).filter(Boolean) as Solution[]

        solutions = resolvedSolutions
    }

    // Map columns to Tailwind classes
    const columnClasses: Record<string, string> = {
        '2': 'lg:grid-cols-2',
        '3': 'lg:grid-cols-3',
        '4': 'lg:grid-cols-4',
    }

    return (
        <SolutionsGridClient
            id={id}
            sectionTitle={sectionTitle}
            sectionDescription={sectionDescription}
            solutions={solutions}
            columnClass={columnClasses[columns || '4'] || 'lg:grid-cols-4'}
            locale={locale}
        />
    )
}
