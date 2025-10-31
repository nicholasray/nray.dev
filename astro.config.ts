import { defineConfig, sharpImageService } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./src/remark/remarkReadingTime";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.nray.dev",
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
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? {
            "react-dom/server": "react-dom/server.edge",
          }
        : undefined,
    },
    build: {
      sourcemap: true,
    },
  },
  adapter: cloudflare({
    imageService: "compile",
    workerEntryPoint: {
      path: "src/worker.ts",
    },
  }),
});
