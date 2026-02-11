import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_solutions_blocks_quick_presentation_layout" AS ENUM('mediaRight', 'mediaLeft');
  CREATE TYPE "public"."enum_solutions_blocks_quick_presentation_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "solutions_blocks_quick_presentation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"subheadline" varchar,
  	"description" jsonb,
  	"media_id" integer NOT NULL,
  	"layout" "enum_solutions_blocks_quick_presentation_layout" DEFAULT 'mediaRight',
  	"link_type" "enum_solutions_blocks_quick_presentation_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_functionality_benefits_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_functionality_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_header_title" varchar NOT NULL,
  	"section_header_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_use_case_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_use_case" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_header_title" varchar NOT NULL,
  	"section_header_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "solutions_terminal_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_modules" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "solutions_terminal_content" CASCADE;
  DROP TABLE "solutions_modules" CASCADE;
  ALTER TABLE "solutions" DROP CONSTRAINT "solutions_dashboard_image_id_media_id_fk";
  
  DROP INDEX "solutions_dashboard_image_idx";
  ALTER TABLE "solutions_blocks_quick_presentation" ADD CONSTRAINT "solutions_blocks_quick_presentation_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_blocks_quick_presentation" ADD CONSTRAINT "solutions_blocks_quick_presentation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" ADD CONSTRAINT "solutions_blocks_functionality_benefits_benefits_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" ADD CONSTRAINT "solutions_blocks_functionality_benefits_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_functionality_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_functionality_benefits" ADD CONSTRAINT "solutions_blocks_functionality_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_use_case_cases" ADD CONSTRAINT "solutions_blocks_use_case_cases_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_blocks_use_case_cases" ADD CONSTRAINT "solutions_blocks_use_case_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_use_case"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_use_case" ADD CONSTRAINT "solutions_blocks_use_case_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "solutions_blocks_quick_presentation_order_idx" ON "solutions_blocks_quick_presentation" USING btree ("_order");
  CREATE INDEX "solutions_blocks_quick_presentation_parent_id_idx" ON "solutions_blocks_quick_presentation" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_quick_presentation_path_idx" ON "solutions_blocks_quick_presentation" USING btree ("_path");
  CREATE INDEX "solutions_blocks_quick_presentation_locale_idx" ON "solutions_blocks_quick_presentation" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_quick_presentation_media_idx" ON "solutions_blocks_quick_presentation" USING btree ("media_id");
  CREATE INDEX "solutions_blocks_functionality_benefits_benefits_order_idx" ON "solutions_blocks_functionality_benefits_benefits" USING btree ("_order");
  CREATE INDEX "solutions_blocks_functionality_benefits_benefits_parent_id_idx" ON "solutions_blocks_functionality_benefits_benefits" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_functionality_benefits_benefits_locale_idx" ON "solutions_blocks_functionality_benefits_benefits" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_functionality_benefits_benefits_icon_idx" ON "solutions_blocks_functionality_benefits_benefits" USING btree ("icon_id");
  CREATE INDEX "solutions_blocks_functionality_benefits_order_idx" ON "solutions_blocks_functionality_benefits" USING btree ("_order");
  CREATE INDEX "solutions_blocks_functionality_benefits_parent_id_idx" ON "solutions_blocks_functionality_benefits" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_functionality_benefits_path_idx" ON "solutions_blocks_functionality_benefits" USING btree ("_path");
  CREATE INDEX "solutions_blocks_functionality_benefits_locale_idx" ON "solutions_blocks_functionality_benefits" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_use_case_cases_order_idx" ON "solutions_blocks_use_case_cases" USING btree ("_order");
  CREATE INDEX "solutions_blocks_use_case_cases_parent_id_idx" ON "solutions_blocks_use_case_cases" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_use_case_cases_locale_idx" ON "solutions_blocks_use_case_cases" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_use_case_cases_image_idx" ON "solutions_blocks_use_case_cases" USING btree ("image_id");
  CREATE INDEX "solutions_blocks_use_case_order_idx" ON "solutions_blocks_use_case" USING btree ("_order");
  CREATE INDEX "solutions_blocks_use_case_parent_id_idx" ON "solutions_blocks_use_case" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_use_case_path_idx" ON "solutions_blocks_use_case" USING btree ("_path");
  CREATE INDEX "solutions_blocks_use_case_locale_idx" ON "solutions_blocks_use_case" USING btree ("_locale");
  CREATE INDEX "solutions_rels_order_idx" ON "solutions_rels" USING btree ("order");
  CREATE INDEX "solutions_rels_parent_idx" ON "solutions_rels" USING btree ("parent_id");
  CREATE INDEX "solutions_rels_path_idx" ON "solutions_rels" USING btree ("path");
  CREATE INDEX "solutions_rels_locale_idx" ON "solutions_rels" USING btree ("locale");
  CREATE INDEX "solutions_rels_pages_id_idx" ON "solutions_rels" USING btree ("pages_id","locale");
  CREATE INDEX "solutions_rels_posts_id_idx" ON "solutions_rels" USING btree ("posts_id","locale");
  ALTER TABLE "solutions" DROP COLUMN "dashboard_image_id";
  ALTER TABLE "solutions_locales" DROP COLUMN "problem_title";
  ALTER TABLE "solutions_locales" DROP COLUMN "problem_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "solutions_terminal_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "solutions_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"badge" varchar
  );
  
  ALTER TABLE "solutions_blocks_quick_presentation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_functionality_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_use_case_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_use_case" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "solutions_blocks_quick_presentation" CASCADE;
  DROP TABLE "solutions_blocks_functionality_benefits_benefits" CASCADE;
  DROP TABLE "solutions_blocks_functionality_benefits" CASCADE;
  DROP TABLE "solutions_blocks_use_case_cases" CASCADE;
  DROP TABLE "solutions_blocks_use_case" CASCADE;
  DROP TABLE "solutions_rels" CASCADE;
  ALTER TABLE "solutions" ADD COLUMN "dashboard_image_id" integer;
  ALTER TABLE "solutions_locales" ADD COLUMN "problem_title" varchar;
  ALTER TABLE "solutions_locales" ADD COLUMN "problem_description" varchar;
  ALTER TABLE "solutions_terminal_content" ADD CONSTRAINT "solutions_terminal_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_modules" ADD CONSTRAINT "solutions_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "solutions_terminal_content_order_idx" ON "solutions_terminal_content" USING btree ("_order");
  CREATE INDEX "solutions_terminal_content_parent_id_idx" ON "solutions_terminal_content" USING btree ("_parent_id");
  CREATE INDEX "solutions_modules_order_idx" ON "solutions_modules" USING btree ("_order");
  CREATE INDEX "solutions_modules_parent_id_idx" ON "solutions_modules" USING btree ("_parent_id");
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_dashboard_image_id_media_id_fk" FOREIGN KEY ("dashboard_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "solutions_dashboard_image_idx" ON "solutions" USING btree ("dashboard_image_id");
  DROP TYPE "public"."enum_solutions_blocks_quick_presentation_layout";
  DROP TYPE "public"."enum_solutions_blocks_quick_presentation_link_type";`)
}
