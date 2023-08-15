export default async (request: Request) => {
  const accept = request.headers.get("Accept");
  const dotIdx = request.url.lastIndexOf(".");
  const ext = dotIdx === -1 ? "" : request.url.substring(dotIdx + 1);

  // FROM: /optimize/_astro/images/w_400/inp-search-ranking.1b71b3f5.jpg
  // TO:  /_astro/images/w_400/inp-search-ranking.1b71b3f5.avif
  // TO:  /_astro/images/w_400/inp-search-ranking.1b71b3f5.webp
  // TO:  /_astro/images/w_400/inp-search-ranking.1b71b3f5.jpg
  function rewriteUrl(format: string) {
    const url = request.url
      .replace("/optimize", "")
      .replace(ext, ext === "" ? "" : format);

    return new URL(url);
  }

  if (accept?.includes("image/avif")) {
    return rewriteUrl("avif");
  }

  if (accept?.includes("image/webp")) {
    return rewriteUrl("webp");
  }

  return rewriteUrl(ext);
};
