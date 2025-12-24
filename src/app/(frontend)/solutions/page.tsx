import type { Metadata } from 'next'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid'
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA'

export const metadata: Metadata = {
  title: 'Solutions | Smatch Digital',
  description: 'Discover our industrial solutions: Performance, Telemetry Ops, and Core Logistics.',
}

export default function SolutionsPage() {
  return (
    <main className="flex flex-col w-full">
      <SolutionsHero />
      <SolutionsGrid />
      <SolutionsCTA />
    </main>
  )
}
