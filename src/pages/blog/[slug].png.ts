import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import sharp from "sharp";

export const DIMENSIONS = {
  width: 1200,
  height: 630,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GET: APIRoute = async function get({ props }) {
  const post: CollectionEntry<"blog"> = props.entry;

  const input = import.meta.env.PROD
    ? `dist/${post.data.cover.src.src}`
    : new URL(
        post.data.cover.src.src.slice("/@fs".length),
        "https://www.example.com",
      ).pathname;

  // TODO: Don't hardcode `dist`
  const buffer = await sharp(input)
    .resize({
      width: DIMENSIONS.width,
      height: DIMENSIONS.height,
      fit: "cover",
      ...post.data.cover,
    })
    .png()
    .toBuffer();

  return new Response(buffer);
};

export async function getStaticPaths() {
  const blogEntries = await getCollection("blog", ({ data }) => {
    return !(!data.publishedAt && import.meta.env.PROD);
  });
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
