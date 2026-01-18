/**
 * Extract Data Script
 * 
 * ⚠️ SAFETY GUARANTEE: This script is 100% READ-ONLY.
 * It ONLY uses:
 *   - payload.find() - READ operation
 *   - payload.findGlobal() - READ operation
 *   - fs.writeFileSync() - Writes to LOCAL file only
 * 
 * NO create, update, or delete operations are performed.
 * Your database will NOT be modified in any way.
 */

import 'dotenv/config' // Load .env before anything else

import { getPayload } from '@/getPayload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_FILE = path.resolve(__dirname, '../../seed-data.json')

async function extractData() {
    console.log('🔍 Starting READ-ONLY Extract...')
    console.log('⚠️  This script does NOT modify the database.\n')

    const payload = await getPayload()

    const data: Record<string, any> = {}

    // Collections to extract (READ-ONLY)
    const collections = [
        'pages',
        'posts',
        'media',
        'categories',
        'users',
        'solutions',
        'projects',
        'team'
    ]

    // Globals to extract (READ-ONLY)
    const globals = ['header', 'footer']

    console.log('📦 Extracting Collections...')
    for (const slug of collections) {
        try {
            console.log(`  - ${slug}`)
            const result = await payload.find({
                collection: slug as any,
                limit: 1000, // Safe limit
                pagination: false,
                locale: 'all',
                depth: 0,
            })
            data[slug] = result.docs
            console.log(`    ✓ ${result.docs.length} documents`)
        } catch (error: any) {
            console.log(`    ✗ Error: ${error.message}`)
            data[slug] = []
        }
    }

    console.log('\n🌐 Extracting Globals...')
    for (const slug of globals) {
        try {
            console.log(`  - ${slug}`)
            const result = await payload.findGlobal({
                slug: slug as any,
                locale: 'all',
                depth: 0,
            })
            data[slug] = result
            console.log(`    ✓ Retrieved`)
        } catch (error: any) {
            console.log(`    ✗ Error: ${error.message}`)
            data[slug] = null
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2))
    console.log(`\n✅ Data extracted to: ${OUTPUT_FILE}`)
    console.log('📊 Database was NOT modified.\n')

    // Force exit to close Drizzle/Postgres connection pool
    process.exit(0)
}

extractData().catch((error) => {
    console.error('❌ Extraction failed:', error.message)
    process.exit(1)
})
