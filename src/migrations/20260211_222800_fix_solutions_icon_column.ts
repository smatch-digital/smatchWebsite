import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    // Fix solutions_blocks_functionality_benefits_benefits table:
    // icon field changed from upload (icon_id integer FK) to text (icon varchar)
    await db.execute(sql`
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
