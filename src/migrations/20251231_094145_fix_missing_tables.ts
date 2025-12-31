import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_contact_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_addresses" (
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
  ALTER TABLE "pages_blocks_contact_addresses" ADD CONSTRAINT "pages_blocks_contact_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_addresses" ADD CONSTRAINT "_pages_v_blocks_contact_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_addresses_order_idx" ON "pages_blocks_contact_addresses" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_addresses_parent_id_idx" ON "pages_blocks_contact_addresses" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_addresses_order_idx" ON "_pages_v_blocks_contact_addresses" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_addresses_parent_id_idx" ON "_pages_v_blocks_contact_addresses" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "address";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "address";`)
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
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "address" varchar;`)
}
