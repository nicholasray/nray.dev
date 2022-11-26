interface Post {
  title: string;
  description: string;
  publishedAt: string;
  publishedAtFormatted: string;
  readingTime: string;
  children: React.ReactNode;
}

export default Post;
