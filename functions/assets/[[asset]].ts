import { fetchAsset } from "../../cloudflare/utils.js";

export const onRequest: PagesFunction = async ({ request, env }) => {
  const url = new URL(request.url);

  return fetchAsset(url, env);
};
