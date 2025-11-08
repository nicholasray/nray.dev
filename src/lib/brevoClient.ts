import type { Post } from "@/types";
import { render } from "@react-email/render";
import { createElement } from "react";
import NewPost from "@/emails/NewPost";

export async function getCampaign(slug: string) {
  const url = `https://api.brevo.com/v3/emailCampaigns`;
  const options = {
    method: "GET",
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

  const { campaigns } = await response.json<{
    campaigns: { id: number; name: string }[];
  }>();
  return campaigns.find((campaign) => campaign.name === slug);
}

export async function createCampaign(post: Post, listId: number) {
  const url = `https://api.brevo.com/v3/emailCampaigns`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": import.meta.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      name: `${post.id}`,
      sender: { email: "hello@news.nray.dev" },
      subject: `New article: ${post.data.title}`,
      recipients: { listIds: [listId] },
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

export async function sendCampaignToTestList(id: number) {
  const url = `https://api.brevo.com/v3/emailCampaigns/${id}/sendTest`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": import.meta.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      emailTo: ["nray@nray.dev"],
    }),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Response status: ${response.status}: ${JSON.stringify(await response.json(), null, 2)}`,
    );
  }
}

export async function sendCampaign(campaignId: number) {
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
