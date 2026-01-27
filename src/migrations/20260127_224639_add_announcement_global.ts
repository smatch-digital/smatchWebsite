import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_solutions_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_solutions_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_solutions_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_solutions_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_announcement_blocks_seafood_event_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_announcement_blocks_seafood_event_buttons_style" AS ENUM('solid', 'outline');
  CREATE TABLE "pages_blocks_solutions_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Nos Solutions',
  	"section_description" varchar DEFAULT 'Trois piliers technologiques pour transformer vos opérations industrielles.',
  	"populate_by" "enum_pages_blocks_solutions_archive_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 10,
  	"columns" "enum_pages_blocks_solutions_archive_columns" DEFAULT '4',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_solutions_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Nos Solutions',
  	"section_description" varchar DEFAULT 'Trois piliers technologiques pour transformer vos opérations industrielles.',
  	"populate_by" "enum__pages_v_blocks_solutions_archive_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 10,
  	"columns" "enum__pages_v_blocks_solutions_archive_columns" DEFAULT '4',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_order" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "solutions_order_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"solutions_id" integer
  );
  
  CREATE TABLE "announcement_blocks_seafood_event_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "announcement_blocks_seafood_event_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_announcement_blocks_seafood_event_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"style" "enum_announcement_blocks_seafood_event_buttons_style" DEFAULT 'solid'
  );
  
  CREATE TABLE "announcement_blocks_seafood_event_buttons_locales" (
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "announcement_blocks_seafood_event" (
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
  
  CREATE TABLE "announcement" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcement_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "solutions_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "solutions_id" integer;
  ALTER TABLE "solutions" ADD COLUMN "order" numeric;
  ALTER TABLE "pages_blocks_solutions_archive" ADD CONSTRAINT "pages_blocks_solutions_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_solutions_archive" ADD CONSTRAINT "_pages_v_blocks_solutions_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_order_rels" ADD CONSTRAINT "solutions_order_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_order_rels" ADD CONSTRAINT "solutions_order_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_blocks_seafood_event_tags" ADD CONSTRAINT "announcement_blocks_seafood_event_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_blocks_seafood_event"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_blocks_seafood_event_buttons" ADD CONSTRAINT "announcement_blocks_seafood_event_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_blocks_seafood_event"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_blocks_seafood_event_buttons_locales" ADD CONSTRAINT "announcement_blocks_seafood_event_buttons_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_blocks_seafood_event_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_blocks_seafood_event" ADD CONSTRAINT "announcement_blocks_seafood_event_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcement_blocks_seafood_event" ADD CONSTRAINT "announcement_blocks_seafood_event_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_rels" ADD CONSTRAINT "announcement_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."announcement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_rels" ADD CONSTRAINT "announcement_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_rels" ADD CONSTRAINT "announcement_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_solutions_archive_order_idx" ON "pages_blocks_solutions_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_solutions_archive_parent_id_idx" ON "pages_blocks_solutions_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_solutions_archive_path_idx" ON "pages_blocks_solutions_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_solutions_archive_locale_idx" ON "pages_blocks_solutions_archive" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_solutions_archive_order_idx" ON "_pages_v_blocks_solutions_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_solutions_archive_parent_id_idx" ON "_pages_v_blocks_solutions_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_solutions_archive_path_idx" ON "_pages_v_blocks_solutions_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_solutions_archive_locale_idx" ON "_pages_v_blocks_solutions_archive" USING btree ("_locale");
  CREATE INDEX "solutions_order_rels_order_idx" ON "solutions_order_rels" USING btree ("order");
  CREATE INDEX "solutions_order_rels_parent_idx" ON "solutions_order_rels" USING btree ("parent_id");
  CREATE INDEX "solutions_order_rels_path_idx" ON "solutions_order_rels" USING btree ("path");
  CREATE INDEX "solutions_order_rels_solutions_id_idx" ON "solutions_order_rels" USING btree ("solutions_id");
  CREATE INDEX "announcement_blocks_seafood_event_tags_order_idx" ON "announcement_blocks_seafood_event_tags" USING btree ("_order");
  CREATE INDEX "announcement_blocks_seafood_event_tags_parent_id_idx" ON "announcement_blocks_seafood_event_tags" USING btree ("_parent_id");
  CREATE INDEX "announcement_blocks_seafood_event_buttons_order_idx" ON "announcement_blocks_seafood_event_buttons" USING btree ("_order");
  CREATE INDEX "announcement_blocks_seafood_event_buttons_parent_id_idx" ON "announcement_blocks_seafood_event_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "announcement_blocks_seafood_event_buttons_locales_locale_par" ON "announcement_blocks_seafood_event_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "announcement_blocks_seafood_event_order_idx" ON "announcement_blocks_seafood_event" USING btree ("_order");
  CREATE INDEX "announcement_blocks_seafood_event_parent_id_idx" ON "announcement_blocks_seafood_event" USING btree ("_parent_id");
  CREATE INDEX "announcement_blocks_seafood_event_path_idx" ON "announcement_blocks_seafood_event" USING btree ("_path");
  CREATE INDEX "announcement_blocks_seafood_event_image_idx" ON "announcement_blocks_seafood_event" USING btree ("image_id");
  CREATE INDEX "announcement_rels_order_idx" ON "announcement_rels" USING btree ("order");
  CREATE INDEX "announcement_rels_parent_idx" ON "announcement_rels" USING btree ("parent_id");
  CREATE INDEX "announcement_rels_path_idx" ON "announcement_rels" USING btree ("path");
  CREATE INDEX "announcement_rels_pages_id_idx" ON "announcement_rels" USING btree ("pages_id");
  CREATE INDEX "announcement_rels_posts_id_idx" ON "announcement_rels" USING btree ("posts_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_solutions_id_idx" ON "pages_rels" USING btree ("solutions_id","locale");
  CREATE INDEX "_pages_v_rels_solutions_id_idx" ON "_pages_v_rels" USING btree ("solutions_id","locale");
  CREATE INDEX "solutions_order_idx" ON "solutions" USING btree ("order");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_solutions_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_solutions_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_order" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_order_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_blocks_seafood_event_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_blocks_seafood_event_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_blocks_seafood_event_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_blocks_seafood_event" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_solutions_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_solutions_archive" CASCADE;
  DROP TABLE "solutions_order" CASCADE;
  DROP TABLE "solutions_order_rels" CASCADE;
  DROP TABLE "announcement_blocks_seafood_event_tags" CASCADE;
  DROP TABLE "announcement_blocks_seafood_event_buttons" CASCADE;
  DROP TABLE "announcement_blocks_seafood_event_buttons_locales" CASCADE;
  DROP TABLE "announcement_blocks_seafood_event" CASCADE;
  DROP TABLE "announcement" CASCADE;
  DROP TABLE "announcement_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_solutions_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_solutions_fk";
  
  DROP INDEX "pages_rels_solutions_id_idx";
  DROP INDEX "_pages_v_rels_solutions_id_idx";
  DROP INDEX "solutions_order_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "solutions_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "solutions_id";
  ALTER TABLE "solutions" DROP COLUMN "order";
  DROP TYPE "public"."enum_pages_blocks_solutions_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_solutions_archive_columns";
  DROP TYPE "public"."enum__pages_v_blocks_solutions_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_solutions_archive_columns";
  DROP TYPE "public"."enum_announcement_blocks_seafood_event_buttons_link_type";
  DROP TYPE "public"."enum_announcement_blocks_seafood_event_buttons_style";`)
}
