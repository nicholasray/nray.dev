import rss from "@astrojs/rss";
import { getPosts } from "@src/api";
import { getCollection } from "astro:content";

export async function get(context) {
  const collection = await getCollection("blog");
  const blog = await getPosts(collection);

  return rss({
    // `<title>` field in output xml
    title: "Nicholas Ray's blog",
    // `<description>` field in output xml
    description:
      "Web performance tips that improve page speed, business metrics, and user happiness",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.slug}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}