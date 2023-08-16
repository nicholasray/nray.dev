import dotenv from "dotenv";
dotenv.config();

import type { AstroIntegration } from "astro";
import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import client from "https";
const ASSET_DIR = "_astro";
// Keep in sync with image-rewrite.ts
const OPTIMIZED_ASSET_DIR = `${ASSET_DIR}-optimized`;
const IS_CLOUDINARY_ENABLED =
  !!process.env["CLOUDINARY_API_KEY"] && !!process.env["CLOUDINARY_API_SECRET"];

cloudinary.config({
  cloud_name: "nray",
  api_key: process.env["CLOUDINARY_API_KEY"],
  api_secret: process.env["CLOUDINARY_API_SECRET"],
  secure: true,
});

interface CloudinaryEager {
  transformation: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  url: string;
  secure_url: string;
}

// Adapted from https://scrapingant.com/blog/download-image-javascript
function downloadImage(url: string, filepath: string) {
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(createWriteStream(filepath))
          .on("error", reject)
          .once("close", () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`),
        );
      }
    });
  });
}

export default (): AstroIntegration => {
  return {
    name: "rewriteImagePaths",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const distDir = dir.pathname.endsWith("/")
          ? dir.pathname.slice(0, -1)
          : dir.pathname;

        const files = (await fs.readdir(`${distDir}/${ASSET_DIR}`)).filter(
          (file) => {
            return !!file.match(/.+\..+_.+\.(?:jpg|jpeg|png|webp|avif|gif)/);
          },
        );

        await Promise.all(
          files.map(async (file) => {
            const from = `${distDir}/${ASSET_DIR}/${file}`;
            const dotIdx = file.lastIndexOf(".");
            const ext = file.substring(dotIdx);
            const name = file.substring(0, dotIdx);
            const to = `${distDir}/${OPTIMIZED_ASSET_DIR}/${name}${ext}`;

            // Make directory for unique transformation and copy image to it.
            await fs.mkdir(to.substring(0, to.lastIndexOf("/")), {
              recursive: true,
            });
            await fs.copyFile(from, to);

            if (!IS_CLOUDINARY_ENABLED) {
              return;
            }

            // Upload to Cloudinary for optimization.
            const response = await cloudinary.uploader.upload(to, {
              eager: [
                { fetch_format: "avif", format: "", quality: "auto" },
                { fetch_format: "webp", format: "", quality: "auto" },
                { quality: "auto", format: "" },
              ],
              public_id: name + ext,
              overwrite: false,
            });

            // Download optimized images from Cloudinary to our local directory.
            await Promise.all(
              response.eager.map(async (img: CloudinaryEager) => {
                await downloadImage(
                  img.secure_url,
                  to.substring(0, to.lastIndexOf(ext)) + `.${img.format}`,
                );
              }),
            );
          }),
        );
      },
    },
  };
};
