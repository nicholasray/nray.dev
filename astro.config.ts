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
  site: "https://www.nray.dev",
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
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
          // Feel free to add classNames that suit your docs
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  },
  integrations: [
    react(),
    tailwind(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mdx(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
