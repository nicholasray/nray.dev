import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import type { DB } from "./types";

// console.log("******", process.env.DATABASE_URL);

// setTimeout(() => {
//   console.log(process.env.DATABASE_URL);
// }, 5000);

export const db = new Kysely<DB>({
  dialect: new LibsqlDialect({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN,
  }),
});
