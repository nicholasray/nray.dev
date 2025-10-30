import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.schema
    .alterTable("notifications")
    .addColumn("approved_at", "varchar(255)")
    .execute();

  await db.schema
    .alterTable("notifications")
    .addColumn("sent_at", "varchar(255)")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  // down migration code goes here...
  // note: down migrations are optional. you can safely delete this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.schema
    .alterTable("notifications")
    .dropColumn("approved_at")
    .execute();
  await db.schema.alterTable("notifications").dropColumn("sent_at").execute();
}
