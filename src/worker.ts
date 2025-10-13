import type { SSRManifest } from "astro";
import { App } from "astro/app";
import { handle } from "@astrojs/cloudflare/handler";

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);
  return {
    default: {
      async fetch(request, env, ctx) {
        // @ts-expect-error known error
        return handle(manifest, app, request, env, ctx);
      },
      async scheduled(_controller, _env, ctx) {
        ctx.waitUntil(
          new Promise<void>((resolve) => {
            setTimeout(() => {
              console.log("Testing cron...it works!");
              resolve();
            }, 5000);
          }),
        );
      },
    } satisfies ExportedHandler<Env>,
  };
}
