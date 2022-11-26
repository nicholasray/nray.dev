import Head from "@components/Head";
import * as MDXContent from "./page.mdx";

function CustomHead() {
  return <Head title={MDXContent.title} />;
}

export default CustomHead;
