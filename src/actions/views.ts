import { db } from "@/db/database";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const views = {
  getBySlugs: defineAction({
    input: z.object({ slugs: z.string().array() }),
    handler: async ({ slugs }) => {
      const data = await db
        .selectFrom("posts")
        .selectAll()
        .where("slug", "in", slugs)
        .execute();

      const dataMap = data.reduce<Record<string, (typeof data)[0]>>(
        (data, post) => {
          data[post.slug] = post;

          return data;
        },
        {},
      );

      return slugs.map<(typeof data)[0]>((slug) => {
        return (
          dataMap[slug] ?? {
            id: null,
            slug,
            viewCount: 0,
          }
        );
      });
    },
  }),
  increment: defineAction({
    input: z.object({ slug: z.string() }),
    handler: async ({ slug }) => {
      return db
        .insertInto("posts")
        .values({ slug, viewCount: 1 })
        .onConflict((oc) =>
          oc
            .column("slug") // unique column that triggers conflict
            .doUpdateSet((eb) => ({
              viewCount: eb(eb.ref("viewCount"), "+", 1),
            })),
        )
        .returning(["id", "viewCount"])
        .executeTakeFirstOrThrow();
    },
  }),
};
