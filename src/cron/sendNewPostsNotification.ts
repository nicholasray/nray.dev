import { db } from "@/db/database";
import type { Selectable } from "kysely";
import type { Notification } from "@/db/types";
import { getEntry } from "astro:content";
import { createBroadcast } from "@/lib/kitClient";
import { getPost } from "@/api";

export const cron = "0 17 * * 3";

export async function job() {
  const notificationMap = (
    await db
      .selectFrom("notifications")
      .selectAll()
      .where((eb) => eb("sentAt", "is", null).and("approvedAt", "is not", null))
      .execute()
  ).reduce((notificationMap, notification) => {
    notificationMap.set(notification.slug, notification);
    return notificationMap;
  }, new Map<string, Selectable<Notification>>());
  const oldestPost = (
    await Promise.all(
      notificationMap.entries().map(([slug]) => getEntry("blog", slug)),
    )
  )
    .filter((entry) => !!entry)
    .sort(
      (a, b) => a.data.publishedAt!.getTime() - b.data.publishedAt!.getTime(),
    )[0];
  if (!oldestPost) return;
  const post = await getPost(oldestPost)
  console.log(`Sending broadcast to all recipients`);
  await createBroadcast(post, true);
  // Update notifications table with notifications that have been sent
  await db
    .updateTable("notifications")
    .set({ sentAt: new Date().toISOString() })
    .where("slug", "=", post.id)
    .execute();
  console.log("Broadcast sent");
}
