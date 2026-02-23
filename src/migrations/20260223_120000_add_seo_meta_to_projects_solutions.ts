import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration: Add SEO meta fields to projects and solutions
 *
 * The seoPlugin in plugins/index.ts includes 'projects' and 'solutions',
 * which injects meta.title, meta.description (localized) and meta.image
 * fields onto these collections. This migration adds the corresponding DB columns.
 *
 * projects_locales  → meta_title (varchar), meta_description (varchar)
 * solutions_locales → meta_title (varchar), meta_description (varchar)
 * projects          → meta_image_id (integer FK to media)
 * solutions         → meta_image_id (integer FK to media)
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    // --- projects_locales ---
    await db.execute(sql`
        ALTER TABLE "projects_locales"
        ADD COLUMN IF NOT EXISTS "meta_title" varchar,
        ADD COLUMN IF NOT EXISTS "meta_description" varchar;
    `)

    // --- solutions_locales ---
    await db.execute(sql`
        ALTER TABLE "solutions_locales"
        ADD COLUMN IF NOT EXISTS "meta_title" varchar,
        ADD COLUMN IF NOT EXISTS "meta_description" varchar;
    `)

    // --- meta_image FK on projects ---
    await db.execute(sql`
        ALTER TABLE "projects"
        ADD COLUMN IF NOT EXISTS "meta_image_id" integer
            REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    `)

    // --- meta_image FK on solutions ---
    await db.execute(sql`
        ALTER TABLE "solutions"
        ADD COLUMN IF NOT EXISTS "meta_image_id" integer
            REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "projects_locales"
        DROP COLUMN IF EXISTS "meta_title",
        DROP COLUMN IF EXISTS "meta_description";
    `)

    await db.execute(sql`
        ALTER TABLE "solutions_locales"
        DROP COLUMN IF EXISTS "meta_title",
        DROP COLUMN IF EXISTS "meta_description";
    `)

    await db.execute(sql`
        ALTER TABLE "projects"
        DROP COLUMN IF EXISTS "meta_image_id";
    `)

    await db.execute(sql`
        ALTER TABLE "solutions"
        DROP COLUMN IF EXISTS "meta_image_id";
    `)
}
