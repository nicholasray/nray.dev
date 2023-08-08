import type { APIRoute } from "astro";
import { CollectionEntry, getCollection } from "astro:content";
import sharp from "sharp";

export const DIMENSIONS = {
  width: 1200,
  height: 630,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const get: APIRoute = async function get({ props, url }) {
  const post: CollectionEntry<"blog"> = props.entry;

  const response = await fetch(new URL(post.data.cover.src.src, url));
  const inputBuffer = Buffer.from(await response.arrayBuffer());

  const buffer = await sharp(inputBuffer)
    .resize({
      width: DIMENSIONS.width,
      height: DIMENSIONS.height,
      fit: "cover",
      ...post.data.cover,
    })
    .png({ quality: 90 })
    .toBuffer();

  return {
    body: buffer,
    encoding: "binary",
  };
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
