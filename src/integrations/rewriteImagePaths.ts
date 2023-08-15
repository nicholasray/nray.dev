import dotenv from "dotenv";
dotenv.config();

import type { AstroIntegration } from "astro";
import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import client from "https";
const ASSET_DIR = "_astro";
const IS_REDIRECT_ENABLED = true;

cloudinary.config({
  cloud_name: "nray",
  api_key: process.env["CLOUDINARY_API_KEY"],
  api_secret: process.env["CLOUDINARY_API_SECRET"],
  secure: true,
});

interface ImageLocation {
  from: string;
  to: string;
}

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
      "astro:build:done": async ({ dir, pages }) => {
        const distDir = dir.pathname.endsWith("/")
          ? dir.pathname.slice(0, -1)
          : dir.pathname;

        const files = (await fs.readdir(`${distDir}/${ASSET_DIR}`)).filter(
          (file) => {
            return (
              file.endsWith(".avif") ||
              file.endsWith(".webp") ||
              file.endsWith(".png") ||
              file.endsWith(".jpg") ||
              file.endsWith(".jpeg") ||
              file.endsWith(".gif")
            );
          },
        );

        // Make directory.
        await fs.mkdir(`${distDir}/${ASSET_DIR}/images`);

        const imageLocations: ImageLocation[] = [];

        await Promise.all(
          files.map(async (file) => {
            const prefix = file.substring(0, file.lastIndexOf("_"));

            // Skip if image is original.
            if (prefix === "") {
              return null;
            }

            const from = `${distDir}/${ASSET_DIR}/${file}`;

            const image = await sharp(from);
            const metadata = await image.metadata();
            const dotIdx = file.lastIndexOf(".");

            if (dotIdx === -1) {
              throw new Error(
                `File "${file}" did not have an extension when "rewriteImagePaths" integration.`,
              );
            }
            const ext = file.substring(dotIdx);

            const to = `${distDir}/${ASSET_DIR}/images/w_${metadata.width}/${prefix}${ext}`;

            await fs.mkdir(to.substring(0, to.lastIndexOf("/")), {
              recursive: true,
            });
            await fs.rename(from, to);

            imageLocations.push({
              from: from.replace(distDir, ""),
              to: to.replace(distDir, ""),
            });

            // Upload to Cloudfronts and have it make different optimized formats.
            const response = await cloudinary.uploader.upload(to, {
              eager: [
                { quality: "auto", format: "" },
                { fetch_format: "avif", format: "", quality: "auto" },
                { fetch_format: "webp", format: "", quality: "auto" },
              ],
              public_id: `w_${metadata.width}-${to.split("/").pop()}`,
              overwrite: false,
            });

            if (response.width === 400) {
              console.log("**", response);
            }

            await Promise.all(
              response.eager.map(async (img: CloudinaryEager) => {
                // Download optimized image to our directory.
                await downloadImage(
                  img.secure_url,
                  to.replace(ext, "." + img.format),
                );
              }),
            );
          }),
        );

        // Edit html files to point to new image paths.
        await Promise.all(
          pages.map(async (page) => {
            const path = `${distDir}/${page.pathname}index.html`;
            let contents: string;

            try {
              contents = await fs.readFile(path, "utf8");
            } catch (e) {
              return null;
            }

            await Promise.all(
              imageLocations.map(async (imageLocation) => {
                contents = contents.replaceAll(
                  imageLocation.from,
                  (IS_REDIRECT_ENABLED ? "/optimize" : "") + imageLocation.to,
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
