import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import type { DB } from "./types";

export const db = new Kysely<DB>({
  dialect: new LibsqlDialect({
    url: import.meta.env.DATABASE_URL,
    authToken: import.meta.env.DATABASE_TOKEN,
  }),
});
