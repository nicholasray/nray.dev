import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("notifications").execute();

  await db.schema
    .createTable("notifications")
    .addColumn("id", "integer", (col) => col.primaryKey().notNull())
    .addColumn("slug", "text", (col) => col.notNull().unique())
    .addColumn("created_at", "varchar(255)", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn("approved_at", "varchar(255)")
    .addColumn("sent_at", "varchar(255)")
    .execute();
}

export async function down(_db: Kysely<unknown>): Promise<void> {}
