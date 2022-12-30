import type { MDXInstance } from "astro";
import { compareDesc } from "date-fns";
import type { Post, PostFrontmatter } from "./types";

export function getPosts(posts: MDXInstance<PostFrontmatter>[]) {
  return posts
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => {
      return compareDesc(
        new Date(a.frontmatter.publishedAt || new Date()),
        new Date(b.frontmatter.publishedAt || new Date())
      );
    }) as Post[];
}
