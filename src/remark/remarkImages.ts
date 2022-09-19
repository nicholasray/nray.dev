import { visit } from "unist-util-visit";
import sizeOf from "image-size";
import { copyIfUpdated, getDestPath, getSrcPath } from "../imageUtils";

const PUBLIC_DIR = "public";
const ROOT_PATH = process.cwd();

interface ImagePath {
  srcPath: string;
  destPath: string;
}

interface RemarkImagesOptions {
  /**
   * Should match contentlayer's `contentDirPath`. Used to
   * determine the path of the mdx file.
   */
  contentDir: string;
}

const remarkImages = ({ contentDir }: RemarkImagesOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (tree: any, file: any) => {
    const imagePaths: ImagePath[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, "mdxJsxFlowElement", (node: any) => {
      if (node.name !== "Image") {
        return;
      }

      const srcAttribute = node.attributes.find(
        (attribute: { name: string }) =>
          "name" in attribute && attribute.name === "src"
      );

      if (
        !srcAttribute ||
        !srcAttribute.value ||
        typeof srcAttribute.value !== "string" ||
        !file.data.rawDocumentData
      ) {
        return;
      }

      const srcPath = getSrcPath(
        contentDir,
        file.data.rawDocumentData.sourceFileDir,
        srcAttribute.value
      );
      const destPath = getDestPath(contentDir, srcPath);

      srcAttribute.value = destPath.replace(`${ROOT_PATH}/${PUBLIC_DIR}`, "");

      const dimensions = sizeOf(srcPath);

      if (!dimensions.width || !dimensions.height) {
        return;
      }

      node.attributes.push(
        {
          type: "mdxJsxAttribute",
          name: "width",
          value: `${dimensions.width}`,
        },
        {
          type: "mdxJsxAttribute",
          name: "height",
          value: `${dimensions.height}`,
        }
      );

      imagePaths.push({ srcPath, destPath });
    });

    // Move images to public directory.
    await Promise.all(
      imagePaths.map(async (imagePath) => {
        await copyIfUpdated(imagePath.srcPath, imagePath.destPath);
      })
    );
  };
};

export default remarkImages;
