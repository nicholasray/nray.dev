import { db } from "@/db/database";
import type { Notification } from "@/db/types";
import { getEntry } from "astro:content";
import type { Selectable } from "kysely";
import Parser from "rss-parser";
import { getPost } from "@/api";
import { render } from "@react-email/render";
import { createElement } from "react";
import NewPost from "@/emails/NewPost";
import type { Post } from "@/types";

const LIST_ID = 7;

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

async function createCampaign(post: Post) {
  const url = "https://api.brevo.com/v3/emailCampaigns";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": import.meta.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      name: `${new Date().toISOString()} newsletter`,
      sender: { email: "hello@news.nray.dev" },
      listIds: [LIST_ID],
      htmlContent: await render(createElement(NewPost, post)),
      inlineImageActivation: false,
      sendAtBestTime: false,
      abTesting: false,
      ipWarmupEnable: false,
    }),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Response status: ${response.status}: ${JSON.stringify(await response.json(), null, 2)}`,
    );
  }

  return response.json<{ id: number }>();
}

async function sendCampaign(campaignId: number) {
  const url = `https://api.brevo.com/v3/emailCampaigns/${campaignId}/sendNow`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": import.meta.env.BREVO_API_KEY,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Response status: ${response.status}: ${JSON.stringify(await response.json(), null, 2)}`,
    );
  }

  return response;
}

async function deleteCampaign(campaignId: number) {
  const url = `https://api.brevo.com/v3/emailCampaigns/${campaignId}`;
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "api-key": import.meta.env.BREVO_API_KEY,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Response status: ${response.status}: ${JSON.stringify(await response.json(), null, 2)}`,
    );
  }

  return response;
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

  const { id } = await createCampaign(oldestPost);
  await sendCampaign(id);
  await deleteCampaign(id);

  console.log(`campaign ${id} sent`);

  // Update notifiations table with notifications that have been sent
  // await db
  //   .insertInto("notifications")
  //   .values({
  //     slug: oldestPost.id,
  //   })
  //   .execute();
}
