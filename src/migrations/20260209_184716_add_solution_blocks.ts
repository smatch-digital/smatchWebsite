import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_quick_presentation_layout" AS ENUM('mediaRight', 'mediaLeft');
  CREATE TYPE "public"."enum_pages_blocks_quick_presentation_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_quick_presentation_layout" AS ENUM('mediaRight', 'mediaLeft');
  CREATE TYPE "public"."enum__pages_v_blocks_quick_presentation_link_type" AS ENUM('reference', 'custom');
  
  CREATE TABLE "pages_blocks_quick_presentation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subheadline" varchar,
  	"description" jsonb,
  	"media_id" integer,
  	"layout" "enum_pages_blocks_quick_presentation_layout" DEFAULT 'mediaRight',
  	"link_type" "enum_pages_blocks_quick_presentation_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_functionality_benefits_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_functionality_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_header_title" varchar,
  	"section_header_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_use_case_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_use_case" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_header_title" varchar,
  	"section_header_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quick_presentation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subheadline" varchar,
  	"description" jsonb,
  	"media_id" integer,
  	"layout" "enum__pages_v_blocks_quick_presentation_layout" DEFAULT 'mediaRight',
  	"link_type" "enum__pages_v_blocks_quick_presentation_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_functionality_benefits_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_functionality_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_header_title" varchar,
  	"section_header_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_case_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_case" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_header_title" varchar,
  	"section_header_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pages_blocks_quick_presentation" ADD CONSTRAINT "pages_blocks_quick_presentation_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_quick_presentation" ADD CONSTRAINT "pages_blocks_quick_presentation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" ADD CONSTRAINT "pages_blocks_functionality_benefits_benefits_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" ADD CONSTRAINT "pages_blocks_functionality_benefits_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_functionality_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_functionality_benefits" ADD CONSTRAINT "pages_blocks_functionality_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_case_cases" ADD CONSTRAINT "pages_blocks_use_case_cases_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_case_cases" ADD CONSTRAINT "pages_blocks_use_case_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_use_case"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_case" ADD CONSTRAINT "pages_blocks_use_case_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quick_presentation" ADD CONSTRAINT "_pages_v_blocks_quick_presentation_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quick_presentation" ADD CONSTRAINT "_pages_v_blocks_quick_presentation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" ADD CONSTRAINT "_pages_v_blocks_functionality_benefits_benefits_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" ADD CONSTRAINT "_pages_v_blocks_functionality_benefits_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_functionality_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_functionality_benefits" ADD CONSTRAINT "_pages_v_blocks_functionality_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_case_cases" ADD CONSTRAINT "_pages_v_blocks_use_case_cases_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_case_cases" ADD CONSTRAINT "_pages_v_blocks_use_case_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_use_case"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_case" ADD CONSTRAINT "_pages_v_blocks_use_case_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_quick_presentation_order_idx" ON "pages_blocks_quick_presentation" USING btree ("_order");
  CREATE INDEX "pages_blocks_quick_presentation_parent_id_idx" ON "pages_blocks_quick_presentation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quick_presentation_path_idx" ON "pages_blocks_quick_presentation" USING btree ("_path");
  CREATE INDEX "pages_blocks_quick_presentation_locale_idx" ON "pages_blocks_quick_presentation" USING btree ("_locale");
  CREATE INDEX "pages_blocks_quick_presentation_media_idx" ON "pages_blocks_quick_presentation" USING btree ("media_id");
  CREATE INDEX "pages_blocks_functionality_benefits_benefits_order_idx" ON "pages_blocks_functionality_benefits_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_functionality_benefits_benefits_parent_id_idx" ON "pages_blocks_functionality_benefits_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_functionality_benefits_benefits_locale_idx" ON "pages_blocks_functionality_benefits_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_functionality_benefits_benefits_icon_idx" ON "pages_blocks_functionality_benefits_benefits" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_functionality_benefits_order_idx" ON "pages_blocks_functionality_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_functionality_benefits_parent_id_idx" ON "pages_blocks_functionality_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_functionality_benefits_path_idx" ON "pages_blocks_functionality_benefits" USING btree ("_path");
  CREATE INDEX "pages_blocks_functionality_benefits_locale_idx" ON "pages_blocks_functionality_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_use_case_cases_order_idx" ON "pages_blocks_use_case_cases" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_case_cases_parent_id_idx" ON "pages_blocks_use_case_cases" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_case_cases_locale_idx" ON "pages_blocks_use_case_cases" USING btree ("_locale");
  CREATE INDEX "pages_blocks_use_case_cases_image_idx" ON "pages_blocks_use_case_cases" USING btree ("image_id");
  CREATE INDEX "pages_blocks_use_case_order_idx" ON "pages_blocks_use_case" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_case_parent_id_idx" ON "pages_blocks_use_case" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_case_path_idx" ON "pages_blocks_use_case" USING btree ("_path");
  CREATE INDEX "pages_blocks_use_case_locale_idx" ON "pages_blocks_use_case" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_quick_presentation_order_idx" ON "_pages_v_blocks_quick_presentation" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quick_presentation_parent_id_idx" ON "_pages_v_blocks_quick_presentation" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quick_presentation_path_idx" ON "_pages_v_blocks_quick_presentation" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_quick_presentation_locale_idx" ON "_pages_v_blocks_quick_presentation" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_quick_presentation_media_idx" ON "_pages_v_blocks_quick_presentation" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_benefits_order_idx" ON "_pages_v_blocks_functionality_benefits_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_benefits_parent_id_idx" ON "_pages_v_blocks_functionality_benefits_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_benefits_locale_idx" ON "_pages_v_blocks_functionality_benefits_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_benefits_icon_idx" ON "_pages_v_blocks_functionality_benefits_benefits" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_order_idx" ON "_pages_v_blocks_functionality_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_parent_id_idx" ON "_pages_v_blocks_functionality_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_path_idx" ON "_pages_v_blocks_functionality_benefits" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_locale_idx" ON "_pages_v_blocks_functionality_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_use_case_cases_order_idx" ON "_pages_v_blocks_use_case_cases" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_case_cases_parent_id_idx" ON "_pages_v_blocks_use_case_cases" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_case_cases_locale_idx" ON "_pages_v_blocks_use_case_cases" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_use_case_cases_image_idx" ON "_pages_v_blocks_use_case_cases" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_use_case_order_idx" ON "_pages_v_blocks_use_case" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_case_parent_id_idx" ON "_pages_v_blocks_use_case" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_case_path_idx" ON "_pages_v_blocks_use_case" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_use_case_locale_idx" ON "_pages_v_blocks_use_case" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_quick_presentation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_functionality_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_use_case_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_use_case" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_quick_presentation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_functionality_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_case_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_case" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_quick_presentation" CASCADE;
  DROP TABLE "pages_blocks_functionality_benefits_benefits" CASCADE;
  DROP TABLE "pages_blocks_functionality_benefits" CASCADE;
  DROP TABLE "pages_blocks_use_case_cases" CASCADE;
  DROP TABLE "pages_blocks_use_case" CASCADE;
  DROP TABLE "_pages_v_blocks_quick_presentation" CASCADE;
  DROP TABLE "_pages_v_blocks_functionality_benefits_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_functionality_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_use_case_cases" CASCADE;
  DROP TABLE "_pages_v_blocks_use_case" CASCADE;
  ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;
  DROP TYPE "public"."enum_pages_blocks_quick_presentation_layout";
  DROP TYPE "public"."enum_pages_blocks_quick_presentation_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_quick_presentation_layout";
  DROP TYPE "public"."enum__pages_v_blocks_quick_presentation_link_type";`)
}
