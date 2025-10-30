import { getPost } from "@/api";
import { db } from "@/db/database";
import type { Notification } from "@/db/types";
import { createCampaign, sendCampaignToTestList } from "@/lib/brevoClient";
import { getEntriesFromFeed } from "@/lib/rssClient";
import type { Selectable } from "kysely";

const LIST_ID = 7;
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
    console.log(`Creating campaign: ${post.id}`);
    const { id } = await createCampaign(post, LIST_ID);
    console.log(`Campaign '${post.id}' created. Sending to test list`);
    await sendCampaignToTestList(id);
    console.log(`Campaign '${post.id}' Sent to test list`);

    // Update notifications table with notifications that have been sent
    await db
      .insertInto("notifications")
      .values({
        slug: post.id,
      })
      .execute();
  }
}
