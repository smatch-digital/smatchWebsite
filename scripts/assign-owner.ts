// Quick script to assign owner role to your account
// Run with: npx tsx scripts/assign-owner.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function assignOwner() {
    const payload = await getPayload({ config })

    const ownerEmail = 'kourdroid@gmail.com'

    // Find the user
    const { docs } = await payload.find({
        collection: 'users',
        where: {
            email: { equals: ownerEmail }
        },
        limit: 1,
    })

    if (docs.length === 0) {
        console.error(`User with email ${ownerEmail} not found`)
        process.exit(1)
    }

    const user = docs[0]
    console.log(`Found user: ${user.name} (${user.email})`)

    // Update to owner role
    await payload.update({
        collection: 'users',
        id: user.id,
        data: {
            role: 'owner',
        },
    })

    console.log(`✅ Successfully assigned OWNER role to ${ownerEmail}`)
    process.exit(0)
}

assignOwner().catch((err) => {
    console.error('Error:', err)
    process.exit(1)
})
