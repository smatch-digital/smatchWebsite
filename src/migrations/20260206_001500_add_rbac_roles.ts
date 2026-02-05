import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration: Add RBAC role field to users table
 * - Adds 'role' column with default 'editor'
 * - Sets kourdroid@gmail.com as 'owner'
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    // Add role column with default value 'editor'
    await db.execute(sql`
    ALTER TABLE "users" 
    ADD COLUMN IF NOT EXISTS "role" varchar DEFAULT 'editor' NOT NULL;
  `)

    // Create enum check constraint (PostgreSQL)
    await db.execute(sql`
    ALTER TABLE "users" 
    DROP CONSTRAINT IF EXISTS "users_role_check";
  `)

    await db.execute(sql`
    ALTER TABLE "users" 
    ADD CONSTRAINT "users_role_check" 
    CHECK ("role" IN ('owner', 'admin', 'editor', 'viewer'));
  `)

    // Set owner role for the primary account
    await db.execute(sql`
    UPDATE "users" 
    SET "role" = 'owner' 
    WHERE "email" = 'kourdroid@gmail.com';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    // Remove the role column
    await db.execute(sql`
    ALTER TABLE "users" 
    DROP COLUMN IF EXISTS "role";
  `)
}
