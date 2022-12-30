import type { MDXInstance } from "astro";

export interface PostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  draft?: boolean;
}

export interface Post extends MDXInstance<PostFrontmatter> {
  cover: {
    metadata: ImageMetadata;
    alt: string;
  };
}
