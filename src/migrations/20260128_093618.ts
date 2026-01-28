import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "announcement_blocks_seafood_event_tags_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "announcement_blocks_seafood_event_locales" (
  	"title" varchar,
  	"description" varchar,
  	"highlight_text" varchar,
  	"details_box" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "announcement_blocks_seafood_event_tags_locales"
    ADD CONSTRAINT "announcement_blocks_seafood_event_tags_locales_parent_id_fk"
    FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_blocks_seafood_event_tags"("id")
    ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "announcement_blocks_seafood_event_locales"
    ADD CONSTRAINT "announcement_blocks_seafood_event_locales_parent_id_fk"
    FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_blocks_seafood_event"("id")
    ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    CREATE UNIQUE INDEX "announcement_blocks_seafood_event_tags_locales_locale_parent"
    ON "announcement_blocks_seafood_event_tags_locales" ("_locale","_parent_id");
  EXCEPTION WHEN duplicate_table THEN null; END $$;

  DO $$ BEGIN
    CREATE UNIQUE INDEX "announcement_blocks_seafood_event_locales_locale_parent_id_u"
    ON "announcement_blocks_seafood_event_locales" ("_locale","_parent_id");
  EXCEPTION WHEN duplicate_table THEN null; END $$;

  DO $$ BEGIN
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_tags_locales_parent_id_idx"
    ON "announcement_blocks_seafood_event_tags_locales" ("_parent_id");
  EXCEPTION WHEN duplicate_table THEN null; END $$;

  DO $$ BEGIN
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_locales_parent_id_idx"
    ON "announcement_blocks_seafood_event_locales" ("_parent_id");
  EXCEPTION WHEN duplicate_table THEN null; END $$;

  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'announcement_blocks_seafood_event'
        AND column_name IN ('title', 'description', 'highlight_text', 'details_box')
    ) THEN
      INSERT INTO "announcement_blocks_seafood_event_locales"
        ("title","description","highlight_text","details_box","_locale","_parent_id")
      SELECT
        s."title",
        s."description",
        s."highlight_text",
        s."details_box",
        l.locale,
        s."id"
      FROM "announcement_blocks_seafood_event" s
      CROSS JOIN (VALUES ('en'::"_locales"), ('fr'::"_locales")) AS l(locale)
      ON CONFLICT ("_locale","_parent_id") DO NOTHING;

      ALTER TABLE "announcement_blocks_seafood_event" DROP COLUMN IF EXISTS "title";
      ALTER TABLE "announcement_blocks_seafood_event" DROP COLUMN IF EXISTS "description";
      ALTER TABLE "announcement_blocks_seafood_event" DROP COLUMN IF EXISTS "highlight_text";
      ALTER TABLE "announcement_blocks_seafood_event" DROP COLUMN IF EXISTS "details_box";
    END IF;
  END $$;

  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'announcement_blocks_seafood_event_tags'
        AND column_name IN ('label', 'value')
    ) THEN
      INSERT INTO "announcement_blocks_seafood_event_tags_locales"
        ("label","value","_locale","_parent_id")
      SELECT
        t."label",
        t."value",
        l.locale,
        t."id"
      FROM "announcement_blocks_seafood_event_tags" t
      CROSS JOIN (VALUES ('en'::"_locales"), ('fr'::"_locales")) AS l(locale)
      ON CONFLICT ("_locale","_parent_id") DO NOTHING;

      ALTER TABLE "announcement_blocks_seafood_event_tags" DROP COLUMN IF EXISTS "label";
      ALTER TABLE "announcement_blocks_seafood_event_tags" DROP COLUMN IF EXISTS "value";
    END IF;
  END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "announcement_blocks_seafood_event_tags_locales" CASCADE;
  DROP TABLE "announcement_blocks_seafood_event_locales" CASCADE;
  ALTER TABLE "announcement_blocks_seafood_event_tags" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "announcement_blocks_seafood_event_tags" ADD COLUMN IF NOT EXISTS "value" varchar;
  ALTER TABLE "announcement_blocks_seafood_event" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "announcement_blocks_seafood_event" ADD COLUMN IF NOT EXISTS "description" varchar;
  ALTER TABLE "announcement_blocks_seafood_event" ADD COLUMN IF NOT EXISTS "highlight_text" varchar;
  ALTER TABLE "announcement_blocks_seafood_event" ADD COLUMN IF NOT EXISTS "details_box" varchar;
  `)
}
