import BlogArticle from "@components/BlogArticle";
import { format, parseISO } from "date-fns";
import * as Content from "./page.mdx";

export default function Page() {
  return (
    <BlogArticle
      title={Content.title}
      publishedAt={Content.publishedAt}
      publishedAtFormatted={format(
        parseISO(Content.publishedAt),
        "LLLL d, yyyy"
      )}
      description={Content.description}
      readingTime={Content.readingTime.text}
    >
      <Content.default />
    </BlogArticle>
  );
}
