import { db } from "@/db/database";
import type { Notification } from "@/db/types";
import type { Selectable } from "kysely";
import Parser from "rss-parser";

/**
 * Ignore all posts created before this date.
 */
const START_DATE = new Date("2025-10-08T00:00:00.000Z");

function linkToSlug(link: string) {
  return link.substring(
    link.indexOf("/blog/") + "/blog/".length,
    link.lastIndexOf("/"),
  );
}

export async function sendNewPostsNotification() {
  const parser = new Parser();
  const notificationMap = (
    await db.selectFrom("notifications").selectAll().execute()
  ).reduce((notificationMap, notification) => {
    notificationMap.set(notification.slug, notification);
    return notificationMap;
  }, new Map<string, Selectable<Notification>>());

  const feedItems = (
    await parser.parseURL("https://www.nray.dev/rss.xml")
  ).items.filter((item) => {
    return (
      new Date(item.pubDate!) > START_DATE &&
      !notificationMap.has(linkToSlug(item.link!))
    );
  });

  console.log(feedItems);

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
