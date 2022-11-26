import path from "path";
import { promises as fs } from "fs";
import { visit } from "unist-util-visit";
const ROOT_PATH = process.cwd();
import * as acorn from "acorn";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxJsx } from "micromark-extension-mdx-jsx";
import { mdxJsxFromMarkdown } from "mdast-util-mdx-jsx";
import {
  copyIfUpdated,
  getDestPath,
  getPublicUrl,
  getSrcPath,
} from "../fileUtils";

export const getAbsolutePath = (contentDir, sourceFileDir, filename) => {
  return path.join(ROOT_PATH, contentDir, sourceFileDir, filename);
};

/**
 * @typedef {Object} RemarkDemoProps
 * @property {string} contentDir Should match contentlayer's `contentDirPath`.
 * Used to determine the path of the mdx file.
 */

/**
 * @param {RemarkDemoProps}
 */
function remarkDemo({ contentDir }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (tree, file) => {
    const promises = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, (node) => {
      if (node.type === "link" && node.url.startsWith("demos/")) {
        // Move demo folder from content to public.
        const srcPath = getSrcPath(
          contentDir,
          file.data.rawDocumentData.sourceFileDir,
          node.url
        );

        const destPath = getDestPath(contentDir, srcPath);

        node.url = getPublicUrl(destPath);

        promises.push(copyIfUpdated(srcPath, destPath));

        return;
      }

      if (!(node.type === "mdxJsxFlowElement" && node.name === "CodeEditor")) {
        return;
      }

      node.attributes.forEach((attribute, index) => {
        if (attribute.type !== "mdxJsxAttribute" || attribute.name !== "src") {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const elements =
          attribute.value.data.estree.body[0].expression.elements;

        const promise = Promise.all(
          elements.map(async (element) => {
            const filePath = getAbsolutePath(
              contentDir,
              file.data.rawDocumentData.sourceFileDir,
              element.value
            );

            const contents = await fs.readFile(filePath, "utf8");

            return { [path.basename(element.value)]: contents };
          })
        ).then(async (elements) => {
          const files = elements.reduce((previous, current) => {
            return {
              ...previous,
              ...current,
            };
          }, {});

          const mdx = `<CodeEditor files={${JSON.stringify(files)}} />`;
          const tree = fromMarkdown(mdx, {
            extensions: [mdxJsx({ acorn: acorn, addResult: true })],
            mdastExtensions: [mdxJsxFromMarkdown()],
          });

          node.attributes.splice(index, 1, tree.children[0].attributes[0]);
        });

        promises.push(promise);
      });
    });

    await Promise.all(promises);
  };
}

export default remarkDemo;
