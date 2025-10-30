import { getEntry } from "astro:content";
import Parser from "rss-parser";

function linkToSlug(link: string) {
  return link.substring(
    link.indexOf("/blog/") + "/blog/".length,
    link.lastIndexOf("/"),
  );
}

export async function getEntriesFromFeed(env: Env) {
  const parser = new Parser();
  const rssString = await (
    await env.ASSETS.fetch("https://www.nray.dev/rss.xml")
  ).text();
  return await Promise.all(
    (await parser.parseString(rssString)).items
      .map((feedItem) => getEntry("blog", linkToSlug(feedItem.link!)))
      .filter((entry) => !!entry),
  );
}
