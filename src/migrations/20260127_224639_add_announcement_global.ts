import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // 1. Create Enums for Announcement
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_announcement_blocks_seafood_event_buttons_link_type') THEN
        CREATE TYPE "public"."enum_announcement_blocks_seafood_event_buttons_link_type" AS ENUM('reference', 'custom');
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_announcement_blocks_seafood_event_buttons_style') THEN
        CREATE TYPE "public"."enum_announcement_blocks_seafood_event_buttons_style" AS ENUM('solid', 'outline');
      END IF;
    END $$;
  `)

  // 2. Create Announcement Tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "announcement_blocks_seafood_event_tags" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar
    );
  
    CREATE TABLE IF NOT EXISTS "announcement_blocks_seafood_event_buttons" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_announcement_blocks_seafood_event_buttons_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "style" "enum_announcement_blocks_seafood_event_buttons_style" DEFAULT 'solid'
    );
  
    CREATE TABLE IF NOT EXISTS "announcement_blocks_seafood_event_buttons_locales" (
      "link_url" varchar,
      "link_label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
  
    CREATE TABLE IF NOT EXISTS "announcement_blocks_seafood_event" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "title" varchar,
      "description" varchar,
      "highlight_text" varchar,
      "details_box" varchar,
      "block_name" varchar
    );
  
    CREATE TABLE IF NOT EXISTS "announcement" (
      "id" serial PRIMARY KEY NOT NULL,
      "is_active" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  
    CREATE TABLE IF NOT EXISTS "announcement_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer,
      "posts_id" integer
    );
  `)

  // 3. Add Constraints
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "announcement_blocks_seafood_event_tags" ADD CONSTRAINT "announcement_blocks_seafood_event_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_blocks_seafood_event"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "announcement_blocks_seafood_event_buttons" ADD CONSTRAINT "announcement_blocks_seafood_event_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_blocks_seafood_event"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "announcement_blocks_seafood_event_buttons_locales" ADD CONSTRAINT "announcement_blocks_seafood_event_buttons_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_blocks_seafood_event_buttons"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "announcement_blocks_seafood_event" ADD CONSTRAINT "announcement_blocks_seafood_event_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "announcement_blocks_seafood_event" ADD CONSTRAINT "announcement_blocks_seafood_event_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "announcement_rels" ADD CONSTRAINT "announcement_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."announcement"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "announcement_rels" ADD CONSTRAINT "announcement_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "announcement_rels" ADD CONSTRAINT "announcement_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // 4. Create Indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_tags_order_idx" ON "announcement_blocks_seafood_event_tags" ("_order");
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_tags_parent_id_idx" ON "announcement_blocks_seafood_event_tags" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_buttons_order_idx" ON "announcement_blocks_seafood_event_buttons" ("_order");
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_buttons_parent_id_idx" ON "announcement_blocks_seafood_event_buttons" ("_parent_id");
    
    DO $$ BEGIN
      CREATE UNIQUE INDEX "announcement_blocks_seafood_event_buttons_locales_locale_par" ON "announcement_blocks_seafood_event_buttons_locales" ("_locale","_parent_id");
    EXCEPTION WHEN duplicate_table THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_order_idx" ON "announcement_blocks_seafood_event" ("_order");
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_parent_id_idx" ON "announcement_blocks_seafood_event" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_path_idx" ON "announcement_blocks_seafood_event" ("_path");
    CREATE INDEX IF NOT EXISTS "announcement_blocks_seafood_event_image_idx" ON "announcement_blocks_seafood_event" ("image_id");
    CREATE INDEX IF NOT EXISTS "announcement_rels_order_idx" ON "announcement_rels" ("order");
    CREATE INDEX IF NOT EXISTS "announcement_rels_parent_idx" ON "announcement_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "announcement_rels_path_idx" ON "announcement_rels" ("path");
    CREATE INDEX IF NOT EXISTS "announcement_rels_pages_id_idx" ON "announcement_rels" ("pages_id");
    CREATE INDEX IF NOT EXISTS "announcement_rels_posts_id_idx" ON "announcement_rels" ("posts_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "announcement_blocks_seafood_event_tags" CASCADE;
    DROP TABLE IF EXISTS "announcement_blocks_seafood_event_buttons" CASCADE;
    DROP TABLE IF EXISTS "announcement_blocks_seafood_event_buttons_locales" CASCADE;
    DROP TABLE IF EXISTS "announcement_blocks_seafood_event" CASCADE;
    DROP TABLE IF EXISTS "announcement" CASCADE;
    DROP TABLE IF EXISTS "announcement_rels" CASCADE;
    
    DROP TYPE IF EXISTS "public"."enum_announcement_blocks_seafood_event_buttons_link_type";
    DROP TYPE IF EXISTS "public"."enum_announcement_blocks_seafood_event_buttons_style";
  `)
}
