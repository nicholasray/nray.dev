import { defineAction } from "astro:actions";
import { db, inArray, Post, sql } from "astro:db";
import { z } from "astro:schema";

export const views = {
  getBySlugs: defineAction({
    input: z.object({ slugs: z.string().array() }),
    handler: async ({ slugs }) => {
      const data = await db
        .select()
        .from(Post)
        .where(inArray(Post.slug, slugs));

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
        .insert(Post)
        .values({ slug, viewCount: 1 })
        .onConflictDoUpdate({
          target: Post.slug,
          set: { viewCount: sql`${Post.viewCount} + 1` },
        })
        .returning({ id: Post.id });
    },
  }),
};
