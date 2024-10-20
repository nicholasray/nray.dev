import { defineConfig, sharpImageService } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./src/remark/remarkReadingTime";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

import db from "@astrojs/db";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://www.nray.dev",
  output: "hybrid",
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  experimental: {
    serverIslands: true,
  },
  trailingSlash: "always",
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
    expressiveCode({
      themes: ["ayu-dark"],
      styleOverrides: {
        borderRadius: "0",
        codeFontSize: "1rem",
      },
      defaultProps: {
        showLineNumbers: false,
      },
      plugins: [
        pluginLineNumbers(),
      ],
    }),
    mdx({
      smartypants: false,
    }),
    sitemap({
      filter: (page) => !page.startsWith("https://www.nray.dev/rss.xml"),
    }),
    db(),
  ],
});
