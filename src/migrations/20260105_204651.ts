import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact" ADD COLUMN "map_embed_url" varchar DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.596001257176!2d-7.660682284797746!3d33.56382758074211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2e7409395d9%3A0x629c414674066066!2sTechnopark%20Casablanca!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "map_embed_url" varchar DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.596001257176!2d-7.660682284797746!3d33.56382758074211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2e7409395d9%3A0x629c414674066066!2sTechnopark%20Casablanca!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact" DROP COLUMN "map_embed_url";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "map_embed_url";`)
}
