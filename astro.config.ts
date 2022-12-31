import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./remark/remarkReadingTime";
import rehypePrettyCode from "rehype-pretty-code";
import ayu from "./src/themes/ayu.json";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: ayu,
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
          // Feel free to add classNames that suit your docs
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word"];
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
    extendDefaultPlugins: true,
  },
  integrations: [
    react(),
    tailwind(),
    mdx(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  vite: {
    resolve: {
      // Sandpack apparently bundles their cjs module incorrectly so create
      // aliases that point to the esm module instead. Hopefully, this can be
      // removed in the future.
      //
      // Also see:
      // https://github.com/withastro/astro/issues/4692
      // https://github.com/withastro/astro/issues/5653
      alias: {
        "@codesandbox/sandpack-react":
          "./node_modules/@codesandbox/sandpack-react/dist/esm/index.js",
        "@codesandbox/sandpack-client":
          "./node_modules/@codesandbox/sandpack-client/dist/esm/index.js",
      },
    },
  },
});
