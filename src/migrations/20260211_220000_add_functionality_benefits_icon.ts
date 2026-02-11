import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    // The icon field was changed from type 'upload' (icon_id integer FK -> media)
    // to type 'text' (icon varchar). We must drop the old FK column and add the new text column.

    await db.execute(sql`
    -- Drop FK constraint on main table
    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    DROP CONSTRAINT IF EXISTS "pages_blocks_functionality_benefits_benefits_icon_id_media_id_fk";

    -- Drop old icon_id column
    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon_id";

    -- Drop old index
    DROP INDEX IF EXISTS "pages_blocks_functionality_benefits_benefits_icon_idx";

    -- Add new icon text column
    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    ADD COLUMN IF NOT EXISTS "icon" varchar;

    -- Drop FK constraint on versioned table
    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    DROP CONSTRAINT IF EXISTS "_pages_v_blocks_functionality_benefits_benefits_icon_id_media_id_fk";

    -- Drop old icon_id column on versioned table
    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon_id";

    -- Drop old index on versioned table
    DROP INDEX IF EXISTS "_pages_v_blocks_functionality_benefits_benefits_icon_idx";

    -- Add new icon text column on versioned table
    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    ADD COLUMN IF NOT EXISTS "icon" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
    -- Revert: remove text icon column
    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon";

    -- Revert: restore icon_id FK column
    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    ADD COLUMN "icon_id" integer;

    ALTER TABLE "pages_blocks_functionality_benefits_benefits"
    ADD CONSTRAINT "pages_blocks_functionality_benefits_benefits_icon_id_media_id_fk"
    FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "pages_blocks_functionality_benefits_benefits_icon_idx"
    ON "pages_blocks_functionality_benefits_benefits" USING btree ("icon_id");

    -- Revert versioned table
    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    DROP COLUMN IF EXISTS "icon";

    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    ADD COLUMN "icon_id" integer;

    ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits"
    ADD CONSTRAINT "_pages_v_blocks_functionality_benefits_benefits_icon_id_media_id_fk"
    FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "_pages_v_blocks_functionality_benefits_benefits_icon_idx"
    ON "_pages_v_blocks_functionality_benefits_benefits" USING btree ("icon_id");
  `)
}
