import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMetadata } from './[slug]/page'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const homePage = docs[0]

  if (!homePage) {
    return (
      <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-smatch-black p-4 font-sans text-smatch-text-primary">
        <h1 className="mb-4 text-2xl font-bold text-smatch-gold">Setup Required</h1>
        <p className="mb-8 text-gray-400">The &quot;Home&quot; page has not been created in the CMS yet.</p>
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <p>Please run the seed script or create a page with slug &quot;home&quot;.</p>
        </div>
      </main>
    )
  }

  const { hero, layout } = homePage

  return (
    <main className="mx-auto min-h-screen w-full mb-20 bg-smatch-black font-sans text-smatch-text-primary selection:bg-smatch-gold selection:text-smatch-black">
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </main>
  )
}

export { generateMetadata }
