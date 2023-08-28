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

  return fetchAsset(url, env);
};
