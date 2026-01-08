import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_history_timeline_events" ADD COLUMN "is_smatch_era_start" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_history_timeline_events" ADD COLUMN "is_smatch_era_start" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_history_timeline_events" DROP COLUMN "is_smatch_era_start";
  ALTER TABLE "_pages_v_blocks_history_timeline_events" DROP COLUMN "is_smatch_era_start";`)
}
