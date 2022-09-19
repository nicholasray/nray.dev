// eslint-disable-next-line import/no-unresolved
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import theme from "./src/syntax/overnight.json";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkImages, remarkCoverImage } from "./src/remark";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getDestPath, getImageUrl, getSrcPath } from "./src/imageUtils";
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
    coverFile: {
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
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    readTime: {
      type: "string",
      resolve: (post) => readingTime(post.body.raw).text,
    },
    cover: {
      type: "string",
      resolve: (post) => {
        const srcPath = getSrcPath(
          CONTENT_DIR,
          post._raw.sourceFileDir,
          post.coverFile
        );
        const destPath = getDestPath(CONTENT_DIR, srcPath);

        return getImageUrl(destPath);
      },
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
    url: {
      type: "string",
      resolve: (page) => `/${page._raw.flattenedPath}`,
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
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

export default makeSource({
  contentDirPath: CONTENT_DIR,
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      [remarkImages, { contentDir: CONTENT_DIR }],
      [remarkCoverImage, { contentDir: CONTENT_DIR }],
    ],
    rehypePlugins: [
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
      [rehypePrettyCode, options],
    ],
  },
});
