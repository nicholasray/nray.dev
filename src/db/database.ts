import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import type { DB } from "./types";

export const db = new Kysely<DB>({
  dialect: new LibsqlDialect({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_TOKEN,
  }),
});
