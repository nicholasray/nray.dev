import Head from "@components/Head";
import { allPages } from "contentlayer/generated";
import constants from "src/constants";

interface Params {
  params: {
    slug: string;
  };
}

function CustomHead({ params }: Params) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = allPages.find(
    (page) => page._raw.flattenedPath === params.slug
  )!;
  const canonical = `${constants.url}${page.url}`;

  return (
    <>
      <Head title={page.title} canonical={canonical} />
    </>
  );
}

export default CustomHead;
