import BlogArticle from "@components/BlogArticle";
import * as Content from "./page.mdx";

function Page() {
  return (
    <BlogArticle {...Content}>
      <Content.default />
    </BlogArticle>
  );
}

export default Page;
