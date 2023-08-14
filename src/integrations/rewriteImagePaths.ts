import type { AstroIntegration } from "astro";
import fs from "node:fs/promises";
const ASSET_DIR = "_astro";

export default (): AstroIntegration => {
  return {
    name: "rewriteImagePaths",
    hooks: {
      "astro:build:done": async ({ dir, pages }) => {
        // Move images from
        const files = (await fs.readdir(`${dir.pathname}/${ASSET_DIR}`)).filter(
          (file) => {
            return (
              file.endsWith(".png") ||
              file.endsWith(".jpg") ||
              file.endsWith(".jpeg") ||
              file.endsWith(".svg") ||
              file.endsWith(".gif") ||
              file.endsWith(".webp")
            );
          },
        );

        // Make directory.
        await fs.mkdir(`${dir.pathname}/${ASSET_DIR}/images`);

        // Move images to new directory.
        await Promise.all(
          files.map(async (file) => {
            await fs.rename(
              `${dir.pathname}/${ASSET_DIR}/${file}`,
              `${dir.pathname}/${ASSET_DIR}/images/${file}`,
            );
          }),
        );

        // Edit html files point to new image paths.
        await Promise.all(
          pages.map(async (page) => {
            const path = `${dir.pathname}${page.pathname}index.html`;
            let contents: string;

            try {
              contents = await fs.readFile(path, "utf8");
            } catch (e) {
              return null;
            }

            await Promise.all(
              files.map(async (file) => {
                contents = contents.replaceAll(file, `images/${file}`);
              }),
            );

            await fs.writeFile(path, contents, "utf8");
            console.info(`Revised html of ${path}`);
          }),
        );
      },
    },
  };
};
