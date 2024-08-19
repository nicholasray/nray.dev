import DataLoader from "dataloader";
import { getBlogViewsIn, type Post } from "../db/client";
import type { D1Database } from "@cloudflare/workers-types";

export function createLoaders(DB: D1Database) {
  return {
    blogViews: new DataLoader<string, Post | undefined>(async (slugs) => {
      const data = await getBlogViewsIn(DB, slugs);

      if (data.error) {
        throw new Error(data.error);
      }

      return slugs.map((slug) =>
        data.results.find((result) => result.slug === slug),
      );
    }),
  };
}
