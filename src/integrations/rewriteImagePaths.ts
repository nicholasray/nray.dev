import dotenv from "dotenv";
dotenv.config();

import type { AstroIntegration } from "astro";
import fs from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";
const ASSET_DIR = "_astro";
const SHOULD_REMOVE_EXTENSION = !!process.env["CLOUDINARY_REDIRECT_ENABLED"];

cloudinary.config({
  cloud_name: "nray",
  api_key: process.env["CLOUDINARY_API_KEY"],
  api_secret: process.env["CLOUDINARY_API_SECRET"],
  secure: true,
});

function removeExtensionIfRequired(filename: string) {
  if (SHOULD_REMOVE_EXTENSION) {
    return filename;
  }

  return filename.substring(0, filename.lastIndexOf(".")) || filename;
}

export default (): AstroIntegration => {
  return {
    name: "rewriteImagePaths",
    hooks: {
      "astro:build:done": async ({ dir, pages }) => {
        const files = (await fs.readdir(`${dir.pathname}/${ASSET_DIR}`)).filter(
          (file) => {
            return (
              file.endsWith(".png") ||
              file.endsWith(".jpg") ||
              file.endsWith(".jpeg") ||
              file.endsWith(".gif") ||
              file.endsWith(".webp")
            );
          },
        );

        // Make directory.
        await fs.mkdir(`${dir.pathname}/${ASSET_DIR}/images`);

        // Copy images to new directory. Copy instead of move because the image
        // request will proxy from nray.dev to cloudinary and cloudinary to know
        // where the image is located without an infinite redirection.
        await Promise.all(
          files.map(async (file) => {
            const from = `${dir.pathname}/${ASSET_DIR}/${file}`;
            const to = `${dir.pathname}/${ASSET_DIR}/images/${file}`;
            await fs.copyFile(from, to);

            const response = await cloudinary.uploader.upload(to, {
              eager: [
                { quality: "auto", format: "" },
                { fetch_format: "avif", format: "", quality: "auto" },
                { fetch_format: "webp", format: "", quality: "auto" },
              ],
              overwrite: false,
              use_filename: true,
              unique_filename: false,
            });

            console.log(response);
          }),
        );

        // Edit html files to point to new image paths.
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
                contents = contents.replaceAll(
                  file,
                  removeExtensionIfRequired(`images/${file}`),
                );
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
