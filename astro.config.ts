import { defineConfig, sharpImageService } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import ayu from "./ayu.theme.json";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./remark/remarkReadingTime";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.nray.dev",
  output: "hybrid",
  adapter: cloudflare(),
  experimental: {
    serverIslands: true,
  },
  trailingSlash: "always",
  build: {
    inlineStylesheets: "always",
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
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
            className: `heading-link`,
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
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      applyBaseStyles: false,
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mdx({
      smartypants: false,
    }),
    sitemap({
      filter: (page) => !page.startsWith("https://www.nray.dev/rss.xml"),
    }),
  ],
  vite: {
    ssr: {
      external: [
        "node:path",
        "fs/promises",
        "path",
        "os",
        "events",
        "util",
        "child_process",
        "fs",
        "crypto",
        "url",
        "readline",
        "node:os",
        "querystring",
        "assert",
        "buffer",
        "zlib",
      ],
    },
  },
});
