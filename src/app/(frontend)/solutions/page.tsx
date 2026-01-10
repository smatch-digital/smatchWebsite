import type { Metadata } from 'next'
import { getPayload } from '@/getPayload'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid'
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA'

export const metadata: Metadata = {
  title: 'Solutions | Smatch Digital',
  description: 'Discover our industrial solutions.',
}

export default async function SolutionsPage() {
  // 1. Initialize Payload
  const payload = await getPayload()

  // 2. Fetch all published solutions
  const { docs: solutions } = await payload.find({
    collection: 'solutions',
    draft: false, // Only show published
    select: {
      title: true,
      slug: true,
      heroSubtitle: true, // Assuming this maps to your "subtitle"
      description: true, // Assuming you have a short description field
      icon: true, // We need the icon name string
      heroImage: true, // For the card background
    },
  })

  return (
    <main className="flex w-full flex-col">
      <SolutionsHero image={'/assets/hero/SolutionHero.webp'} />
      {/* 3. Pass the fetched data to the Grid */}
      <SolutionsGrid solutions={solutions} />
      <SolutionsCTA />
    </main>
  )
}
