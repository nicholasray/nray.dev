import { defineConfig, sharpImageService } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import ayu from "./ayu.theme.json";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./remark/remarkReadingTime";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.nray.dev",
  trailingSlash: "always",
  experimental: {
    assets: true,
  },
  build: {
    inlineStylesheets: "always",
  },
  image: {
    service: sharpImageService(),
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          theme: ayu,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [
                {
                  type: "text",
                  value: " ",
                },
              ];
            }
          },
        },
      ],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            "aria-label": "jump link",
            className: `heading-link opacity-0 no-underline before:content-['#'] absolute -ml-8`,
          },
          content: {
            type: "text",
            value: "",
          },
        },
      ],
    ],
  },
  integrations: [
    react(),
    tailwind(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mdx(),
    sitemap({
      filter: (page) => !page.startsWith("https://www.nray.dev/rss.xml"),
    }),
  ],
  compressHTML: true
});
