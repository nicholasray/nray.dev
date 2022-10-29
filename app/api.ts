import { Post, allPosts as allPostsExternal } from "contentlayer/generated";
import { compareDesc } from "date-fns";

/**
 * Returns a new object that only includes keys from `keys` arg. If `undefined`,
 * the key will not be included in the object.
 */
const pick = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]) => {
  return keys.reduce((newObj, key) => {
    if (key in obj) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {} as Pick<Obj, typeof keys[number]>);
};

/**
 * @param fields List of fields to include in the post.
 * @param limit Maximum number of posts returned.
 */
export const allPosts = <Keys extends keyof Post>(
  fields: Keys[],
  limit?: number
) => {
  return (
    allPostsExternal
      .filter((post) =>
        process.env.NODE_ENV === "development"
          ? true
          : post.status === "published"
      )
      .sort((a, b) => {
        return compareDesc(
          new Date(a.publishedAt || new Date()),
          new Date(b.publishedAt || new Date())
        );
      })
      .slice(0, limit ? limit + 1 : limit)
      // Only pass data that the client actually uses.
      .map((post) => pick(post, fields))
  );
};
