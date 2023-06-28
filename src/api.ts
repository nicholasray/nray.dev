import { compareDesc } from "date-fns";
import { getCollection, type CollectionEntry } from "astro:content";

export async function getPost(entry: CollectionEntry<"blog">) {
  const allImages = import.meta.glob<{ default: ImageMetadata }>(
    `/src/content/blog/*/_assets/*.{png,jpg,jpeg,webp}`
  );

  const coverFn =
    allImages[
      `/src/content/blog/${entry.slug}${entry.data.cover.src.slice(1)}`
    ];

  if (!coverFn) {
    throw new Error(
      `[blog] Cover image for "${entry.data.title}" not found! Provided: "${entry.data.cover.src}", is there a typo?`
    );
  }

  const { default: image } = await coverFn();
  const { Content, headings, remarkPluginFrontmatter } = await entry.render();

  return {
    ...entry,
    Content,
    headings,
    readingTime: remarkPluginFrontmatter.readingTime,
    url: `/blog/${entry.slug}/`,
    data: {
      ...entry.data,
      cover: {
        ...entry.data.cover,
        ...image,
      },
    },
  };
}

export async function getPosts() {
  const posts = await getCollection("blog");

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
