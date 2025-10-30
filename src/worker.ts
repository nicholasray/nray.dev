import type { SSRManifest } from "astro";
import { App } from "astro/app";
import { handle } from "@astrojs/cloudflare/handler";
import * as sendNewPostNotification from "./cron/sendNewPostsNotification";
import * as sendPreviewNotification from "./cron/sendPreviewNotification";

interface Job {
  cron: string;
  job: (env: Env) => Promise<void>;
}

function getJobs(): Job[] {
  return [
    sendNewPostNotification,
    sendPreviewNotification,
  ];
}

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);
  return {
    default: {
      async fetch(request, env, ctx) {
        // @ts-expect-error known error
        return handle(manifest, app, request, env, ctx);
      },
      async scheduled(controller, env, _ctx) {
        for (const job of getJobs()) {
          if (job.cron === controller.cron) await job.job(env);
        }
      },
    } satisfies ExportedHandler<Env>,
  };
}
