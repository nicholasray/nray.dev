import type { AstroIntegration } from "astro";
import fs from "node:fs/promises";
const FONTS_DIR = "fonts";
const ASSET_DIR = "_astro";
const OPTIMIZED_ASSET_DIR = `${ASSET_DIR}-transformed`;

function addHeader(path: string) {
  return `
${path}
  Cache-Control: public, max-age=31536000, immutable
`.trim();
}

/**
 * Adds netlify _headers file to dist folder for long-lived caching of assets
 * with fingerprints. Don't do this in netlify.toml with wildcards because if
 * the file doesn't exist, a 404 will be cached. There is no way to set a header
 * only for 200 responses without using edge functions (expensive).
 */
export default (): AstroIntegration => {
  return {
    name: "conditionalCache",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const distDir = dir.pathname.endsWith("/")
          ? dir.pathname.slice(0, -1)
          : dir.pathname;
        const cacheDirs = [FONTS_DIR, ASSET_DIR, OPTIMIZED_ASSET_DIR];
        const headers: string[] = [];

        await Promise.all(
          cacheDirs.map(async (cacheDir) => {
            (
              await fs.readdir(`${distDir}/${cacheDir}`, {
                withFileTypes: true,
              })
            )
              .filter(
                (dirent) => dirent.isFile() && dirent.name !== ".DS_Store",
              )
              .forEach((file) => {
                headers.push(addHeader(`/${cacheDir}/${file.name}`));
              });
          }),
        );

        await fs.writeFile(`${distDir}/_headers`, headers.join("\n"));
      },
    },
  };
};
