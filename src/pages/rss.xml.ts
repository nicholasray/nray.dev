import rss from "@astrojs/rss";
import { getPosts } from "@src/api";
import type { APIRoute } from "astro";

export const GET: APIRoute = async function get(context) {
  // Filter out drafts.
  const blog = (await getPosts()).filter((post) => {
    return !!post.data.publishedAt;
  });

  return rss({
    title: "nray.dev blog",
    description: "Web development tips",
    site: context.site!,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      slug: post.id,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
};
