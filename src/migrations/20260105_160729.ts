import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" ADD COLUMN "directors_quote_text" varchar DEFAULT 'Dans un contexte économique exigeant, Smatch Digital s''impose comme le partenaire opérationnel des PME marocaines. Notre mission : élever les standards de la Supply Chain par des solutions concrètes et immédiates. Nous privilégions le pragmatisme et la proximité pour bâtir notre notoriété sur une seule exigence : l''excellence au service de votre performance.';
  ALTER TABLE "pages_blocks_team" ADD COLUMN "directors_quote_author" varchar;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "directors_quote_text" varchar DEFAULT 'Dans un contexte économique exigeant, Smatch Digital s''impose comme le partenaire opérationnel des PME marocaines. Notre mission : élever les standards de la Supply Chain par des solutions concrètes et immédiates. Nous privilégions le pragmatisme et la proximité pour bâtir notre notoriété sur une seule exigence : l''excellence au service de votre performance.';
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "directors_quote_author" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" DROP COLUMN "directors_quote_text";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "directors_quote_author";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "directors_quote_text";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "directors_quote_author";`)
}
