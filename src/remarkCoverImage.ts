import { visit } from "unist-util-visit";
import { copyIfUpdated, getDestPath, getSrcPath } from "./imageUtils";

interface ImagePath {
  srcPath: string;
  destPath: string;
}

interface RemarkCoverImageOptions {
  /**
   * Should match contentlayer's `contentDirPath`. Used to
   * determine the path of the mdx file.
   */
  contentDir: string;
}

const remarkCoverImage = ({ contentDir }: RemarkCoverImageOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (tree: any, file: any) => {
    const imagePaths: ImagePath[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, "yaml", (node: any) => {
      const match = node.value.match(/coverFile:\s*"([\w\d\.]+)"/);
      if (!match || !match[1] || !file.data.rawDocumentData) {
        return;
      }

      const srcPath = getSrcPath(
        contentDir,
        file.data.rawDocumentData.sourceFileDir,
        match[1]
      );
      const destPath = getDestPath(contentDir, srcPath);

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

export default remarkCoverImage;
