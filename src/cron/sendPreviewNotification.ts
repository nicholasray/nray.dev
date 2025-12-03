import { getPost } from "@/api";
import { db } from "@/db/database";
import type { Notification } from "@/db/types";
import { createBroadcast } from "@/lib/kitClient";
import { getEntriesFromFeed } from "@/lib/rssClient";
import type { Selectable } from "kysely";

/**
 * Ignore all posts created before this date.
 */
const IGNORE_POSTS_BEFORE_DATE = new Date("2025-10-08T00:00:00.000Z");

export const cron = "*/15 * * * *";

export async function job(env: Env) {
  const notificationMap = (
    await db.selectFrom("notifications").selectAll().execute()
  ).reduce((notificationMap, notification) => {
    notificationMap.set(notification.slug, notification);
    return notificationMap;
  }, new Map<string, Selectable<Notification>>());

  const postEntries = (await getEntriesFromFeed(env)).filter(
    (entry) =>
      entry.data.publishedAt! > IGNORE_POSTS_BEFORE_DATE &&
      !notificationMap.has(entry.id),
  );

  for (const postEntry of postEntries) {
    const post = await getPost(postEntry);
    console.log(`Sending broadcast to test list: ${post.id}`);
    await createBroadcast(post, true);
    // Update notifications table with notifications that have been sent
    await db
      .insertInto("notifications")
      .values({
        slug: post.id,
      })
      .execute();
    console.log(`Broadcast sent`);
  }
}
