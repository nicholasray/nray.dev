const ASSET_DIR = "_astro";

export default async (request: Request) => {
  const accept = request.headers.get("Accept");

  console.log("******", accept);

  // FROM: /_astro/avatar.19c5be45_1jNg6X.jpg
  // TO:  /_astro/images/avatar.19c5be45_1jNg6X/avatar.19c5be45_1jNg6X.avif
  // TO:  /_astro/images/avatar.19c5be45_1jNg6X/avatar.19c5be45_1jNg6X.webp
  // TO:  /_astro/images/avatar.19c5be45_1jNg6X/avatar.19c5be45_1jNg6X.jpg
  function rewriteUrl(format: string) {
    const url = request.url.replace(ASSET_DIR, `${ASSET_DIR}/images`);
    const file = url.split("/").pop()!;
    const dotIdx = file.lastIndexOf(".");
    const ext = file.substring(dotIdx);
    const key = file.substring(0, dotIdx);
    const newPath = `/${ASSET_DIR}/images/${key}/${key}${`.${format}` || ext}`;

    console.log(
      "**************",
      `FROM: ${request.url}`,
      `TO: ${new URL(newPath, request.url)}`,
    );
    return new URL(newPath, request.url);
  }

  if (accept?.includes("image/avif")) {
    return rewriteUrl("avif");
  }

  if (accept?.includes("image/webp")) {
    return rewriteUrl("webp");
  }

  return rewriteUrl("");
};
