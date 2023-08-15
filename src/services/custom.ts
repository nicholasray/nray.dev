import type { FormatEnum } from "sharp";
import { baseService } from "astro/dist/assets/index.js";
import type {
  ImageOutputFormat,
  ImageQualityPreset,
  LocalImageService,
} from "astro";
import type { BaseServiceTransform } from "astro/dist/assets/services/service.js";

let sharp: typeof import("sharp");

export function parseQuality(quality: string): string | number {
  const result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }

  return result;
}

const qualityTable: Record<ImageQualityPreset, number> = {
  low: 25,
  mid: 50,
  high: 80,
  max: 100,
};

async function loadSharp() {
  let sharpImport: typeof import("sharp");
  try {
    sharpImport = (await import("sharp")).default;
  } catch (e) {
    throw new Error(
      "Could not find Sharp. Please install Sharp manually into your project.",
    );
  }

  return sharpImport;
}

const sharpService: LocalImageService = {
  validateOptions: baseService.validateOptions,
  getURL: baseService.getURL,
  parseURL: baseService.parseURL,
  getHTMLAttributes: baseService.getHTMLAttributes,
  async transform(inputBuffer, transformOptions) {
    if (!sharp) sharp = await loadSharp();

    const transform: BaseServiceTransform =
      transformOptions as BaseServiceTransform;

    // Return SVGs as-is
    // TODO: Sharp has some support for SVGs, we could probably support this once Sharp is the default and only service.
    if (transform.format === "svg") return { data: inputBuffer, format: "svg" };

    const result = sharp(inputBuffer, { failOnError: false, pages: -1 });

    // always call rotate to adjust for EXIF data orientation
    result.rotate();

    // Never resize using both width and height at the same time, prioritizing width.
    if (transform.height && !transform.width) {
      result.resize({ height: transform.height });
    } else if (transform.width) {
      result.resize({ width: transform.width });
    }

    if (transform.format) {
      let quality: number | string | undefined = undefined;
      if (transform.quality) {
        const parsedQuality = parseQuality(transform.quality);
        if (typeof parsedQuality === "number") {
          quality = parsedQuality;
        } else {
          quality =
            transform.quality in qualityTable
              ? qualityTable[transform.quality]
              : undefined;
        }
      }

      result.toFormat(transform.format as keyof FormatEnum, {
        quality: quality,
      });
    }

    const { data, info } = await result.toBuffer({ resolveWithObject: true });

    return {
      data: data,
      format: info.format as ImageOutputFormat,
    };
  },
};

export default sharpService;
