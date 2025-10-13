import type { SSRManifest } from "astro";
import { App } from "astro/app";
import { handle } from "@astrojs/cloudflare/handler";
import { sendNewPostsNotification } from "./cron/sendNewPostsNotification";

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);
  return {
    default: {
      async fetch(request, env, ctx) {
        // @ts-expect-error known error
        return handle(manifest, app, request, env, ctx);
      },
      async scheduled(_controller, env, ctx) {
        ctx.waitUntil(sendNewPostsNotification(env));
      },
    } satisfies ExportedHandler<Env>,
  };
}
