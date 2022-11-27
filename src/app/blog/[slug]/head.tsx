import CustomHead from "@components/Head";
import constants from "src/constants";
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

async function Head({ params }: Params) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = findPost(params.slug)!;
  const canonical = `${constants.url}`;

  return (
    <CustomHead
      includeOg={true}
      canonical={canonical}
      title={post.title}
      description={post.description}
    />
  );
}

export default Head;
