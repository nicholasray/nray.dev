import { allPosts } from "src/api";
import constants from "src/constants";
import Head from "@components/Head";

interface Params {
  params: {
    slug: string;
  };
}

function CustomHead({ params }: Params) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = allPosts(["title", "description", "url", "slug"]).find(
    (post) => post.slug === params.slug
  )!;

  const canonical = `${constants.url}${post.url}`;
  return (
    <>
      <Head
        title={post.title}
        description={post.description.raw}
        canonical={canonical}
        includeOg={true}
      />
    </>
  );
}

export default CustomHead;
