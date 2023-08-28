import type { PagesFunction } from "@cloudflare/workers-types/experimental";
const ASSET_DIR = "_astro";
const OPTIMIZED_ASSET_DIR = `${ASSET_DIR}-transformed`;

async function fetchAsset(url: URL, env) {
  let response = await env.ASSETS.fetch(url);
  if (response.status === 200) {
    response = new Response(response.body, response);
    response.headers.set("Cache-Control", "max-age=31536000,immutable");
  }

  return response;
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  const url = new URL(request.url);

  if (!/\/_astro\/.+\..+_.+\.(?:jpg|jpeg|png|webp|avif)/.test(url.pathname)) {
    return fetchAsset(url, env);
  }

  const accept = request.headers.get("Accept");

  // FROM: /_astro/avatar.19c5be45_1jNg6X.jpg
  // TO:  /_astro-optimized/avatar.19c5be45_1jNg6X.avif
  // TO:  /_astro-optimized/avatar.19c5be45_1jNg6X.webp
  // TO:  /_astro-optimized/avatar.19c5be45_1jNg6X.jpg
  async function fetchFromOptimized(format: string) {
    const file = request.url.split("/").pop()!;
    const dotIdx = file.lastIndexOf(".");
    const ext = file.substring(dotIdx);
    const name = file.substring(0, dotIdx);
    const newPath = `/${OPTIMIZED_ASSET_DIR}/${name}${`.${
      format || ext.slice(1)
    }`}`;

    return fetchAsset(new URL(newPath, request.url), env);
  }

  if (accept?.includes("image/avif")) {
    return fetchFromOptimized("avif");
  }

  if (accept?.includes("image/webp")) {
    return fetchFromOptimized("webp");
  }

  return fetchFromOptimized("");
};
