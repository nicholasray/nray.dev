import { defineDb, defineTable, column } from "astro:db";

const Post = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    slug: column.text({ unique: true }),
    viewCount: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Post },
});
