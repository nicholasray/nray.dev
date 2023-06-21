import { compareDesc } from "date-fns";
import sharp from "sharp";
import type { CollectionEntry } from "astro:content";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getPost(entry: CollectionEntry<"blog">) {
  const coverFilename = entry.data.cover.filename;
  const metadata = await sharp(
    `${__dirname}/../public/covers/${coverFilename}`
  ).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(
      `Could not determine cover image dimensions for ${entry.id}`
    );
  }

  const { Content, headings, remarkPluginFrontmatter } = await entry.render();

  return {
    ...entry,
    Content,
    headings,
    readingTime: remarkPluginFrontmatter.readingTime,
    url: `/blog/${entry.slug}`,
    data: {
      ...entry.data,
      cover: {
        ...entry.data.cover,
        src: `/covers/${coverFilename}`,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
      },
    },
  };
}

export function getPosts(posts: CollectionEntry<"blog">[]) {
  return Promise.all(
    posts
      .filter((post) => !(!post.data.publishedAt && import.meta.env.PROD))
      .sort((a, b) => {
        return compareDesc(
          new Date(a.data.publishedAt || new Date()),
          new Date(b.data.publishedAt || new Date())
        );
      })
      .map(getPost)
  );
}
