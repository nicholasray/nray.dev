import { db } from "@/db/database";
import type { Notification } from "@/db/types";
import { getEntry } from "astro:content";
import type { Selectable } from "kysely";
import Parser from "rss-parser";

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

export async function sendNewPostsNotification() {
  console.log("beginning cron job...");
  const notificationMap = (
    await db.selectFrom("notifications").selectAll().execute()
  ).reduce((notificationMap, notification) => {
    notificationMap.set(notification.slug, notification);
    return notificationMap;
  }, new Map<string, Selectable<Notification>>());

  console.log("notification map = ", [...notificationMap]);

  const parser = new Parser();
  const posts = (await parser.parseURL("https://www.nray.dev/rss.xml")).items
    .filter((item) => {
      console.log(item);
      return (
        new Date(item.pubDate!) > IGNORE_BEFORE_DATE &&
        !notificationMap.has(linkToSlug(item.link!))
      );
    })
    .map((feedItem) => getEntry("blog", linkToSlug(feedItem.link!)));

  console.log(posts);

  await db.destroy();
  return posts;

  // Update notifiations table with notifications that have been sent
  // await db
  //   .insertInto("notifications")
  //   .values(
  //     feedItems.map((item) => {
  //       return {
  //         slug: linkToSlug(item.link!),
  //       };
  //     }),
  //   )
  //   .execute();
}
