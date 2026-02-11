import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    // The icon field was changed from type 'upload' (icon_id integer FK -> media)
    // to type 'text' (icon varchar) in the FunctionalityBenefits block config.
    // This affects BOTH pages and solutions collections that use this block.

    await db.execute(sql`
    -- =============================================
    -- PAGES: main table
    -- =============================================
    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    DROP CONSTRAINT IF EXISTS "pages_blocks_functionality_benefits_benefits_icon_id_media_id_fk";

    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon_id";

    DROP INDEX IF EXISTS "pages_blocks_functionality_benefits_benefits_icon_idx";

    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    ADD COLUMN IF NOT EXISTS "icon" varchar;

    -- PAGES: versioned table
    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    DROP CONSTRAINT IF EXISTS "_pages_v_blocks_functionality_benefits_benefits_icon_id_media_id_fk";

    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon_id";

    DROP INDEX IF EXISTS "_pages_v_blocks_functionality_benefits_benefits_icon_idx";

    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    ADD COLUMN IF NOT EXISTS "icon" varchar;

    -- =============================================
    -- SOLUTIONS: main table
    -- =============================================
    ALTER TABLE "solutions_blocks_functionality_benefits_benefits"
    DROP CONSTRAINT IF EXISTS "solutions_blocks_functionality_benefits_benefits_icon_id_media_id_fk";

    ALTER TABLE "solutions_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon_id";

    DROP INDEX IF EXISTS "solutions_blocks_functionality_benefits_benefits_icon_idx";

    ALTER TABLE "solutions_blocks_functionality_benefits_benefits"
    ADD COLUMN IF NOT EXISTS "icon" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
    -- Revert PAGES main table
    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon";

    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    ADD COLUMN "icon_id" integer;

    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    ADD CONSTRAINT "pages_blocks_functionality_benefits_benefits_icon_id_media_id_fk"
    FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "pages_blocks_functionality_benefits_benefits_icon_idx"
    ON "pages_blocks_functionality_benefits_benefits" USING btree ("icon_id");

    -- Revert PAGES versioned table
    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon";

    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    ADD COLUMN "icon_id" integer;

    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    ADD CONSTRAINT "_pages_v_blocks_functionality_benefits_benefits_icon_id_media_id_fk"
    FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "_pages_v_blocks_functionality_benefits_benefits_icon_idx"
    ON "_pages_v_blocks_functionality_benefits_benefits" USING btree ("icon_id");

    -- Revert SOLUTIONS main table
    ALTER TABLE "solutions_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon";

    ALTER TABLE "solutions_blocks_functionality_benefits_benefits"
    ADD COLUMN "icon_id" integer;

    ALTER TABLE "solutions_blocks_functionality_benefits_benefits"
    ADD CONSTRAINT "solutions_blocks_functionality_benefits_benefits_icon_id_media_id_fk"
    FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "solutions_blocks_functionality_benefits_benefits_icon_idx"
    ON "solutions_blocks_functionality_benefits_benefits" USING btree ("icon_id");
  `)
}
