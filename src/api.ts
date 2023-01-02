import type { MDXInstance } from "astro";
import { compareDesc } from "date-fns";
import type { Post, PostFrontmatter } from "./types";
import sharp from "sharp";

export async function getPost(post: MDXInstance<PostFrontmatter>) {
  if (!(post.frontmatter.cover && post.frontmatter.cover.filename)) {
    return post;
  }

  const input = `${post.file.substring(
    0,
    post.file.indexOf("/src")
  )}/public/covers/${post.frontmatter.cover.filename}`;
  const metadata = await sharp(input).metadata();

  return {
    ...post,
    frontmatter: {
      ...post.frontmatter,
      cover: {
        ...post.frontmatter.cover,
        src: `/covers/${post.frontmatter.cover.filename}`,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
      },
    },
  };
}

export function getPosts(posts: MDXInstance<PostFrontmatter>[]) {
  return Promise.all(
    posts
      .filter((post) => !post.frontmatter.draft)
      .sort((a, b) => {
        return compareDesc(
          new Date(a.frontmatter.publishedAt || new Date()),
          new Date(b.frontmatter.publishedAt || new Date())
        );
      })
      .map(getPost)
  ) as Promise<Post[]>;
}
