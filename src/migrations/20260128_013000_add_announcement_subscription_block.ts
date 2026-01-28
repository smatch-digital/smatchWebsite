import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_announcement_subscription" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "headline" varchar,
      "description" varchar,
      "form_id" integer,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_announcement_subscription" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "headline" varchar,
      "description" varchar,
      "form_id" integer,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_announcement_subscription"
      ADD CONSTRAINT "pages_blocks_announcement_subscription_form_id_forms_id_fk"
      FOREIGN KEY ("form_id") REFERENCES "forms"("id")
      ON DELETE set null
      ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_announcement_subscription"
      ADD CONSTRAINT "_pages_v_blocks_announcement_subscription_form_id_forms_id_fk"
      FOREIGN KEY ("form_id") REFERENCES "forms"("id")
      ON DELETE set null
      ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_announcement_subscription"
      ADD CONSTRAINT "pages_blocks_announcement_subscription_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id")
      ON DELETE cascade
      ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_announcement_subscription"
      ADD CONSTRAINT "_pages_v_blocks_announcement_subscription_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id")
      ON DELETE cascade
      ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_blocks_announcement_subscription_order_idx" ON "pages_blocks_announcement_subscription" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_announcement_subscription_parent_id_idx" ON "pages_blocks_announcement_subscription" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_announcement_subscription_path_idx" ON "pages_blocks_announcement_subscription" ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_announcement_subscription_locale_idx" ON "pages_blocks_announcement_subscription" ("_locale");
    CREATE INDEX IF NOT EXISTS "pages_blocks_announcement_subscription_form_idx" ON "pages_blocks_announcement_subscription" ("form_id");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_announcement_subscription_order_idx" ON "_pages_v_blocks_announcement_subscription" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_announcement_subscription_parent_id_idx" ON "_pages_v_blocks_announcement_subscription" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_announcement_subscription_path_idx" ON "_pages_v_blocks_announcement_subscription" ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_announcement_subscription_locale_idx" ON "_pages_v_blocks_announcement_subscription" ("_locale");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_announcement_subscription_form_idx" ON "_pages_v_blocks_announcement_subscription" ("form_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_announcement_subscription";
    DROP TABLE IF EXISTS "_pages_v_blocks_announcement_subscription";
  `)
}

