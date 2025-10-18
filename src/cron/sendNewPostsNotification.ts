import { db } from "@/db/database";
import type { Notification } from "@/db/types";
import { getEntry } from "astro:content";
import type { Selectable } from "kysely";
import Parser from "rss-parser";
import { getPost } from "@/api";

/**
 * Ignore all posts created before this date.
 */
const IGNORE_BEFORE_DATE = new Date("2025-10-08T00:00:00.000Z");

function linkToSlug(link: string) {
  return link.substring(
    link.indexOf("/blog/") + "/blog/".length,
    link.lastIndexOf("/"),
  );
}

export async function sendNewPostsNotification(env: Env) {
  const notificationMap = (
    await db.selectFrom("notifications").selectAll().execute()
  ).reduce((notificationMap, notification) => {
    notificationMap.set(notification.slug, notification);
    return notificationMap;
  }, new Map<string, Selectable<Notification>>());

  const parser = new Parser();

  const rssString = await (
    await env.ASSETS.fetch("https://www.nray.dev/rss.xml")
  ).text();
  const postEntries = await Promise.all(
    (await parser.parseString(rssString)).items
      .filter((item) => {
        return (
          new Date(item.pubDate!) > IGNORE_BEFORE_DATE &&
          !notificationMap.has(linkToSlug(item.link!))
        );
      })
      .map((feedItem) => getEntry("blog", linkToSlug(feedItem.link!))),
  );

  const oldestPost = (
    await Promise.all(postEntries.map((postEntry) => getPost(postEntry!)))
  ).sort(
    (a, b) => a.data.publishedAt!.getTime() - b.data.publishedAt!.getTime(),
  )[0];

  if (!oldestPost) return;

  console.log("oldest post = ", oldestPost);

  // Update notifiations table with notifications that have been sent
  // await db
  //   .insertInto("notifications")
  //   .values({
  //     slug: oldestPost.id,
  //   })
  //   .execute();
}
