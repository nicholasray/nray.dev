export interface PostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  cover: {
    src: string;
    filename: string;
    alt: string;
    credit: string;
    width: number;
    height: number;
  };
}

export interface Post {
  cover: {
    metadata: ImageMetadata;
    alt: string;
  };
}
