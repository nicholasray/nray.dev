interface Post {
  title: string;
  slug: string;
  url: string;
  description: string;
  publishedAt: string;
  publishedAtFormatted: string;
  readingTime: string;
  children: React.ReactNode;
}

export default Post;
