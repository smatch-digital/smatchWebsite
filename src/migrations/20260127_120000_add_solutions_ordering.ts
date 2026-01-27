import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'solutions' AND column_name = 'order'
      ) THEN
        ALTER TABLE "solutions" ADD COLUMN "order" numeric;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "solutions_order_idx" ON "solutions" ("order");
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "solutions_order" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "solutions_order_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "locale" "_locales",
      "solutions_id" integer
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "solutions_order_rels" ADD CONSTRAINT "solutions_order_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "solutions_order"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "solutions_order_rels" ADD CONSTRAINT "solutions_order_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "solutions"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "solutions_order_rels_order_idx" ON "solutions_order_rels" ("order");
    CREATE INDEX IF NOT EXISTS "solutions_order_rels_parent_idx" ON "solutions_order_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "solutions_order_rels_path_idx" ON "solutions_order_rels" ("path");
    CREATE INDEX IF NOT EXISTS "solutions_order_rels_solutions_id_idx" ON "solutions_order_rels" ("solutions_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "solutions_order_rels" CASCADE;
    DROP TABLE IF EXISTS "solutions_order" CASCADE;
  `)

  await db.execute(sql`
    DROP INDEX IF EXISTS "solutions_order_idx";
  `)

  await db.execute(sql`
    ALTER TABLE "solutions" DROP COLUMN IF EXISTS "order";
  `)
}

