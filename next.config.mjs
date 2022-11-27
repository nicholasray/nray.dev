import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import theme from "./src/syntax/overnight.json" assert { type: "json" };
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkReadingTime from "remark-reading-time";
import remarkComputedFrontmatter from "./src/remark/remarkComputedFrontmatter.mjs";
import { format, parseISO } from "date-fns";
import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

function addRawSourceSupport(config) {
  const queue = [...config.module.rules];
  const testPaths = [".css", ".ts", ".tsx"];

  while (queue.length) {
    const rule = queue.shift();

    if (
      rule.test &&
      rule.test instanceof RegExp &&
      testPaths.some((path) => rule.test.test(path))
    ) {
      rule.resourceQuery = {
        ...rule.resourceQuery,
        not: [...((rule.resourceQuery && rule.resourceQuery.not) ?? []), /raw/],
      };
    }

    if (rule.oneOf) {
      rule.oneOf.unshift({
        resourceQuery: /raw/,
        type: "asset/source",
      });
    }
  }

  config.module.rules.unshift({
    resourceQuery: /raw/,
    type: "asset/source",
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  webpack(config, options) {
    addRawSourceSupport(config);

    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [
              remarkFrontmatter,
              remarkReadingTime,
              [
                remarkComputedFrontmatter,
                (data, file) => {
                  const slug = path.basename(file.dirname);
                  return {
                    ...data,
                    slug,
                    url: `/blog/${slug}`,
                    readingTime: file.data.readingTime.text,
                    publishedAtFormatted: data.publishedAt
                      ? format(parseISO(data.publishedAt), "LLLL d, yyyy")
                      : "",
                  };
                },
              ],
              remarkMdxFrontmatter,
              remarkGfm,
            ],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme,
                  onVisitLine(node) {
                    // Prevent lines from collapsing in `display: grid` mode, and
                    // allow empty lines to be copy/pasted
                    if (node.children.length === 0) {
                      node.children = [{ type: "text", value: " " }];
                    }
                  },
                  // Feel free to add classNames that suit your docs
                  onVisitHighlightedLine(node) {
                    node.properties.className.push("line--highlighted");
                  },
                  onVisitHighlightedWord(node) {
                    node.properties.className = ["word"];
                  },
                },
              ],
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  properties: {
                    "aria-label": "jump link",
                    className: `heading-link opacity-0 no-underline before:content-['#'] absolute -ml-8`,
                  },
                  content: { type: "text", value: "" },
                },
              ],
            ],
            // Use undefined to support React Server Components.
            providerImportSource: undefined,
          },
        },
      ].filter(Boolean),
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});

export default nextConfig;
