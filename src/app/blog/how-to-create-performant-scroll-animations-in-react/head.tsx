import Head from "@components/Head";
import constants from "src/constants";
import * as post from "./page.mdx";

async function CustomHead() {
  const canonical = `${constants.url}`;

  return (
    <Head
      includeOg={true}
      canonical={canonical}
      title={post.title}
      description={post.description}
    />
  );
}

export default CustomHead;
