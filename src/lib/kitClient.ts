import type { Post } from "@/types";
import { render } from "@react-email/render";
import { createElement } from "react";
import NewPost from "@/emails/NewPost";

const TEST_TAG = "12712764";

export async function createBroadcast(post: Post, isTest: boolean) {
  const url = `https://api.kit.com/v4/broadcasts`;

  const content = await render(createElement(NewPost, post));

  console.log(content);

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-Kit-Api-Key": import.meta.env.KIT_API_KEY,
    },
    body: JSON.stringify({
      content,
      description: post.id,
      public: false,
      email_address: null,
      subject: `New article: ${post.data.title}`,
      subscriber_filter: [
        ...( isTest ? [{ all: [{ type: "tag", ids: [TEST_TAG] }], any: null, none: null }] : []),
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
