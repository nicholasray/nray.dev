export default async (request: Request) => {
  const accept = request.headers.get("Accept");

  // FROM: /optimize/_astro/images/w_400/inp-search-ranking.1b71b3f5.jpg
  // TO:  /_astro/images/w_400/inp-search-ranking.1b71b3f5.avif
  // TO:  /_astro/images/w_400/inp-search-ranking.1b71b3f5.webp
  // TO:  /_astro/images/w_400/inp-search-ranking.1b71b3f5.jpg
  function rewriteUrl(format: string) {
    let url = request.url.replace("/optimize", "");
    const dotIdx = url.lastIndexOf(".");

    if (format !== "") {
      url = url.substring(0, dotIdx < 0 ? url.length : dotIdx) + `.${format}`;
    }

    console.log("********", dotIdx, url);

    return new URL(url);
  }

  if (accept?.includes("image/avif")) {
    return rewriteUrl("avif");
  }

  if (accept?.includes("image/webp")) {
    return rewriteUrl("webp");
  }

  return rewriteUrl("");
};
