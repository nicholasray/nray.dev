import type { D1Database } from "@cloudflare/workers-types";

export async function incrementViews(DB: D1Database, slug: string) {
  return DB.prepare(
    `INSERT INTO posts (slug, view_count) VALUES (?1, 1) ON CONFLICT (slug) DO UPDATE SET view_count = posts.view_count + 1`,
  )
    .bind(slug)
    .run();
}

export async function getViews(DB: D1Database, slug: string) {
  return DB.prepare("SELECT * FROM posts WHERE slug = ?").bind(slug).first();
}
