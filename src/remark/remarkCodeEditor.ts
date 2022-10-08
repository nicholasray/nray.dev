import path from "path";
import { promises as fs } from "fs";
import { visit } from "unist-util-visit";
const ROOT_PATH = process.cwd();
import * as acorn from "acorn";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxJsx } from "micromark-extension-mdx-jsx";
import {
  mdxJsxFromMarkdown,
  MdxJsxFlowElement,
  MdxJsxAttribute,
} from "mdast-util-mdx-jsx";
import { Literal } from "mdast";

interface RemarkCodeEditorOptions {
  /**
   * Should match contentlayer's `contentDirPath`. Used to
   * determine the path of the mdx file.
   */
  contentDir: string;
}

export const getAbsolutePath = (
  contentDir: string,
  sourceFileDir: string,
  filename: string
) => {
  return path.join(ROOT_PATH, contentDir, sourceFileDir, filename);
};

function remarkCodeEditor({ contentDir }: RemarkCodeEditorOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (tree: any, file: any) => {
    const promises: Promise<void>[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, "mdxJsxFlowElement", (node: any) => {
      if (node.name !== "CodeEditor") {
        return;
      }

      node.attributes.forEach((attribute: MdxJsxAttribute, index: number) => {
        if (attribute.type !== "mdxJsxAttribute" || attribute.name !== "src") {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const elements = attribute.value.data.estree.body[0].expression
          .elements as Literal[];

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

          node.attributes.splice(
            index,
            1,
            (tree.children[0] as MdxJsxFlowElement).attributes[0]
          );
        });

        promises.push(promise);
      });
    });

    await Promise.all(promises);
  };
}

export default remarkCodeEditor;
