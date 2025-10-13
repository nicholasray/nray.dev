import { Kysely } from "kysely";
import type { DB } from "../types";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("posts")
    .addColumn("id", "integer", (col) => col.primaryKey().notNull())
    .addColumn("slug", "text", (col) => col.notNull().unique())
    .addColumn("view_count", "integer", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("notifications")
    .addColumn("id", "integer", (col) => col.primaryKey().notNull())
    .addColumn("slug", "text", (col) => col.notNull().unique())
    .addColumn("created_at", "varchar(255)", (col) =>
      col.notNull().defaultTo(`datetime('now')`),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("posts").execute();
  await db.schema.dropTable("notifications").execute();
}
