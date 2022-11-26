import Head from "@components/Head";
import constants from "src/constants";

async function CustomHead() {
  const post = await import("./page.mdx");
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
