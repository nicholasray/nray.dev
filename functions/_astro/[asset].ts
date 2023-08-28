import type { PagesFunction } from "@cloudflare/workers-types/experimental";
const ASSET_DIR = "_astro";
const OPTIMIZED_ASSET_DIR = `${ASSET_DIR}-transformed`;

export const onRequest: PagesFunction = async ({ request, next, env }) => {
  const url = new URL(request.url);

  if (!/\/_astro\/.+\..+_.+\.(?:jpg|jpeg|png|webp|avif)/.test(url.pathname)) {
    return next();
  }

  const accept = request.headers.get("Accept");

  // FROM: /_astro/avatar.19c5be45_1jNg6X.jpg
  // TO:  /_astro-optimized/avatar.19c5be45_1jNg6X.avif
  // TO:  /_astro-optimized/avatar.19c5be45_1jNg6X.webp
  // TO:  /_astro-optimized/avatar.19c5be45_1jNg6X.jpg
  function rewriteUrl(format: string) {
    const file = request.url.split("/").pop()!;
    const dotIdx = file.lastIndexOf(".");
    const ext = file.substring(dotIdx);
    const name = file.substring(0, dotIdx);
    const newPath = `/${OPTIMIZED_ASSET_DIR}/${name}${`.${
      format || ext.slice(1)
    }`}`;

    return env.ASSETS.fetch(new URL(newPath, request.url));
  }

  if (accept?.includes("image/avif")) {
    return rewriteUrl("avif");
  }

  if (accept?.includes("image/webp")) {
    return rewriteUrl("webp");
  }

  return rewriteUrl("");
};
