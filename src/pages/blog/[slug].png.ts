import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";

export const DIMENSIONS = {
  width: 1200,
  height: 630,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GET: APIRoute = async function get({ props }) {
  const post = props.entry;
  const input = import.meta.env.PROD
    ? post.data.cover.src.fsPath
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
    params: { slug: entry.id },
    props: { entry },
  }));
}
