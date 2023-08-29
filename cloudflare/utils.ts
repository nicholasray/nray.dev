interface Env {
  ASSETS: {
    fetch: (url: URL) => Promise<Response>;
  };
}

export async function fetchAsset(url: URL, env: Env) {
  let response = await env.ASSETS.fetch(url);
  if (response.status === 200) {
    response = new Response(response.body, response);
    response.headers.set("Cache-Control", "max-age=31536000,immutable");
  }

  return response;
}
