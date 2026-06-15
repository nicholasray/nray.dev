import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";
import path from "node:path";
import { existsSync } from "node:fs";

export const DIMENSIONS = {
  width: 1200,
  height: 630,
};

/**
 * Resolve optimized image assets across Astro's production output locations.
 *
 * During prerendering, the Cloudflare adapter can emit referenced assets under
 * `dist/server/.prerender` or `dist/server` instead of the worker asset
 * directory. The `_worker.js` path remains the fallback for deployed runtime
 * output.
 */
function getProdImagePath(src: string) {
  const assetPath = src.replace(/^\//, "");
  const roots = ["_worker.js", "server/.prerender", "server"];

  for (const root of roots) {
    const input = path.join(path.resolve("dist"), root, assetPath);

    if (existsSync(input)) {
      return input;
    }
  }

  return path.join(path.resolve("dist"), "_worker.js", assetPath);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GET: APIRoute = async function get({ props }) {
  const post = props.entry;
  const input = import.meta.env.PROD
    ? getProdImagePath(post.data.cover.src.src)
    : new URL(
        post.data.cover.src.src.slice("/@fs".length),
        "https://www.example.com",
      ).pathname;

  const buffer = await sharp(input)
    .resize({
      width: DIMENSIONS.width,
      height: DIMENSIONS.height,
      fit: "cover",
      ...post.data.cover,
    })
    .png()
    .toBuffer();

  return new Response(new Uint8Array(buffer));
};

export async function getStaticPaths() {
  const blogEntries = await getCollection("blog", ({ data }) => {
    return !(!data.publishedAt && import.meta.env.PROD);
  });
  return blogEntries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}
