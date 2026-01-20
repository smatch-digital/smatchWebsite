import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * PRODUCTION-GRADE HERO LOCALIZATION MIGRATION
 * 
 * This migration adds localized support for hero fields by:
 * 1. Adding new localized columns to pages_locales (IF NOT EXISTS)
 * 2. Copying existing data from pages table to pages_locales for default locale (fr)
 * 3. NOT dropping original columns (safe fallback)
 * 
 * The migration is idempotent - safe to run multiple times.
 */

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // ============================================================
  // STEP 1: Add localized hero columns to pages_locales table
  // ============================================================

  // Add hero_headline if not exists
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages_locales' AND column_name = 'hero_headline'
      ) THEN
        ALTER TABLE "pages_locales" ADD COLUMN "hero_headline" varchar;
      END IF;
    END $$;
  `)

  // Add hero_subheadline if not exists
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages_locales' AND column_name = 'hero_subheadline'
      ) THEN
        ALTER TABLE "pages_locales" ADD COLUMN "hero_subheadline" varchar;
      END IF;
    END $$;
  `)

  // Add hero_rich_text if not exists
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages_locales' AND column_name = 'hero_rich_text'
      ) THEN
        ALTER TABLE "pages_locales" ADD COLUMN "hero_rich_text" jsonb;
      END IF;
    END $$;
  `)

  // Add hero_primary_cta_label if not exists
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages_locales' AND column_name = 'hero_primary_cta_label'
      ) THEN
        ALTER TABLE "pages_locales" ADD COLUMN "hero_primary_cta_label" varchar;
      END IF;
    END $$;
  `)

  // Add hero_primary_cta_url if not exists
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages_locales' AND column_name = 'hero_primary_cta_url'
      ) THEN
        ALTER TABLE "pages_locales" ADD COLUMN "hero_primary_cta_url" varchar;
      END IF;
    END $$;
  `)

  // Add hero_secondary_cta_label if not exists
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages_locales' AND column_name = 'hero_secondary_cta_label'
      ) THEN
        ALTER TABLE "pages_locales" ADD COLUMN "hero_secondary_cta_label" varchar;
      END IF;
    END $$;
  `)

  // Add hero_secondary_cta_url if not exists
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages_locales' AND column_name = 'hero_secondary_cta_url'
      ) THEN
        ALTER TABLE "pages_locales" ADD COLUMN "hero_secondary_cta_url" varchar;
      END IF;
    END $$;
  `)

  // ============================================================
  // STEP 2: Same for _pages_v_locales (versioned pages)
  // ============================================================

  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v_locales' AND column_name = 'version_hero_headline'
      ) THEN
        ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_headline" varchar;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v_locales' AND column_name = 'version_hero_subheadline'
      ) THEN
        ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_subheadline" varchar;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v_locales' AND column_name = 'version_hero_rich_text'
      ) THEN
        ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_rich_text" jsonb;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v_locales' AND column_name = 'version_hero_primary_cta_label'
      ) THEN
        ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_primary_cta_label" varchar;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v_locales' AND column_name = 'version_hero_primary_cta_url'
      ) THEN
        ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_primary_cta_url" varchar;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v_locales' AND column_name = 'version_hero_secondary_cta_label'
      ) THEN
        ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_secondary_cta_label" varchar;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v_locales' AND column_name = 'version_hero_secondary_cta_url'
      ) THEN
        ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_secondary_cta_url" varchar;
      END IF;
    END $$;
  `)

  // ============================================================
  // STEP 3: Migrate existing data from pages to pages_locales
  // Copy to French (fr) as primary locale since that's the existing content
  // ============================================================

  await db.execute(sql`
    UPDATE "pages_locales" pl
    SET 
      "hero_headline" = COALESCE(pl."hero_headline", p."hero_headline"),
      "hero_subheadline" = COALESCE(pl."hero_subheadline", p."hero_subheadline"),
      "hero_rich_text" = COALESCE(pl."hero_rich_text", p."hero_rich_text"),
      "hero_primary_cta_label" = COALESCE(pl."hero_primary_cta_label", p."hero_primary_cta_label"),
      "hero_primary_cta_url" = COALESCE(pl."hero_primary_cta_url", p."hero_primary_cta_url"),
      "hero_secondary_cta_label" = COALESCE(pl."hero_secondary_cta_label", p."hero_secondary_cta_label"),
      "hero_secondary_cta_url" = COALESCE(pl."hero_secondary_cta_url", p."hero_secondary_cta_url")
    FROM "pages" p
    WHERE pl."_parent_id" = p."id"
      AND pl."_locale" = 'fr';
  `)

  // Also copy to English locale so both have initial content
  await db.execute(sql`
    UPDATE "pages_locales" pl
    SET 
      "hero_headline" = COALESCE(pl."hero_headline", p."hero_headline"),
      "hero_subheadline" = COALESCE(pl."hero_subheadline", p."hero_subheadline"),
      "hero_rich_text" = COALESCE(pl."hero_rich_text", p."hero_rich_text"),
      "hero_primary_cta_label" = COALESCE(pl."hero_primary_cta_label", p."hero_primary_cta_label"),
      "hero_primary_cta_url" = COALESCE(pl."hero_primary_cta_url", p."hero_primary_cta_url"),
      "hero_secondary_cta_label" = COALESCE(pl."hero_secondary_cta_label", p."hero_secondary_cta_label"),
      "hero_secondary_cta_url" = COALESCE(pl."hero_secondary_cta_url", p."hero_secondary_cta_url")
    FROM "pages" p
    WHERE pl."_parent_id" = p."id"
      AND pl."_locale" = 'en';
  `)

  console.log('[Migration] Hero localization columns added and data migrated successfully')
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Down migration: Remove the localized columns
  // We use IF EXISTS to make this safe to run

  await db.execute(sql`
    ALTER TABLE "pages_locales" 
    DROP COLUMN IF EXISTS "hero_headline",
    DROP COLUMN IF EXISTS "hero_subheadline",
    DROP COLUMN IF EXISTS "hero_rich_text",
    DROP COLUMN IF EXISTS "hero_primary_cta_label",
    DROP COLUMN IF EXISTS "hero_primary_cta_url",
    DROP COLUMN IF EXISTS "hero_secondary_cta_label",
    DROP COLUMN IF EXISTS "hero_secondary_cta_url";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_locales" 
    DROP COLUMN IF EXISTS "version_hero_headline",
    DROP COLUMN IF EXISTS "version_hero_subheadline",
    DROP COLUMN IF EXISTS "version_hero_rich_text",
    DROP COLUMN IF EXISTS "version_hero_primary_cta_label",
    DROP COLUMN IF EXISTS "version_hero_primary_cta_url",
    DROP COLUMN IF EXISTS "version_hero_secondary_cta_label",
    DROP COLUMN IF EXISTS "version_hero_secondary_cta_url";
  `)

  console.log('[Migration] Hero localization columns removed')
}
