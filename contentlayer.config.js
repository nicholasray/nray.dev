// eslint-disable-next-line import/no-unresolved
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import theme from "./src/syntax/overnight.json";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkImages, remarkCodeDemo } from "./src/remark";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { format, parseISO } from "date-fns";

const CONTENT_DIR = "content";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "date",
    },
    description: {
      type: "markdown",
      required: true,
    },
  },
  computedFields: {
    status: {
      type: "enum",
      options: ["draft", "published"],
      resolve: (post) => (post.publishedAt ? "published" : "draft"),
    },
    publishedAtFormatted: {
      type: "string",
      resolve: (post) =>
        post.publishedAt
          ? format(parseISO(post.publishedAt), "LLLL d, yyyy")
          : "",
    },
    slug: {
      type: "string",
      resolve: (page) => page._raw.flattenedPath.split("/").pop(),
    },
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    readTime: {
      type: "string",
      resolve: (post) => readingTime(post.body.raw).text,
    },
  },
}));

const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the page",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (page) => `${page._raw.flattenedPath}`,
    },
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

const options = {
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
};

export default makeSource({
  contentDirPath: CONTENT_DIR,
  contentDirExclude: [
    "blog/how-to-create-performant-scroll-animations-in-react/demos",
  ],
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      [remarkCodeDemo, { contentDir: CONTENT_DIR }],
      [remarkImages, { contentDir: CONTENT_DIR }],
    ],
    rehypePlugins: [
      [rehypePrettyCode, options],
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
  },
});
