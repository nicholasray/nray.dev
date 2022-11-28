import { compareDesc } from "date-fns";

function importAll(r: __WebpackModuleApi.RequireContext, limit?: number) {
  return r
    .keys()
    .filter((filename) => filename.startsWith("."))
    .map((filename) => {
      return r(filename).meta;
    })
    .filter((post) =>
      process.env.NODE_ENV === "development" ? true : !!post.publishedAt
    )
    .sort((a, b) => {
      return compareDesc(
        new Date(a.publishedAt || new Date()),
        new Date(b.publishedAt || new Date())
      );
    })
    .slice(0, limit);
}

export function allPosts(limit?: number) {
  return importAll(require.context("./?preview", true, /\.mdx$/), limit);
}
