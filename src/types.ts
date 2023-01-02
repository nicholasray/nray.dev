import type { MDXInstance } from "astro";

export interface PostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  draft?: boolean;
  cover: {
    src: string;
    filename: string;
    alt: string;
    credit: string;
    width: number;
    height: number;
  };
}

export interface Post extends MDXInstance<PostFrontmatter> {
  cover: {
    metadata: ImageMetadata;
    alt: string;
  };
}
