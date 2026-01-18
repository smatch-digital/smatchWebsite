/**
 * Import Data Script
 * 
 * ⚠️ PURPOSE: Restore production data after i18n migration
 * 
 * This script:
 * 1. Reads production-backup-*.json
 * 2. Creates documents with French (fr) as the default locale
 * 3. Optionally duplicates content to English (en) as placeholder
 * 4. Handles relationships (media IDs stay the same)
 * 
 * RUN THIS ONLY IF:
 * - Payload migration created empty _locales tables
 * - You need to restore data after schema change
 */

import 'dotenv/config'

import { getPayload } from '@/getPayload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const BACKUP_FILE = path.resolve(__dirname, '../../production-backup-2026-01-17.json')
const DEFAULT_LOCALE = 'fr'
const DUPLICATE_TO_ENGLISH = false // Set true to create English placeholders

interface BackupData {
    pages: any[]
    solutions: any[]
    projects: any[]
    posts: any[]
    media?: any[]
    header: { navItems: any[] }
    footer: { navItems: any[] }
}

async function importData() {
    console.log('🔄 Starting Import...')
    console.log(`📁 Reading from: ${BACKUP_FILE}`)

    if (!fs.existsSync(BACKUP_FILE)) {
        console.error('❌ Backup file not found!')
        process.exit(1)
    }

    const backup: BackupData = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf-8'))
    const payload = await getPayload()

    // 1. Import Media (Critical for relationships)
    console.log('\n📸 Importing Media...')
    if (backup.media) {
        for (const item of backup.media) {
            try {
                // Check if media exists by filename
                const existing = await payload.find({
                    collection: 'media',
                    where: { filename: { equals: item.filename } },
                    limit: 1,
                })

                // Construct media data - keep strictly necessary fields
                // Note: We cannot re-upload the file binary here. 
                // We assume the file exists in storage/S3 under the same filename.
                const mediaData = {
                    id: item.id, // Try to preserve ID
                    alt: item.alt,
                    caption: item.caption,
                    filename: item.filename,
                    mimeType: item.mimeType || item.mime_type,
                    filesize: item.filesize,
                    width: item.width,
                    height: item.height,
                    updatedAt: new Date().toISOString(),
                    createdAt: item.createdAt || new Date().toISOString(),
                }

                if (existing.docs.length > 0) {
                    // Update metadata only
                    await payload.update({
                        collection: 'media',
                        id: existing.docs[0].id,
                        data: mediaData,
                    })
                    console.log(`  ✓ Updated: ${item.filename}`)
                } else {
                    // Create record (pointing to existing file)
                    // Note: Payload 'create' for upload collections usually requires 'file'. 
                    // We might need to bypass validation or use a lower-level Local API quirk if possible.
                    // For now, we attempt standard create with data-only (might fail if 'file' is required).
                    // If it fails, we log it. Secure approach for migration.
                    try {
                        await payload.create({
                            collection: 'media',
                            data: mediaData,
                            // @ts-ignore
                            filePath: undefined, // No file upload
                        })
                        console.log(`  ✓ Created record: ${item.filename}`)
                    } catch (err: any) {
                        if (err.message?.includes('File')) {
                            console.log(`  ⚠️  Skipping Media Create for ${item.filename} (Binary missing in backup).`)
                            console.log(`      If you need to migrate media files, copy the /media folder or S3 bucket manually.`)
                        } else {
                            throw err;
                        }
                    }
                }
            } catch (error: any) {
                console.log(`  ✗ Error (${item.filename}): ${error.message}`)
            }
        }
    } else {
        console.log('  ⚠️  No media found in backup.')
    }

    console.log('\n📦 Importing Pages...')
    for (const page of backup.pages) {
        try {
            // Check if page exists
            const existing = await payload.find({
                collection: 'pages',
                where: { slug: { equals: page.slug } },
                limit: 1,
            })

            const pageData = {
                title: page.title,
                slug: page.slug,
                hero: {
                    type: page.hero_type,
                    headline: page.hero_headline,
                    subheadline: page.hero_subheadline,
                    enableCta: page.hero_enable_cta,
                    primaryCta: {
                        label: page.hero_primary_cta_label,
                        appearance: page.hero_primary_cta_appearance,
                    },
                    secondaryCta: {
                        type: page.hero_secondary_cta_type,
                        url: page.hero_secondary_cta_url,
                        label: page.hero_secondary_cta_label,
                        appearance: page.hero_secondary_cta_appearance,
                    },
                    media: page.hero_media_id, // Links to media ID imported above
                },
                meta: {
                    title: page.meta_title,
                    description: page.meta_description,
                },
                _status: page._status || 'published',
            }

            if (existing.docs.length > 0) {
                await payload.update({
                    collection: 'pages',
                    id: existing.docs[0].id,
                    data: pageData,
                    locale: DEFAULT_LOCALE,
                    draft: true,
                })
                console.log(`  ✓ Updated: ${page.title}`)
            } else {
                await payload.create({
                    collection: 'pages',
                    data: pageData,
                    locale: DEFAULT_LOCALE,
                    draft: true,
                })
                console.log(`  ✓ Created: ${page.title}`)
            }
        } catch (error: any) {
            console.log(`  ✗ Error (${page.title}): ${error.message}`)
        }
    }

    console.log('\n📦 Importing Solutions...')
    for (const solution of backup.solutions) {
        try {
            const existing = await payload.find({
                collection: 'solutions',
                where: { slug: { equals: solution.slug } },
                limit: 1,
            })

            const solutionData = {
                title: solution.title,
                slug: solution.slug,
                description: solution.description,
                icon: solution.icon,
                heroSubtitle: solution.hero_subtitle,
                heroImage: solution.hero_image_id,
                problemTitle: solution.problem_title,
                problemDescription: solution.problem_description,
                dashboardImage: solution.dashboard_image_id,
            }

            if (existing.docs.length > 0) {
                await payload.update({
                    collection: 'solutions',
                    id: existing.docs[0].id,
                    data: solutionData,
                    locale: DEFAULT_LOCALE,
                })
                console.log(`  ✓ Updated: ${solution.title}`)
            } else {
                await payload.create({
                    collection: 'solutions',
                    data: solutionData,
                    locale: DEFAULT_LOCALE,
                })
                console.log(`  ✓ Created: ${solution.title}`)
            }
        } catch (error: any) {
            console.log(`  ✗ Error (${solution.title}): ${error.message}`)
        }
    }

    console.log('\n📦 Importing Projects...')
    for (const project of backup.projects) {
        try {
            const existing = await payload.find({
                collection: 'projects',
                where: { slug: { equals: project.slug } },
                limit: 1,
            })

            const projectData = {
                title: project.title,
                slug: project.slug,
                type: project.type,
                status: project.status,
                date: project.date,
                description: project.description,
                image: project.image_id,
                location: project.location,
                code: project.code,
                linkLabel: project.link_label,
            }

            if (existing.docs.length > 0) {
                await payload.update({
                    collection: 'projects',
                    id: existing.docs[0].id,
                    data: projectData,
                    locale: DEFAULT_LOCALE,
                })
                console.log(`  ✓ Updated: ${project.title}`)
            } else {
                await payload.create({
                    collection: 'projects',
                    data: projectData,
                    locale: DEFAULT_LOCALE,
                })
                console.log(`  ✓ Created: ${project.title}`)
            }
        } catch (error: any) {
            console.log(`  ✗ Error (${project.title}): ${error.message}`)
        }
    }

    console.log('\n📝 Importing Posts...')
    if (backup.posts) {
        for (const post of backup.posts) {
            try {
                // Handle draft posts that might have null slugs
                if (!post.slug && post._status === 'draft') {
                    console.log(`  ⚠ Skipping Draft Post without slug (ID: ${post.id})`)
                    continue;
                }

                const existing = await payload.find({
                    collection: 'posts',
                    where: { slug: { equals: post.slug } },
                    limit: 1,
                })

                const postData = {
                    title: post.title,
                    slug: post.slug,
                    heroImage: post.hero_image_id,
                    content: post.content,
                    meta: {
                        title: post.meta_title,
                        description: post.meta_description,
                    },
                    _status: post._status || 'draft',
                }

                if (existing.docs.length > 0) {
                    await payload.update({
                        collection: 'posts',
                        id: existing.docs[0].id,
                        data: postData,
                        locale: DEFAULT_LOCALE,
                        draft: true,
                    })
                    console.log(`  ✓ Updated: ${post.title}`)
                } else {
                    await payload.create({
                        collection: 'posts',
                        data: postData,
                        locale: DEFAULT_LOCALE,
                        draft: true,
                    })
                    console.log(`  ✓ Created: ${post.title}`)
                }
            } catch (error: any) {
                console.log(`  ✗ Error Post (${post.slug}): ${error.message}`)
            }
        }
    }

    console.log('\n🌐 Importing Header...')
    try {
        await payload.updateGlobal({
            slug: 'header',
            data: {
                navItems: backup.header.navItems.map((item: any) => ({
                    link: {
                        type: 'custom' as const,
                        url: item.link_url,
                        label: item.link_label,
                    }
                }))
            },
            locale: DEFAULT_LOCALE,
        })
        console.log(`  ✓ Header updated with ${backup.header.navItems.length} nav items`)

        // Also Update Footer if exists
        if (backup.footer && backup.footer.navItems) {
            await payload.updateGlobal({
                slug: 'footer',
                data: {
                    navItems: backup.footer.navItems.map((item: any) => ({
                        link: {
                            type: 'custom' as const,
                            url: item.link_url,
                            label: item.link_label,
                        }
                    }))
                },
                locale: DEFAULT_LOCALE,
            })
            console.log(`  ✓ Footer updated with ${backup.footer.navItems.length} nav items`)
        }

    } catch (error: any) {
        console.log(`  ✗ Global error: ${error.message}`)
    }

    console.log('\n✅ Import Complete!')
    // Prepare summary counts safe access
    const counts = {
        pages: backup.pages?.length || 0,
        solutions: backup.solutions?.length || 0,
        projects: backup.projects?.length || 0,
        posts: backup.posts?.length || 0,
        media: backup.media?.length || 0
    }

    console.log(`📊 Summary:`)
    console.log(`   - Media: ${counts.media}`)
    console.log(`   - Pages: ${counts.pages}`)
    console.log(`   - Solutions: ${counts.solutions}`)
    console.log(`   - Projects: ${counts.projects}`)
    console.log(`   - Posts: ${counts.posts}`)
    console.log(`   - Default locale: ${DEFAULT_LOCALE}`)

    process.exit(0)
}

importData().catch((error) => {
    console.error('❌ Import failed:', error.message)
    process.exit(1)
})
