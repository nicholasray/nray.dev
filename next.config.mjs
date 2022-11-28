import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import theme from "./src/syntax/overnight.json" assert { type: "json" };
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkReadingTime from "remark-reading-time";
import remarkComputedFrontmatter from "./src/remark/remarkComputedFrontmatter.mjs";
import { format } from "date-fns";
import { createLoader } from "simple-functional-loader";
import bundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

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
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
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
        // For mdx imports that append the ?preview query string, strip the
        // content and export only the meta data so that it doesn't cause
        // increase the size of the JS bundle.
        createLoader(function (source) {
          if (this.resourceQuery !== "?preview") {
            return source;
          }
          const captures = source.match(/(export const meta[^;]+;)/);
          if (!captures[1]) {
            throw new Error(
              `Expected mdx to export "meta" object when parsing ${this.resourcePath}`
            );
          }

          return captures[1];
        }),
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [
              remarkFrontmatter,
              remarkReadingTime,
              [
                remarkComputedFrontmatter,
                (data, file) => {
                  if (!file.dirname.includes("/app")) {
                    throw new Error(`${file.dirname} to include /app`);
                  }
                  const slug = path.basename(file.dirname);
                  const url = file.dirname.split("/app")[1];

                  return {
                    ...data,
                    slug,
                    url,
                    readingTime: file.data.readingTime.text,
                    publishedAtFormatted: data.publishedAt
                      ? format(data.publishedAt, "LLLL d, yyyy")
                      : "",
                  };
                },
              ],
              [remarkMdxFrontmatter, { name: "meta" }],
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
        createLoader(function (source) {
          let data = [
            source,
            `import CustomHead from "@components/Head";`,
            `export const Head = () => (<CustomHead includeOg={true} {...meta} />);`,
          ];

          if (this.resourcePath.includes("app/blog/")) {
            data = data.concat([
              `import BlogArticle from "@components/BlogArticle";`,
              `export default ({ children }) => (<BlogArticle {...meta}>{children}</BlogArticle>);`,
            ]);
          }

          return data.join("\n");
        }),
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
