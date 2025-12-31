import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$
   BEGIN
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_journal_populate_by') THEN
       CREATE TYPE "public"."enum_pages_blocks_journal_populate_by" AS ENUM('latest', 'selection');
     END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_journal_filter_by_type') THEN
       CREATE TYPE "public"."enum_pages_blocks_journal_filter_by_type" AS ENUM('all', 'project', 'event');
     END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_journal_populate_by') THEN
       CREATE TYPE "public"."enum__pages_v_blocks_journal_populate_by" AS ENUM('latest', 'selection');
     END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_journal_filter_by_type') THEN
       CREATE TYPE "public"."enum__pages_v_blocks_journal_filter_by_type" AS ENUM('all', 'project', 'event');
     END IF;
   END$$;

   CREATE TABLE IF NOT EXISTS "pages_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'JOURNAL DES OPÉRATIONS',
  	"live_feed_text" varchar DEFAULT 'LIVE FEED',
  	"limit" numeric DEFAULT 5,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'JOURNAL DES OPÉRATIONS',
  	"live_feed_text" varchar DEFAULT 'LIVE FEED',
  	"limit" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_journal_manual_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"meta" varchar,
  	"link_text" varchar,
  	"link_url" varchar,
  	"image_id" integer
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_journal_manual_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"meta" varchar,
  	"link_text" varchar,
  	"link_url" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );

   CREATE TABLE IF NOT EXISTS "pages_blocks_contact_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );

  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "link_appearance" SET DEFAULT 'gold';
  ALTER TABLE "pages" ALTER COLUMN "hero_primary_cta_appearance" SET DEFAULT 'gold';
  ALTER TABLE "pages" ALTER COLUMN "hero_secondary_cta_appearance" SET DEFAULT 'gold';
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "link_appearance" SET DEFAULT 'gold';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_primary_cta_appearance" SET DEFAULT 'gold';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_secondary_cta_appearance" SET DEFAULT 'gold';

  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_journal' AND column_name='populate_by') THEN
      ALTER TABLE "pages_blocks_journal" ADD COLUMN "populate_by" "enum_pages_blocks_journal_populate_by" DEFAULT 'latest';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_journal' AND column_name='filter_by_type') THEN
      ALTER TABLE "pages_blocks_journal" ADD COLUMN "filter_by_type" "enum_pages_blocks_journal_filter_by_type" DEFAULT 'all';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_journal' AND column_name='populate_by') THEN
      ALTER TABLE "_pages_v_blocks_journal" ADD COLUMN "populate_by" "enum__pages_v_blocks_journal_populate_by" DEFAULT 'latest';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_journal' AND column_name='filter_by_type') THEN
      ALTER TABLE "_pages_v_blocks_journal" ADD COLUMN "filter_by_type" "enum__pages_v_blocks_journal_filter_by_type" DEFAULT 'all';
    END IF;
  END$$;

  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='pages_blocks_contact_addresses_parent_id_fk') THEN
      ALTER TABLE "pages_blocks_contact_addresses" ADD CONSTRAINT "pages_blocks_contact_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='_pages_v_blocks_contact_addresses_parent_id_fk') THEN
      ALTER TABLE "_pages_v_blocks_contact_addresses" ADD CONSTRAINT "_pages_v_blocks_contact_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END$$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_addresses_order_idx" ON "pages_blocks_contact_addresses" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_addresses_parent_id_idx" ON "pages_blocks_contact_addresses" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_addresses_order_idx" ON "_pages_v_blocks_contact_addresses" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_addresses_parent_id_idx" ON "_pages_v_blocks_contact_addresses" USING btree ("_parent_id");

  DO $$
  BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_contact' AND column_name='address') THEN
      ALTER TABLE "pages_blocks_contact" DROP COLUMN "address";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_contact' AND column_name='address') THEN
      ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "address";
    END IF;
  END$$;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_addresses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_addresses" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_contact_addresses" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_addresses" CASCADE;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "pages" ALTER COLUMN "hero_primary_cta_appearance" SET DEFAULT 'default';
  ALTER TABLE "pages" ALTER COLUMN "hero_secondary_cta_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_primary_cta_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_secondary_cta_appearance" SET DEFAULT 'default';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "address" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "address" varchar;
  ALTER TABLE "pages_blocks_journal" DROP COLUMN "populate_by";
  ALTER TABLE "pages_blocks_journal" DROP COLUMN "filter_by_type";
  ALTER TABLE "_pages_v_blocks_journal" DROP COLUMN "populate_by";
  ALTER TABLE "_pages_v_blocks_journal" DROP COLUMN "filter_by_type";
  DROP TYPE "public"."enum_pages_blocks_journal_populate_by";
  DROP TYPE "public"."enum_pages_blocks_journal_filter_by_type";
  DROP TYPE "public"."enum__pages_v_blocks_journal_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_journal_filter_by_type";`)
}
