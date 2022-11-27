import { compareDesc } from "date-fns";
import * as howToCreatePerformantScrollAnimationsInReact from "./how-to-create-performant-scroll-animations-in-react/page.mdx";
import * as usingMediaQueriesInJavascript from "./using-media-queries-in-javascript/page.mdx";

const posts = [
  howToCreatePerformantScrollAnimationsInReact,
  usingMediaQueriesInJavascript,
];

export function findPost(slug: string) {
  return allPosts().find((post) => post.slug === slug);
}

/**
 * @param limit Maximum number of posts returned.
 */
export function allPosts(limit?: number) {
  return posts
    .filter((post) =>
      process.env.NODE_ENV === "development" ? true : !!post.publishedAt
    )
    .sort((a, b) => {
      return compareDesc(
        new Date(a.publishedAt || new Date()),
        new Date(b.publishedAt || new Date())
      );
    })
    .slice(0, limit ? limit + 1 : limit);
}
