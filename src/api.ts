import { compareDesc } from "date-fns";
import { getCollection, type CollectionEntry, render } from "astro:content";

export async function getPost(entry: CollectionEntry<"blog">) {
  const { Content, headings, remarkPluginFrontmatter } = await render(entry);

  return {
    ...entry,
    Content,
    headings,
    readingTime: remarkPluginFrontmatter.readingTime,
    url: `/blog/${entry.id}/`,
    data: {
      ...entry.data,
      cover: {
        ...entry.data.cover,
        ...entry.data.cover.src,
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
          new Date(b.data.publishedAt || new Date()),
        );
      })
      .map(getPost),
  );
}
