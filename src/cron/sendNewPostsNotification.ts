import { db } from "@/db/database";
import type { Notification } from "@/db/types";
import type { Selectable } from "kysely";
import { getCampaign, sendCampaign } from "@/lib/brevoClient";
import { getEntry } from "astro:content";

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

  const campaign = await getCampaign(oldestPost.id);

  if (!campaign) return;

  console.log(`Sending campaign "${campaign.name}"`);
  await sendCampaign(campaign.id);
  console.log("Campaign sent");

  // Update notifications table with notifications that have been sent
  await db
    .updateTable("notifications")
    .set({ sentAt: new Date().toISOString() })
    .where("slug", "=", oldestPost.id)
    .execute();
}
