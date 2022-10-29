import fs from "fs";
import path from "path";
const PUBLIC_DIR = "public";
const ROOT_PATH = process.cwd();

export const getSrcPath = (
  contentDir: string,
  sourceFileDir: string,
  filename: string
) => {
  return path.join(ROOT_PATH, contentDir, sourceFileDir, filename);
};

export const getDestPath = (contentDir: string, srcPath: string) => {
  return srcPath.replace(`/${contentDir}`, `/${PUBLIC_DIR}/${contentDir}`);
};

const getStat = async (filePath: string): Promise<fs.Stats | false> => {
  return await fs.promises.stat(filePath).catch(() => false);
};

export const getPublicUrl = (destPath: string) => {
  return destPath.replace(`${ROOT_PATH}/${PUBLIC_DIR}`, "");
};

/**
 * Copies file from an existing location ("srcPath") to a new location
 * ("destPath"). If the last modified time of the "srcPath" matches that of the
 * "destPath", the file will not be copied.
 */
export const copyIfUpdated = async (srcPath: string, destPath: string) => {
  const srcStat = await getStat(srcPath);
  const destStat = await getStat(destPath);

  if (!srcStat) {
    return;
  }

  if (!destStat) {
    await fs.promises.mkdir(path.dirname(destPath), {
      recursive: true,
    });
  }

  // If modified times don't match, assume destination file is out of date
  // and overwrite it.
  if (!destStat || srcStat.mtime.getTime() !== destStat.mtime.getTime()) {
    await fs.promises.copyFile(srcPath, destPath);
    // Copy modified times from source to destination so that we can
    // compare them again in the future.
    await fs.promises.utimes(destPath, srcStat.atime, srcStat.mtime);
  }
};
