import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_solutions_archive_populate_by') THEN
        CREATE TYPE "enum_pages_blocks_solutions_archive_populate_by" AS ENUM ('collection', 'selection');
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_solutions_archive_columns') THEN
        CREATE TYPE "enum_pages_blocks_solutions_archive_columns" AS ENUM ('2', '3', '4');
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_solutions_archive" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "section_title" varchar,
      "section_description" varchar,
      "populate_by" "enum_pages_blocks_solutions_archive_populate_by" DEFAULT 'collection',
      "limit" numeric DEFAULT 10,
      "columns" "enum_pages_blocks_solutions_archive_columns" DEFAULT '4',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_solutions_archive" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "section_title" varchar,
      "section_description" varchar,
      "populate_by" "enum_pages_blocks_solutions_archive_populate_by" DEFAULT 'collection',
      "limit" numeric DEFAULT 10,
      "columns" "enum_pages_blocks_solutions_archive_columns" DEFAULT '4',
      "block_name" varchar,
      "_uuid" varchar
    );

    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages_rels' AND column_name = 'solutions_id'
      ) THEN
        ALTER TABLE "pages_rels" ADD COLUMN "solutions_id" integer;
        DO $$ BEGIN
          ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "solutions"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v_rels' AND column_name = 'solutions_id'
      ) THEN
        ALTER TABLE "_pages_v_rels" ADD COLUMN "solutions_id" integer;
        DO $$ BEGIN
          ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "solutions"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      END IF;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_solutions_archive" ADD CONSTRAINT "pages_blocks_solutions_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_solutions_archive" ADD CONSTRAINT "_pages_v_blocks_solutions_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_solutions_archive_order_idx" ON "pages_blocks_solutions_archive" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_solutions_archive_parent_id_idx" ON "pages_blocks_solutions_archive" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_solutions_archive_path_idx" ON "pages_blocks_solutions_archive" ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_solutions_archive_locale_idx" ON "pages_blocks_solutions_archive" ("_locale");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solutions_archive_order_idx" ON "_pages_v_blocks_solutions_archive" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solutions_archive_parent_id_idx" ON "_pages_v_blocks_solutions_archive" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solutions_archive_path_idx" ON "_pages_v_blocks_solutions_archive" ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solutions_archive_locale_idx" ON "_pages_v_blocks_solutions_archive" ("_locale");
    
    CREATE INDEX IF NOT EXISTS "pages_rels_solutions_id_idx" ON "pages_rels" ("solutions_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_rels_solutions_id_idx" ON "_pages_v_rels" ("solutions_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_solutions_archive";
    DROP TABLE IF EXISTS "_pages_v_blocks_solutions_archive";
    ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "solutions_id";
    ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "solutions_id";
    DROP TYPE IF EXISTS "enum_pages_blocks_solutions_archive_populate_by";
    DROP TYPE IF EXISTS "enum_pages_blocks_solutions_archive_columns";
  `)
}
