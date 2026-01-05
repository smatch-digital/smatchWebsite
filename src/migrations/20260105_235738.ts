import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "exp_feats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "exp_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"icon_name" varchar DEFAULT 'Factory',
  	"icon_color" varchar DEFAULT 'text-yellow-500'
  );
  
  CREATE TABLE "exp_sects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"title" varchar DEFAULT 'INDUSTRIE X.0',
  	"subtitle" varchar DEFAULT 'AUTOMATISATION',
  	"description" varchar DEFAULT 'Transformation numérique des lignes de production.'
  );
  
  CREATE TABLE "exp_dom" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_exp_feats_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_exp_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"icon_name" varchar DEFAULT 'Factory',
  	"icon_color" varchar DEFAULT 'text-yellow-500',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_exp_sects_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"title" varchar DEFAULT 'INDUSTRIE X.0',
  	"subtitle" varchar DEFAULT 'AUTOMATISATION',
  	"description" varchar DEFAULT 'Transformation numérique des lignes de production.',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_exp_dom_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "exp_feats" ADD CONSTRAINT "exp_feats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."exp_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exp_cards" ADD CONSTRAINT "exp_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exp_cards" ADD CONSTRAINT "exp_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."exp_sects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exp_sects" ADD CONSTRAINT "exp_sects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."exp_dom"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exp_dom" ADD CONSTRAINT "exp_dom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_exp_feats_v" ADD CONSTRAINT "_exp_feats_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_exp_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_exp_cards_v" ADD CONSTRAINT "_exp_cards_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_exp_cards_v" ADD CONSTRAINT "_exp_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_exp_sects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_exp_sects_v" ADD CONSTRAINT "_exp_sects_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_exp_dom_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_exp_dom_v" ADD CONSTRAINT "_exp_dom_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "exp_feats_order_idx" ON "exp_feats" USING btree ("_order");
  CREATE INDEX "exp_feats_parent_id_idx" ON "exp_feats" USING btree ("_parent_id");
  CREATE INDEX "exp_cards_order_idx" ON "exp_cards" USING btree ("_order");
  CREATE INDEX "exp_cards_parent_id_idx" ON "exp_cards" USING btree ("_parent_id");
  CREATE INDEX "exp_cards_image_idx" ON "exp_cards" USING btree ("image_id");
  CREATE INDEX "exp_sects_order_idx" ON "exp_sects" USING btree ("_order");
  CREATE INDEX "exp_sects_parent_id_idx" ON "exp_sects" USING btree ("_parent_id");
  CREATE INDEX "exp_dom_order_idx" ON "exp_dom" USING btree ("_order");
  CREATE INDEX "exp_dom_parent_id_idx" ON "exp_dom" USING btree ("_parent_id");
  CREATE INDEX "exp_dom_path_idx" ON "exp_dom" USING btree ("_path");
  CREATE INDEX "_exp_feats_v_order_idx" ON "_exp_feats_v" USING btree ("_order");
  CREATE INDEX "_exp_feats_v_parent_id_idx" ON "_exp_feats_v" USING btree ("_parent_id");
  CREATE INDEX "_exp_cards_v_order_idx" ON "_exp_cards_v" USING btree ("_order");
  CREATE INDEX "_exp_cards_v_parent_id_idx" ON "_exp_cards_v" USING btree ("_parent_id");
  CREATE INDEX "_exp_cards_v_image_idx" ON "_exp_cards_v" USING btree ("image_id");
  CREATE INDEX "_exp_sects_v_order_idx" ON "_exp_sects_v" USING btree ("_order");
  CREATE INDEX "_exp_sects_v_parent_id_idx" ON "_exp_sects_v" USING btree ("_parent_id");
  CREATE INDEX "_exp_dom_v_order_idx" ON "_exp_dom_v" USING btree ("_order");
  CREATE INDEX "_exp_dom_v_parent_id_idx" ON "_exp_dom_v" USING btree ("_parent_id");
  CREATE INDEX "_exp_dom_v_path_idx" ON "_exp_dom_v" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "exp_feats" CASCADE;
  DROP TABLE "exp_cards" CASCADE;
  DROP TABLE "exp_sects" CASCADE;
  DROP TABLE "exp_dom" CASCADE;
  DROP TABLE "_exp_feats_v" CASCADE;
  DROP TABLE "_exp_cards_v" CASCADE;
  DROP TABLE "_exp_sects_v" CASCADE;
  DROP TABLE "_exp_dom_v" CASCADE;`)
}
