import type { Post } from "@/types";
import { render } from "@react-email/render";
import { createElement } from "react";
import NewPost from "@/emails/NewPost";

const TEST_TAG = "12712764";

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

export async function createBroadcast(post: Post) {
  const url = `https://api.kit.com/v4/broadcasts`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-Kit-Api-Key": import.meta.env.KIT_API_KEY,
    },
    body: JSON.stringify({
      content: await render(createElement(NewPost, post)),
      description: post.id,
      public: false,
      email_address: null,
      send_at: new Date().toISOString(),
      subject: `New article: ${post.data.title}`,
      subscriber_filter: [
        { all: [{ type: "segment", ids: [TEST_TAG] }], any: null, none: null },
      ],
      preview_text: "",
      published_at: null,
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
      emailTo: ["nrayemail@gmail.com"],
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
