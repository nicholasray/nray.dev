import type { APIRoute } from "astro";
import { CollectionEntry, getCollection } from "astro:content";
import sharp from "sharp";
import path from "node:path";

export const DIMENSIONS = {
  width: 1200,
  height: 630,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const get: APIRoute = async function get({ props }) {
  const post: CollectionEntry<"blog"> = props.entry;

  // TODO: Don't hardcode `dist`
  const buffer = await sharp(path.join("dist", post.data.cover.src.src))
    .resize({
      width: DIMENSIONS.width,
      height: DIMENSIONS.height,
      fit: "cover",
      ...post.data.cover,
    })
    .png()
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
