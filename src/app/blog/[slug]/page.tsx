import BlogArticle from "@components/BlogArticle";
import { allPosts, findPost } from "@app/blog";

interface Params {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts().map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

function Page({ params }: Params) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = findPost(params.slug)!;
  const Component = post.default;

  return (
    <BlogArticle
      title={post.title}
      publishedAt={post.publishedAt}
      publishedAtFormatted={post.publishedAtFormatted}
      readingTime={post.readingTime}
    >
      <Component />
    </BlogArticle>
  );
}

export default Page;
